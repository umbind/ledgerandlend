import { formatCurrency, getGlobalCurrencySymbol } from '../../utils/formatters.js';
import { saveHistory } from '../../utils/storage.js';

export const compoundInterestCalculator = {
  id: 'compound-interest',
  title: 'Compound Interest & Wealth Calculator',
  category: 'investing',
  icon: 'trending-up',
  description: 'Calculate compound interest growth, annual compounding returns, and future portfolio value over time.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <i data-lucide="piggy-bank" class="w-4 h-4 text-accent-emerald"></i>
              Principal & Contribution Inputs
            </h3>
            
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Initial Principal Balance</span>
                <span class="font-mono text-accent-emerald font-bold" id="ci-principal-display">$10,000</span>
              </div>
              <div class="calc-input-wrapper has-prefix">
                <span class="calc-input-prefix font-bold">$</span>
                <input type="number" id="ci-principal" class="calc-input" value="10000" min="0" max="10000000" step="500">
              </div>
              <div class="flex items-center gap-1.5 overflow-x-auto pt-1 text-[11px]" id="ci-principal-presets">
                <span class="text-muted text-[10px] uppercase font-bold shrink-0">Presets:</span>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="1000">$1k</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="5000">$5k</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="10000">$10k</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="25000">$25k</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="50000">$50k</button>
              </div>
            </div>

            <div class="calc-input-group">
              <div class="calc-label">
                <span>Monthly Addition</span>
                <span class="font-mono text-accent-emerald font-bold" id="ci-addition-display">$300</span>
              </div>
              <div class="calc-input-wrapper has-prefix">
                <span class="calc-input-prefix font-bold">$</span>
                <input type="number" id="ci-addition" class="calc-input" value="300" min="0" max="1000000" step="50">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="calc-input-group">
                <div class="calc-label">
                  <span>Annual Interest (%)</span>
                </div>
                <div class="calc-input-wrapper has-suffix">
                  <input type="number" id="ci-rate" class="calc-input" value="8" min="0.1" max="40" step="0.5">
                  <span class="calc-input-suffix font-bold">%</span>
                </div>
              </div>

              <div class="calc-input-group">
                <div class="calc-label">
                  <span>Time Period (Years)</span>
                </div>
                <div class="calc-input-wrapper has-suffix">
                  <input type="number" id="ci-years" class="calc-input" value="10" min="1" max="50" step="1">
                  <span class="calc-input-suffix font-bold">Yrs</span>
                </div>
              </div>
            </div>

            <div class="calc-input-group">
              <div class="calc-label">
                <span>Compounding Frequency</span>
              </div>
              <select id="ci-frequency" class="calc-select">
                <option value="12" selected>Monthly (12/yr)</option>
                <option value="1">Annually (1/yr)</option>
                <option value="4">Quarterly (4/yr)</option>
                <option value="365">Daily (365/yr)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="lg:col-span-6 space-y-4">
          <div class="result-card violet group cursor-pointer" id="copyable-ci-card" title="Click to copy Future Value">
            <div class="flex items-center justify-between">
              <div class="result-label">Total Future Value</div>
              <span class="text-[10px] font-bold text-muted group-hover:text-accent-violet flex items-center gap-1">
                <i data-lucide="copy" class="w-3 h-3"></i> Click to Copy
              </span>
            </div>
            <div class="result-value text-accent-violet text-3xl sm:text-4xl font-mono font-extrabold" id="ci-future-val">$76,493</div>
            <div class="result-subtext">Compounded portfolio balance</div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="result-card">
              <div class="result-label">Total Principal Invested</div>
              <div class="result-value text-accent-primary text-xl font-mono font-bold" id="ci-total-principal">$46,000</div>
              <div class="result-subtext">Initial + Monthly deposits</div>
            </div>
            <div class="result-card success">
              <div class="result-label">Total Compound Interest</div>
              <div class="result-value text-accent-emerald text-xl font-mono font-bold" id="ci-total-interest">$30,493</div>
              <div class="result-subtext" id="ci-interest-share">66.3% extra growth</div>
            </div>
          </div>

          <div class="glass-card p-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-3">Portfolio Growth Breakdown</h4>
            <div id="ci-chart-container">
              <div class="flex flex-col sm:flex-row items-center gap-4">
                <div class="relative shrink-0 flex items-center justify-center">
                  <svg width="135" height="135" viewBox="0 0 135 135" class="shrink-0 overflow-visible">
                    <circle cx="67.5" cy="67.5" r="51.3" fill="transparent" stroke="#3b82f6" stroke-width="24.3" stroke-dasharray="193.8 322.33" stroke-dashoffset="0" transform="rotate(-90 67.5 67.5)" class="chart-slice"></circle>
                    <circle cx="67.5" cy="67.5" r="51.3" fill="transparent" stroke="#10b981" stroke-width="24.3" stroke-dasharray="128.5 322.33" stroke-dashoffset="-193.8" transform="rotate(-90 67.5 67.5)" class="chart-slice"></circle>
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span class="text-[10px] uppercase font-bold text-muted tracking-wider">Total</span>
                    <span class="text-xs font-mono font-bold text-primary" id="ci-donut-total">$76,493</span>
                  </div>
                </div>
                <div class="flex-1 w-full space-y-1">
                  <div class="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-tertiary transition-colors cursor-default">
                    <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full inline-block" style="background-color: #3b82f6;"></span><span class="text-secondary font-medium">Invested Principal</span></div>
                    <div class="text-right"><span class="font-mono font-bold text-primary" id="ci-prin-pct">60.1%</span></div>
                  </div>
                  <div class="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-tertiary transition-colors cursor-default">
                    <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full inline-block" style="background-color: #10b981;"></span><span class="text-secondary font-medium">Interest Earned</span></div>
                    <div class="text-right"><span class="font-mono font-bold text-primary" id="ci-int-pct">39.9%</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents(container);
    this.calculate();
  },

  bindEvents(container) {
    container.querySelectorAll('input, select').forEach(el => {
      el.addEventListener('input', () => this.calculate());
      el.addEventListener('change', () => this.calculate());
    });

    container.querySelectorAll('#ci-principal-presets button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const val = e.currentTarget.dataset.val;
        const inp = container.querySelector('#ci-principal');
        if (inp) {
          inp.value = val;
          this.calculate();
        }
      });
    });

    const copyCard = container.querySelector('#copyable-ci-card');
    if (copyCard) {
      copyCard.addEventListener('click', () => {
        const val = container.querySelector('#ci-future-val')?.textContent || '';
        navigator.clipboard.writeText(val);
        if (window.showAppToast) window.showAppToast('Copied future value to clipboard!');
      });
    }
  },

  calculate() {
    const p = parseFloat(document.getElementById('ci-principal')?.value) || 0;
    const pmt = parseFloat(document.getElementById('ci-addition')?.value) || 0;
    const rAnnual = parseFloat(document.getElementById('ci-rate')?.value) || 0;
    const y = parseFloat(document.getElementById('ci-years')?.value) || 1;
    const n = parseFloat(document.getElementById('ci-frequency')?.value) || 12;

    const r = (rAnnual / 100.0) / n;
    const totalPeriods = y * n;

    const fvPrincipal = p * Math.pow(1 + r, totalPeriods);
    const pmtPerPeriod = pmt * (12.0 / n);
    let fvAdditions = 0;
    if (r > 0) {
      fvAdditions = pmtPerPeriod * ((Math.pow(1 + r, totalPeriods) - 1) / r);
    } else {
      fvAdditions = pmtPerPeriod * totalPeriods;
    }

    const futureValue = fvPrincipal + fvAdditions;
    const totalPrincipalInvested = p + (pmt * 12 * y);
    const totalInterest = Math.max(0, futureValue - totalPrincipalInvested);

    const fvEl = document.getElementById('ci-future-val');
    const tpEl = document.getElementById('ci-total-principal');
    const tiEl = document.getElementById('ci-total-interest');
    const shareEl = document.getElementById('ci-interest-share');
    const chartContainer = document.getElementById('ci-chart-container');
    const sym = getGlobalCurrencySymbol();

    const pDisp = document.getElementById('ci-principal-display');
    const aDisp = document.getElementById('ci-addition-display');
    if (pDisp) pDisp.textContent = formatCurrency(p);
    if (aDisp) aDisp.textContent = formatCurrency(pmt);

    if (fvEl) fvEl.textContent = formatCurrency(futureValue);
    if (tpEl) tpEl.textContent = formatCurrency(totalPrincipalInvested);
    if (tiEl) tiEl.textContent = formatCurrency(totalInterest);
    if (shareEl && totalPrincipalInvested > 0) {
      shareEl.textContent = `${((totalInterest / totalPrincipalInvested) * 100).toFixed(1)}% extra growth`;
    }

    if (chartContainer && futureValue > 0) {
      const prinPct = (totalPrincipalInvested / futureValue) * 100;
      const intPct = (totalInterest / futureValue) * 100;
      const circ = 322.33;
      const prinDash = (prinPct / 100) * circ;
      const intDash = (intPct / 100) * circ;

      chartContainer.innerHTML = `
        <div class="flex flex-col sm:flex-row items-center gap-4">
          <div class="relative shrink-0 flex items-center justify-center">
            <svg width="135" height="135" viewBox="0 0 135 135" class="shrink-0 overflow-visible">
              <circle cx="67.5" cy="67.5" r="51.3" fill="transparent" stroke="#3b82f6" stroke-width="24.3" stroke-dasharray="${prinDash.toFixed(1)} ${circ}" stroke-dashoffset="0" transform="rotate(-90 67.5 67.5)" class="chart-slice"></circle>
              <circle cx="67.5" cy="67.5" r="51.3" fill="transparent" stroke="#10b981" stroke-width="24.3" stroke-dasharray="${intDash.toFixed(1)} ${circ}" stroke-dashoffset="-${prinDash.toFixed(1)}" transform="rotate(-90 67.5 67.5)" class="chart-slice"></circle>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span class="text-[10px] uppercase font-bold text-muted tracking-wider">Total</span>
              <span class="text-xs font-mono font-bold text-primary" id="ci-donut-total">${formatCurrency(futureValue)}</span>
            </div>
          </div>
          <div class="flex-1 w-full space-y-1">
            <div class="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-tertiary transition-colors cursor-default">
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full inline-block" style="background-color: #3b82f6;"></span><span class="text-secondary font-medium">Invested Principal</span></div>
              <div class="text-right"><span class="font-mono font-bold text-primary">${prinPct.toFixed(1)}%</span></div>
            </div>
            <div class="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-tertiary transition-colors cursor-default">
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full inline-block" style="background-color: #10b981;"></span><span class="text-secondary font-medium">Interest Earned</span></div>
              <div class="text-right"><span class="font-mono font-bold text-primary">${intPct.toFixed(1)}%</span></div>
            </div>
          </div>
        </div>
      `;
    }
  }
};
