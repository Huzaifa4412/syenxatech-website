"""Build the hero's static neural-voice demos and accurate transcript cues.

Requires Python, edge-tts==7.2.8 and FFmpeg on PATH. Run from the repo root:
    python scripts/generate-call-audio.py
Only the fictional scripts are sent to the speech provider. The website plays
the resulting local MP3s; it does not contact the provider or require API keys.
"""

import asyncio
import json
import shutil
import subprocess
import tempfile
import wave
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "src/lib/call-demo-scenarios.json"
OUTPUT = ROOT / "public/audio/calls"
MANIFEST = ROOT / "src/lib/call-demo-audio.json"
VOICES = {"agent": "en-US-AvaMultilingualNeural", "caller": "en-US-AndrewMultilingualNeural"}
SAMPLE_RATE = 24000
GAP = 0.24


def run_ffmpeg(*args):
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *map(str, args)], check=True)


async def render_line(line, directory, index):
    mp3 = directory / f"{index}.mp3"
    metadata = directory / f"{index}.jsonl"
    wav = directory / f"{index}.wav"
    text = line.get("spokenText", line["text"])
    if text == "It's off. 78704.":
        text = "It's off. Seven eight seven zero four."
    speech = edge_tts.Communicate(text, VOICES[line["who"]], rate="+5%", boundary="WordBoundary")
    await speech.save(str(mp3), str(metadata))
    boundaries = [json.loads(row) for row in metadata.read_text(encoding="utf-8").splitlines()]
    start = max(0, boundaries[0]["offset"] / 10_000_000 - 0.07)
    last = boundaries[-1]
    end = (last["offset"] + last["duration"]) / 10_000_000 + 0.14
    run_ffmpeg("-i", mp3, "-af", f"atrim=start={start}:end={end},asetpts=PTS-STARTPTS", "-ar", SAMPLE_RATE, "-ac", 1, wav)
    with wave.open(str(wav), "rb") as audio:
        frames = audio.readframes(audio.getnframes())
    return frames


async def main():
    if not shutil.which("ffmpeg"):
        raise SystemExit("FFmpeg must be on PATH.")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    scenarios = json.loads(SCRIPTS.read_text(encoding="utf-8"))
    manifest = {}
    # Sequential requests keep the speech service load small and predictable.
    with tempfile.TemporaryDirectory(prefix="syenxa-call-") as temporary:
        directory = Path(temporary)
        for scenario in scenarios:
            parts, cues = [], []
            cursor = 0
            for index, line in enumerate(scenario["lines"]):
                frames = await render_line(line, directory, index)
                duration = len(frames) / (SAMPLE_RATE * 2)
                cues.append({"start": round(cursor, 3), "end": round(cursor + duration, 3)})
                parts.append(frames)
                cursor += duration
                if index < len(scenario["lines"]) - 1:
                    parts.append(bytes(int(SAMPLE_RATE * GAP) * 2))
                    cursor += GAP
            combined = directory / "combined.wav"
            with wave.open(str(combined), "wb") as audio:
                audio.setnchannels(1)
                audio.setsampwidth(2)
                audio.setframerate(SAMPLE_RATE)
                audio.writeframes(b"".join(parts))
            filename = f"{scenario['id']}-v1.mp3"
            run_ffmpeg("-i", combined, "-af", "loudnorm=I=-18:TP=-2:LRA=7", "-ar", SAMPLE_RATE, "-ac", 1, "-codec:a", "libmp3lame", "-b:a", "64k", OUTPUT / filename)
            manifest[scenario["id"]] = {"src": f"/audio/calls/{filename}", "duration": round(cursor, 3), "cues": cues}
            print(f"Rendered {scenario['id']}: {cursor:.1f}s", flush=True)
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print("Saved audio and transcript timing manifest.")


if __name__ == "__main__":
    asyncio.run(main())
