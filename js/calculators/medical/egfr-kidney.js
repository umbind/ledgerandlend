/**
 * Essential Calculators Hub - Clinical & Medical Suite
 * eGFR (Estimated Glomerular Filtration Rate) Calculator (CKD-EPI 2021 International Standard)
 */

import { saveCalculation } from '../../utils/storage.js';
import { copyToClipboard } from '../../utils/formatters.js';

export const egfrCalculator = {
  id: 'egfr-kidney',
  title: 'eGFR Kidney Function Calculator',
  category: 'medical',
  icon: 'activity',
  description: 'Evaluate estimated Glomerular Filtration Rate (eGFR) and Chronic Kidney Disease (CKD) staging using the 2021 CKD-EPI equation.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-5">
          <div class="glass-card p-5 space-y-4">
            <div class="flex items-center justify-between border-b border-subtle pb-3">
              <h3 class="font-bold text-sm text-primary flex items-center gap-2">
                <i data-lucide="dna" class="w-4 h-4 text-accent-primary"></i>
                Clinical Chemistry Parameters
              </h3>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-accent-primary border border-blue-200 dark:border-blue-800">
                CKD-EPI 2021 Ref
              </span>
            </div>

            <!-- Serum Creatinine -->
            <div class="calc-input-group">
              <div class="flex items-center justify-between">
                <div class="calc-label mb-0">
                  <span>Serum Creatinine</span>
                  <span class="font-mono text-accent-primary font-bold" id="egfr-scr-display">1.0 mg/dL</span>
                </div>
                <!-- Unit Switcher -->
                <select id="egfr-scr-unit" class="text-[11px] py-0.5 px-2 font-bold rounded bg-tertiary border border-subtle">
                  <option value="mgdl" selected>mg/dL</option>
                  <option value="umol">µmol/L</option>
                </select>
              </div>
              <div class="calc-input-wrapper has-suffix mt-2">
                <input type="number" id="egfr-scr" class="calc-input" value="1.0" min="0.1" max="25" step="0.05">
                <span class="calc-input-suffix font-bold" id="egfr-scr-unit-suffix">mg/dL</span>
              </div>
              <input type="range" id="egfr-scr-range" class="calc-range" value="1.0" min="0.4" max="5.0" step="0.05">
            </div>

            <!-- Age & Gender Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Age -->
              <div class="calc-input-group">
                <div class="calc-label">
                  <span>Age (Years)</span>
                  <span class="font-mono text-accent-primary font-bold" id="egfr-age-display">50</span>
                </div>
                <input type="number" id="egfr-age" class="calc-input" value="50" min="18" max="110" step="1">
              </div>

              <!-- Gender -->
              <div class="calc-input-group">
                <label for="egfr-gender" class="calc-label font-bold">Biological Sex</label>
                <select id="egfr-gender" class="calc-select">
                  <option value="male" selected>Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <!-- Actions -->
            <div class="pt-2 flex items-center gap-3">
              <button id="egfr-save-btn" class="btn btn-secondary btn-sm flex-1 flex items-center justify-center gap-1.5">
                <i data-lucide="bookmark" class="w-3.5 h-3.5"></i>
                <span>Save to History</span>
              </button>
              <button id="egfr-export-csv-btn" class="btn btn-secondary btn-sm flex items-center gap-1.5" title="Export eGFR Report CSV">
                <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5 text-accent-emerald"></i>
                <span class="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Outputs -->
        <div class="lg:col-span-6 space-y-4">
          <!-- Primary eGFR Card -->
          <div class="result-card p-5 cursor-pointer relative group" id="egfr-main-card" title="Click to copy eGFR">
            <div class="flex justify-between items-start">
              <div>
                <div class="text-[11px] font-bold text-muted uppercase tracking-wider">Estimated GFR (CKD-EPI 2021)</div>
                <div class="text-3xl sm:text-4xl font-extrabold text-accent-primary mt-1 font-mono flex items-baseline gap-1">
                  <span id="egfr-val-display">86</span>
                  <span class="text-base font-normal text-muted">mL/min/1.73m²</span>
                </div>
                <div class="text-xs font-bold mt-1" id="egfr-stage-badge">Stage 2: Mildly Decreased GFR (60 – 89)</div>
              </div>
              <span class="text-[10px] text-muted flex items-center gap-1 group-hover:text-primary transition-colors bg-secondary/80 px-2 py-1 rounded">
                <i data-lucide="copy" class="w-3 h-3"></i> Click to Copy
              </span>
            </div>
          </div>

          <!-- CKD Staging Scale Table -->
          <div class="glass-card p-4 space-y-2">
            <div class="text-xs font-bold text-primary flex items-center justify-between">
              <span>KDIGO Chronic Kidney Disease (CKD) Staging</span>
              <span class="text-[10px] text-muted font-mono">mL/min/1.73m²</span>
            </div>
            <div class="space-y-1.5 text-xs" id="egfr-stages-list">
              <div class="flex items-center justify-between p-2 rounded bg-secondary border border-subtle" id="stage-g1">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span class="font-semibold text-primary">Stage G1 (≥ 90)</span>
                </div>
                <span class="text-emerald-600 dark:text-emerald-400 font-medium">Normal or High Kidney Function</span>
              </div>
              <div class="flex items-center justify-between p-2 rounded bg-secondary border border-subtle" id="stage-g2">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span class="font-semibold text-primary">Stage G2 (60 – 89)</span>
                </div>
                <span class="text-blue-600 dark:text-blue-400 font-medium">Mildly Decreased Function</span>
              </div>
              <div class="flex items-center justify-between p-2 rounded bg-secondary border border-subtle" id="stage-g3a">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span class="font-semibold text-primary">Stage G3a (45 – 59)</span>
                </div>
                <span class="text-amber-600 dark:text-amber-400 font-medium">Mild to Moderately Decreased</span>
              </div>
              <div class="flex items-center justify-between p-2 rounded bg-secondary border border-subtle" id="stage-g3b">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  <span class="font-semibold text-primary">Stage G3b (30 – 44)</span>
                </div>
                <span class="text-orange-600 dark:text-orange-400 font-medium">Moderately to Severely Decreased</span>
              </div>
              <div class="flex items-center justify-between p-2 rounded bg-secondary border border-subtle" id="stage-g4">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span class="font-semibold text-primary">Stage G4 (15 – 29)</span>
                </div>
                <span class="text-rose-600 dark:text-rose-400 font-medium">Severely Decreased Function</span>
              </div>
              <div class="flex items-center justify-between p-2 rounded bg-secondary border border-subtle" id="stage-g5">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-700"></span>
                  <span class="font-semibold text-primary">Stage G5 (&lt; 15)</span>
                </div>
                <span class="text-red-700 dark:text-red-400 font-bold">Kidney Failure (Dialysis / Transplant)</span>
              </div>
            </div>
          </div>

          <!-- Clinical Recommendation Note -->
          <div class="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-[11px] text-blue-800 dark:text-blue-300 leading-relaxed flex items-start gap-2">
            <i data-lucide="info" class="w-4 h-4 text-accent-primary shrink-0 mt-0.5"></i>
            <span><strong>Clinical Standard:</strong> Uses the 2021 CKD-EPI equation recommended by the National Kidney Foundation (NKF) and ASN. For accurate clinical diagnosis, combine with urinary albumin-to-creatinine ratio (uACR).</span>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.attachEvents(container);
    this.calculate();
  },

  attachEvents(container) {
    const scrInput = container.querySelector('#egfr-scr');
    const scrRange = container.querySelector('#egfr-scr-range');
    const scrDisplay = container.querySelector('#egfr-scr-display');
    const scrUnit = container.querySelector('#egfr-scr-unit');
    const scrSuffix = container.querySelector('#egfr-scr-unit-suffix');

    const ageInput = container.querySelector('#egfr-age');
    const ageDisplay = container.querySelector('#egfr-age-display');
    const genderSelect = container.querySelector('#egfr-gender');

    const syncScr = (val) => {
      scrInput.value = val;
      scrRange.value = val;
      const u = scrUnit.value === 'umol' ? 'µmol/L' : 'mg/dL';
      scrDisplay.textContent = `${val} ${u}`;
      this.calculate();
    };

    scrInput?.addEventListener('input', (e) => syncScr(e.target.value));
    scrRange?.addEventListener('input', (e) => syncScr(e.target.value));

    scrUnit?.addEventListener('change', () => {
      const u = scrUnit.value;
      if (u === 'umol') {
        scrSuffix.textContent = 'µmol/L';
        scrRange.min = '35';
        scrRange.max = '450';
        scrRange.step = '5';
        scrInput.value = '88.4';
        scrRange.value = '88.4';
        scrDisplay.textContent = '88.4 µmol/L';
      } else {
        scrSuffix.textContent = 'mg/dL';
        scrRange.min = '0.4';
        scrRange.max = '5.0';
        scrRange.step = '0.05';
        scrInput.value = '1.0';
        scrRange.value = '1.0';
        scrDisplay.textContent = '1.0 mg/dL';
      }
      this.calculate();
    });

    ageInput?.addEventListener('input', (e) => {
      ageDisplay.textContent = e.target.value;
      this.calculate();
    });

    genderSelect?.addEventListener('change', () => this.calculate());

    container.querySelector('#egfr-main-card')?.addEventListener('click', () => {
      const val = container.querySelector('#egfr-val-display')?.textContent;
      if (val) copyToClipboard(`eGFR: ${val} mL/min/1.73m²`);
    });

    container.querySelector('#egfr-save-btn')?.addEventListener('click', () => {
      const val = container.querySelector('#egfr-val-display')?.textContent;
      const stage = container.querySelector('#egfr-stage-badge')?.textContent;
      saveCalculation({
        title: 'eGFR Kidney Function',
        summary: `eGFR: ${val} mL/min/1.73m² (${stage})`,
        timestamp: new Date().toISOString()
      });
    });

    container.querySelector('#egfr-export-csv-btn')?.addEventListener('click', () => {
      this.exportCSV();
    });
  },

  calculate() {
    let scr = parseFloat(document.getElementById('egfr-scr')?.value || '1.0');
    const unit = document.getElementById('egfr-scr-unit')?.value || 'mgdl';
    const age = parseFloat(document.getElementById('egfr-age')?.value || '50');
    const gender = document.getElementById('egfr-gender')?.value || 'male';

    if (isNaN(scr) || isNaN(age) || scr <= 0 || age <= 0) return;

    // Convert umol/L to mg/dL for CKD-EPI formula: mg/dL = umol/L / 88.4
    if (unit === 'umol') {
      scr = scr / 88.4;
    }

    // CKD-EPI 2021 Equation
    let egfr = 0;
    const isFemale = gender === 'female';
    const kappa = isFemale ? 0.7 : 0.9;
    const alpha = isFemale ? -0.241 : -0.302;
    const femaleMultiplier = isFemale ? 1.012 : 1.0;

    const scrRatio = scr / kappa;
    const minPart = Math.pow(Math.min(scrRatio, 1), alpha);
    const maxPart = Math.pow(Math.max(scrRatio, 1), -1.200);
    const agePart = Math.pow(0.9938, age);

    egfr = 142 * minPart * maxPart * agePart * femaleMultiplier;

    const egfrValEl = document.getElementById('egfr-val-display');
    const stageBadgeEl = document.getElementById('egfr-stage-badge');

    if (egfrValEl) egfrValEl.textContent = Math.round(egfr).toString();

    // Highlight active stage in reference table
    const stages = ['stage-g1', 'stage-g2', 'stage-g3a', 'stage-g3b', 'stage-g4', 'stage-g5'];
    stages.forEach(s => {
      const el = document.getElementById(s);
      if (el) el.classList.remove('border-accent-primary', 'bg-accent-primary-light');
    });

    let activeStageId = 'stage-g1';
    if (stageBadgeEl) {
      if (egfr >= 90) {
        stageBadgeEl.textContent = 'Stage G1: Normal or High Kidney Function (≥ 90)';
        stageBadgeEl.className = 'text-xs font-bold mt-1 text-emerald-600 dark:text-emerald-400';
        activeStageId = 'stage-g1';
      } else if (egfr >= 60) {
        stageBadgeEl.textContent = 'Stage G2: Mildly Decreased GFR (60 – 89)';
        stageBadgeEl.className = 'text-xs font-bold mt-1 text-blue-600 dark:text-blue-400';
        activeStageId = 'stage-g2';
      } else if (egfr >= 45) {
        stageBadgeEl.textContent = 'Stage G3a: Mild to Moderately Decreased GFR (45 – 59)';
        stageBadgeEl.className = 'text-xs font-bold mt-1 text-amber-600 dark:text-amber-400';
        activeStageId = 'stage-g3a';
      } else if (egfr >= 30) {
        stageBadgeEl.textContent = 'Stage G3b: Moderately to Severely Decreased GFR (30 – 44)';
        stageBadgeEl.className = 'text-xs font-bold mt-1 text-orange-600 dark:text-orange-400';
        activeStageId = 'stage-g3b';
      } else if (egfr >= 15) {
        stageBadgeEl.textContent = 'Stage G4: Severely Decreased Kidney Function (15 – 29)';
        stageBadgeEl.className = 'text-xs font-bold mt-1 text-rose-600 dark:text-rose-400';
        activeStageId = 'stage-g4';
      } else {
        stageBadgeEl.textContent = 'Stage G5: Kidney Failure (< 15)';
        stageBadgeEl.className = 'text-xs font-bold mt-1 text-red-700 dark:text-red-400';
        activeStageId = 'stage-g5';
      }
    }

    const activeRow = document.getElementById(activeStageId);
    if (activeRow) {
      activeRow.classList.add('border-accent-primary', 'bg-accent-primary-light');
    }
  },

  exportCSV() {
    const egfr = document.getElementById('egfr-val-display')?.textContent || 'N/A';
    const stage = document.getElementById('egfr-stage-badge')?.textContent || 'N/A';
    const scr = document.getElementById('egfr-scr')?.value || '1.0';
    const age = document.getElementById('egfr-age')?.value || '50';
    const gender = document.getElementById('egfr-gender')?.value || 'male';

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Parameter,Value\n';
    csvContent += `eGFR (mL/min/1.73m2),${egfr}\n`;
    csvContent += `CKD Stage,${stage}\n`;
    csvContent += `Serum Creatinine,${scr}\n`;
    csvContent += `Age,${age}\n`;
    csvContent += `Sex,${gender}\n`;
    csvContent += `Formula Standard,CKD-EPI 2021 (Race-Free)\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'egfr_kidney_function_ledgerandlend.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
