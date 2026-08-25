# 🧮 Ledger & Lend — Essential Calculators & Clinical Suite

[![Live Demo](https://img.shields.io/badge/Live%20Demo-ledgerandlend.netlify.app-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://ledgerandlend.netlify.app/)
[![Tools Count](https://img.shields.io/badge/Tools-24%20Calculators-blue?style=for-the-badge&logo=calculator)](https://ledgerandlend.netlify.app/)
[![Languages](https://img.shields.io/badge/i18n-9%20Languages%20%2B%20RTL-orange?style=for-the-badge&logo=google-translate)](https://ledgerandlend.netlify.app/)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-green?style=for-the-badge&logo=shield)](https://ledgerandlend.netlify.app/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](./LICENSE)

A modern, lightning-fast, and privacy-first web application suite featuring **24 production-grade calculators** across **Finance, Health, Clinical Medicine, and Math/Utilities**.

Built with **Zero Backend**, **Zero Build Step**, pure Vanilla ES JavaScript modules, reactive SVG visualizations, high-contrast Dark/Light themes, complete offline PWA support, and full **Google AdSense & SEO Structured Data** integration.

👉 **Live Application**: **[https://ledgerandlend.netlify.app/](https://ledgerandlend.netlify.app/)**

---

## 🌟 Suite Overview (24 Specialized Tools)

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  [田 All Tools]  [🏛️ Finance & Loans]  [🏃 Health & Fitness]  [🩺 Clinical & Medical]  [➗ Math & Utilities]  │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 🏛️ 1. Finance & Wealth (5 Tools)
* **Loan & EMI Calculator (`#emi`)**: Monthly installments, interest-to-principal ratio donut chart, yearly/monthly amortization schedule, 1-tap presets ($25k–$500k), and 1-click CSV export.
* **SIP & Compound Interest (`#sip`)**: Mutual fund wealth forecasts, lumpsum investment growth, step-up SIP multiplier, inflation adjustments, and interactive growth curves.
* **Mortgage Calculator (`#mortgage`)**: Home value, down payment, loan terms, property taxes, homeowners insurance, PMI, and HOA fees breakdown.
* **Sales Tax / GST & Discount (`#tax-discount`)**: Forward & reverse tax calculations, multiple stacked discounts, and savings breakdown.
* **Tip & Bill Split (`#tip-split`)**: Dining gratuity, custom tips, and bill splitting among parties with round-up options.

### 🏃 2. Health & Fitness (8 Tools)
* **BMI & Healthy Weight (`#bmi`)**: Metric & Imperial units, WHO health classification gauge, and ideal target weight calculations.
* **Ideal Body Weight (`#ideal-weight`)**: Multi-formula clinical comparison (Devine, Robinson, Miller, and Hamwi).
* **Waist-to-Hip Ratio (`#waist-hip`)**: Cardiovascular and metabolic disease risk assessment based on body fat distribution.
* **Target Heart Rate (`#target-heart-rate`)**: Karvonen formula & standard cardiovascular training zones (Warmup, Fat Burn, Aerobic, Anaerobic, VO2 Max).
* **Macronutrient Calculator (`#macro-calculator`)**: Daily protein, carb, and fat distributions (Balanced, Low Carb, Keto, High Protein).
* **TDEE & Calorie Needs (`#calorie-tdee`)**: Basal Metabolic Rate (Mifflin-St Jeor) and calorie deficit/surplus planning.
* **Body Fat Percentage (`#body-fat`)**: Validated US Navy tape measurement method with fat mass vs. lean mass breakdown.
* **Daily Water Intake (`#water-intake`)**: Hydration targets based on body weight, exercise duration, and climate.

### 🩺 3. Clinical & Medical Suite (5 Tools)
* **Pregnancy Due Date & Gestational Age (`#pregnancy-due-date`)**: Clinical **Naegele's Rule (280 days)** with menstrual cycle length adjustment, Gestational Age (weeks & days), Trimester progress bar, and clinical milestone timeline.
* **Body Surface Area (BSA) (`#body-surface-area`)**: Calculates clinical BSA ($m^2$) using **Mosteller Gold Standard**, **DuBois**, **Haycock (Pediatric)**, **Gehan-George**, and **Boyd** formulas with individualized drug dosing ($mg/m^2$).
* **Mean Arterial Pressure (MAP) (`#mean-arterial-pressure`)**: Evaluates organ perfusion pressure ($MAP = \frac{SBP + 2 \times DBP}{3}$) and Pulse Pressure with clinical ischemia/hypertension status badges.
* **Medication Dosage by Weight (`#dosage-calculator`)**: Pediatric & adult weight-based dosing ($mg/kg/day$), divided single dose calculations, and liquid oral suspension volume ($mL$) with 24h administration schedules.
* **eGFR Kidney Function Calculator (`#egfr-kidney`)**: Official **CKD-EPI 2021 Equation (Race-Free Standard)** using Serum Creatinine ($mg/dL$ and $\mu mol/L$), age, and sex to determine KDIGO Chronic Kidney Disease Stages (G1 to G5).

### ➗ 4. Math & Everyday Utilities (6 Tools)
* **Scientific Calculator (`#scientific`)**: Operator precedence AST evaluator, trigonometric functions (DEG/RAD), log, roots, exponents, and memory registers.
* **Percentage Suite (`#percentage`)**: 4-in-1 calculator for percentage of a total, percentage change, increase/decrease, and ratios.
* **Universal Unit Converter (`#unit-converter`)**: Cross-conversion matrix across Length, Mass, Temp, Area, Volume, Speed, and Digital Storage.
* **Age & Date Difference (`#age-date`)**: Exact age (years, months, days, seconds), next birthday countdown, and calendar span.
* **Fuel Cost & Trip Economy (`#fuel-cost`)**: Road trip fuel consumption, vehicle mileage conversion, and per-passenger cost split.
* **Time & Duration (`#time-duration`)**: Shift hour calculations, billable decimal hours, and clock arithmetic.

---

## ✨ Key Features & Architecture

* **⚡ Zero Backend & Zero Build Step**: 100% Vanilla JavaScript (ES Modules). No Node build pipeline or Webpack/Vite compilation required.
* **🔒 100% Privacy & Client-Side**: All calculations run locally in the user's browser. Zero biometric or financial data is ever transmitted to remote servers.
* **🌓 Flawless Theme Engine**: High-contrast **Dark Mode 🌙 and Light Mode ☀️** with automatic OS preference detection and `localStorage` persistence.
* **📊 1-Click CSV Export**: Download complete calculation results, amortization tables, and dosing schedules directly into `.csv` files for Excel and Google Sheets.
* **📋 1-Click Result Copying**: Tap any result card to copy values to the clipboard with animated micro-toast feedback.
* **⭐ Favorites Bar & History Drawer**: Pin favorite calculators for instant 1-tap access and view recently performed calculations saved locally.
* **🌐 Multilingual i18n (9 Languages)**: English, Spanish, French, German, Hindi, Japanese, Portuguese, Chinese, and Arabic (with complete RTL layout support).
* **💱 Multi-Currency Engine**: Instant live switching between USD ($), EUR (€), GBP (£), INR (₹), JPY (¥), CAD (C$), and AUD (A$).
* **🔗 Embeddable Calculator Widgets (`<> Embed`)**: Generates lightweight, responsive `<iframe>` snippets for third-party bloggers to embed calculators on their websites (driving viral SEO backlinks).
* **📈 Google Analytics 4 & AdSense Ready**: Pre-configured IAB standard ad containers (Top Leaderboard, In-Feed Native, Bottom Banner), `ads.txt`, and GA4 real-time SPA event tracking.
* **🔍 Deep Synonym Search (`Ctrl+K`)**: Instant fuzzy search dialog with alias and multilingual keyword matching.
* **📱 Progressive Web App (PWA)**: Installable on iOS, Android, macOS, and Windows with offline caching via `sw.js`.

---

## 📁 Repository Structure

```
ledgerandlend/
├── index.html                  # Main SPA Shell, Tailwind CDN, Schema LD+JSON & Modals
├── manifest.json               # Progressive Web App (PWA) Manifest
├── robots.txt                  # Search Engine Crawler Directives
├── sitemap.xml                 # XML Sitemap for all 24 Calculators
├── ads.txt                     # Google AdSense Publisher Verification
├── netlify.toml                # Netlify Build & Security Headers (Clean UTF-8)
├── vercel.json                 # Vercel Deployment Configuration
├── DEPLOYMENT_GUIDE.md         # Step-by-Step Production Hosting Guide
├── README.md                   # Project Documentation
├── assets/
│   └── icon.svg                # Master Brand Logo & Vector App Icon
├── css/
│   └── styles.css              # Custom Design Tokens, Themes, and Layouts
└── js/
    ├── app.js                  # Master Application Controller & SPA Router
    ├── calculators/
    │   ├── finance/            # EMI, SIP, Mortgage, Tax, Tip Split
    │   ├── health/             # BMI, Ideal Weight, Waist-Hip, Heart Rate, Macros, TDEE, Body Fat, Water
    │   ├── medical/            # Pregnancy Due Date, BSA, MAP, Dosage, eGFR Kidney
    │   └── math/               # Scientific, Percentage, Unit Converter, Age, Fuel, Time
    ├── components/
    │   └── knowledge.js        # Educational Hub & FAQ Accordion Engine
    ├── data/
    │   ├── i18n.js             # 9-Language Localization Dictionary & RTL Engine
    │   ├── faqs.js             # Multilingual Calculator FAQs
    │   ├── articles.js         # In-Depth Guides & Scientific Explanations
    │   ├── affiliates.js       # Verified External Authority Resources (WHO, Harvard, MDCalc)
    │   ├── legal.js            # GDPR/CCPA Privacy Policy, Terms & Safe Harbor Disclaimers
    │   └── searchIndex.js      # Deep Synonym Search Keyword Index
    └── utils/
        ├── formatters.js       # Currency & Number Formatting
        ├── storage.js          # LocalStorage History & Bookmarks Handler
        ├── charts.js           # Lightweight Dependency-Free SVG Chart Renderers
        └── exportShare.js      # URL Deep-Linking & Markdown Generators
```

---

## 💻 Local Development Setup

Because this project uses modern JavaScript ES Modules (`import`/`export`), run a lightweight local HTTP server to avoid browser CORS restrictions on `file:///` URLs:

### Method 1: Python Built-In Server (Recommended)
```bash
# Clone the repository
git clone https://github.com/your-username/ledgerandlend.git
cd ledgerandlend

# Start local server on port 8080
python -m http.server 8080
```
Open **[http://localhost:8080](http://localhost:8080)** in Chrome, Edge, Firefox, or Safari.

### Method 2: Node.js `npx serve`
```bash
npx serve .
```

### Method 3: VS Code Live Server Extension
Open the folder in VS Code, right-click `index.html`, and click **"Open with Live Server"**.

---

## 🧪 Automated Test Suite

The project includes an automated test suite verifying mathematical integrity, zero-eval security, module imports, and SEO sitemap consistency:

```bash
python test_suite.py
```

**Test Coverage Output:**
```
============================================================
LEDGER & LEND - COMPREHENSIVE 24-CALCULATOR TEST SUITE
============================================================
  [PASS] File exists: index.html
  [PASS] All ES Module imports resolve cleanly (38 modules)
  [PASS] Zero eval(), new Function(), or document.write()
  [PASS] Mathematical logic verified across all 24 Calculators
  [PASS] Multilingual i18n (9 languages + RTL)
  [PASS] XML Sitemap & Search Synonyms for all 24 tools
  [PASS] GDPR / CCPA Legal Compliance & Safe Harbor Documents
============================================================
TEST SUITE COMPLETE: 110 PASSED, 0 FAILED.
ALL 24 CALCULATORS & SYSTEM MODULES FULLY VERIFIED!
============================================================
```

---

## 🚀 Deployment

### 1. Deploy to Netlify (Recommended — 10 Seconds)
1. Go to **[app.netlify.com/drop](https://app.netlify.com/drop)**.
2. Drag and drop the project root directory.
3. Your site is live with global CDN, automatic HTTPS/SSL, and zero build configuration!

### 2. Deploy to GitHub Pages
1. Push this repository to GitHub.
2. Go to **Repository Settings → Pages**.
3. Under **Build and deployment → Branch**, select `main` / `root` and click **Save**.

### 3. Deploy to Vercel
```bash
npx vercel
```

---

## 📄 License & Legal Safe Harbor

Distributed under the **MIT License**. See `LICENSE` for more information.

> **Medical & Financial Safe Harbor Notice**:  
> The calculators, mathematical formulas, and health estimations on Ledger & Lend are provided strictly for educational and informational purposes. They do not constitute professional financial advice, investment recommendations, or medical diagnoses. Always consult a certified financial planner or qualified healthcare professional before making financial or clinical decisions.
