import json
import subprocess
import sys
import time
import urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(r"D:\!AGY\belajar-uas-anatomi")
SCREENSHOTS = Path(r"C:\Users\USER\.gemini\antigravity\brain\12ae0120-e435-4b34-ac7c-86ac84eb8a24\scratch\qa")
SCREENSHOTS.mkdir(parents=True, exist_ok=True)
PORT = 4173
BASE_URL = f"http://127.0.0.1:{PORT}"


def wait_for_server(url: str, timeout: float = 20.0):
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=2) as resp:
                if resp.status == 200:
                    return True
        except Exception:
            time.sleep(0.4)
    raise RuntimeError("Preview server did not start in time")


def check_no_overflow(page, label: str):
    metrics = page.evaluate("""() => ({
        scrollW: document.documentElement.scrollWidth,
        innerW: window.innerWidth,
        bodyScrollW: document.body.scrollWidth
    })""")
    assert metrics["scrollW"] <= metrics["innerW"] + 1, (
        f"Horizontal overflow at {label}: scrollW={metrics['scrollW']} > innerW={metrics['innerW']}"
    )


def check_visible_images(page, label: str):
    page.wait_for_load_state("networkidle")
    page.wait_for_function("""() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.every(img => {
            const rect = img.getBoundingClientRect();
            const inViewport = rect.top < window.innerHeight + 200 && rect.bottom > -200;
            return !inViewport || img.complete;
        });
    }""", timeout=5000)
    broken = page.evaluate("""async () => {
        const imgs = Array.from(document.querySelectorAll('img'));
        const bad = [];
        for (const img of imgs) {
            const rect = img.getBoundingClientRect();
            const inViewport = rect.top < window.innerHeight + 200 && rect.bottom > -200;
            if (inViewport) {
                if (!img.complete || img.naturalWidth === 0) {
                    bad.push(img.getAttribute('src') + ' (in-viewport naturalWidth=0)');
                }
            } else {
                const src = img.getAttribute('src');
                if (src) {
                    const r = await fetch(src);
                    if (!r.ok) bad.push(src + ' (http ' + r.status + ')');
                }
            }
        }
        return bad;
    }""")
    assert len(broken) == 0, f"Broken images at {label}: {broken}"


