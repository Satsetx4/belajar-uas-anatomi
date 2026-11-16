import io
import json
import os
from pathlib import Path
import pymupdf as fitz
from PIL import Image
from pptx import Presentation

ROOT = Path(r"D:\!AGY\belajar-uas-anatomi")
SUMBER = ROOT / "_sumber"
ASSETS = ROOT / "public" / "assets"
EXTRACT = ROOT / "_extract"

def save_webp(pil_img: Image.Image, out_path: Path, max_dim: int = 1280, quality: int = 80):
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img = pil_img.convert("RGB")
    w, h = img.size
    if max(w, h) > max_dim:
        scale = max_dim / max(w, h)
        img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    img.save(out_path, "WEBP", quality=quality, method=6)
    return out_path.stat().st_size, img.size

def extract_pdf_page(pdf_name: str, page_num: int, out_path: Path, dpi: int = 145, max_dim: int = 1280, quality: int = 80):
    doc = fitz.open(SUMBER / pdf_name)
    page = doc[page_num - 1]
    pix = page.get_pixmap(dpi=dpi, alpha=False)
    im = Image.open(io.BytesIO(pix.tobytes("png")))
    return save_webp(im, out_path, max_dim=max_dim, quality=quality)

def extract_pptx_diagram(pptx_name: str, slide_num: int, out_path: Path, max_dim: int = 1280, quality: int = 80):
    prs = Presentation(SUMBER / pptx_name)
    slide = prs.slides[slide_num - 1]
    pics = []
    for sh in slide.shapes:
        if sh.shape_type == 13:
            # Skip full-slide decorative background images (~12192000x6858000 at (0,0) in Saraf PPTX)
            if pptx_name == "Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx" and sh.left == 0 and sh.top == 0 and sh.width >= 12000000:
                continue
            pics.append(sh)
    if not pics:
        return 0, (0, 0)
    # Pick the largest diagram picture by area
    best = max(pics, key=lambda s: s.width * s.height)
    im = Image.open(io.BytesIO(best.image.blob))
    return save_webp(im, out_path, max_dim=max_dim, quality=quality)

