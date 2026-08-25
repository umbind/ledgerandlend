/**
 * Essential Calculators Hub - Clinical & Medical Suite
 * Mean Arterial Pressure (MAP) & Perfusion Pressure Calculator
 */

import { saveCalculation } from '../../utils/storage.js';
import { copyToClipboard } from '../../utils/formatters.js';

export const mapCalculator = {
  id: 'mean-arterial-pressure',
  title: 'Mean Arterial Pressure (MAP) Calculator',
  category: 'medical',
  icon: 'heart',
  description: 'Evaluate mean arterial perfusion pressure (MAP) and pulse pressure to assess vital organ hemodynamic perfusion.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-5">
          <div class="glass-card p-5 space-y-4">
            <div class="flex items-center justify-between border-b border-subtle pb-3">
              <h3 class="font-bold text-sm text-primary flex items-center gap-2">
                <i data-lucide="activity" class="w-4 h-4 text-accent-rose"></i>
                Blood Pressure Measurements
              </h3>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 text-accent-rose border border-rose-200 dark:border-rose-800">
                Hemodynamics
              </span>
            </div>

            <!-- Systolic BP -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Systolic Blood Pressure (SBP)</span>
                <span class="font-mono text-accent-primary font-bold" id="map-sbp-display">120 mmHg</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="map-sbp" class="calc-input" value="120" min="50" max="260" step="1">
                <span class="calc-input-suffix font-bold">mmHg</span>
              </div>
              <input type="range" id="map-sbp-range" class="calc-range" value="120" min="70" max="220" step="1">
            </div>

            <!-- Diastolic BP -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Diastolic Blood Pressure (DBP)</span>
                <span class="font-mono text-accent-primary font-bold" id="map-dbp-display">80 mmHg</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="map-dbp" class="calc-input" value="80" min="30" max="160" step="1">
                <span class="calc-input-suffix font-bold">mmHg</span>
              </div>
              <input type="range" id="map-dbp-range" class="calc-range" value="80" min="40" max="140" step="1">
            </div>

            <!-- Quick Presets -->
            <div class="flex items-center gap-1.5 overflow-x-auto pt-1 text-[11px]" id="map-bp-presets">
              <span class="text-muted text-[10px] uppercase font-bold shrink-0">Presets:</span>
              <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-sbp="90" data-dbp="60">90/60 (Low)</button>
              <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-sbp="120" data-dbp="80">120/80 (Normal)</button>
              <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-sbp="140" data-dbp="90">140/90 (Stage 1)</button>
              <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-sbp="160" data-dbp="100">160/100 (Stage 2)</button>
            </div>

            <!-- Actions -->
            <div class="pt-2 flex items-center gap-3">
              <button id="map-save-btn" class="btn btn-secondary btn-sm flex-1 flex items-center justify-center gap-1.5">
                <i data-lucide="bookmark" class="w-3.5 h-3.5"></i>
                <span>Save to History</span>
              </button>
              <button id="map-export-csv-btn" class="btn btn-secondary btn-sm flex items-center gap-1.5" title="Export MAP Report CSV">
                <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5 text-accent-emerald"></i>
                <span class="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Outputs -->
        <div class="lg:col-span-6 space-y-4">
          <!-- Primary MAP Card -->
          <div class="result-card p-5 cursor-pointer relative group" id="map-main-card" title="Click to copy MAP">
            <div class="flex justify-between items-start">
              <div>
                <div class="text-[11px] font-bold text-muted uppercase tracking-wider">Mean Arterial Pressure (MAP)</div>
                <div class="text-3xl sm:text-4xl font-extrabold text-accent-primary mt-1 font-mono flex items-baseline gap-1">
                  <span id="map-val-display">93.3</span>
                  <span class="text-base font-normal text-muted">mmHg</span>
                </div>
                <div class="text-xs font-semibold mt-1" id="map-status-badge">Normal Perfusion Pressure (65 – 100 mmHg)</div>
              </div>
              <span class="text-[10px] text-muted flex items-center gap-1 group-hover:text-primary transition-colors bg-secondary/80 px-2 py-1 rounded">
                <i data-lucide="copy" class="w-3 h-3"></i> Click to Copy
              </span>
            </div>
          </div>

          <!-- Secondary Grid: Pulse Pressure & Formula Breakdown -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="glass-card p-4">
              <div class="text-[11px] font-bold text-muted uppercase">Pulse Pressure (SBP - DBP)</div>
              <div class="text-2xl font-extrabold text-primary font-mono mt-1" id="map-pp-display">40 mmHg</div>
              <div class="text-[11px] text-muted mt-0.5" id="map-pp-status">Normal Elasticity (30 – 50 mmHg)</div>
            </div>

            <div class="glass-card p-4">
              <div class="text-[11px] font-bold text-muted uppercase">Organ Perfusion Target</div>
              <div class="text-2xl font-extrabold text-accent-emerald font-mono mt-1">≥ 65 mmHg</div>
              <div class="text-[11px] text-muted mt-0.5">Renal & Brain Target Threshold</div>
            </div>
          </div>

          <!-- Clinical Perfusion Stages Reference -->
          <div class="glass-card p-4 space-y-2">
            <div class="text-xs font-bold text-primary">Clinical Interpretation Scale</div>
            <div class="space-y-1.5 text-xs">
              <div class="flex items-center justify-between p-2 rounded bg-secondary border border-subtle">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span class="font-semibold text-primary">&lt; 60 mmHg</span>
                </div>
                <span class="text-rose-600 dark:text-rose-400 font-medium">Inadequate Organ Perfusion (Ischemia Risk)</span>
              </div>
              <div class="flex items-center justify-between p-2 rounded bg-secondary border border-subtle">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span class="font-semibold text-primary">65 – 100 mmHg</span>
                </div>
                <span class="text-emerald-600 dark:text-emerald-400 font-medium">Optimal Organ Perfusion Range</span>
              </div>
              <div class="flex items-center justify-between p-2 rounded bg-secondary border border-subtle">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span class="font-semibold text-primary">&gt; 100 mmHg</span>
                </div>
                <span class="text-amber-600 dark:text-amber-400 font-medium">Elevated Vascular Resistance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.attachEvents(container);
    this.calculate();
  },

  attachEvents(container) {
    const sbpInput = container.querySelector('#map-sbp');
    const sbpRange = container.querySelector('#map-sbp-range');
    const sbpDisplay = container.querySelector('#map-sbp-display');

    const dbpInput = container.querySelector('#map-dbp');
    const dbpRange = container.querySelector('#map-dbp-range');
    const dbpDisplay = container.querySelector('#map-dbp-display');

    const syncSbp = (val) => {
      sbpInput.value = val;
      sbpRange.value = val;
      sbpDisplay.textContent = `${val} mmHg`;
      this.calculate();
    };

    const syncDbp = (val) => {
      dbpInput.value = val;
      dbpRange.value = val;
      dbpDisplay.textContent = `${val} mmHg`;
      this.calculate();
    };

    sbpInput?.addEventListener('input', (e) => syncSbp(e.target.value));
    sbpRange?.addEventListener('input', (e) => syncSbp(e.target.value));

    dbpInput?.addEventListener('input', (e) => syncDbp(e.target.value));
    dbpRange?.addEventListener('input', (e) => syncDbp(e.target.value));

    container.querySelectorAll('#map-bp-presets button').forEach(btn => {
      btn.addEventListener('click', () => {
        syncSbp(btn.dataset.sbp);
        syncDbp(btn.dataset.dbp);
      });
    });

    container.querySelector('#map-main-card')?.addEventListener('click', () => {
      const val = container.querySelector('#map-val-display')?.textContent;
      if (val) copyToClipboard(`Mean Arterial Pressure: ${val} mmHg`);
    });

    container.querySelector('#map-save-btn')?.addEventListener('click', () => {
      const val = container.querySelector('#map-val-display')?.textContent;
      const sbp = sbpInput.value;
      const dbp = dbpInput.value;
      saveCalculation({
        title: 'Mean Arterial Pressure',
        summary: `MAP: ${val} mmHg (BP: ${sbp}/${dbp} mmHg)`,
        timestamp: new Date().toISOString()
      });
    });

    container.querySelector('#map-export-csv-btn')?.addEventListener('click', () => {
      this.exportCSV();
    });
  },

  calculate() {
    const sbp = parseFloat(document.getElementById('map-sbp')?.value || '120');
    const dbp = parseFloat(document.getElementById('map-dbp')?.value || '80');

    if (isNaN(sbp) || isNaN(dbp) || sbp <= 0 || dbp <= 0) return;

    // MAP = DBP + (1/3 * (SBP - DBP)) = (SBP + 2*DBP) / 3
    const map = (sbp + (2 * dbp)) / 3;
    const pulsePressure = sbp - dbp;

    const mapValEl = document.getElementById('map-val-display');
    const mapStatusEl = document.getElementById('map-status-badge');
    const ppEl = document.getElementById('map-pp-display');
    const ppStatusEl = document.getElementById('map-pp-status');

    if (mapValEl) mapValEl.textContent = map.toFixed(1);
    if (ppEl) ppEl.textContent = `${pulsePressure.toFixed(0)} mmHg`;

    if (mapStatusEl) {
      if (map < 60) {
        mapStatusEl.textContent = 'Critical Low Perfusion (< 60 mmHg) - Ischemia Risk';
        mapStatusEl.className = 'text-xs font-bold mt-1 text-rose-600 dark:text-rose-400';
      } else if (map <= 100) {
        mapStatusEl.textContent = 'Optimal Organ Perfusion (65 – 100 mmHg)';
        mapStatusEl.className = 'text-xs font-bold mt-1 text-emerald-600 dark:text-emerald-400';
      } else {
        mapStatusEl.textContent = 'High Perfusion Pressure (> 100 mmHg)';
        mapStatusEl.className = 'text-xs font-bold mt-1 text-amber-600 dark:text-amber-400';
      }
    }

    if (ppStatusEl) {
      if (pulsePressure > 50) {
        ppStatusEl.textContent = 'Elevated (Possible arterial stiffness)';
      } else if (pulsePressure < 30) {
        ppStatusEl.textContent = 'Narrowed (Low stroke volume)';
      } else {
        ppStatusEl.textContent = 'Normal Elasticity Range (30 – 50 mmHg)';
      }
    }
  },

  exportCSV() {
    const sbp = document.getElementById('map-sbp')?.value || '120';
    const dbp = document.getElementById('map-dbp')?.value || '80';
    const map = document.getElementById('map-val-display')?.textContent || 'N/A';
    const pp = document.getElementById('map-pp-display')?.textContent || 'N/A';

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Parameter,Value\n';
    csvContent += `Systolic BP (mmHg),${sbp}\n`;
    csvContent += `Diastolic BP (mmHg),${dbp}\n`;
    csvContent += `Mean Arterial Pressure (MAP),${map}\n`;
    csvContent += `Pulse Pressure (mmHg),${pp}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'mean_arterial_pressure_ledgerandlend.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
