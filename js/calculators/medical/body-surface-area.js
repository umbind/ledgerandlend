/**
 * Essential Calculators Hub - Clinical & Medical Suite
 * Body Surface Area (BSA) Calculator (Mosteller, DuBois, Haycock & Gehan-George Formulas)
 */

import { saveCalculation } from '../../utils/storage.js';
import { copyToClipboard } from '../../utils/formatters.js';

export const bsaCalculator = {
  id: 'body-surface-area',
  title: 'Body Surface Area (BSA) Calculator',
  category: 'medical',
  icon: 'ruler',
  description: 'Calculate clinical Body Surface Area (m²) for medication dosing, chemotherapy regimens, and cardiac hemodynamic indexing.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-5">
          <div class="glass-card p-5 space-y-4">
            <div class="flex items-center justify-between border-b border-subtle pb-3">
              <h3 class="font-bold text-sm text-primary flex items-center gap-2">
                <i data-lucide="scale" class="w-4 h-4 text-accent-primary"></i>
                Patient Biometric Parameters
              </h3>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-accent-primary border border-blue-200 dark:border-blue-800">
                Mosteller Gold Standard
              </span>
            </div>

            <!-- Height -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Height</span>
                <span class="font-mono text-accent-primary font-bold" id="bsa-height-display">175 cm</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="bsa-height" class="calc-input" value="175" min="30" max="250" step="1">
                <span class="calc-input-suffix font-bold">cm</span>
              </div>
              <input type="range" id="bsa-height-range" class="calc-range" value="175" min="50" max="220" step="1">
            </div>

            <!-- Weight -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Body Weight</span>
                <span class="font-mono text-accent-primary font-bold" id="bsa-weight-display">70 kg</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="bsa-weight" class="calc-input" value="70" min="2" max="300" step="0.5">
                <span class="calc-input-suffix font-bold">kg</span>
              </div>
              <input type="range" id="bsa-weight-range" class="calc-range" value="70" min="20" max="160" step="0.5">
            </div>

            <!-- Chemotherapy / Dosing Helper Option -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Medication Target Dose per m² (Optional)</span>
                <span class="font-mono text-accent-emerald font-bold" id="bsa-dose-display">50 mg/m²</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="bsa-target-dose" class="calc-input" value="50" min="1" max="2000" step="5">
                <span class="calc-input-suffix font-bold">mg/m²</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="pt-2 flex items-center gap-3">
              <button id="bsa-save-btn" class="btn btn-secondary btn-sm flex-1 flex items-center justify-center gap-1.5">
                <i data-lucide="bookmark" class="w-3.5 h-3.5"></i>
                <span>Save to History</span>
              </button>
              <button id="bsa-export-csv-btn" class="btn btn-secondary btn-sm flex items-center gap-1.5" title="Export BSA Report CSV">
                <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5 text-accent-emerald"></i>
                <span class="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Outputs -->
        <div class="lg:col-span-6 space-y-4">
          <!-- Primary Mosteller Card -->
          <div class="result-card p-5 cursor-pointer relative group" id="bsa-main-card" title="Click to copy Body Surface Area">
            <div class="flex justify-between items-start">
              <div>
                <div class="text-[11px] font-bold text-muted uppercase tracking-wider">Mosteller Body Surface Area</div>
                <div class="text-3xl sm:text-4xl font-extrabold text-accent-primary mt-1 font-mono flex items-baseline gap-1">
                  <span id="bsa-mosteller-val">1.84</span>
                  <span class="text-base font-normal text-muted">m²</span>
                </div>
                <div class="text-xs text-secondary mt-1 font-medium" id="bsa-avg-comparison">Average Adult BSA: 1.70 – 1.90 m²</div>
              </div>
              <span class="text-[10px] text-muted flex items-center gap-1 group-hover:text-primary transition-colors bg-secondary/80 px-2 py-1 rounded">
                <i data-lucide="copy" class="w-3 h-3"></i> Click to Copy
              </span>
            </div>
          </div>

          <!-- Total Calculated Drug Dose -->
          <div class="glass-card p-4 border-l-4 border-l-accent-emerald">
            <div class="text-[11px] font-bold text-muted uppercase">Total Individualized Drug Dose</div>
            <div class="text-2xl font-extrabold text-accent-emerald font-mono mt-1 flex items-baseline gap-1">
              <span id="bsa-total-dose-val">92.0</span>
              <span class="text-sm font-semibold text-secondary">mg (Total Dose)</span>
            </div>
            <div class="text-[11px] text-muted mt-0.5">Calculated as: BSA (m²) × Dose (mg/m²)</div>
          </div>

          <!-- All Formula Multi-Comparison Table -->
          <div class="glass-card p-4 space-y-2">
            <div class="text-xs font-bold text-primary flex items-center justify-between">
              <span>Clinical Formula Comparison</span>
              <span class="text-[10px] text-muted font-normal">All values in m²</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div class="p-2 rounded bg-secondary border border-subtle">
                <div class="text-[10px] text-muted font-bold">DuBois</div>
                <div class="font-mono font-bold text-primary text-sm mt-0.5" id="bsa-dubois-val">1.84 m²</div>
              </div>
              <div class="p-2 rounded bg-secondary border border-subtle">
                <div class="text-[10px] text-muted font-bold">Haycock</div>
                <div class="font-mono font-bold text-primary text-sm mt-0.5" id="bsa-haycock-val">1.85 m²</div>
              </div>
              <div class="p-2 rounded bg-secondary border border-subtle">
                <div class="text-[10px] text-muted font-bold">Gehan-George</div>
                <div class="font-mono font-bold text-primary text-sm mt-0.5" id="bsa-gehan-val">1.86 m²</div>
              </div>
              <div class="p-2 rounded bg-secondary border border-subtle">
                <div class="text-[10px] text-muted font-bold">Boyd</div>
                <div class="font-mono font-bold text-primary text-sm mt-0.5" id="bsa-boyd-val">1.84 m²</div>
              </div>
            </div>
          </div>

          <!-- Safe Harbor Medical Clinical Note -->
          <div class="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed flex items-start gap-2">
            <i data-lucide="shield-alert" class="w-4 h-4 text-accent-amber shrink-0 mt-0.5"></i>
            <span><strong>Clinical Safe Harbor:</strong> Mosteller formula is the universal hospital standard. Always cross-verify oncology and pediatric regimens with hospital pharmacy protocols.</span>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.attachEvents(container);
    this.calculate();
  },

  attachEvents(container) {
    const hInput = container.querySelector('#bsa-height');
    const hRange = container.querySelector('#bsa-height-range');
    const hDisplay = container.querySelector('#bsa-height-display');

    const wInput = container.querySelector('#bsa-weight');
    const wRange = container.querySelector('#bsa-weight-range');
    const wDisplay = container.querySelector('#bsa-weight-display');

    const doseInput = container.querySelector('#bsa-target-dose');
    const doseDisplay = container.querySelector('#bsa-dose-display');

    const syncH = (val) => {
      hInput.value = val;
      hRange.value = val;
      hDisplay.textContent = `${val} cm`;
      this.calculate();
    };

    const syncW = (val) => {
      wInput.value = val;
      wRange.value = val;
      wDisplay.textContent = `${val} kg`;
      this.calculate();
    };

    hInput?.addEventListener('input', (e) => syncH(e.target.value));
    hRange?.addEventListener('input', (e) => syncH(e.target.value));

    wInput?.addEventListener('input', (e) => syncW(e.target.value));
    wRange?.addEventListener('input', (e) => syncW(e.target.value));

    doseInput?.addEventListener('input', (e) => {
      doseDisplay.textContent = `${e.target.value} mg/m²`;
      this.calculate();
    });

    container.querySelector('#bsa-main-card')?.addEventListener('click', () => {
      const val = container.querySelector('#bsa-mosteller-val')?.textContent;
      if (val) copyToClipboard(`BSA: ${val} m²`);
    });

    container.querySelector('#bsa-save-btn')?.addEventListener('click', () => {
      const val = container.querySelector('#bsa-mosteller-val')?.textContent;
      const h = hInput.value;
      const w = wInput.value;
      saveCalculation({
        title: 'Body Surface Area',
        summary: `BSA: ${val} m² (Height: ${h}cm, Weight: ${w}kg)`,
        timestamp: new Date().toISOString()
      });
    });

    container.querySelector('#bsa-export-csv-btn')?.addEventListener('click', () => {
      this.exportCSV();
    });
  },

  calculate() {
    const h = parseFloat(document.getElementById('bsa-height')?.value || '175');
    const w = parseFloat(document.getElementById('bsa-weight')?.value || '70');
    const targetDose = parseFloat(document.getElementById('bsa-target-dose')?.value || '50');

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) return;

    // Mosteller: sqrt( (h * w) / 3600 )
    const mosteller = Math.sqrt((h * w) / 3600);

    // DuBois: 0.007184 * (h ^ 0.725) * (w ^ 0.425)
    const dubois = 0.007184 * Math.pow(h, 0.725) * Math.pow(w, 0.425);

    // Haycock: 0.024265 * (h ^ 0.3964) * (w ^ 0.5378)
    const haycock = 0.024265 * Math.pow(h, 0.3964) * Math.pow(w, 0.5378);

    // Gehan-George: 0.0235 * (h ^ 0.42246) * (w ^ 0.51456)
    const gehan = 0.0235 * Math.pow(h, 0.42246) * Math.pow(w, 0.51456);

    // Boyd: 0.0003207 * (h ^ 0.3) * (w_grams ^ (0.7285 - 0.0188 * log10(w_grams)))
    const wGrams = w * 1000;
    const boydExp = 0.7285 - (0.0188 * Math.log10(wGrams));
    const boyd = 0.0003207 * Math.pow(h, 0.3) * Math.pow(wGrams, boydExp);

    // Total individualized drug dose
    const totalDose = mosteller * targetDose;

    // Update DOM
    const mostellerEl = document.getElementById('bsa-mosteller-val');
    const duboisEl = document.getElementById('bsa-dubois-val');
    const haycockEl = document.getElementById('bsa-haycock-val');
    const gehanEl = document.getElementById('bsa-gehan-val');
    const boydEl = document.getElementById('bsa-boyd-val');
    const totalDoseEl = document.getElementById('bsa-total-dose-val');

    if (mostellerEl) mostellerEl.textContent = mosteller.toFixed(2);
    if (duboisEl) duboisEl.textContent = `${dubois.toFixed(2)} m²`;
    if (haycockEl) haycockEl.textContent = `${haycock.toFixed(2)} m²`;
    if (gehanEl) gehanEl.textContent = `${gehan.toFixed(2)} m²`;
    if (boydEl) boydEl.textContent = `${boyd.toFixed(2)} m²`;
    if (totalDoseEl) totalDoseEl.textContent = totalDose.toFixed(1);
  },

  exportCSV() {
    const mosteller = document.getElementById('bsa-mosteller-val')?.textContent || 'N/A';
    const dubois = document.getElementById('bsa-dubois-val')?.textContent || 'N/A';
    const haycock = document.getElementById('bsa-haycock-val')?.textContent || 'N/A';
    const totalDose = document.getElementById('bsa-total-dose-val')?.textContent || 'N/A';

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Parameter,Value\n';
    csvContent += `Mosteller BSA (m2),${mosteller}\n`;
    csvContent += `DuBois BSA (m2),${dubois}\n`;
    csvContent += `Haycock BSA (m2),${haycock}\n`;
    csvContent += `Calculated Target Dose (mg),${totalDose}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'body_surface_area_ledgerandlend.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
