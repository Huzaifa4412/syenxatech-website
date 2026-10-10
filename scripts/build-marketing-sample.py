"""Build the public example action plan and its actual page-preview image."""
from pathlib import Path

import fitz
from PIL import Image
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
FINAL = ROOT / "public/downloads/syenxa-sample-marketing-action-plan.pdf"
PREVIEW = ROOT / "public/images/marketing/sample-action-plan-preview.webp"
CHECKS = ROOT / ".next-build/marketing-pdf"
for directory in (FINAL.parent, PREVIEW.parent, CHECKS):
    directory.mkdir(parents=True, exist_ok=True)
pdfmetrics.registerFont(TTFont("Body", "C:/Windows/Fonts/segoeui.ttf"))
pdfmetrics.registerFont(TTFont("Medium", "C:/Windows/Fonts/seguisb.ttf"))
W, H = 595.276, 841.89
INK, MUTED, ORANGE = "#292824", "#726555", "#ac431f"
c = canvas.Canvas(str(FINAL), pagesize=(W, H))
c.setTitle("Syenxa Tech - Sample marketing action plan")
c.setAuthor("Syenxa Tech")


def text(value, x, top, width, size=10, color=MUTED, font="Body", leading=None):
    style = ParagraphStyle("body", fontName=font, fontSize=size,
                           leading=leading or size * 1.5, textColor=HexColor(color),
                           alignment=TA_LEFT)
    p = Paragraph(value, style)
    _, height = p.wrap(width, H)
    p.drawOn(c, x, H - top - height)
    return top + height


def rect(x, top, width, height, color):
    c.setFillColor(HexColor(color))
    c.rect(x, H - top - height, width, height, stroke=0, fill=1)


def line(top, x=42, width=W - 84, color="#d8ccba"):
    c.setStrokeColor(HexColor(color))
    c.setLineWidth(0.6)
    c.line(x, H - top, x + width, H - top)


def base(page, section):
    rect(0, 0, W, H, "#faf9f7")
    text("SYENXA TECH", 42, 31, 220, 12, INK, "Medium")
    text("EXAMPLE ENGAGEMENT / " + section, 292, 35, 260, 8, ORANGE)
    line(63)
    line(789)
    text("syenxatech.com  /  Digital marketing &amp; SEO", 42, 800, 420, 8)
    text(f"0{page} / 02", 494, 800, 62, 8, ORANGE)


base(1, "ACTION PLAN")
text("A practical start.<br/>A visible next step.", 42, 93, 505, 35, INK, "Medium", 40)
text("Sample marketing<br/>action plan", 42, 196, 505, 19, ORANGE, "Medium", 26)
text("A service business wants more suitable enquiries from its website. This example shows how discovery becomes priorities, deliverables and a review plan. It is not a client audit or a record of completed results.", 42, 269, 505, 10.5)
rect(42, 348, 511, 62, "#eee5d8")
text("THE OBJECTIVE", 58, 360, 145, 8, ORANGE, "Medium")
text("Make important services easier to find, understand and enquire about.", 200, 360, 332, 11, INK, "Medium")
text("Start with three useful checks.", 42, 437, 511, 21, INK, "Medium")
rows = [
    ("01", "Can the pages be discovered?", "Review crawlability, indexing, internal links and the structure of the important service pages.", "A technical action list with a reason for each priority."),
    ("02", "Does the page answer the need?", "Compare the offer and page content with customer questions. Check titles, clear answers and the next step.", "A keyword-to-page map and one focused content brief."),
    ("03", "Does an enquiry reach the team?", "Check the enquiry route, mobile experience, handoff and the tracking already available.", "A journey checklist and an agreed measurement baseline."),
]
for i, (number, title, check, output) in enumerate(rows):
    top = 479 + i * 93
    line(top)
    text(number, 42, top + 12, 35, 17, ORANGE, "Medium")
    text(title, 89, top + 11, 448, 12, INK, "Medium")
    text(check, 89, top + 33, 448, 9)
    text("<b>Output:</b> " + output, 89, top + 64, 448, 8, ORANGE)
c.showPage()

base(2, "ROADMAP")
text("Turn the priorities<br/>into a working plan.", 42, 93, 505, 32, INK, "Medium", 39)
text("Illustrative 90-day sequence. Timing and deliverables depend on the audit, available access and agreed scope.", 42, 184, 505, 10)
for i, (period, heading, body, owner, review) in enumerate([
    ("DAYS 01-30", "Agree the foundation", "Confirm the business offer and priority pages. Review technical access, important page issues and the enquiry journey. Set the initial measurement baseline.", "Syenxa prepares the findings; your team confirms goals and scope.", "Prioritized audit, agreed page map and baseline."),
    ("DAYS 31-60", "Create and connect", "Improve the agreed pages and prepare useful supporting content. Make enquiry actions clear, then check the mobile experience and available tracking.", "Syenxa prepares the work; your team reviews business details.", "Approved pages or assets and a checked enquiry route."),
    ("DAYS 61-90", "Review and refine", "Review the agreed reporting period alongside lead feedback. Investigate changes, update the priority list and choose the next improvements or experiments.", "Syenxa brings the reporting context; your team shares lead quality.", "A review summary and the next action list."),
]):
    top = 243 + i * 137
    rect(42, top, 511, 124, "#f0e9de" if i != 1 else "#eee2d1")
    text(period, 58, top + 13, 107, 8, ORANGE, "Medium")
    text(heading, 176, top + 11, 354, 15, INK, "Medium")
    text(body, 176, top + 36, 354, 9)
    text("<b>Owners:</b> " + owner, 176, top + 83, 354, 7.8)
    text("<b>Review:</b> " + review, 176, top + 105, 354, 7.8, ORANGE)
text("What the review connects", 42, 676, 511, 17, INK, "Medium")
text("Search Console: search activity. GA4: website activity. Lead records: suitability and outcomes. SEMrush adds keyword and market context; its traffic figures are estimates.", 42, 706, 511, 9)
text("Service fees, ad spend and deliverables are agreed separately. Rankings and AI citations are not guaranteed. This document illustrates a process, not projected performance.", 42, 750, 511, 8, ORANGE)
c.save()

doc = fitz.open(FINAL)
assert len(doc) == 2
for i, page in enumerate(doc):
    extracted = page.get_text()
    assert "SYENXA TECH" in extracted and "EXAMPLE ENGAGEMENT" in extracted
    for block in page.get_text("dict")["blocks"]:
        if block["type"] == 0:
            x0, y0, x1, y1 = block["bbox"]
            assert x0 >= 30 and y0 >= 20 and x1 <= W - 30 and y1 <= H - 15, block
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    pix.save(str(CHECKS / f"page-{i + 1}.png"))
Image.open(CHECKS / "page-1.png").save(PREVIEW, "WEBP", quality=88)
print(f"Verified {len(doc)} pages; text bounds pass. PDF: {FINAL}")
print(f"Cover preview: {Image.open(PREVIEW).size}")
