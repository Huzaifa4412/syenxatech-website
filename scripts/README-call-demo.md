# Hero media

The hero plays four static, fictional two-speaker calls. Microsoft neural voices
`en-US-AvaMultilingualNeural` (agent) and `en-US-AndrewMultilingualNeural` (caller)
replace device-dependent browser speech. Both run at +5% speed, with no pitch
alteration. The UI identifies the calls as illustrative and AI-generated.

The site needs no voice API key or Python dependency at runtime. Audio only loads
when the visitor presses play. Pausing retains the exact audio position; switching
industries stops the current call. Transcript highlighting uses the recording's
real clock and the generated cue manifest.

## Regenerate the audio

Install `edge-tts==7.2.8` in a Python environment and put FFmpeg on PATH, then run:

```powershell
python scripts/generate-call-audio.py
```

Source scripts: `src/lib/call-demo-scenarios.json`. Outputs:
`public/audio/calls/*-v1.mp3` and `src/lib/call-demo-audio.json`. The generator sends
only these fictional scripts to the voice service, trims each line with the
provider's word timestamps, inserts 240 ms between speakers, and normalizes to
-18 LUFS. Regenerate the MP3s and manifest together after changing any script.
Increment the filenames when replacing previously published media.

Voice-generation reference: <https://github.com/rany2/edge-tts>.

## Background

`public/images/voice-hero-wave-v1.webp` is a custom image produced with the built-in
image-generation tool and compressed to WebP (about 100 KB). No company logo or
product imagery was modified.

Generation prompt:

> Use case: stylized-concept. Asset type: wide website hero background, landscape
> 16:9. Create a premium studio photographed sculptural sound-wave backdrop for
> Syenxa Tech, an AI calling agent company whose brand colors are warm ivory
> #faf9f7, vivid burnt orange #ff541f and charcoal. Entire scene in a warm ivory
> architectural studio with subtle tactile matte paper grain. Composition: the
> left 45 percent is luminous quiet ivory with a few subtle soft shadows, meant
> for large dark website typography placed later. On the right and lower right,
> sweeping sculptural concentric acoustic ribbons, thin curved translucent
> orange acrylic fins and layered ivory ceramic arcs form one beautiful abstract
> voice wave, viewed obliquely, cropped large at the right edge. Orange appears as
> sunlight refracting through physical acrylic, never neon, never sci-fi. Elegant
> editorial product photography, sophisticated tangible materials, realistic
> shadows and fine texture, warm soft daylight, sculptural form occupying most of
> the right half. Restrained, expressive and visually engaging. The upper 12
> percent is light ivory for a dark website navbar. No text, letters, icons,
> logos, humans, screens, interface, render mockup, headphones, phone, dark
> backgrounds, purple, blue, floating gradient blobs, wireframes or tech grids.
> Output the full-bleed background artwork only.