def main():
    total_bytes = 0
    manifest = {"crossec": [], "materi": []}

    # 1. Cross-sections
    crossec_specs = [
        ("head", "ANATOMY CROSSECTIONAL of head.pdf", range(34, 51)),
        ("thorax", "ANATOMY CROSSECTIONAL OF THORAX.pdf", range(30, 46)),
        ("abdomen", "ANATOMY CROSSECTIONAL OF Abdomen.pdf", range(15, 49)),
    ]
    for region, pdf_name, pages in crossec_specs:
        for p in pages:
            out = ASSETS / "crossec" / region / f"{region}-p{p}.webp"
            sz, dims = extract_pdf_page(pdf_name, p, out, dpi=140, max_dim=1200, quality=78)
            total_bytes += sz
            manifest["crossec"].append({
                "id": f"{region}-p{p}",
                "region": region,
                "page": p,
                "source": pdf_name,
                "url": f"/assets/crossec/{region}/{region}-p{p}.webp",
                "bytes": sz,
                "size": dims,
            })

    # 2. PDF Materi diagrams
    pdf_materi = [
        # Head TM1
        ("ANATOMY CROSSECTIONAL of head.pdf", 3, "head-planes.webp"),
        ("ANATOMY CROSSECTIONAL of head.pdf", 11, "head-cavities.webp"),
        ("ANATOMY CROSSECTIONAL of head.pdf", 15, "head-skull-ant.webp"),
        ("ANATOMY CROSSECTIONAL of head.pdf", 16, "head-skull-lat.webp"),
        ("ANATOMY CROSSECTIONAL of head.pdf", 18, "head-cranial-floor.webp"),
        ("ANATOMY CROSSECTIONAL of head.pdf", 20, "head-sinuses.webp"),
        ("ANATOMY CROSSECTIONAL of head.pdf", 21, "head-muscles.webp"),
        ("ANATOMY CROSSECTIONAL of head.pdf", 22, "head-salivary.webp"),
        ("ANATOMY CROSSECTIONAL of head.pdf", 24, "head-brain.webp"),
        ("ANATOMY CROSSECTIONAL of head.pdf", 25, "head-ventricles.webp"),
        ("ANATOMY CROSSECTIONAL of head.pdf", 26, "head-meninges.webp"),
        ("ANATOMY CROSSECTIONAL of head.pdf", 27, "head-cranial-nerves.webp"),
        ("ANATOMY CROSSECTIONAL of head.pdf", 28, "head-vessels.webp"),
        # Thorax TM2
        ("ANATOMY CROSSECTIONAL OF THORAX.pdf", 2, "thorax-planes.webp"),
        ("ANATOMY CROSSECTIONAL OF THORAX.pdf", 4, "thorax-bones.webp"),
        ("ANATOMY CROSSECTIONAL OF THORAX.pdf", 7, "thorax-muscles.webp"),
        ("ANATOMY CROSSECTIONAL OF THORAX.pdf", 15, "thorax-pleura.webp"),
        ("ANATOMY CROSSECTIONAL OF THORAX.pdf", 16, "thorax-lungs.webp"),
        ("ANATOMY CROSSECTIONAL OF THORAX.pdf", 17, "thorax-mediastinum.webp"),
        ("ANATOMY CROSSECTIONAL OF THORAX.pdf", 18, "thorax-heart.webp"),
        ("ANATOMY CROSSECTIONAL OF THORAX.pdf", 19, "thorax-pericardium.webp"),
        ("ANATOMY CROSSECTIONAL OF THORAX.pdf", 24, "thorax-esophagus.webp"),
        ("ANATOMY CROSSECTIONAL OF THORAX.pdf", 25, "thorax-trachea.webp"),
        ("ANATOMY CROSSECTIONAL OF THORAX.pdf", 26, "thorax-duct.webp"),
        ("ANATOMY CROSSECTIONAL OF THORAX.pdf", 27, "thorax-breast.webp"),
        # Abdomen TM3
        ("ANATOMY CROSSECTIONAL OF Abdomen.pdf", 2, "abdomen-regions.webp"),
        ("ANATOMY CROSSECTIONAL OF Abdomen.pdf", 6, "abdomen-muscles.webp"),
        ("ANATOMY CROSSECTIONAL OF Abdomen.pdf", 10, "abdomen-peritoneum.webp"),
        ("ANATOMY CROSSECTIONAL OF Abdomen.pdf", 11, "abdomen-stomach.webp"),
        ("ANATOMY CROSSECTIONAL OF Abdomen.pdf", 12, "abdomen-colon.webp"),
        ("ANATOMY CROSSECTIONAL OF Abdomen.pdf", 13, "abdomen-urinary.webp"),
        # Pencernaan TM3
        ("ANATOMI FISIOLOGI Sistem Pencernaan.pdf", 3, "pencernaan-organ.webp"),
        ("ANATOMI FISIOLOGI Sistem Pencernaan.pdf", 5, "pencernaan-tunika.webp"),
        ("ANATOMI FISIOLOGI Sistem Pencernaan.pdf", 7, "pencernaan-mulut.webp"),
        ("ANATOMI FISIOLOGI Sistem Pencernaan.pdf", 17, "pencernaan-lambung.webp"),
        ("ANATOMI FISIOLOGI Sistem Pencernaan.pdf", 21, "pencernaan-pankreas.webp"),
        ("ANATOMI FISIOLOGI Sistem Pencernaan.pdf", 24, "pencernaan-liver.webp"),
        ("ANATOMI FISIOLOGI Sistem Pencernaan.pdf", 26, "pencernaan-usus.webp"),
        ("ANATOMI FISIOLOGI Sistem Pencernaan.pdf", 35, "pencernaan-quiz-14.webp"),
        # Urinari TM4
        ("ANATOMI FISIOLOGI Sistem Urinari.pdf", 6, "urinari-organ.webp"),
        ("ANATOMI FISIOLOGI Sistem Urinari.pdf", 9, "urinari-ginjal.webp"),
        ("ANATOMI FISIOLOGI Sistem Urinari.pdf", 12, "urinari-nefron.webp"),
        ("ANATOMI FISIOLOGI Sistem Urinari.pdf", 16, "urinari-vaskular.webp"),
        ("ANATOMI FISIOLOGI Sistem Urinari.pdf", 33, "urinari-quiz-1to4.webp"),
        ("ANATOMI FISIOLOGI Sistem Urinari.pdf", 34, "urinari-quiz-3to9.webp"),
    ]
    for pdf_name, p, out_name in pdf_materi:
        out = ASSETS / "materi" / out_name
        sz, dims = extract_pdf_page(pdf_name, p, out, dpi=140, max_dim=1200, quality=80)
        total_bytes += sz
        manifest["materi"].append({"file": out_name, "source": f"{pdf_name} hlm.{p}", "bytes": sz, "size": dims})

    # 3. PPTX Materi diagrams
    pptx_materi = [
        # Pernapasan TM2
        ("Anatomi_Sistem_Pernapasan_Bahasa_Indonesia.pptx", 3, "napas-saluran.webp"),
        ("Anatomi_Sistem_Pernapasan_Bahasa_Indonesia.pptx", 5, "napas-laring.webp"),
        ("Anatomi_Sistem_Pernapasan_Bahasa_Indonesia.pptx", 6, "napas-trakea.webp"),
        ("Anatomi_Sistem_Pernapasan_Bahasa_Indonesia.pptx", 9, "napas-hilum.webp"),
        ("Anatomi_Sistem_Pernapasan_Bahasa_Indonesia.pptx", 10, "napas-bronkus.webp"),
        ("Anatomi_Sistem_Pernapasan_Bahasa_Indonesia.pptx", 12, "napas-alveolus.webp"),
        # Saraf TM1 & Dosen 2
        ("Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx", 34, "saraf-hemisfer-quiz.webp"),
        ("Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx", 36, "saraf-sagital-quiz.webp"),
        ("Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx", 44, "saraf-koronal-quiz.webp"),
        ("Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx", 52, "saraf-spinal-quiz.webp"),
        ("Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx", 53, "saraf-conus-quiz.webp"),
        ("Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx", 57, "saraf-ventrikel-quiz.webp"),
        ("Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx", 70, "saraf-willis.webp"),
        ("Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx", 72, "saraf-vaskular-quiz.webp"),
        # Peredaran Darah TM5 & Dosen 2
        ("Sistem Peredaran Darah.pptx", 39, "darah-konduksi.webp"),
        ("Sistem Peredaran Darah.pptx", 42, "darah-sirkulasi.webp"),
        ("Sistem Peredaran Darah.pptx", 44, "darah-pembuluh-besar.webp"),
        ("Sistem Peredaran Darah.pptx", 45, "darah-aorta.webp"),
        ("Sistem Peredaran Darah.pptx", 46, "darah-arcus-aorta.webp"),
        ("Sistem Peredaran Darah.pptx", 47, "darah-koroner-1.webp"),
        ("Sistem Peredaran Darah.pptx", 48, "darah-koroner-2.webp"),
        ("Sistem Peredaran Darah.pptx", 49, "darah-carotis.webp"),
        ("Sistem Peredaran Darah.pptx", 50, "darah-willis.webp"),
        ("Sistem Peredaran Darah.pptx", 51, "darah-vena-serebral.webp"),
        ("Sistem Peredaran Darah.pptx", 52, "darah-toraks.webp"),
        ("Sistem Peredaran Darah.pptx", 53, "darah-abdomen-1.webp"),
        ("Sistem Peredaran Darah.pptx", 54, "darah-abdomen-2.webp"),
        ("Sistem Peredaran Darah.pptx", 55, "darah-porta.webp"),
        ("Sistem Peredaran Darah.pptx", 56, "darah-limb-atas.webp"),
        ("Sistem Peredaran Darah.pptx", 57, "darah-limb-bawah.webp"),
        ("Sistem Peredaran Darah.pptx", 58, "darah-arteri-tubuh.webp"),
        ("Sistem Peredaran Darah.pptx", 59, "darah-vena-tubuh.webp"),
        # Kardiovaskular TM5 & Dosen 2
        ("Sistem_Kardiovaskular_Semester_1_Radiologi.pptx", 3, "kardio-letak.webp"),
        ("Sistem_Kardiovaskular_Semester_1_Radiologi.pptx", 4, "kardio-lapisan.webp"),
        ("Sistem_Kardiovaskular_Semester_1_Radiologi.pptx", 5, "kardio-empat-ruang.webp"),
        ("Sistem_Kardiovaskular_Semester_1_Radiologi.pptx", 6, "kardio-quiz-ruang.webp"),
        ("Sistem_Kardiovaskular_Semester_1_Radiologi.pptx", 7, "kardio-katup.webp"),
        ("Sistem_Kardiovaskular_Semester_1_Radiologi.pptx", 10, "kardio-sirkulasi.webp"),
        ("Sistem_Kardiovaskular_Semester_1_Radiologi.pptx", 11, "kardio-koroner.webp"),
        ("Sistem_Kardiovaskular_Semester_1_Radiologi.pptx", 12, "kardio-konduksi.webp"),
        ("Sistem_Kardiovaskular_Semester_1_Radiologi.pptx", 13, "kardio-ekg.webp"),
    ]
    for pptx_name, snum, out_name in pptx_materi:
        out = ASSETS / "materi" / out_name
        sz, dims = extract_pptx_diagram(pptx_name, snum, out, max_dim=1200, quality=80)
        total_bytes += sz
        manifest["materi"].append({"file": out_name, "source": f"{pptx_name} slide {snum}", "bytes": sz, "size": dims})

    # 4. Dump full extracted text from all PDFs and PPTX to _extract/
    EXTRACT.mkdir(parents=True, exist_ok=True)
    (EXTRACT / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    with open(EXTRACT / "all_texts.txt", "w", encoding="utf-8") as tf:
        for pdf_path in sorted(SUMBER.glob("*.pdf")):
            doc = fitz.open(pdf_path)
            tf.write(f"\n==================== {pdf_path.name} ({len(doc)} pages) ====================\n")
            for i, page in enumerate(doc, 1):
                txt = page.get_text().strip()
                if txt:
                    tf.write(f"[Page {i}]\n{txt}\n\n")
        for pptx_path in sorted(SUMBER.glob("*.pptx")):
            prs = Presentation(pptx_path)
            tf.write(f"\n==================== {pptx_path.name} ({len(prs.slides)} slides) ====================\n")
            for i, slide in enumerate(prs.slides, 1):
                parts = []
                for sh in slide.shapes:
                    if sh.has_table:
                        rows = [" | ".join(c.text.replace("\n", " ").strip() for c in r.cells) for r in sh.table.rows]
                        parts.append("[TABLE]\n" + "\n".join(rows))
                    elif sh.has_text_frame and sh.text_frame.text.strip():
                        parts.append(sh.text_frame.text.strip())
                if slide.has_notes_slide and slide.notes_slide.notes_text_frame.text.strip():
                    parts.append("[NOTES] " + slide.notes_slide.notes_text_frame.text.strip())
                if parts:
                    tf.write(f"[Slide {i}]\n" + "\n".join(parts) + "\n\n")

    print(f"Extracted {len(manifest['crossec'])} crossec + {len(manifest['materi'])} materi images.")
    print(f"Total public/assets size: {total_bytes / (1024*1024):.2f} MB")

if __name__ == "__main__":
    main()
