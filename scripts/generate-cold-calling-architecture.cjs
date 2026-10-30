const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgArch = `
<svg width="1600" height="1100" viewBox="0 0 1600 1100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1600" height="1100" fill="#FAF9F7"/>
  
  <!-- Subtle decorative accents -->
  <circle cx="180" cy="140" r="160" fill="#FF541F" fill-opacity="0.03" />
  <circle cx="1420" cy="850" r="220" fill="#BD4119" fill-opacity="0.03" />

  <!-- Brand Tag -->
  <rect x="80" y="60" width="190" height="36" rx="18" fill="#F4EFEA" stroke="#E2DBD1" stroke-width="1"/>
  <text x="175" y="84" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#BD4119" text-anchor="middle" letter-spacing="0.5">TECHNICAL BLUEPRINT</text>

  <!-- Title & Subtitle -->
  <text x="80" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="40" font-weight="800" fill="#292824" letter-spacing="-0.5">The Real-Time AI Cold Calling Pipeline (2026)</text>
  <text x="80" y="185" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#6D665D">Sub-450ms Speech Streaming, Live Objection Engine, AMD Filtering, and Warm Closer Transfer</text>

  <!-- CARD 1: Telephony & AMD -->
  <rect x="80" y="240" width="330" height="660" rx="20" fill="#FFFFFF" stroke="#E2DBD1" stroke-width="1.5" filter="drop-shadow(0 8px 24px rgba(41,40,36,0.04))"/>
  <rect x="80" y="240" width="330" height="80" rx="20" fill="#FBF8F4"/>
  <line x1="80" y1="320" x2="410" y2="320" stroke="#E2DBD1" stroke-width="1"/>
  <circle cx="120" cy="280" r="20" fill="#BD4119"/>
  <text x="120" y="286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">1</text>
  <text x="155" y="287" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#292824">Carrier &amp; Dialing</text>

  <rect x="105" y="345" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="125" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">SIP Trunk &amp; Attestation</text>
  <text x="125" y="400" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Twilio / Telnyx SIP trunks</text>
  <text x="125" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">STIR/SHAKEN A-Attestation</text>

  <rect x="105" y="480" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="125" y="510" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Answering Machine Detect</text>
  <text x="125" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Neural AMD analyzes beep</text>
  <text x="125" y="555" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Drops voicemail / leaves audio</text>

  <rect x="105" y="615" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="125" y="645" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">DID Pool &amp; Rotation</text>
  <text x="125" y="670" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Local presence area code matching</text>
  <text x="125" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Max 50-60 dials/day per number</text>

  <rect x="105" y="755" width="280" height="115" rx="12" fill="#FFF2ED" stroke="#FF541F" stroke-width="1"/>
  <text x="125" y="785" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#BD4119">Answer Detection Speed:</text>
  <text x="125" y="810" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#BD4119">&lt; 750ms Human Pickup</text>
  <text x="125" y="835" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#6D665D">Immediate speech stream open</text>

  <!-- ARROW 1 -> 2 -->
  <path d="M 410 570 L 450 570" stroke="#BD4119" stroke-width="3" stroke-linecap="round"/>
  <polygon points="450,565 460,570 450,575" fill="#BD4119"/>

  <!-- CARD 2: Streaming Audio & LLM Core -->
  <rect x="450" y="240" width="330" height="660" rx="20" fill="#FFFFFF" stroke="#E2DBD1" stroke-width="1.5" filter="drop-shadow(0 8px 24px rgba(41,40,36,0.04))"/>
  <rect x="450" y="240" width="330" height="80" rx="20" fill="#FBF8F4"/>
  <line x1="450" y1="320" x2="780" y2="320" stroke="#E2DBD1" stroke-width="1"/>
  <circle cx="490" cy="280" r="20" fill="#BD4119"/>
  <text x="490" y="286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">2</text>
  <text x="525" y="287" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#292824">Conversational Core</text>

  <rect x="475" y="345" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="495" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Streaming ASR</text>
  <text x="495" y="400" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Deepgram Nova-2 WebSockets</text>
  <text x="495" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Real-time word timestamps (80ms)</text>

  <rect x="475" y="480" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="495" y="510" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Ultra-Fast LLM Reasoning</text>
  <text x="495" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Groq Llama 3.3 / Claude 3.5 Sonnet</text>
  <text x="495" y="555" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">TTFT &lt; 140ms first-chunk streaming</text>

  <rect x="475" y="615" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="495" y="645" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Neural Voice &amp; VAD</text>
  <text x="495" y="670" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Cartesia Sonic / ElevenLabs Turbo</text>
  <text x="495" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Instant zero-latency barge-in cut</text>

  <rect x="475" y="755" width="280" height="115" rx="12" fill="#FFF2ED" stroke="#FF541F" stroke-width="1"/>
  <text x="495" y="785" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#BD4119">Full Round-Trip Latency:</text>
  <text x="495" y="810" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#BD4119">390ms – 460ms End-to-End</text>
  <text x="495" y="835" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#6D665D">Indistinguishable from human pace</text>

  <!-- ARROW 2 -> 3 -->
  <path d="M 780 570 L 820 570" stroke="#BD4119" stroke-width="3" stroke-linecap="round"/>
  <polygon points="820,565 830,570 820,575" fill="#BD4119"/>

  <!-- CARD 3: Objection Engine -->
  <rect x="820" y="240" width="330" height="660" rx="20" fill="#FFFFFF" stroke="#E2DBD1" stroke-width="1.5" filter="drop-shadow(0 8px 24px rgba(41,40,36,0.04))"/>
  <rect x="820" y="240" width="330" height="80" rx="20" fill="#FBF8F4"/>
  <line x1="820" y1="320" x2="1150" y2="320" stroke="#E2DBD1" stroke-width="1"/>
  <circle cx="860" cy="280" r="20" fill="#BD4119"/>
  <text x="860" y="286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">3</text>
  <text x="895" y="287" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#292824">Objection Engine</text>

  <rect x="845" y="345" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="865" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Pattern Interrupt Opener</text>
  <text x="865" y="400" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Permission-based upfront consent</text>
  <text x="865" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">"Did I catch you at a bad time?"</text>

  <rect x="845" y="480" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="865" y="510" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Live Objection Matrix</text>
  <text x="865" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Handles "Send email", "Not interested"</text>
  <text x="865" y="555" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Empathy validate + pivot question</text>

  <rect x="845" y="615" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="865" y="645" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Qualification Rules</text>
  <text x="865" y="670" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">BANT &amp; MEDDIC criteria check</text>
  <text x="865" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Disqualifies bad fits with courtesy</text>

  <rect x="845" y="755" width="280" height="115" rx="12" fill="#FFF2ED" stroke="#FF541F" stroke-width="1"/>
  <text x="865" y="785" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#BD4119">Conversion Efficacy:</text>
  <text x="865" y="810" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#BD4119">34% Objection Reversal</text>
  <text x="865" y="835" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#6D665D">Higher than offshore averages</text>

  <!-- ARROW 3 -> 4 -->
  <path d="M 1150 570 L 1190 570" stroke="#BD4119" stroke-width="3" stroke-linecap="round"/>
  <polygon points="1190,565 1200,570 1190,575" fill="#BD4119"/>

  <!-- CARD 4: Actions & Handoff -->
  <rect x="1190" y="240" width="330" height="660" rx="20" fill="#FFFFFF" stroke="#E2DBD1" stroke-width="1.5" filter="drop-shadow(0 8px 24px rgba(41,40,36,0.04))"/>
  <rect x="1190" y="240" width="330" height="80" rx="20" fill="#FBF8F4"/>
  <line x1="1190" y1="320" x2="1520" y2="320" stroke="#E2DBD1" stroke-width="1"/>
  <circle cx="1230" cy="280" r="20" fill="#BD4119"/>
  <text x="1230" y="286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">4</text>
  <text x="1265" y="287" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#292824">Booking &amp; Closer</text>

  <rect x="1215" y="345" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="1235" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Live Calendar Booking</text>
  <text x="1235" y="400" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Locks slot in Google / Cal.com</text>
  <text x="1235" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Fires instant calendar invite + SMS</text>

  <rect x="1215" y="480" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="1235" y="510" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Live Warm Closer Transfer</text>
  <text x="1235" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">SIP REFER connects to senior rep</text>
  <text x="1235" y="555" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Whisper brief read to agent first</text>

  <rect x="1215" y="615" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="1235" y="645" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">CRM Enrichment &amp; Sync</text>
  <text x="1235" y="670" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Full transcript &amp; recording saved</text>
  <text x="1235" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">HubSpot, Salesforce, GHL updated</text>

  <rect x="1215" y="755" width="280" height="115" rx="12" fill="#FFF2ED" stroke="#FF541F" stroke-width="1"/>
  <text x="1235" y="785" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#BD4119">Downstream Result:</text>
  <text x="1235" y="810" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#BD4119">Zero Lead Decay</text>
  <text x="1235" y="835" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#6D665D">100% data fidelity &amp; compliance</text>

  <!-- Bottom Bar Metrics -->
  <rect x="80" y="930" width="1440" height="110" rx="16" fill="#292824"/>
  <text x="110" y="972" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#FF541F" letter-spacing="1">ARCHITECTURAL BENCHMARK HIGHLIGHTS</text>
  <text x="110" y="1005" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="500" fill="#FAF9F7">
    Round-trip voice latency &lt; 450ms · 99.8% STIR/SHAKEN A-Attestation pass rate · Zero human dialing fatigue · 10x lower cost per qualified meeting
  </text>
  <text x="1490" y="990" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#A89F91" text-anchor="end">SYENXA TECH ENGINEERING (2026)</text>
</svg>
`;

async function main() {
  const outputPng = path.join(__dirname, '../public/images/blog/ai-cold-calling-architecture-diagram.png');
  const outputWebp = path.join(__dirname, '../public/images/blog/ai-cold-calling-architecture-diagram.webp');

  const svgBuffer = Buffer.from(svgArch);
  
  await sharp(svgBuffer)
    .png({ quality: 100 })
    .toFile(outputPng);
  console.log('Saved PNG:', outputPng);

  await sharp(svgBuffer)
    .webp({ quality: 90 })
    .toFile(outputWebp);
  console.log('Saved WebP:', outputWebp);
}

main().catch(console.error);