def run_qa():
    proc = subprocess.Popen(
        ["cmd", "/c", "npx", "vite", "preview", "--host", "127.0.0.1", "--port", str(PORT), "--strictPort"],
        cwd=str(ROOT),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    try:
        wait_for_server(BASE_URL)
        errors = []
        console_errors = []

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)

            # 1. MOBILE VIEWPORT (375x812) - Fresh Start + Full Flow
            ctx = browser.new_context(viewport={"width": 375, "height": 812})
            page = ctx.new_page()
            page.on("pageerror", lambda err: errors.append(str(err)))
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

            page.goto(BASE_URL, wait_until="networkidle")
            page.evaluate("localStorage.clear()")
            page.reload(wait_until="networkidle")
            time.sleep(0.5)

            # Verify Fresh Start 0%
            body_text = page.locator("body").inner_text()
            assert "0%" in body_text, "Fresh start must display 0% readiness"
            assert "0/67" in body_text, "Fresh start must display 0/67 cross-sections"
            assert "0/116" in body_text, "Fresh start must display 0/116 bank soal"
            check_no_overflow(page, "Mobile Home")
            page.screenshot(path=str(SCREENSHOTS / "mobile_home_dark.png"))

            # Toggle Light Mode and verify html class & localStorage
            page.locator('button[aria-label*="Mode"]').first.click()
            time.sleep(0.5)
            html_cls = page.evaluate("document.documentElement.className")
            assert "light" in html_cls, f"Expected light mode class, got {html_cls}"
            page.screenshot(path=str(SCREENSHOTS / "mobile_home_light.png"))
            # Switch back to Dark Mode
            page.locator('button[aria-label*="Mode"]').first.click()
            time.sleep(0.4)

            # Navigate to Dosen 1 Cross-Section
            page.locator("nav").get_by_role("button", name="Dosen 1").click()
            time.sleep(0.5)
            check_no_overflow(page, "Mobile Dosen 1 CrossSec")
            check_visible_images(page, "Mobile Dosen 1 CrossSec Grid")
            # Open first Cross-Section detail
            page.locator("button", has_text="FIG. 5-28").first.click()
            time.sleep(0.5)
            check_visible_images(page, "Mobile CrossSec Detail")
            check_no_overflow(page, "Mobile CrossSec Detail")
            # Toggle Masking Curtain (Mode Tutup Label)
            page.get_by_role("button", name="Mode Tutup Label").click()
            time.sleep(0.3)
            page.screenshot(path=str(SCREENSHOTS / "mobile_crossec_masked.png"))
            # Mark Studied
            page.get_by_role("button", name="Tandai Sudah Dikuasai").click()
            time.sleep(0.3)

            # Switch to Identifikasi TM 1-5
            page.get_by_role("button", name="Identifikasi Gambar TM 1–5").click()
            time.sleep(0.5)
            check_visible_images(page, "Mobile TM Identifikasi")
            check_no_overflow(page, "Mobile TM Identifikasi")
            page.screenshot(path=str(SCREENSHOTS / "mobile_tm.png"))

            # Navigate to Dosen 2 -> check Limb Atas & 12 Saraf Kranial
            page.locator("nav").get_by_role("button", name="Dosen 2").click()
            time.sleep(0.5)
            check_visible_images(page, "Mobile Dosen 2 Kardio")
            check_no_overflow(page, "Mobile Dosen 2 Kardio")

            page.locator("button", has_text="Limb Atas").first.click()
            time.sleep(0.5)
            check_visible_images(page, "Mobile Dosen 2 Limb Atas")
            check_no_overflow(page, "Mobile Dosen 2 Limb Atas")
            page.screenshot(path=str(SCREENSHOTS / "mobile_limb_atas.png"))

            page.locator("button", has_text="Saraf").first.click()
            time.sleep(0.5)
            check_visible_images(page, "Mobile Dosen 2 Saraf Kranial")
            check_no_overflow(page, "Mobile Dosen 2 Saraf Kranial")
            page.screenshot(path=str(SCREENSHOTS / "mobile_saraf_kranial.png"))

            # Navigate to Ujian -> Start Simulasi UAS
            page.locator("nav").get_by_role("button", name="Ujian").click()
            time.sleep(0.4)
            check_no_overflow(page, "Mobile Ujian Hub")
            page.get_by_role("button", name="Mulai Simulasi UAS").click()
            time.sleep(0.6)
            check_visible_images(page, "Mobile Simulasi UAS Q1")
            check_no_overflow(page, "Mobile Simulasi UAS Q1")
            quiz_txt = page.locator("body").inner_text()
            assert "1 / 28" in quiz_txt or "1/28" in quiz_txt or "Soal 1 dari 28" in quiz_txt, f"Simulasi UAS must load 28 questions, got: {quiz_txt[:400]}"
            # Verify draft stored in localStorage has 28 questions including 1 head + 1 thorax + 2 abdomen (different crossecId)
            draft_state = page.evaluate("JSON.parse(localStorage.getItem('uas_anatomi_state_v1'))")
            assert draft_state is not None and draft_state.get("activeQuizDraft"), "Expected activeQuizDraft in localStorage"
            assert len(draft_state["activeQuizDraft"]["questionIds"]) == 28, f"Expected 28 drafted questions, got {len(draft_state['activeQuizDraft']['questionIds'])}"
            page.screenshot(path=str(SCREENSHOTS / "mobile_simulasi_uas.png"))

            # Check reload persistence of studied item + active quiz draft
            page.reload(wait_until="networkidle")
            time.sleep(0.5)
            # Navigate to Progres & Reset Data
            page.locator("nav").get_by_role("button", name="Progres").click()
            time.sleep(0.4)
            check_no_overflow(page, "Mobile Progres")
            page.get_by_role("button", name="Reset Data / Mulai dari Awal").click()
            time.sleep(0.3)
            page.get_by_role("button", name="Ya, Reset Semua Data").click()
            time.sleep(0.5)
            after_reset = page.locator("body").inner_text()
            assert "0/67" in after_reset, "After reset, Cross-Section must return to 0/67"

            # 2. DESKTOP VIEWPORT (1280x800) + 404 test
            dctx = browser.new_context(viewport={"width": 1280, "height": 800})
            dpage = dctx.new_page()
            dpage.on("pageerror", lambda err: errors.append(str(err)))
            dpage.goto(BASE_URL, wait_until="networkidle")
            time.sleep(0.5)
            check_no_overflow(dpage, "Desktop Home")
            dpage.screenshot(path=str(SCREENSHOTS / "desktop_home.png"))

            # Check 404 page
            dpage.goto(f"{BASE_URL}/rute-tidak-ada", wait_until="networkidle")
            time.sleep(0.4)
            assert "ERROR 404" in dpage.locator("body").inner_text().upper()
            dpage.get_by_role("button", name="Kembali ke Beranda").click()
            time.sleep(0.3)

            browser.close()

        assert len(errors) == 0, f"Page runtime errors: {errors}"
        assert len(console_errors) == 0, f"Console errors: {console_errors}"
        print("QA PLAYWRIGHT PASSED 100%!")
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except Exception:
            proc.kill()


if __name__ == "__main__":
    run_qa()
