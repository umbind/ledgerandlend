import subprocess, time, json, urllib.request, sys, websocket

PORT = 8080
CDP_PORT = 9245
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def audit():
    print("=" * 75)
    print(f"  RUNNING HEADLESS CHROME BENCHMARK AUDIT ON HTTP://LOCALHOST:{PORT}/")
    print("=" * 75)

    proc = subprocess.Popen([
        CHROME_PATH, "--headless=new", f"--remote-debugging-port={CDP_PORT}",
        "--remote-allow-origins=*", "--disable-gpu", "--no-sandbox", "--disable-extensions"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1.5)

    try:
        targets = json.loads(urllib.request.urlopen(f"http://localhost:{CDP_PORT}/json").read().decode("utf-8"))
        page_target = next(t for t in targets if t.get("type") == "page")
        ws = websocket.create_connection(page_target["webSocketDebuggerUrl"], timeout=10)

        msg_id = 1
        def cmd(m, p=None):
            nonlocal msg_id
            c = {"id": msg_id, "method": m}
            if p: c["params"] = p
            ws.send(json.dumps(c))
            msg_id += 1
            while True:
                r = json.loads(ws.recv())
                if r.get("id") == c["id"]: return r.get("result", {})

        cmd("Page.enable")
        cmd("Runtime.enable")

        # Layout shift listener
        shift_listener = """
        window.__shifts = [];
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) window.__shifts.push(entry.value);
            }
        }).observe({ type: 'layout-shift', buffered: true });
        """
        cmd("Page.addScriptToEvaluateOnNewDocument", {"source": shift_listener})
        cmd("Page.navigate", {"url": f"http://localhost:{PORT}/"})
        time.sleep(3.0)

        eval_script = """
        (() => {
            const h1s = document.querySelectorAll('h1');
            const shifts = window.__shifts || [];
            const totalCls = shifts.reduce((a, b) => a + b, 0);
            
            let missingButtonNames = 0;
            document.querySelectorAll('button').forEach(b => {
                const text = (b.innerText || b.getAttribute('aria-label') || b.getAttribute('title') || '').trim();
                if (!text) missingButtonNames++;
            });

            let missingInputLabels = 0;
            document.querySelectorAll('input, select, textarea').forEach(inp => {
                if (inp.type === 'hidden') return;
                const id = inp.id;
                const hasLabel = id && document.querySelector(`label[for="${id}"]`);
                const aria = inp.getAttribute('aria-label') || inp.getAttribute('aria-labelledby');
                if (!hasLabel && !aria) missingInputLabels++;
            });

            return {
                title: document.title,
                h1Count: h1s.length,
                totalCls: Number(totalCls.toFixed(4)),
                missingButtonNames: missingButtonNames,
                missingInputLabels: missingInputLabels,
                docLang: document.documentElement.lang
            };
        })()
        """
        res = cmd("Runtime.evaluate", {"expression": eval_script, "returnByValue": True})
        val = res.get("result", {}).get("value", {})

        print(f"\n📊 AUDIT SCORECARD:")
        print(f"  • Cumulative Layout Shift (CLS) : {val.get('totalCls')} {'🟢 PERFECT (0.00)' if val.get('totalCls') == 0 else '🔴 HIGH SHIFT'}")
        print(f"  • Main Heading (<h1>) Count    : {val.get('h1Count')} {'🟢 PASS' if val.get('h1Count') >= 1 else '🔴 MISSING <h1>'}")
        print(f"  • Unnamed Buttons (a11y)       : {val.get('missingButtonNames')} {'🟢 ZERO VIOLATIONS' if val.get('missingButtonNames') == 0 else '🔴 NEEDS ARIA-LABELS'}")
        print(f"  • Unlabeled Form Inputs        : {val.get('missingInputLabels')} {'🟢 ZERO VIOLATIONS' if val.get('missingInputLabels') == 0 else '🔴 NEEDS LABELS'}")
        print(f"  • Active HTML Language Tag     : '{val.get('docLang')}'")
        print("=" * 75)

        ws.close()
    finally:
        proc.terminate()
        proc.kill()

if __name__ == "__main__":
    audit()