const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgCompliance = `
<svg width="1600" height="1100" viewBox="0 0 1600 1100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1600" height="1100" fill="#FAF9F7"/>
  
  <!-- Subtle decorative accents -->
  <circle cx="140" cy="120" r="150" fill="#FF541F" fill-opacity="0.03" />
  <circle cx="1450" cy="850" r="240" fill="#BD4119" fill-opacity="0.03" />

  <!-- Brand Tag -->
  <rect x="80" y="60" width="220" height="36" rx="18" fill="#F4EFEA" stroke="#E2DBD1" stroke-width="1"/>
  <text x="190" y="84" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#BD4119" text-anchor="middle" letter-spacing="0.5">REGULATORY &amp; CARRIER TRUST</text>

  <!-- Title & Subtitle -->
  <text x="80" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="40" font-weight="800" fill="#292824" letter-spacing="-0.5">The 2026 Outbound Voice AI Compliance Architecture</text>
  <text x="80" y="185" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#6D665D">FCC AI Voice Rulings, TCPA Prior Consent, STIR/SHAKEN A-Attestation, and Spam-Likely Shielding</text>

  <!-- 4 COLUMNS / LAYERS -->

  <!-- LAYER 1: FCC & TCPA Legal Scope -->
  <rect x="80" y="240" width="330" height="660" rx="20" fill="#FFFFFF" stroke="#E2DBD1" stroke-width="1.5" filter="drop-shadow(0 8px 24px rgba(41,40,36,0.04))"/>
  <rect x="80" y="240" width="330" height="80" rx="20" fill="#FBF8F4"/>
  <line x1="80" y1="320" x2="410" y2="320" stroke="#E2DBD1" stroke-width="1"/>
  <circle cx="120" cy="280" r="20" fill="#BD4119"/>
  <text x="120" y="286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">1</text>
  <text x="155" y="287" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#292824">FCC &amp; TCPA Scope</text>

  <rect x="105" y="345" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="125" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">B2B Exemption Clarity</text>
  <text x="125" y="400" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Commercial B2B lines exempt</text>
  <text x="125" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">from TCPA residential DNC lists</text>

  <rect x="105" y="480" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="125" y="510" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">PEWC Consent Gate</text>
  <text x="125" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Prior Express Written Consent</text>
  <text x="125" y="555" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Mandatory for consumer cellphones</text>

  <rect x="105" y="615" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="125" y="645" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">FCC AI Voice Declaratory</text>
  <text x="125" y="670" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">AI synthetic voices regulated as</text>
  <text x="125" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">"artificial voice" under Section 227</text>

  <rect x="105" y="755" width="280" height="115" rx="12" fill="#FFF2ED" stroke="#FF541F" stroke-width="1"/>
  <text x="125" y="785" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#BD4119">Legal Safeguard:</text>
  <text x="125" y="810" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#BD4119">Zero Unsolicited B2C</text>
  <text x="125" y="835" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#6D665D">Full lead origin audit trail</text>

  <!-- ARROW 1 -> 2 -->
  <path d="M 410 570 L 450 570" stroke="#BD4119" stroke-width="3" stroke-linecap="round"/>
  <polygon points="450,565 460,570 450,575" fill="#BD4119"/>

  <!-- LAYER 2: DNC Registry & Real-Time Scrub -->
  <rect x="450" y="240" width="330" height="660" rx="20" fill="#FFFFFF" stroke="#E2DBD1" stroke-width="1.5" filter="drop-shadow(0 8px 24px rgba(41,40,36,0.04))"/>
  <rect x="450" y="240" width="330" height="80" rx="20" fill="#FBF8F4"/>
  <line x1="450" y1="320" x2="780" y2="320" stroke="#E2DBD1" stroke-width="1"/>
  <circle cx="490" cy="280" r="20" fill="#BD4119"/>
  <text x="490" y="286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">2</text>
  <text x="525" y="287" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#292824">DNC &amp; Opt-Out Engine</text>

  <rect x="475" y="345" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="495" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">National &amp; State DNC API</text>
  <text x="495" y="400" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Automated 31-day list scrubbing</text>
  <text x="495" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Blocks litigator / honeypot numbers</text>

  <rect x="475" y="480" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="495" y="510" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Internal Global Opt-Out</text>
  <text x="495" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Immediate verbal intent parsing</text>
  <text x="495" y="555" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">"Remove me" locks number forever</text>

  <rect x="475" y="615" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="495" y="645" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Calling Time Curfews</text>
  <text x="495" y="670" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">8:00 AM – 8:00 PM recipient time</text>
  <text x="495" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Strict state holiday overrides</text>

  <rect x="475" y="755" width="280" height="115" rx="12" fill="#FFF2ED" stroke="#FF541F" stroke-width="1"/>
  <text x="495" y="785" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#BD4119">Scrubbing Protocol:</text>
  <text x="495" y="810" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#BD4119">Real-Time Pre-Dial Check</text>
  <text x="495" y="835" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#6D665D">Zero calls to registered DNCs</text>

  <!-- ARROW 2 -> 3 -->
  <path d="M 780 570 L 820 570" stroke="#BD4119" stroke-width="3" stroke-linecap="round"/>
  <polygon points="820,565 830,570 820,575" fill="#BD4119"/>

  <!-- LAYER 3: Carrier Trust & STIR/SHAKEN -->
  <rect x="820" y="240" width="330" height="660" rx="20" fill="#FFFFFF" stroke="#E2DBD1" stroke-width="1.5" filter="drop-shadow(0 8px 24px rgba(41,40,36,0.04))"/>
  <rect x="820" y="240" width="330" height="80" rx="20" fill="#FBF8F4"/>
  <line x1="820" y1="320" x2="1150" y2="320" stroke="#E2DBD1" stroke-width="1"/>
  <circle cx="860" cy="280" r="20" fill="#BD4119"/>
  <text x="860" y="286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">3</text>
  <text x="895" y="287" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#292824">Carrier Trust Shield</text>

  <rect x="845" y="345" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="865" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">STIR/SHAKEN A-Attestation</text>
  <text x="865" y="400" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Cryptographic digital certificate</text>
  <text x="865" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Verifies verified caller authority</text>

  <rect x="845" y="480" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="865" y="510" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Branded Caller ID (Rich CNAM)</text>
  <text x="865" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Displays verified company name</text>
  <text x="865" y="555" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">AT&amp;T, Verizon, T-Mobile approved</text>

  <rect x="845" y="615" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="865" y="645" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Number Pool Warming</text>
  <text x="865" y="670" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Max 50-60 calls / DID / day</text>
  <text x="865" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Rotates across local area codes</text>

  <rect x="845" y="755" width="280" height="115" rx="12" fill="#FFF2ED" stroke="#FF541F" stroke-width="1"/>
  <text x="865" y="785" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#BD4119">Spam Prevention:</text>
  <text x="865" y="810" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#BD4119">&lt; 0.5% Spam-Likely Flag</text>
  <text x="865" y="835" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#6D665D">Monitored via FreeCallerRegistry</text>

  <!-- ARROW 3 -> 4 -->
  <path d="M 1150 570 L 1190 570" stroke="#BD4119" stroke-width="3" stroke-linecap="round"/>
  <polygon points="1190,565 1200,570 1190,575" fill="#BD4119"/>

  <!-- LAYER 4: Audio Disclosure & Ethical Transparency -->
  <rect x="1190" y="240" width="330" height="660" rx="20" fill="#FFFFFF" stroke="#E2DBD1" stroke-width="1.5" filter="drop-shadow(0 8px 24px rgba(41,40,36,0.04))"/>
  <rect x="1190" y="240" width="330" height="80" rx="20" fill="#FBF8F4"/>
  <line x1="1190" y1="320" x2="1520" y2="320" stroke="#E2DBD1" stroke-width="1"/>
  <circle cx="1230" cy="280" r="20" fill="#BD4119"/>
  <text x="1230" y="286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">4</text>
  <text x="1265" y="287" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#292824">Audio Transparency</text>

  <rect x="1215" y="345" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="1235" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Immediate AI Disclosure</text>
  <text x="1235" y="400" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Identifies AI persona in opener</text>
  <text x="1235" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Builds immediate trust &amp; rapport</text>

  <rect x="1215" y="480" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="1235" y="510" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Two-Party Consent Recording</text>
  <text x="1235" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Verbal recording notification</text>
  <text x="1235" y="555" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">CA, FL, PA, IL two-party states</text>

  <rect x="1215" y="615" width="280" height="115" rx="12" fill="#F7F5F0" stroke="#E9E2D8" stroke-width="1"/>
  <text x="1235" y="645" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#292824">Graceful Human Escalation</text>
  <text x="1235" y="670" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">Instant transfer if prospect asks</text>
  <text x="1235" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="#6D665D">"Can I speak with a person?"</text>

  <rect x="1215" y="755" width="280" height="115" rx="12" fill="#FFF2ED" stroke="#FF541F" stroke-width="1"/>
  <text x="1235" y="785" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#BD4119">Brand Protection:</text>
  <text x="1235" y="810" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#BD4119">100% Reputational Safety</text>
  <text x="1235" y="835" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#6D665D">Zero regulatory or fine liability</text>

  <!-- Bottom Bar Metrics -->
  <rect x="80" y="930" width="1440" height="110" rx="16" fill="#292824"/>
  <text x="110" y="972" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#FF541F" letter-spacing="1">COMPLIANCE &amp; TRUST SUMMARY</text>
  <text x="110" y="1005" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="500" fill="#FAF9F7">
    B2B Outreach Exemptions · Real-Time DNC Registry Filtering · STIR/SHAKEN A-Attestation Carrier Signature · Full TCPA Safe Harbor
  </text>
  <text x="1490" y="990" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#A89F91" text-anchor="end">SYENXA TECH COMPLIANCE (2026)</text>
</svg>
`;

async function main() {
  const outputPng = path.join(__dirname, '../public/images/blog/ai-cold-calling-compliance-pyramid.png');
  const outputWebp = path.join(__dirname, '../public/images/blog/ai-cold-calling-compliance-pyramid.webp');

  const svgBuffer = Buffer.from(svgCompliance);
  
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
