/**
 * SIP & Compound Interest Calculator
 * UX Enhanced: Quick Preset Chips, Interactive Trajectory & 1-Click CSV Export
 */
import { formatCurrency, formatNumber, getGlobalCurrency } from '../../utils/formatters.js';
import { createDonutChart, createGrowthChart } from '../../utils/charts.js';
import { saveHistoryItem } from '../../utils/storage.js';

export const sipCalculator = {
  id: 'sip',
  title: 'SIP & Compound Interest Calculator',
  category: 'finance',
  icon: 'trending-up',
  description: 'Forecast mutual fund wealth creation, systematic investments, and compounding growth over time.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Input Section -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <i data-lucide="sliders" class="w-4 h-4 text-accent-emerald"></i>
              Investment Inputs
            </h3>

            <!-- Investment Mode Toggle -->
            <div class="flex items-center justify-between p-1 bg-tertiary rounded-lg mb-4 border border-subtle">
              <button id="sip-mode-sip" class="flex-1 py-1.5 text-xs font-bold rounded-md bg-accent-primary text-white transition-all">Monthly SIP</button>
              <button id="sip-mode-lump" class="flex-1 py-1.5 text-xs font-bold rounded-md text-secondary hover:text-primary transition-all">One-Time Lumpsum</button>
            </div>

            <!-- Amount -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span id="sip-amount-label">Monthly Investment</span>
                <span class="font-mono text-accent-emerald font-bold" id="sip-amount-display"></span>
              </div>
              <div class="calc-input-wrapper has-prefix">
                <span class="calc-input-prefix font-bold">$</span>
                <input type="number" id="sip-amount" class="calc-input" value="500" min="10" max="1000000" step="50">
              </div>
              <input type="range" id="sip-amount-range" class="calc-range" value="500" min="50" max="10000" step="50">
              <!-- Quick Amount Presets -->
              <div class="flex items-center gap-1.5 overflow-x-auto pt-1 text-[11px]" id="sip-amount-presets">
                <span class="text-muted text-[10px] uppercase font-bold shrink-0">Presets:</span>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="100">$100</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="250">$250</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="500">$500</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="1000">$1,000</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="2500">$2,500</button>
              </div>
            </div>

            <!-- Expected Return Rate -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Expected Return Rate (p.a)</span>
                <span class="font-mono text-accent-emerald font-bold" id="sip-rate-display"></span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="sip-rate" class="calc-input" value="12" min="0" max="50" step="0.5">
                <span class="calc-input-suffix font-bold">%</span>
              </div>
              <input type="range" id="sip-rate-range" class="calc-range" value="12" min="0" max="30" step="0.5">
              <!-- Quick Rate Presets -->
              <div class="flex items-center gap-1.5 overflow-x-auto pt-1 text-[11px]" id="sip-rate-presets">
                <span class="text-muted text-[10px] uppercase font-bold shrink-0">Returns:</span>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="8">8% (Conservative)</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="12">12% (Index/Equities)</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="15">15% (Aggressive)</button>
              </div>
            </div>

            <!-- Time Period -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Time Period</span>
                <span class="font-mono text-accent-emerald font-bold" id="sip-years-display"></span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="sip-years" class="calc-input" value="10" min="1" max="50" step="1">
                <span class="calc-input-suffix font-bold">Years</span>
              </div>
              <input type="range" id="sip-years-range" class="calc-range" value="10" min="1" max="35" step="1">
              <!-- Quick Years Presets -->
              <div class="flex items-center gap-1.5 overflow-x-auto pt-1 text-[11px]" id="sip-years-presets">
                <span class="text-muted text-[10px] uppercase font-bold shrink-0">Horizon:</span>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="5">5 Yrs</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="10">10 Yrs</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="15">15 Yrs</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="20">20 Yrs</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="25">25 Yrs</button>
              </div>
            </div>

            <!-- Advanced Options Accordion -->
            <div class="pt-2 border-t border-subtle">
              <div class="flex items-center justify-between mb-2">
                <label class="flex items-center gap-2 text-xs font-semibold text-secondary cursor-pointer">
                  <input type="checkbox" id="sip-stepup-toggle" class="rounded text-accent-primary">
                  Annual Step-Up (% increase/yr)
                </label>
                <div class="w-20 hidden" id="stepup-input-wrapper">
                  <input type="number" id="sip-stepup-val" class="calc-input text-xs py-1 px-2" value="10" min="1" max="50">
                </div>
              </div>

              <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 text-xs font-semibold text-secondary cursor-pointer">
                  <input type="checkbox" id="sip-inflation-toggle" class="rounded text-accent-primary">
                  Adjust for Inflation (6% p.a.)
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Results & Wealth Projections -->
        <div class="lg:col-span-6 space-y-4">
          <!-- Primary Total Wealth Card with 1-Click Copy -->
          <div class="result-card violet group cursor-pointer" id="copyable-sip-card" title="Click to copy Total Wealth">
            <div class="flex items-center justify-between">
              <div class="result-label">Total Future Wealth</div>
              <span class="text-[10px] font-bold text-muted group-hover:text-accent-violet flex items-center gap-1">
                <i data-lucide="copy" class="w-3 h-3"></i> Click to Copy
              </span>
            </div>
            <div class="result-value text-accent-violet text-3xl sm:text-4xl" id="sip-total-res">-</div>
            <div class="result-subtext" id="sip-inflation-note">Maturity value after compound growth</div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="result-card">
              <div class="result-label">Invested Amount</div>
              <div class="result-value text-accent-primary text-xl" id="sip-invested-res">-</div>
              <div class="result-subtext">Principal contributions</div>
            </div>

            <div class="result-card success">
              <div class="result-label">Estimated Gains</div>
              <div class="result-value text-accent-emerald text-xl" id="sip-gains-res">-</div>
              <div class="result-subtext" id="sip-wealth-mult">-</div>
            </div>
          </div>

          <!-- Donut Breakdown -->
          <div class="glass-card p-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-3">Portfolio Ratio</h4>
            <div id="sip-chart-container"></div>
          </div>
        </div>
      </div>

      <!-- Growth Timeline Chart & CSV Export -->
      <div class="glass-card p-5 mt-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 class="text-base font-bold text-primary flex items-center gap-2">
              <i data-lucide="area-chart" class="w-4 h-4 text-accent-emerald"></i>
              Wealth Accumulation Trajectory
            </h3>
            <p class="text-xs text-muted">Yearly breakdown of invested capital vs compounding returns</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="sip-csv-btn" class="btn btn-secondary btn-sm text-xs">
              <i data-lucide="download" class="w-3.5 h-3.5 text-accent-emerald"></i>
              Export Trajectory CSV
            </button>
            <button id="sip-save-btn" class="btn btn-secondary btn-sm text-xs">
              <i data-lucide="bookmark" class="w-3.5 h-3.5"></i>
              Save to History
            </button>
          </div>
        </div>
        <div id="sip-growth-chart-wrapper"></div>
      </div>
    `;

    let isSip = true;
    let trajectoryData = [];

    const modeSipBtn = container.querySelector('#sip-mode-sip');
    const modeLumpBtn = container.querySelector('#sip-mode-lump');
    const amountLabel = container.querySelector('#sip-amount-label');

    const amountInput = container.querySelector('#sip-amount');
    const amountRange = container.querySelector('#sip-amount-range');
    const amountDisplay = container.querySelector('#sip-amount-display');

    const rateInput = container.querySelector('#sip-rate');
    const rateRange = container.querySelector('#sip-rate-range');
    const rateDisplay = container.querySelector('#sip-rate-display');

    const yearsInput = container.querySelector('#sip-years');
    const yearsRange = container.querySelector('#sip-years-range');
    const yearsDisplay = container.querySelector('#sip-years-display');

    const stepupToggle = container.querySelector('#sip-stepup-toggle');
    const stepupWrapper = container.querySelector('#stepup-input-wrapper');
    const stepupVal = container.querySelector('#sip-stepup-val');
    const inflationToggle = container.querySelector('#sip-inflation-toggle');

    const investedRes = container.querySelector('#sip-invested-res');
    const gainsRes = container.querySelector('#sip-gains-res');
    const totalRes = container.querySelector('#sip-total-res');
    const multRes = container.querySelector('#sip-wealth-mult');
    const inflationNote = container.querySelector('#sip-inflation-note');
    const chartContainer = container.querySelector('#sip-chart-container');
    const growthChartWrapper = container.querySelector('#sip-growth-chart-wrapper');
    const saveBtn = container.querySelector('#sip-save-btn');
    const csvBtn = container.querySelector('#sip-csv-btn');
    const copyCard = container.querySelector('#copyable-sip-card');

    function calculate() {
      const p = Math.max(0, parseFloat(amountInput.value) || 0);
      const r = Math.max(0, parseFloat(rateInput.value) || 0);
      const y = Math.max(1, parseFloat(yearsInput.value) || 1);
      const isStepup = stepupToggle.checked && isSip;
      const stepupPercent = isStepup ? Math.max(0, parseFloat(stepupVal.value) || 0) : 0;
      const isInflation = inflationToggle.checked;
      const inflationRate = 0.06;

      amountDisplay.textContent = formatCurrency(p);
      rateDisplay.textContent = `${r}%`;
      yearsDisplay.textContent = `${y} ${y === 1 ? 'Year' : 'Years'}`;

      let totalInvested = 0;
      let totalValue = 0;
      trajectoryData = [];

      const monthlyRate = r / 12 / 100;
      let currentMonthly = p;

      if (isSip) {
        let runningValue = 0;
        let runningInvested = 0;

        for (let year = 1; year <= y; year++) {
          for (let m = 1; m <= 12; m++) {
            if (monthlyRate === 0) {
              runningValue += currentMonthly;
            } else {
              runningValue = (runningValue + currentMonthly) * (1 + monthlyRate);
            }
            runningInvested += currentMonthly;
          }
          if (isStepup) {
            currentMonthly = currentMonthly * (1 + stepupPercent / 100);
          }
          trajectoryData.push({
            year,
            invested: Math.round(runningInvested),
            returns: Math.round(Math.max(0, runningValue - runningInvested)),
            total: Math.round(runningValue)
          });
        }
        totalInvested = runningInvested;
        totalValue = runningValue;
      } else {
        totalInvested = p;
        for (let year = 1; year <= y; year++) {
          const val = p * Math.pow(1 + r / 100, year);
          trajectoryData.push({
            year,
            invested: Math.round(p),
            returns: Math.round(Math.max(0, val - p)),
            total: Math.round(val)
          });
        }
        totalValue = p * Math.pow(1 + r / 100, y);
      }

      let displayedTotal = totalValue;
      if (isInflation) {
        const realPurchasingPower = totalValue / Math.pow(1 + inflationRate, y);
        displayedTotal = realPurchasingPower;
        inflationNote.textContent = `Adjusted for 6% inflation (Real purchasing power: ${formatCurrency(realPurchasingPower)})`;
      } else {
        inflationNote.textContent = 'Maturity value after compound growth';
      }

      const totalGains = Math.max(0, displayedTotal - totalInvested);
      investedRes.textContent = formatCurrency(totalInvested);
      gainsRes.textContent = formatCurrency(totalGains);
      totalRes.textContent = formatCurrency(displayedTotal);

      const multiplier = (displayedTotal / (totalInvested || 1)).toFixed(1);
      multRes.textContent = `${multiplier}x Wealth Multiplier`;

      chartContainer.innerHTML = createDonutChart([
        { label: 'Amount Invested', value: totalInvested, color: '#3b82f6' },
        { label: 'Estimated Returns', value: totalGains, color: '#10b981' }
      ], 140);

      growthChartWrapper.innerHTML = createGrowthChart(trajectoryData, 480, 200);

      return { p, r, y, isSip, totalInvested, totalGains, totalValue: displayedTotal };
    }

    function sync(input, range, cb) {
      input.addEventListener('input', () => { range.value = input.value; cb(); });
      range.addEventListener('input', () => { input.value = range.value; cb(); });
    }

    sync(amountInput, amountRange, calculate);
    sync(rateInput, rateRange, calculate);
    sync(yearsInput, yearsRange, calculate);

    stepupToggle.addEventListener('change', () => {
      stepupWrapper.classList.toggle('hidden', !stepupToggle.checked);
      calculate();
    });
    stepupVal.addEventListener('input', calculate);
    inflationToggle.addEventListener('change', calculate);

    // Preset Amount Chips Click
    container.querySelectorAll('#sip-amount-presets button').forEach(btn => {
      btn.addEventListener('click', () => {
        amountInput.value = btn.dataset.val;
        amountRange.value = btn.dataset.val;
        calculate();
      });
    });

    // Preset Rate Chips Click
    container.querySelectorAll('#sip-rate-presets button').forEach(btn => {
      btn.addEventListener('click', () => {
        rateInput.value = btn.dataset.val;
        rateRange.value = btn.dataset.val;
        calculate();
      });
    });

    // Preset Years Chips Click
    container.querySelectorAll('#sip-years-presets button').forEach(btn => {
      btn.addEventListener('click', () => {
        yearsInput.value = btn.dataset.val;
        yearsRange.value = btn.dataset.val;
        calculate();
      });
    });

    modeSipBtn.addEventListener('click', () => {
      if (!isSip) {
        isSip = true;
        modeSipBtn.className = 'flex-1 py-1.5 text-xs font-bold rounded-md bg-accent-primary text-white transition-all';
        modeLumpBtn.className = 'flex-1 py-1.5 text-xs font-bold rounded-md text-secondary hover:text-primary transition-all';
        amountLabel.textContent = 'Monthly Investment';
        amountInput.value = '500';
        amountRange.max = 10000;
        amountRange.value = 500;
        calculate();
      }
    });

    modeLumpBtn.addEventListener('click', () => {
      if (isSip) {
        isSip = false;
        modeLumpBtn.className = 'flex-1 py-1.5 text-xs font-bold rounded-md bg-accent-primary text-white transition-all';
        modeSipBtn.className = 'flex-1 py-1.5 text-xs font-bold rounded-md text-secondary hover:text-primary transition-all';
        amountLabel.textContent = 'Initial Lumpsum Investment';
        amountInput.value = '10000';
        amountRange.max = 500000;
        amountRange.value = 10000;
        calculate();
      }
    });

    // 1-Click Copy Result Card
    copyCard.addEventListener('click', () => {
      const text = totalRes.textContent;
      navigator.clipboard.writeText(text).then(() => {
        window.calcApp?.showToast(`Copied Total Wealth (${text}) to clipboard!`);
      });
    });

    // CSV Download Action
    csvBtn.addEventListener('click', () => {
      if (trajectoryData.length === 0) return;
      let csv = "Year,Invested Capital,Estimated Returns,Total Future Wealth\n";
      trajectoryData.forEach(row => {
        csv += `${row.year},${row.invested},${row.returns},${row.total}\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SIP_Wealth_Growth_Trajectory.csv`;
      a.click();
      URL.revokeObjectURL(url);
      window.calcApp?.showToast('SIP projection downloaded as CSV!');
    });

    saveBtn.addEventListener('click', () => {
      const data = calculate();
      saveHistoryItem({
        calcId: 'sip',
        calcTitle: 'SIP & Wealth Calculator',
        summary: `${data.isSip ? 'SIP' : 'Lumpsum'}: ${formatCurrency(data.p)} @ ${data.r}% for ${data.y} yrs -> Total: ${formatCurrency(data.totalValue)}`,
        inputs: { amount: data.p, rate: data.r, years: data.y, isSip: data.isSip },
        results: { invested: data.totalInvested, gains: data.totalGains, total: data.totalValue }
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
