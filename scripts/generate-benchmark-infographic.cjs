const fs = require('fs');
const sharp = require('sharp');

const svgBenchmark = `
<svg width="1600" height="1100" viewBox="0 0 1600 1100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1600" height="1100" fill="#FAF9F7"/>
  
  <!-- Subtle Header Accents -->
  <circle cx="80" cy="80" r="140" fill="#FF541F" fill-opacity="0.04" />
  <circle cx="1520" cy="100" r="180" fill="#BD4119" fill-opacity="0.03" />

  <!-- Top Brand Tag & Category -->
  <rect x="80" y="60" width="160" height="36" rx="18" fill="#F4EFEA" stroke="#E2DBD1" stroke-width="1"/>
  <text x="160" y="84" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#BD4119" text-anchor="middle" letter-spacing="0.5">SYENXA TECH RESEARCH</text>

  <!-- Title & Subtitle -->
  <text x="80" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="42" font-weight="800" fill="#292824" letter-spacing="-0.5">AI Appointment Setter vs. Human SDR &amp; Static Forms</text>
  <text x="80" y="185" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#6D665D">2026 Architectural Performance, Latency, Conversion Rates, and Operating Cost Benchmarks</text>

  <!-- Table Container Card -->
  <rect x="80" y="225" width="1440" height="770" rx="24" fill="#FFFFFF" stroke="#E5DEC3" stroke-width="1.5" filter="drop-shadow(0 12px 32px rgba(41,40,36,0.04))"/>

  <!-- Table Column Headers -->
  <rect x="80" y="225" width="1440" height="85" rx="24" fill="#F7F4EF"/>
  <line x1="80" y1="310" x2="1520" y2="310" stroke="#E2DBD1" stroke-width="1.5"/>

  <!-- Column Header Texts -->
  <text x="120" y="278" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#6D665D" letter-spacing="0.5">PERFORMANCE METRIC</text>
  <text x="490" y="278" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#6D665D" letter-spacing="0.5">HUMAN SDR / CALL CENTER</text>
  <text x="840" y="278" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#6D665D" letter-spacing="0.5">STATIC WEB FORMS (CALENDLY)</text>
  
  <!-- Highlight Column Header for AI Appointment Setter -->
  <rect x="1140" y="235" width="360" height="65" rx="14" fill="#FFF2ED" stroke="#FF541F" stroke-width="1.5"/>
  <text x="1320" y="274" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="800" fill="#BD4119" text-anchor="middle" letter-spacing="0.5">AI VOICE APPOINTMENT SETTER</text>

  <!-- Row 1: Speed to Lead -->
  <line x1="80" y1="420" x2="1520" y2="420" stroke="#F0EAE1" stroke-width="1"/>
  <text x="120" y="360" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#292824">Speed to Lead (Response Time)</text>
  <text x="120" y="388" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Inbound &amp; outbound initial contact</text>
  <text x="490" y="362" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#7A3E2D">42 to 180 Minutes</text>
  <text x="490" y="388" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Significant lead decay</text>
  <text x="840" y="362" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#6D665D">Passive Self-Service</text>
  <text x="840" y="388" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Requires 100% user initiative</text>
  <rect x="1150" y="332" width="340" height="68" rx="12" fill="#EBF9F1" stroke="#A3E0C1" stroke-width="1"/>
  <text x="1320" y="360" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#0F7B48" text-anchor="middle">&lt; 30 Seconds</text>
  <text x="1320" y="384" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#0F7B48" text-anchor="middle">391% higher qualification rate</text>

  <!-- Row 2: Booking & Qualification Rate -->
  <line x1="80" y1="530" x2="1520" y2="530" stroke="#F0EAE1" stroke-width="1"/>
  <text x="120" y="470" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#292824">Booking &amp; Qualification Rate</text>
  <text x="120" y="498" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">% of inquiries turned into meetings</text>
  <text x="490" y="472" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#292824">18% – 26%</text>
  <text x="490" y="498" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Constrained by rep availability</text>
  <text x="840" y="472" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#6D665D">2% – 5%</text>
  <text x="840" y="498" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">High form drop-off</text>
  <rect x="1150" y="442" width="340" height="68" rx="12" fill="#EBF9F1" stroke="#A3E0C1" stroke-width="1"/>
  <text x="1320" y="470" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#0F7B48" text-anchor="middle">54% – 72%</text>
  <text x="1320" y="494" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#0F7B48" text-anchor="middle">Real-time voice qualification</text>

  <!-- Row 3: Monthly Operational Cost -->
  <line x1="80" y1="640" x2="1520" y2="640" stroke="#F0EAE1" stroke-width="1"/>
  <text x="120" y="580" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#292824">Monthly Operational Cost</text>
  <text x="120" y="608" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Salaries, tools, overhead &amp; usage</text>
  <text x="490" y="582" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#A83218">$3,500 – $4,500 / mo</text>
  <text x="490" y="608" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Plus commission &amp; high churn</text>
  <text x="840" y="582" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#6D665D">$15 – $40 / mo</text>
  <text x="840" y="608" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Inexpensive but high friction</text>
  <rect x="1150" y="552" width="340" height="68" rx="12" fill="#EBF9F1" stroke="#A3E0C1" stroke-width="1"/>
  <text x="1320" y="580" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#0F7B48" text-anchor="middle">$150 – $450 / mo</text>
  <text x="1320" y="604" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#0F7B48" text-anchor="middle">$0.12–$0.20/min usage rate</text>

  <!-- Row 4: Concurrency & Availability -->
  <line x1="80" y1="750" x2="1520" y2="750" stroke="#F0EAE1" stroke-width="1"/>
  <text x="120" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#292824">Availability &amp; Concurrency</text>
  <text x="120" y="718" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Handling call surges &amp; after-hours</text>
  <text x="490" y="692" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#292824">40 Hrs/Wk (1 Call at a Time)</text>
  <text x="490" y="718" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Callers placed on hold / voicemail</text>
  <text x="840" y="692" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#6D665D">24/7/365 (Async Only)</text>
  <text x="840" y="718" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">No verbal reassurance</text>
  <rect x="1150" y="662" width="340" height="68" rx="12" fill="#EBF9F1" stroke="#A3E0C1" stroke-width="1"/>
  <text x="1320" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#0F7B48" text-anchor="middle">24/7/365 Unlimited</text>
  <text x="1320" y="714" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#0F7B48" text-anchor="middle">Zero hold times, infinite lines</text>

  <!-- Row 5: No-Show Reduction Rate -->
  <line x1="80" y1="860" x2="1520" y2="860" stroke="#F0EAE1" stroke-width="1"/>
  <text x="120" y="800" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#292824">Meeting No-Show Rate</text>
  <text x="120" y="828" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Confirmed attendance at call</text>
  <text x="490" y="802" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#A83218">22% – 32% No-Show</text>
  <text x="490" y="828" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Manual follow-up delays</text>
  <text x="840" y="802" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#6D665D">28% – 38% No-Show</text>
  <text x="840" y="828" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Generic email reminders</text>
  <rect x="1150" y="772" width="340" height="68" rx="12" fill="#EBF9F1" stroke="#A3E0C1" stroke-width="1"/>
  <text x="1320" y="800" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#0F7B48" text-anchor="middle">6% – 9% No-Show</text>
  <text x="1320" y="824" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#0F7B48" text-anchor="middle">Automated 2-way SMS/voice loop</text>

  <!-- Row 6: CRM & Live Calendar Synchronization -->
  <text x="120" y="910" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#292824">Two-Way CRM &amp; Calendar Sync</text>
  <text x="120" y="938" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">HubSpot, GHL, Cal.com, G-Calendar</text>
  <text x="490" y="912" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#292824">Manual Data Entry</text>
  <text x="490" y="938" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Typo risk &amp; missed CRM fields</text>
  <text x="840" y="912" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#6D665D">Standard Webhooks</text>
  <text x="840" y="938" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Basic booking metadata only</text>
  <rect x="1150" y="882" width="340" height="68" rx="12" fill="#EBF9F1" stroke="#A3E0C1" stroke-width="1"/>
  <text x="1320" y="910" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#0F7B48" text-anchor="middle">Instant 2-Way API Sync</text>
  <text x="1320" y="934" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#0F7B48" text-anchor="middle">Audio, transcript &amp; CRM tags</text>

  <!-- Footer note -->
  <text x="80" y="1040" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="500" fill="#8C827A">Source: Syenxa Tech Voice AI Field Deployments &amp; Industry Speed-to-Lead Datasets (2026). Published under CC BY-ND 4.0.</text>
  <text x="1520" y="1040" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#BD4119" text-anchor="end">www.syenxatech.com</text>
</svg>
`;

async function run() {
  const pngPath = 'public/images/blog/ai-appointment-setter-benchmark-matrix.png';
  const webpPath = 'public/images/blog/ai-appointment-setter-benchmark-matrix.webp';
  
  await sharp(Buffer.from(svgBenchmark))
    .png({ quality: 95 })
    .toFile(pngPath);
    
  await sharp(Buffer.from(svgBenchmark))
    .webp({ quality: 90 })
    .toFile(webpPath);
    
  console.log('Infographic benchmark matrix generated successfully');
}

run().catch(console.error);
