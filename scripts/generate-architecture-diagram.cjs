const fs = require('fs');
const sharp = require('sharp');

const svgArch = `
<svg width="1600" height="1100" viewBox="0 0 1600 1100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1600" height="1100" fill="#FAF9F7"/>
  
  <!-- Subtle decorative background blobs -->
  <circle cx="200" cy="150" r="180" fill="#FF541F" fill-opacity="0.03" />
  <circle cx="1400" cy="800" r="220" fill="#BD4119" fill-opacity="0.03" />

  <!-- Brand Tag -->
  <rect x="80" y="60" width="180" height="36" rx="18" fill="#F4EFEA" stroke="#E2DBD1" stroke-width="1"/>
  <text x="170" y="84" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#BD4119" text-anchor="middle" letter-spacing="0.5">TECHNICAL BLUEPRINT</text>

  <!-- Title & Subtitle -->
  <text x="80" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="40" font-weight="800" fill="#292824" letter-spacing="-0.5">The Real-Time AI Appointment Setter Architecture</text>
  <text x="80" y="185" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#6D665D">Sub-450ms Voice Streaming Pipeline, Function Calling, and Two-Way Calendar Integration</text>

  <!-- Step Cards 1 to 4 in Flow -->
  
  <!-- CARD 1: Trigger & Ingestion -->
  <rect x="80" y="240" width="330" height="640" rx="20" fill="#FFFFFF" stroke="#E2DBD1" stroke-width="1.5" filter="drop-shadow(0 8px 24px rgba(41,40,36,0.04))"/>
  <rect x="80" y="240" width="330" height="80" rx="20" fill="#FBF8F4"/>
  <line x1="80" y1="320" x2="410" y2="320" stroke="#E2DBD1" stroke-width="1"/>
  <circle cx="120" cy="280" r="20" fill="#BD4119"/>
  <text x="120" y="286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">1</text>
  <text x="155" y="287" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#292824">Trigger &amp; Ingestion</text>

  <!-- Content 1 -->
  <rect x="105" y="345" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="125" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Inbound Phone Call</text>
  <text x="125" y="400" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Customer calls business direct</text>
  <text x="125" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Answered on 1st ring (0s hold)</text>

  <rect x="105" y="480" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="125" y="510" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Instant Outbound Trigger</text>
  <text x="125" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Meta/Google ad lead submission</text>
  <text x="125" y="555" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Outbound call fired in &lt; 20 sec</text>

  <rect x="105" y="615" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="125" y="645" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Telephony Layer</text>
  <text x="125" y="670" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Twilio / Telnyx SIP Trunking</text>
  <text x="125" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Bi-directional WebSockets</text>

  <rect x="105" y="755" width="280" height="95" rx="12" fill="#FFF2ED" stroke="#FF541F" stroke-width="1"/>
  <text x="125" y="785" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#BD4119">Latency Budget:</text>
  <text x="125" y="810" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#BD4119">~30ms Transport</text>

  <!-- ARROW 1 -> 2 -->
  <path d="M 410 560 L 450 560" stroke="#BD4119" stroke-width="3" stroke-linecap="round"/>
  <polygon points="450,555 460,560 450,565" fill="#BD4119"/>

  <!-- CARD 2: Streaming Conversational Engine -->
  <rect x="450" y="240" width="330" height="640" rx="20" fill="#FFFFFF" stroke="#E2DBD1" stroke-width="1.5" filter="drop-shadow(0 8px 24px rgba(41,40,36,0.04))"/>
  <rect x="450" y="240" width="330" height="80" rx="20" fill="#FBF8F4"/>
  <line x1="450" y1="320" x2="780" y2="320" stroke="#E2DBD1" stroke-width="1"/>
  <circle cx="490" cy="280" r="20" fill="#BD4119"/>
  <text x="490" y="286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">2</text>
  <text x="525" y="287" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#292824">Conversational Core</text>

  <!-- Content 2 -->
  <rect x="475" y="345" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="495" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Streaming ASR</text>
  <text x="495" y="400" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Deepgram Nova-2 / Whisper</text>
  <text x="495" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Continuous audio transcription</text>

  <rect x="475" y="480" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="495" y="510" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Reasoning &amp; Qualification</text>
  <text x="495" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Claude 3.5 / GPT-4o-mini / Llama 3</text>
  <text x="495" y="555" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Handles objections &amp; context</text>

  <rect x="475" y="615" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="495" y="645" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Ultra-Fast Neural TTS</text>
  <text x="495" y="670" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">ElevenLabs / Cartesia Sonic</text>
  <text x="495" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Sub-100ms Barge-In (VAD)</text>

  <rect x="475" y="755" width="280" height="95" rx="12" fill="#FFF2ED" stroke="#FF541F" stroke-width="1"/>
  <text x="495" y="785" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#BD4119">Total Processing Latency:</text>
  <text x="495" y="810" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#BD4119">380ms – 480ms Total</text>

  <!-- ARROW 2 -> 3 -->
  <path d="M 780 560 L 820 560" stroke="#BD4119" stroke-width="3" stroke-linecap="round"/>
  <polygon points="820,555 830,560 820,565" fill="#BD4119"/>

  <!-- CARD 3: Dynamic Function Calling & Booking -->
  <rect x="820" y="240" width="330" height="640" rx="20" fill="#FFFFFF" stroke="#E2DBD1" stroke-width="1.5" filter="drop-shadow(0 8px 24px rgba(41,40,36,0.04))"/>
  <rect x="820" y="240" width="330" height="80" rx="20" fill="#FBF8F4"/>
  <line x1="820" y1="320" x2="1150" y2="320" stroke="#E2DBD1" stroke-width="1"/>
  <circle cx="860" cy="280" r="20" fill="#BD4119"/>
  <text x="860" y="286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">3</text>
  <text x="895" y="287" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#292824">Booking Engine</text>

  <!-- Content 3 -->
  <rect x="845" y="345" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="865" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Check Availability</text>
  <text x="865" y="400" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Function call check_slots()</text>
  <text x="865" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Queries live Google / Cal.com</text>

  <rect x="845" y="480" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="865" y="510" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Timezone Negotiation</text>
  <text x="865" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Detects caller location</text>
  <text x="865" y="555" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Translates EST/PST naturally</text>

  <rect x="845" y="615" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="865" y="645" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Reserve &amp; Lock Slot</text>
  <text x="865" y="670" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Function call book_appointment()</text>
  <text x="865" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Prevents race conditions</text>

  <rect x="845" y="755" width="280" height="95" rx="12" fill="#FFF2ED" stroke="#FF541F" stroke-width="1"/>
  <text x="865" y="785" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#BD4119">Tool Execution Time:</text>
  <text x="865" y="810" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#BD4119">&lt; 250ms API Roundtrip</text>

  <!-- ARROW 3 -> 4 -->
  <path d="M 1150 560 L 1190 560" stroke="#BD4119" stroke-width="3" stroke-linecap="round"/>
  <polygon points="1190,555 1200,560 1190,565" fill="#BD4119"/>

  <!-- CARD 4: CRM Sync & Retention Loop -->
  <rect x="1190" y="240" width="330" height="640" rx="20" fill="#FFFFFF" stroke="#E2DBD1" stroke-width="1.5" filter="drop-shadow(0 8px 24px rgba(41,40,36,0.04))"/>
  <rect x="1190" y="240" width="330" height="80" rx="20" fill="#FBF8F4"/>
  <line x1="1190" y1="320" x2="1520" y2="320" stroke="#E2DBD1" stroke-width="1"/>
  <circle cx="1230" cy="280" r="20" fill="#BD4119"/>
  <text x="1230" y="286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">4</text>
  <text x="1265" y="287" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#292824">CRM &amp; Retention</text>

  <!-- Content 4 -->
  <rect x="1215" y="345" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="1235" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">CRM Enrichment</text>
  <text x="1235" y="400" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">HubSpot / GHL / Salesforce</text>
  <text x="1235" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Attaches call audio + transcript</text>

  <rect x="1215" y="480" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="1235" y="510" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Instant SMS Confirmation</text>
  <text x="1235" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Sends invite link &amp; calendar ICS</text>
  <text x="1235" y="555" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Within 5 seconds of call end</text>

  <rect x="1215" y="615" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="1235" y="645" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">No-Show Prevention</text>
  <text x="1235" y="670" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">24h &amp; 1h 2-way SMS check-in</text>
  <text x="1235" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">One-click reschedule trigger</text>

  <rect x="1215" y="755" width="280" height="95" rx="12" fill="#EBF9F1" stroke="#A3E0C1" stroke-width="1"/>
  <text x="1235" y="785" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#0F7B48">Attendance Rate Outcome:</text>
  <text x="1235" y="810" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#0F7B48">91% – 94% Show-Up Rate</text>

  <!-- Bottom Key Metrics Summary Strip -->
  <rect x="80" y="910" width="1440" height="110" rx="18" fill="#FFFFFF" stroke="#E2DBD1" stroke-width="1.5"/>
  
  <text x="120" y="955" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#6D665D" letter-spacing="0.5">AVERAGE CALL DURATION</text>
  <text x="120" y="990" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="800" fill="#292824">2 Min 14 Sec</text>

  <line x1="380" y1="925" x2="380" y2="1005" stroke="#EAE4DA" stroke-width="1.5"/>

  <text x="420" y="955" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#6D665D" letter-spacing="0.5">SPEED TO LEAD OUTBOUND</text>
  <text x="420" y="990" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="800" fill="#BD4119">&lt; 18 Seconds</text>

  <line x1="680" y1="925" x2="680" y2="1005" stroke="#EAE4DA" stroke-width="1.5"/>

  <text x="720" y="955" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#6D665D" letter-spacing="0.5">QUALIFICATION ACCURACY</text>
  <text x="720" y="990" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="800" fill="#292824">98.4% Match</text>

  <line x1="980" y1="925" x2="980" y2="1005" stroke="#EAE4DA" stroke-width="1.5"/>

  <text x="1020" y="955" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#6D665D" letter-spacing="0.5">COST PER BOOKED CALL</text>
  <text x="1020" y="990" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="800" fill="#0F7B48">$0.34 – $0.45</text>

  <line x1="1280" y1="925" x2="1280" y2="1005" stroke="#EAE4DA" stroke-width="1.5"/>

  <text x="1320" y="955" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#6D665D" letter-spacing="0.5">TCPA &amp; COMPLIANCE</text>
  <text x="1320" y="990" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="800" fill="#292824">100% Compliant</text>

  <!-- Footer note -->
  <text x="80" y="1055" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#8C827A">Syenxa Tech Production Voice Architecture Standard (2026). Published under CC BY-ND 4.0.</text>
  <text x="1520" y="1055" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#BD4119" text-anchor="end">www.syenxatech.com</text>
</svg>
`;

async function run() {
  const pngPath = 'public/images/blog/ai-appointment-setter-architecture-diagram.png';
  const webpPath = 'public/images/blog/ai-appointment-setter-architecture-diagram.webp';
  
  await sharp(Buffer.from(svgArch))
    .png({ quality: 95 })
    .toFile(pngPath);
    
  await sharp(Buffer.from(svgArch))
    .webp({ quality: 90 })
    .toFile(webpPath);
    
  console.log('Architecture diagram generated successfully');
}

run().catch(console.error);
