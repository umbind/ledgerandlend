/**
 * Essential Calculators Hub - Clinical & Medical Suite
 * Pregnancy Due Date & Gestational Age Calculator (Naegele's Rule + Ultrasound Estimation)
 */

import { saveCalculation } from '../../utils/storage.js';
import { copyToClipboard } from '../../utils/formatters.js';

export const pregnancyCalculator = {
  id: 'pregnancy-due-date',
  title: 'Pregnancy Due Date & Gestational Age',
  category: 'medical',
  icon: 'baby',
  description: 'Calculate Estimated Due Date (EDD), current gestational age, conception date, and fetal developmental milestones.',

  render(container) {
    const now = new Date();
    const defaultLmp = new Date(now.getTime() - (70 * 24 * 60 * 60 * 1000));
    const defaultLmpStr = defaultLmp.toISOString().split('T')[0];

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Input Controls -->
        <div class="lg:col-span-6 space-y-5">
          <div class="glass-card p-5 space-y-4">
            <div class="flex items-center justify-between border-b border-subtle pb-3">
              <h3 class="font-bold text-sm text-primary flex items-center gap-2">
                <i data-lucide="calendar-heart" class="w-4 h-4 text-accent-rose"></i>
                Pregnancy Clinical Parameters
              </h3>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 text-accent-rose border border-rose-200 dark:border-rose-800">
                Naegele's Rule
              </span>
            </div>

            <!-- Calculation Method -->
            <div class="calc-input-group">
              <label for="preg-calc-method" class="calc-label font-bold">Calculation Method</label>
              <select id="preg-calc-method" class="calc-select">
                <option value="lmp" selected>Last Menstrual Period (LMP)</option>
                <option value="conception">Exact Conception / Ovulation Date</option>
                <option value="ultrasound">Ultrasound Dating (Gestational Age at Scan)</option>
              </select>
            </div>

            <!-- Date Selector -->
            <div class="calc-input-group" id="preg-date-container">
              <div class="calc-label">
                <span id="preg-date-label">First Day of Last Period (LMP)</span>
              </div>
              <input type="date" id="preg-input-date" class="calc-input" value="${defaultLmpStr}">
            </div>

            <!-- Average Cycle Length (for LMP method) -->
            <div class="calc-input-group" id="preg-cycle-container">
              <div class="calc-label">
                <span>Average Menstrual Cycle Length (Days)</span>
                <span class="font-mono text-accent-primary font-bold" id="preg-cycle-display">28 days</span>
              </div>
              <input type="range" id="preg-cycle-range" class="calc-range" value="28" min="20" max="45" step="1">
              <div class="flex items-center gap-1.5 overflow-x-auto pt-1 text-[11px]" id="preg-cycle-presets">
                <span class="text-muted text-[10px] uppercase font-bold shrink-0">Presets:</span>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="26">26d (Short)</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="28">28d (Standard)</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="30">30d (Average)</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="35">35d (Long)</button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="pt-2 flex items-center gap-3">
              <button id="preg-save-btn" class="btn btn-secondary btn-sm flex-1 flex items-center justify-center gap-1.5">
                <i data-lucide="bookmark" class="w-3.5 h-3.5"></i>
                <span>Save to History</span>
              </button>
              <button id="preg-export-csv-btn" class="btn btn-secondary btn-sm flex items-center gap-1.5" title="Export Pregnancy Timeline CSV">
                <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5 text-accent-emerald"></i>
                <span class="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Output Cards & Milestones -->
        <div class="lg:col-span-6 space-y-4">
          <!-- Main Due Date Card -->
          <div class="result-card p-5 cursor-pointer relative group" id="preg-edd-card" title="Click to copy Estimated Due Date">
            <div class="flex justify-between items-start">
              <div>
                <div class="text-[11px] font-bold text-muted uppercase tracking-wider">Estimated Due Date (EDD)</div>
                <div class="text-2xl sm:text-3xl font-extrabold text-accent-primary mt-1 font-mono" id="preg-edd-display">--</div>
                <div class="text-xs text-secondary mt-1 font-medium" id="preg-days-remaining-display">--</div>
              </div>
              <span class="text-[10px] text-muted flex items-center gap-1 group-hover:text-primary transition-colors bg-secondary/80 px-2 py-1 rounded">
                <i data-lucide="copy" class="w-3 h-3"></i> Click to Copy
              </span>
            </div>
          </div>

          <!-- Gestational Age & Trimester Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="glass-card p-4">
              <div class="text-[11px] font-bold text-muted uppercase">Current Gestational Age</div>
              <div class="text-xl font-extrabold text-primary font-mono mt-1" id="preg-ga-display">--</div>
              <div class="text-[11px] text-accent-emerald font-semibold mt-0.5" id="preg-trimester-badge">1st Trimester</div>
            </div>

            <div class="glass-card p-4">
              <div class="text-[11px] font-bold text-muted uppercase">Estimated Conception Date</div>
              <div class="text-xl font-extrabold text-secondary font-mono mt-1" id="preg-conception-display">--</div>
              <div class="text-[11px] text-muted mt-0.5">~14 days after LMP</div>
            </div>
          </div>

          <!-- Pregnancy Progress Bar -->
          <div class="glass-card p-4 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-primary">Pregnancy Progress</span>
              <span class="font-mono font-bold text-accent-primary" id="preg-progress-percent">0%</span>
            </div>
            <div class="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
              <div id="preg-progress-bar" class="h-full bg-gradient-to-r from-accent-rose via-accent-violet to-accent-primary transition-all duration-500 rounded-full" style="width: 25%;"></div>
            </div>
            <div class="flex justify-between text-[10px] text-muted font-mono pt-0.5">
              <span>Week 0 (LMP)</span>
              <span>Week 13 (2nd Tri)</span>
              <span>Week 28 (3rd Tri)</span>
              <span>Week 40 (Full Term)</span>
            </div>
          </div>

          <!-- Key Developmental Milestones Table -->
          <div class="glass-card p-4 space-y-2">
            <div class="text-xs font-bold text-primary flex items-center gap-1.5">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-accent-amber"></i>
              Key Clinical Milestones & Ultrasound Dates
            </div>
            <div class="space-y-1.5 text-xs" id="preg-milestones-list"></div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    this.attachEvents(container);
    this.calculate();
  },

  attachEvents(container) {
    const methodSelect = container.querySelector('#preg-calc-method');
    const dateInput = container.querySelector('#preg-input-date');
    const cycleRange = container.querySelector('#preg-cycle-range');
    const cycleDisplay = container.querySelector('#preg-cycle-display');
    const dateLabel = container.querySelector('#preg-date-label');
    const cycleContainer = container.querySelector('#preg-cycle-container');

    methodSelect?.addEventListener('change', () => {
      const val = methodSelect.value;
      if (val === 'conception') {
        dateLabel.textContent = 'Estimated Conception / Ovulation Date';
        cycleContainer.style.display = 'none';
      } else if (val === 'ultrasound') {
        dateLabel.textContent = 'Date of Ultrasound Scan';
        cycleContainer.style.display = 'none';
      } else {
        dateLabel.textContent = 'First Day of Last Period (LMP)';
        cycleContainer.style.display = 'block';
      }
      this.calculate();
    });

    dateInput?.addEventListener('input', () => this.calculate());
    cycleRange?.addEventListener('input', (e) => {
      cycleDisplay.textContent = `${e.target.value} days`;
      this.calculate();
    });

    container.querySelectorAll('#preg-cycle-presets button').forEach(btn => {
      btn.addEventListener('click', () => {
        cycleRange.value = btn.dataset.val;
        cycleDisplay.textContent = `${btn.dataset.val} days`;
        this.calculate();
      });
    });

    container.querySelector('#preg-edd-card')?.addEventListener('click', () => {
      const edd = container.querySelector('#preg-edd-display')?.textContent;
      if (edd && edd !== '--') {
        copyToClipboard(`Estimated Due Date: ${edd}`);
      }
    });

    container.querySelector('#preg-save-btn')?.addEventListener('click', () => {
      const edd = container.querySelector('#preg-edd-display')?.textContent;
      const ga = container.querySelector('#preg-ga-display')?.textContent;
      saveCalculation({
        title: 'Pregnancy Due Date',
        summary: `EDD: ${edd} | Gestational Age: ${ga}`,
        timestamp: new Date().toISOString()
      });
    });

    container.querySelector('#preg-export-csv-btn')?.addEventListener('click', () => {
      this.exportCSV();
    });
  },

  calculate() {
    const method = document.getElementById('preg-calc-method')?.value || 'lmp';
    const dateVal = document.getElementById('preg-input-date')?.value;
    const cycleDays = parseInt(document.getElementById('preg-cycle-range')?.value || '28', 10);

    if (!dateVal) return;

    const baseDate = new Date(dateVal + 'T00:00:00');
    if (isNaN(baseDate.getTime())) return;

    let edd = new Date(baseDate);
    let conceptionDate = new Date(baseDate);
    let lmpDate = new Date(baseDate);

    if (method === 'lmp') {
      const daysToAdd = 280 + (cycleDays - 28);
      edd = new Date(baseDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
      conceptionDate = new Date(baseDate.getTime() + ((14 + (cycleDays - 28)) * 24 * 60 * 60 * 1000));
    } else if (method === 'conception') {
      edd = new Date(baseDate.getTime() + (266 * 24 * 60 * 60 * 1000));
      conceptionDate = new Date(baseDate);
      lmpDate = new Date(baseDate.getTime() - (14 * 24 * 60 * 60 * 1000));
    } else {
      edd = new Date(baseDate.getTime() + ((280 - 70) * 24 * 60 * 60 * 1000));
      conceptionDate = new Date(baseDate.getTime() - (56 * 24 * 60 * 60 * 1000));
      lmpDate = new Date(baseDate.getTime() - (70 * 24 * 60 * 60 * 1000));
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysSinceLmp = Math.max(0, Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24)));
    const gaWeeks = Math.floor(daysSinceLmp / 7);
    const gaDays = daysSinceLmp % 7;

    const daysRemaining = Math.max(0, Math.ceil((edd - today) / (1000 * 60 * 60 * 24)));
    const totalDurationDays = 280;
    const progressPercent = Math.min(100, Math.max(0, (daysSinceLmp / totalDurationDays) * 100));

    const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const eddStr = edd.toLocaleDateString('en-US', dateOptions);
    const conceptionStr = conceptionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const eddEl = document.getElementById('preg-edd-display');
    const daysRemEl = document.getElementById('preg-days-remaining-display');
    const gaEl = document.getElementById('preg-ga-display');
    const trimesterEl = document.getElementById('preg-trimester-badge');
    const conceptionEl = document.getElementById('preg-conception-display');
    const progressPercentEl = document.getElementById('preg-progress-percent');
    const progressBar = document.getElementById('preg-progress-bar');

    if (eddEl) eddEl.textContent = eddStr;
    if (daysRemEl) daysRemEl.textContent = `${daysRemaining} days remaining until estimated arrival`;
    if (gaEl) gaEl.textContent = `${gaWeeks} weeks, ${gaDays} days`;
    if (conceptionEl) conceptionEl.textContent = conceptionStr;
    if (progressPercentEl) progressPercentEl.textContent = `${progressPercent.toFixed(1)}%`;
    if (progressBar) progressBar.style.width = `${progressPercent}%`;

    if (trimesterEl) {
      if (gaWeeks < 13) {
        trimesterEl.textContent = '1st Trimester (Weeks 1 – 12)';
        trimesterEl.className = 'text-[11px] text-accent-emerald font-semibold mt-0.5';
      } else if (gaWeeks < 28) {
        trimesterEl.textContent = '2nd Trimester (Weeks 13 – 27)';
        trimesterEl.className = 'text-[11px] text-accent-primary font-semibold mt-0.5';
      } else if (gaWeeks <= 40) {
        trimesterEl.textContent = '3rd Trimester (Weeks 28 – 40)';
        trimesterEl.className = 'text-[11px] text-accent-rose font-semibold mt-0.5';
      } else {
        trimesterEl.textContent = 'Post-Term (> 40 Weeks)';
        trimesterEl.className = 'text-[11px] text-accent-amber font-semibold mt-0.5';
      }
    }

    const milestones = [
      { name: 'Estimated Conception', date: conceptionDate, status: daysSinceLmp >= 14 ? 'Done' : 'Upcoming' },
      { name: 'Doppler Heartbeat Detection (~10-12 Wks)', date: new Date(lmpDate.getTime() + (77 * 86400000)), status: gaWeeks >= 11 ? 'Passed' : 'Upcoming' },
      { name: 'End of 1st Trimester (13 Wks)', date: new Date(lmpDate.getTime() + (91 * 86400000)), status: gaWeeks >= 13 ? 'Passed' : 'Upcoming' },
      { name: 'Anatomy Ultrasound Scan (18-20 Wks)', date: new Date(lmpDate.getTime() + (133 * 86400000)), status: gaWeeks >= 19 ? 'Passed' : 'Upcoming' },
      { name: 'Fetal Viability Milestone (24 Wks)', date: new Date(lmpDate.getTime() + (168 * 86400000)), status: gaWeeks >= 24 ? 'Passed' : 'Upcoming' },
      { name: 'Full Term Delivery Window (37-40 Wks)', date: new Date(lmpDate.getTime() + (259 * 86400000)), status: gaWeeks >= 37 ? 'Current' : 'Upcoming' }
    ];

    const milestonesList = document.getElementById('preg-milestones-list');
    if (milestonesList) {
      milestonesList.innerHTML = milestones.map(m => `
        <div class="flex items-center justify-between p-2 rounded-lg bg-secondary border border-subtle">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full ${m.status === 'Passed' || m.status === 'Done' ? 'bg-accent-emerald' : m.status === 'Current' ? 'bg-accent-amber animate-pulse' : 'bg-slate-400'}"></span>
            <span class="font-medium text-primary">${m.name}</span>
          </div>
          <span class="font-mono text-muted text-[11px]">${m.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      `).join('');
    }
  },

  exportCSV() {
    const edd = document.getElementById('preg-edd-display')?.textContent || 'N/A';
    const ga = document.getElementById('preg-ga-display')?.textContent || 'N/A';
    const conception = document.getElementById('preg-conception-display')?.textContent || 'N/A';

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Parameter,Value\n';
    csvContent += `Estimated Due Date (EDD),${edd}\n`;
    csvContent += `Current Gestational Age,${ga}\n`;
    csvContent += `Estimated Conception Date,${conception}\n`;
    csvContent += `Calculation Standard,Naegele Rule (280 Days)\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'pregnancy_due_date_ledgerandlend.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
