/**
 * Loan EMI & Amortization Calculator
 * UX Enhanced: Quick Preset Chips, Interactive Schedule & 1-Click CSV Export
 */
import { formatCurrency, formatNumber } from '../../utils/formatters.js';
import { createDonutChart } from '../../utils/charts.js';
import { saveHistoryItem } from '../../utils/storage.js';

export const emiCalculator = {
  id: 'emi',
  title: 'Loan & EMI Calculator',
  category: 'finance',
  icon: 'landmark',
  description: 'Calculate monthly loan installments (EMI), total interest payable, and view yearly/monthly amortization schedule.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs Section -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <i data-lucide="sliders" class="w-4 h-4 text-accent-primary"></i>
              Loan Parameters
            </h3>

            <!-- Loan Amount -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Loan Amount</span>
                <span class="font-mono text-accent-primary font-bold" id="emi-amount-display"></span>
              </div>
              <div class="calc-input-wrapper has-prefix">
                <span class="calc-input-prefix font-bold">$</span>
                <input type="number" id="emi-amount" class="calc-input" value="100000" min="1000" max="10000000" step="1000">
              </div>
              <input type="range" id="emi-amount-range" class="calc-range" value="100000" min="10000" max="1000000" step="5000">
              <!-- Quick Preset Chips -->
              <div class="flex items-center gap-1.5 overflow-x-auto pt-1 text-[11px]" id="emi-amount-presets">
                <span class="text-muted text-[10px] uppercase font-bold shrink-0">Presets:</span>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="25000">$25k</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="50000">$50k</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="100000">$100k</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="250000">$250k</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="500000">$500k</button>
              </div>
            </div>

            <!-- Interest Rate -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Annual Interest Rate (%)</span>
                <span class="font-mono text-accent-primary font-bold" id="emi-rate-display"></span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="emi-rate" class="calc-input" value="8.5" min="0.1" max="40" step="0.1">
                <span class="calc-input-suffix font-bold">%</span>
              </div>
              <input type="range" id="emi-rate-range" class="calc-range" value="8.5" min="1" max="25" step="0.1">
            </div>

            <!-- Loan Tenure -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Loan Tenure</span>
                <span class="font-mono text-accent-primary font-bold" id="emi-tenure-display"></span>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <div class="col-span-2 calc-input-wrapper">
                  <input type="number" id="emi-tenure" class="calc-input" value="15" min="1" max="40" step="1">
                </div>
                <select id="emi-tenure-unit" class="calc-select">
                  <option value="years" selected>Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
              <input type="range" id="emi-tenure-range" class="calc-range" value="15" min="1" max="30" step="1">
              <!-- Quick Tenure Presets -->
              <div class="flex items-center gap-1.5 overflow-x-auto pt-1 text-[11px]" id="emi-tenure-presets">
                <span class="text-muted text-[10px] uppercase font-bold shrink-0">Tenure:</span>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="5">5 Yrs</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="10">10 Yrs</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="15">15 Yrs</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="20">20 Yrs</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="30">30 Yrs</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Results & Summary Section -->
        <div class="lg:col-span-6 space-y-4">
          <!-- Primary Monthly Payment Card -->
          <div class="result-card group cursor-pointer" id="copyable-emi-card" title="Click to copy EMI amount">
            <div class="flex items-center justify-between">
              <div class="result-label">Monthly EMI Payment</div>
              <span class="text-[10px] font-bold text-muted group-hover:text-accent-primary flex items-center gap-1">
                <i data-lucide="copy" class="w-3 h-3"></i> Click to Copy
              </span>
            </div>
            <div class="result-value text-accent-primary text-3xl sm:text-4xl" id="emi-monthly-res">-</div>
            <div class="result-subtext">Principal + Interest per month</div>
          </div>

          <!-- Secondary Metric Breakdown Cards -->
          <div class="grid grid-cols-2 gap-3">
            <div class="result-card warning">
              <div class="result-label">Total Interest</div>
              <div class="result-value text-accent-amber text-lg sm:text-xl" id="emi-interest-res">-</div>
              <div class="result-subtext" id="emi-interest-pct">- of loan</div>
            </div>

            <div class="result-card success">
              <div class="result-label">Total Amount Payable</div>
              <div class="result-value text-accent-emerald text-lg sm:text-xl" id="emi-total-res">-</div>
              <div class="result-subtext">Principal + Total Interest</div>
            </div>
          </div>

          <!-- Donut Breakdown Chart -->
          <div class="glass-card p-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-3">Loan Payment Ratio</h4>
            <div id="emi-chart-container"></div>
          </div>
        </div>
      </div>

      <!-- Amortization Schedule Table & CSV Export -->
      <div class="glass-card p-5 mt-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 class="text-base font-bold text-primary flex items-center gap-2">
              <i data-lucide="table" class="w-4 h-4 text-accent-primary"></i>
              Yearly Amortization Schedule
            </h3>
            <p class="text-xs text-muted">Detailed year-by-year principal reduction breakdown</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="emi-csv-btn" class="btn btn-secondary btn-sm text-xs">
              <i data-lucide="download" class="w-3.5 h-3.5 text-accent-primary"></i>
              Export Schedule CSV
            </button>
            <button id="emi-save-btn" class="btn btn-secondary btn-sm text-xs">
              <i data-lucide="bookmark" class="w-3.5 h-3.5"></i>
              Save to History
            </button>
          </div>
        </div>
        <div class="overflow-x-auto max-h-[380px] rounded-lg border border-subtle">
          <table class="w-full text-left text-xs font-mono" id="emi-schedule-table">
            <thead class="bg-tertiary text-muted sticky top-0 uppercase text-[10px] tracking-wider font-sans">
              <tr>
                <th class="p-3">Year</th>
                <th class="p-3">Opening Balance</th>
                <th class="p-3">EMI Paid (Yr)</th>
                <th class="p-3 text-accent-primary">Principal Paid</th>
                <th class="p-3 text-accent-amber">Interest Paid</th>
                <th class="p-3">Closing Balance</th>
              </tr>
            </thead>
            <tbody id="emi-schedule-body" class="divide-y divide-subtle bg-secondary/50"></tbody>
          </table>
        </div>
      </div>
    `;

    // Elements
    const amountInput = container.querySelector('#emi-amount');
    const amountRange = container.querySelector('#emi-amount-range');
    const amountDisplay = container.querySelector('#emi-amount-display');

    const rateInput = container.querySelector('#emi-rate');
    const rateRange = container.querySelector('#emi-rate-range');
    const rateDisplay = container.querySelector('#emi-rate-display');

    const tenureInput = container.querySelector('#emi-tenure');
    const tenureRange = container.querySelector('#emi-tenure-range');
    const tenureUnit = container.querySelector('#emi-tenure-unit');
    const tenureDisplay = container.querySelector('#emi-tenure-display');

    const monthlyRes = container.querySelector('#emi-monthly-res');
    const interestRes = container.querySelector('#emi-interest-res');
    const totalRes = container.querySelector('#emi-total-res');
    const interestPct = container.querySelector('#emi-interest-pct');
    const chartContainer = container.querySelector('#emi-chart-container');
    const scheduleBody = container.querySelector('#emi-schedule-body');
    const saveBtn = container.querySelector('#emi-save-btn');
    const csvBtn = container.querySelector('#emi-csv-btn');
    const copyCard = container.querySelector('#copyable-emi-card');

    let currentScheduleData = [];

    function calculate() {
      const p = Math.max(0, parseFloat(amountInput.value) || 0);
      const rAnnual = Math.max(0, parseFloat(rateInput.value) || 0);
      let tenure = Math.max(1, parseFloat(tenureInput.value) || 1);
      const isYears = tenureUnit.value === 'years';

      const months = isYears ? tenure * 12 : tenure;
      const rMonthly = (rAnnual / 12) / 100;

      amountDisplay.textContent = formatCurrency(p);
      rateDisplay.textContent = `${rAnnual}%`;
      tenureDisplay.textContent = isYears ? `${tenure} ${tenure === 1 ? 'Year' : 'Years'} (${months} mos)` : `${months} Months`;

      let emi = 0;
      if (rMonthly === 0) {
        emi = months > 0 ? p / months : 0;
      } else {
        const factor = Math.pow(1 + rMonthly, months);
        emi = (p * rMonthly * factor) / (factor - 1);
      }

      if (isNaN(emi) || !isFinite(emi)) emi = 0;

      const totalPayable = emi * months;
      const totalInterest = Math.max(0, totalPayable - p);
      const intPercentage = p > 0 ? ((totalInterest / p) * 100).toFixed(1) : 0;

      monthlyRes.textContent = formatCurrency(emi);
      interestRes.textContent = formatCurrency(totalInterest);
      totalRes.textContent = formatCurrency(totalPayable);
      interestPct.textContent = `${intPercentage}% of loan principal`;

      // Render Donut Chart
      chartContainer.innerHTML = createDonutChart([
        { label: 'Principal Loan Amount', value: p, color: '#3b82f6' },
        { label: 'Total Interest Payable', value: totalInterest, color: '#f59e0b' }
      ], 140);

      // Generate Amortization Schedule
      let balance = p;
      let scheduleHtml = '';
      currentScheduleData = [];
      const totalYears = Math.ceil(months / 12);

      for (let y = 1; y <= totalYears; y++) {
        const startBalance = balance;
        let yearlyPrincipal = 0;
        let yearlyInterest = 0;

        for (let m = 1; m <= 12; m++) {
          const currentMonth = (y - 1) * 12 + m;
          if (currentMonth > months || balance <= 0) break;

          const intForMonth = balance * rMonthly;
          const prinForMonth = Math.min(balance, emi - intForMonth);

          yearlyInterest += intForMonth;
          yearlyPrincipal += prinForMonth;
          balance -= prinForMonth;
        }

        const yearlyTotalEmi = yearlyPrincipal + yearlyInterest;
        currentScheduleData.push({
          year: y,
          opening: startBalance,
          emi: yearlyTotalEmi,
          principal: yearlyPrincipal,
          interest: yearlyInterest,
          closing: Math.max(0, balance)
        });

        scheduleHtml += `
          <tr class="hover:bg-tertiary/50 transition-colors">
            <td class="p-3 font-bold text-primary">${y}</td>
            <td class="p-3">${formatCurrency(startBalance)}</td>
            <td class="p-3">${formatCurrency(yearlyTotalEmi)}</td>
            <td class="p-3 text-accent-primary font-semibold">${formatCurrency(yearlyPrincipal)}</td>
            <td class="p-3 text-accent-amber font-semibold">${formatCurrency(yearlyInterest)}</td>
            <td class="p-3 font-semibold">${formatCurrency(Math.max(0, balance))}</td>
          </tr>
        `;
      }
      scheduleBody.innerHTML = scheduleHtml;

      return { p, rAnnual, tenure, months, emi, totalInterest, totalPayable };
    }

    function sync(input, range, cb) {
      input.addEventListener('input', () => { range.value = input.value; cb(); });
      range.addEventListener('input', () => { input.value = range.value; cb(); });
    }

    sync(amountInput, amountRange, calculate);
    sync(rateInput, rateRange, calculate);
    sync(tenureInput, tenureRange, calculate);

    tenureUnit.addEventListener('change', () => {
      const isYears = tenureUnit.value === 'years';
      tenureRange.max = isYears ? 30 : 360;
      tenureRange.value = tenureInput.value;
      calculate();
    });

    // Preset Amount Chips Click
    container.querySelectorAll('#emi-amount-presets button').forEach(btn => {
      btn.addEventListener('click', () => {
        amountInput.value = btn.dataset.val;
        amountRange.value = btn.dataset.val;
        calculate();
      });
    });

    // Preset Tenure Chips Click
    container.querySelectorAll('#emi-tenure-presets button').forEach(btn => {
      btn.addEventListener('click', () => {
        tenureUnit.value = 'years';
        tenureInput.value = btn.dataset.val;
        tenureRange.value = btn.dataset.val;
        calculate();
      });
    });

    // 1-Click Copy Result Card
    copyCard.addEventListener('click', () => {
      const text = monthlyRes.textContent;
      navigator.clipboard.writeText(text).then(() => {
        window.calcApp?.showToast(`Copied Monthly EMI (${text}) to clipboard!`);
      });
    });

    // CSV Download Action
    csvBtn.addEventListener('click', () => {
      if (currentScheduleData.length === 0) return;
      let csv = "Year,Opening Balance,Total EMI Paid,Principal Paid,Interest Paid,Closing Balance\n";
      currentScheduleData.forEach(row => {
        csv += `${row.year},${row.opening.toFixed(2)},${row.emi.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.closing.toFixed(2)}\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Loan_Amortization_Schedule.csv`;
      a.click();
      URL.revokeObjectURL(url);
      window.calcApp?.showToast('Amortization schedule downloaded as CSV!');
    });

    // Save to History
    saveBtn.addEventListener('click', () => {
      const data = calculate();
      saveHistoryItem({
        calcId: 'emi',
        calcTitle: 'Loan & EMI Calculator',
        summary: `Loan: ${formatCurrency(data.p)} @ ${data.rAnnual}% for ${data.tenure} ${tenureUnit.value} -> EMI: ${formatCurrency(data.emi)}/mo`,
        inputs: { amount: data.p, rate: data.rAnnual, tenure: data.tenure, unit: tenureUnit.value },
        results: { emi: data.emi, totalInterest: data.totalInterest, totalPayable: data.totalPayable }
      });
      saveBtn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-accent-emerald"></i> Saved!';
      if (window.lucide) window.lucide.createIcons();
      setTimeout(() => {
        saveBtn.innerHTML = '<i data-lucide="bookmark" class="w-3.5 h-3.5"></i> Save to History';
        if (window.lucide) window.lucide.createIcons();
      }, 2000);
    });

    calculate();
    if (window.lucide) window.lucide.createIcons();
  }
};
