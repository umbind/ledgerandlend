/**
 * Essential Calculators Hub - Clinical & Medical Suite
 * Medication Dosage by Weight & Pediatric Dosing Calculator
 */

import { saveCalculation } from '../../utils/storage.js';
import { copyToClipboard } from '../../utils/formatters.js';

export const dosageCalculator = {
  id: 'dosage-calculator',
  title: 'Medication Dosage by Weight',
  category: 'medical',
  icon: 'pill',
  description: 'Calculate pediatric & adult mg/kg doses, liquid suspension volume (mL), and daily dosing intervals.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-5">
          <div class="glass-card p-5 space-y-4">
            <div class="flex items-center justify-between border-b border-subtle pb-3">
              <h3 class="font-bold text-sm text-primary flex items-center gap-2">
                <i data-lucide="flask-conical" class="w-4 h-4 text-accent-primary"></i>
                Prescription Parameters
              </h3>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-accent-emerald border border-emerald-200 dark:border-emerald-800">
                Weight-Based (mg/kg)
              </span>
            </div>

            <!-- Patient Weight -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Patient Weight</span>
                <span class="font-mono text-accent-primary font-bold" id="dose-weight-display">15 kg (Child)</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="dose-weight" class="calc-input" value="15" min="1" max="250" step="0.5">
                <span class="calc-input-suffix font-bold">kg</span>
              </div>
              <input type="range" id="dose-weight-range" class="calc-range" value="15" min="2" max="100" step="0.5">
              <!-- Quick Weight Presets -->
              <div class="flex items-center gap-1.5 overflow-x-auto pt-1 text-[11px]" id="dose-weight-presets">
                <span class="text-muted text-[10px] uppercase font-bold shrink-0">Presets:</span>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="5">5kg (Infant)</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="12">12kg (Toddler)</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="25">25kg (Child)</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="70">70kg (Adult)</button>
              </div>
            </div>

            <!-- Target Dose per kg -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Prescribed Dose (mg per kg per day)</span>
                <span class="font-mono text-accent-primary font-bold" id="dose-mg-display">15 mg/kg</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="dose-mg-kg" class="calc-input" value="15" min="0.1" max="500" step="0.5">
                <span class="calc-input-suffix font-bold">mg/kg</span>
              </div>
            </div>

            <!-- Dosing Frequency -->
            <div class="calc-input-group">
              <label for="dose-frequency" class="calc-label font-bold">Dosing Frequency</label>
              <select id="dose-frequency" class="calc-select">
                <option value="1">Once Daily (Every 24 hours)</option>
                <option value="2">Twice Daily (BID - Every 12 hours)</option>
                <option value="3" selected>Three Times Daily (TID - Every 8 hours)</option>
                <option value="4">Four Times Daily (QID - Every 6 hours)</option>
              </select>
            </div>

            <!-- Liquid Medicine Suspension Concentration -->
            <div class="p-3 rounded-lg bg-secondary border border-subtle space-y-3">
              <div class="text-xs font-bold text-primary flex items-center gap-1.5">
                <i data-lucide="droplet" class="w-3.5 h-3.5 text-accent-primary"></i>
                Liquid Suspension Concentration (Optional)
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="dose-conc-mg" class="text-[10px] text-muted font-bold block mb-1">Medication (mg)</label>
                  <input type="number" id="dose-conc-mg" class="calc-input text-xs" value="250" min="1" step="10">
                </div>
                <div>
                  <label for="dose-conc-ml" class="text-[10px] text-muted font-bold block mb-1">Per Volume (mL)</label>
                  <input type="number" id="dose-conc-ml" class="calc-input text-xs" value="5" min="0.5" step="0.5">
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="pt-2 flex items-center gap-3">
              <button id="dose-save-btn" class="btn btn-secondary btn-sm flex-1 flex items-center justify-center gap-1.5">
                <i data-lucide="bookmark" class="w-3.5 h-3.5"></i>
                <span>Save to History</span>
              </button>
              <button id="dose-export-csv-btn" class="btn btn-secondary btn-sm flex items-center gap-1.5" title="Export Dose CSV">
                <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5 text-accent-emerald"></i>
                <span class="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Outputs -->
        <div class="lg:col-span-6 space-y-4">
          <!-- Primary Single Dose Card -->
          <div class="result-card p-5 cursor-pointer relative group" id="dose-main-card" title="Click to copy single dose">
            <div class="flex justify-between items-start">
              <div>
                <div class="text-[11px] font-bold text-muted uppercase tracking-wider">Single Dose per Administration</div>
                <div class="text-3xl sm:text-4xl font-extrabold text-accent-primary mt-1 font-mono flex items-baseline gap-1">
                  <span id="dose-single-mg">75.0</span>
                  <span class="text-base font-normal text-muted">mg</span>
                </div>
                <div class="text-xs text-secondary mt-1 font-semibold" id="dose-single-liquid">or 1.5 mL liquid per dose</div>
              </div>
              <span class="text-[10px] text-muted flex items-center gap-1 group-hover:text-primary transition-colors bg-secondary/80 px-2 py-1 rounded">
                <i data-lucide="copy" class="w-3 h-3"></i> Click to Copy
              </span>
            </div>
          </div>

          <!-- Total Daily Dose Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="glass-card p-4">
              <div class="text-[11px] font-bold text-muted uppercase">Total Daily Dose</div>
              <div class="text-2xl font-extrabold text-primary font-mono mt-1" id="dose-total-mg">225.0 mg</div>
              <div class="text-[11px] text-muted mt-0.5">Across all divided doses</div>
            </div>

            <div class="glass-card p-4">
              <div class="text-[11px] font-bold text-muted uppercase">Total Daily Liquid Volume</div>
              <div class="text-2xl font-extrabold text-accent-emerald font-mono mt-1" id="dose-total-liquid">4.5 mL/day</div>
              <div class="text-[11px] text-muted mt-0.5">For liquid oral suspension</div>
            </div>
          </div>

          <!-- Dosing Administration Schedule Card -->
          <div class="glass-card p-4 space-y-2">
            <div class="text-xs font-bold text-primary flex items-center gap-1.5">
              <i data-lucide="clock" class="w-3.5 h-3.5 text-accent-primary"></i>
              Daily Administration Schedule
            </div>
            <div class="space-y-1.5 text-xs" id="dose-schedule-list"></div>
          </div>

          <!-- Clinical Safe Harbor Note -->
          <div class="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed flex items-start gap-2">
            <i data-lucide="alert-triangle" class="w-4 h-4 text-accent-amber shrink-0 mt-0.5"></i>
            <span><strong>Prescription Verification:</strong> Always verify drug maximum daily limits and pediatric contraindications with the official drug monograph.</span>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.attachEvents(container);
    this.calculate();
  },

  attachEvents(container) {
    const wInput = container.querySelector('#dose-weight');
    const wRange = container.querySelector('#dose-weight-range');
    const wDisplay = container.querySelector('#dose-weight-display');

    const mgInput = container.querySelector('#dose-mg-kg');
    const mgDisplay = container.querySelector('#dose-mg-display');
    const freqSelect = container.querySelector('#dose-frequency');

    const concMg = container.querySelector('#dose-conc-mg');
    const concMl = container.querySelector('#dose-conc-ml');

    const syncW = (val) => {
      wInput.value = val;
      wRange.value = val;
      wDisplay.textContent = `${val} kg`;
      this.calculate();
    };

    wInput?.addEventListener('input', (e) => syncW(e.target.value));
    wRange?.addEventListener('input', (e) => syncW(e.target.value));

    mgInput?.addEventListener('input', (e) => {
      mgDisplay.textContent = `${e.target.value} mg/kg`;
      this.calculate();
    });

    freqSelect?.addEventListener('change', () => this.calculate());
    concMg?.addEventListener('input', () => this.calculate());
    concMl?.addEventListener('input', () => this.calculate());

    container.querySelectorAll('#dose-weight-presets button').forEach(btn => {
      btn.addEventListener('click', () => syncW(btn.dataset.val));
    });

    container.querySelector('#dose-main-card')?.addEventListener('click', () => {
      const singleMg = container.querySelector('#dose-single-mg')?.textContent;
      const singleLiq = container.querySelector('#dose-single-liquid')?.textContent;
      if (singleMg) copyToClipboard(`Single Dose: ${singleMg} mg (${singleLiq})`);
    });

    container.querySelector('#dose-save-btn')?.addEventListener('click', () => {
      const singleMg = container.querySelector('#dose-single-mg')?.textContent;
      const totalMg = container.querySelector('#dose-total-mg')?.textContent;
      saveCalculation({
        title: 'Medication Dosage',
        summary: `Single Dose: ${singleMg} mg | Daily: ${totalMg}`,
        timestamp: new Date().toISOString()
      });
    });

    container.querySelector('#dose-export-csv-btn')?.addEventListener('click', () => {
      this.exportCSV();
    });
  },

  calculate() {
    const weight = parseFloat(document.getElementById('dose-weight')?.value || '15');
    const mgKg = parseFloat(document.getElementById('dose-mg-kg')?.value || '15');
    const frequency = parseInt(document.getElementById('dose-frequency')?.value || '3', 10);
    const concMg = parseFloat(document.getElementById('dose-conc-mg')?.value || '250');
    const concMl = parseFloat(document.getElementById('dose-conc-ml')?.value || '5');

    if (isNaN(weight) || isNaN(mgKg) || weight <= 0 || mgKg <= 0) return;

    const totalDailyMg = weight * mgKg;
    const singleDoseMg = totalDailyMg / frequency;

    // Liquid volume calculation
    const mgPerMl = concMg / concMl;
    const singleDoseMl = mgPerMl > 0 ? (singleDoseMg / mgPerMl) : 0;
    const totalDailyMl = mgPerMl > 0 ? (totalDailyMg / mgPerMl) : 0;

    const singleMgEl = document.getElementById('dose-single-mg');
    const singleLiqEl = document.getElementById('dose-single-liquid');
    const totalMgEl = document.getElementById('dose-total-mg');
    const totalLiqEl = document.getElementById('dose-total-liquid');

    if (singleMgEl) singleMgEl.textContent = singleDoseMg.toFixed(1);
    if (singleLiqEl) singleLiqEl.textContent = `or ${singleDoseMl.toFixed(2)} mL liquid per dose`;
    if (totalMgEl) totalMgEl.textContent = `${totalDailyMg.toFixed(1)} mg`;
    if (totalLiqEl) totalLiqEl.textContent = `${totalDailyMl.toFixed(2)} mL/day`;

    // Schedule breakdown
    const scheduleList = document.getElementById('dose-schedule-list');
    if (scheduleList) {
      const times = frequency === 1 ? ['Morning (08:00)'] :
                    frequency === 2 ? ['Morning (08:00)', 'Evening (20:00)'] :
                    frequency === 3 ? ['Morning (08:00)', 'Afternoon (14:00)', 'Night (20:00)'] :
                    ['Morning (06:00)', 'Noon (12:00)', 'Evening (18:00)', 'Bedtime (24:00)'];

      scheduleList.innerHTML = times.map((t, idx) => `
        <div class="flex items-center justify-between p-2 rounded bg-secondary border border-subtle">
          <div class="flex items-center gap-2">
            <span class="w-5 h-5 rounded-full bg-accent-primary-light text-accent-primary text-[10px] font-bold flex items-center justify-center">${idx + 1}</span>
            <span class="font-medium text-primary">${t}</span>
          </div>
          <span class="font-mono font-bold text-accent-emerald">${singleDoseMg.toFixed(1)} mg (${singleDoseMl.toFixed(1)} mL)</span>
        </div>
      `).join('');
    }
  },

  exportCSV() {
    const w = document.getElementById('dose-weight')?.value || '15';
    const singleMg = document.getElementById('dose-single-mg')?.textContent || 'N/A';
    const singleLiq = document.getElementById('dose-single-liquid')?.textContent || 'N/A';
    const totalMg = document.getElementById('dose-total-mg')?.textContent || 'N/A';

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Parameter,Value\n';
    csvContent += `Patient Weight (kg),${w}\n`;
    csvContent += `Single Dose (mg),${singleMg}\n`;
    csvContent += `Single Liquid Dose,${singleLiq}\n`;
    csvContent += `Total Daily Dose,${totalMg}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'medication_dosage_ledgerandlend.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
