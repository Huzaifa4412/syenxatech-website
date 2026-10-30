const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgBenchmark = `
<svg width="1600" height="1100" viewBox="0 0 1600 1100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1600" height="1100" fill="#FAF9F7"/>
  
  <!-- Subtle Header Accents -->
  <circle cx="80" cy="80" r="140" fill="#FF541F" fill-opacity="0.04" />
  <circle cx="1520" cy="100" r="180" fill="#BD4119" fill-opacity="0.03" />

  <!-- Top Brand Tag & Category -->
  <rect x="80" y="60" width="180" height="36" rx="18" fill="#F4EFEA" stroke="#E2DBD1" stroke-width="1"/>
  <text x="170" y="84" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#BD4119" text-anchor="middle" letter-spacing="0.5">SYENXA TECH RESEARCH</text>

  <!-- Title & Subtitle -->
  <text x="80" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="42" font-weight="800" fill="#292824" letter-spacing="-0.5">AI Cold Calling vs. In-House SDR vs. Offshore Call Center</text>
  <text x="80" y="185" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#6D665D">2026 Outbound Sales Economics, Daily Dial Capacity, Cost Per Meeting, and Conversion Benchmarks</text>

  <!-- Table Container Card -->
  <rect x="80" y="225" width="1440" height="770" rx="24" fill="#FFFFFF" stroke="#E5DEC3" stroke-width="1.5" filter="drop-shadow(0 12px 32px rgba(41,40,36,0.04))"/>

  <!-- Table Column Headers -->
  <rect x="80" y="225" width="1440" height="85" rx="24" fill="#F7F4EF"/>
  <line x1="80" y1="310" x2="1520" y2="310" stroke="#E2DBD1" stroke-width="1.5"/>

  <!-- Column Header Texts -->
  <text x="120" y="278" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#6D665D" letter-spacing="0.5">OUTBOUND METRIC</text>
  <text x="490" y="278" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#6D665D" letter-spacing="0.5">IN-HOUSE US SDR</text>
  <text x="840" y="278" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#6D665D" letter-spacing="0.5">OFFSHORE CALL CENTER</text>
  
  <!-- Highlight Column Header for AI Cold Caller -->
  <rect x="1140" y="235" width="360" height="65" rx="14" fill="#FFF2ED" stroke="#FF541F" stroke-width="1.5"/>
  <text x="1320" y="274" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="800" fill="#BD4119" text-anchor="middle" letter-spacing="0.5">AI COLD CALLING AGENT</text>

  <!-- Row 1: Daily Dial Capacity -->
  <line x1="80" y1="420" x2="1520" y2="420" stroke="#F0EAE1" stroke-width="1"/>
  <text x="120" y="360" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#292824">Daily Outbound Dials</text>
  <text x="120" y="388" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Sustained volume per rep/bot</text>
  <text x="490" y="362" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#7A3E2D">60 to 90 Dials / Day</text>
  <text x="490" y="388" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Limited by manual fatigue</text>
  <text x="840" y="362" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#6D665D">120 to 180 Dials / Day</text>
  <text x="840" y="388" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Auto-dialer burnout</text>
  <rect x="1150" y="332" width="340" height="68" rx="12" fill="#EBF9F1" stroke="#A3E0C1" stroke-width="1"/>
  <text x="1320" y="360" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#0F7B48" text-anchor="middle">1,000 to 5,000+ Dials</text>
  <text x="1320" y="384" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#0F7B48" text-anchor="middle">Concurrent infinite parallel trunks</text>

  <!-- Row 2: Fully-Loaded Monthly Cost -->
  <line x1="80" y1="530" x2="1520" y2="530" stroke="#F0EAE1" stroke-width="1"/>
  <text x="120" y="470" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#292824">Fully-Loaded Monthly Cost</text>
  <text x="120" y="498" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Base salary, software &amp; overhead</text>
  <text x="490" y="472" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#A83218">$4,500 – $6,500 / mo</text>
  <text x="490" y="498" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Plus commission &amp; tech stack</text>
  <text x="840" y="472" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#7A3E2D">$1,400 – $2,200 / mo</text>
  <text x="840" y="498" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Agency markups &amp; churn</text>
  <rect x="1150" y="442" width="340" height="68" rx="12" fill="#EBF9F1" stroke="#A3E0C1" stroke-width="1"/>
  <text x="1320" y="470" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#0F7B48" text-anchor="middle">$180 – $450 / mo</text>
  <text x="1320" y="494" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#0F7B48" text-anchor="middle">$0.14–$0.18/min usage basis</text>

  <!-- Row 3: Cost Per Qualified Meeting -->
  <line x1="80" y1="640" x2="1520" y2="640" stroke="#F0EAE1" stroke-width="1"/>
  <text x="120" y="580" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#292824">Cost Per Qualified Meeting</text>
  <text x="120" y="608" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Effective CAC on set appointments</text>
  <text x="490" y="582" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#A83218">$220 – $380 / meeting</text>
  <text x="490" y="608" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Based on 15-20 meetings/mo</text>
  <text x="840" y="582" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#7A3E2D">$95 – $160 / meeting</text>
  <text x="840" y="608" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Lower show-up &amp; quality</text>
  <rect x="1150" y="552" width="340" height="68" rx="12" fill="#EBF9F1" stroke="#A3E0C1" stroke-width="1"/>
  <text x="1320" y="580" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#0F7B48" text-anchor="middle">$18 – $35 / meeting</text>
  <text x="1320" y="604" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#0F7B48" text-anchor="middle">91% reduction in meeting CAC</text>

  <!-- Row 4: Script Adherence & Objection Handling -->
  <line x1="80" y1="750" x2="1520" y2="750" stroke="#F0EAE1" stroke-width="1"/>
  <text x="120" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#292824">Objection Handling &amp; Drift</text>
  <text x="120" y="718" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Consistency under prospect resistance</text>
  <text x="490" y="692" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#292824">Variable (Mood-Dependent)</text>
  <text x="490" y="718" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Subject to emotional fatigue</text>
  <text x="840" y="692" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#6D665D">Script Rigid &amp; Accent Barrier</text>
  <text x="840" y="718" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Struggles with dynamic nuance</text>
  <rect x="1150" y="662" width="340" height="68" rx="12" fill="#EBF9F1" stroke="#A3E0C1" stroke-width="1"/>
  <text x="1320" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#0F7B48" text-anchor="middle">100% Brand Consistency</text>
  <text x="1320" y="714" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#0F7B48" text-anchor="middle">Infinite patience &amp; dynamic recovery</text>

  <!-- Row 5: Ramp Time & Setup -->
  <line x1="80" y1="860" x2="1520" y2="860" stroke="#F0EAE1" stroke-width="1"/>
  <text x="120" y="800" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#292824">Ramp Time to Full Output</text>
  <text x="120" y="828" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Onboarding, hiring &amp; calibration</text>
  <text x="490" y="802" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#A83218">3 to 6 Months</text>
  <text x="490" y="828" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">40% first-year rep turnover</text>
  <text x="840" y="802" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#6D665D">4 to 8 Weeks</text>
  <text x="840" y="828" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Frequent agent retraining</text>
  <rect x="1150" y="772" width="340" height="68" rx="12" fill="#EBF9F1" stroke="#A3E0C1" stroke-width="1"/>
  <text x="1320" y="800" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#0F7B48" text-anchor="middle">&lt; 48 Hours</text>
  <text x="1320" y="824" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#0F7B48" text-anchor="middle">Calibrated with prompt test suite</text>

  <!-- Row 6: TCPA & DNC Regulatory Compliance -->
  <text x="120" y="910" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#292824">TCPA &amp; DNC Compliance</text>
  <text x="120" y="938" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Regulatory scrubbing &amp; opt-out logging</text>
  <text x="490" y="912" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#292824">Manual Compliance Risks</text>
  <text x="490" y="938" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Human omission in DNC logging</text>
  <text x="840" y="912" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#A83218">High Risk of Violations</text>
  <text x="840" y="938" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#8C827A">Aggressive auto-dialer flags</text>
  <rect x="1150" y="882" width="340" height="68" rx="12" fill="#EBF9F1" stroke="#A3E0C1" stroke-width="1"/>
  <text x="1320" y="910" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#0F7B48" text-anchor="middle">100% Automated Guardrails</text>
  <text x="1320" y="934" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#0F7B48" text-anchor="middle">Deterministic DNC scrub &amp; consent logic</text>
</svg>
`;

async function main() {
  const outputPng = path.join(__dirname, '../public/images/blog/ai-cold-calling-benchmark-matrix.png');
  const outputWebp = path.join(__dirname, '../public/images/blog/ai-cold-calling-benchmark-matrix.webp');

  const svgBuffer = Buffer.from(svgBenchmark);
  
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
