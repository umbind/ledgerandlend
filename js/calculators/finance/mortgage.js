/**
 * Mortgage & Home Loan Calculator
 */
import { formatCurrency, formatNumber, getGlobalCurrency } from '../../utils/formatters.js';
import { createDonutChart } from '../../utils/charts.js';
import { saveHistoryItem } from '../../utils/storage.js';

export const mortgageCalculator = {
  id: 'mortgage',
  title: 'Mortgage Calculator',
  category: 'finance',
  icon: 'home',
  description: 'Estimate comprehensive home loan payments including taxes, insurance, PMI, and HOA fees.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <i data-lucide="home" class="w-4 h-4 text-accent-primary"></i>
              Property & Loan Details
            </h3>

            <!-- Home Price -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Home Purchase Price</span>
                <span class="font-mono text-accent-primary font-bold" id="mg-price-disp"></span>
              </div>
              <div class="calc-input-wrapper has-prefix">
                <span class="calc-input-prefix font-bold">$</span>
                <input type="number" id="mg-price" class="calc-input" value="400000" min="10000" step="5000">
              </div>
            </div>

            <!-- Down Payment -->
            <div class="grid grid-cols-2 gap-3 calc-input-group">
              <div>
                <div class="calc-label"><span>Down Payment ($)</span></div>
                <div class="calc-input-wrapper has-prefix">
                  <span class="calc-input-prefix font-bold">$</span>
                  <input type="number" id="mg-dp-amt" class="calc-input" value="80000" min="0" step="1000">
                </div>
              </div>
              <div>
                <div class="calc-label"><span>Down Payment (%)</span></div>
                <div class="calc-input-wrapper has-suffix">
                  <input type="number" id="mg-dp-pct" class="calc-input" value="20" min="0" max="99" step="1">
                  <span class="calc-input-suffix font-bold">%</span>
                </div>
              </div>
            </div>

            <!-- Interest & Term -->
            <div class="grid grid-cols-2 gap-3 calc-input-group">
              <div>
                <div class="calc-label"><span>Interest Rate</span></div>
                <div class="calc-input-wrapper has-suffix">
                  <input type="number" id="mg-rate" class="calc-input" value="6.75" min="0.1" max="20" step="0.125">
                  <span class="calc-input-suffix font-bold">%</span>
                </div>
              </div>
              <div>
                <div class="calc-label"><span>Loan Term</span></div>
                <select id="mg-term" class="calc-select">
                  <option value="30" selected>30 Years (Fixed)</option>
                  <option value="20">20 Years (Fixed)</option>
                  <option value="15">15 Years (Fixed)</option>
                  <option value="10">10 Years (Fixed)</option>
                </select>
              </div>
            </div>

            <!-- Taxes, Insurance & HOA -->
            <div class="pt-2 border-t border-subtle space-y-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-muted">Taxes & Additional Costs</h4>
              <div class="grid grid-cols-3 gap-2">
                <div>
                  <label class="text-[11px] font-semibold text-secondary">Property Tax ($/yr)</label>
                  <input type="number" id="mg-tax" class="calc-input text-xs mt-1" value="4800" min="0" step="100">
                </div>
                <div>
                  <label class="text-[11px] font-semibold text-secondary">Home Ins. ($/yr)</label>
                  <input type="number" id="mg-ins" class="calc-input text-xs mt-1" value="1200" min="0" step="50">
                </div>
                <div>
                  <label class="text-[11px] font-semibold text-secondary">HOA ($/mo)</label>
                  <input type="number" id="mg-hoa" class="calc-input text-xs mt-1" value="0" min="0" step="25">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="lg:col-span-6 space-y-4">
          <div class="result-card success">
            <div class="result-label">Total Estimated Monthly Payment</div>
            <div class="result-value text-accent-emerald text-3xl" id="mg-total-monthly-res">-</div>
            <div class="result-subtext" id="mg-pmi-alert">Includes P&I, taxes, insurance, and fees</div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div class="result-card p-2.5">
              <div class="text-[10px] text-muted font-bold uppercase">P & I</div>
              <div class="font-mono font-bold text-sm text-primary" id="mg-pi-res">-</div>
            </div>
            <div class="result-card p-2.5">
              <div class="text-[10px] text-muted font-bold uppercase">Taxes</div>
              <div class="font-mono font-bold text-sm text-accent-amber" id="mg-tax-res">-</div>
            </div>
            <div class="result-card p-2.5">
              <div class="text-[10px] text-muted font-bold uppercase">Insurance</div>
              <div class="font-mono font-bold text-sm text-accent-violet" id="mg-ins-res">-</div>
            </div>
            <div class="result-card p-2.5">
              <div class="text-[10px] text-muted font-bold uppercase">PMI / HOA</div>
              <div class="font-mono font-bold text-sm text-accent-rose" id="mg-fees-res">-</div>
            </div>
          </div>

          <div class="glass-card p-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-3">Monthly Outflow Composition</h4>
            <div id="mg-chart-container"></div>
          </div>
        </div>
      </div>
    `;

    // References
    const priceInput = container.querySelector('#mg-price');
    const priceDisp = container.querySelector('#mg-price-disp');
    const dpAmtInput = container.querySelector('#mg-dp-amt');
    const dpPctInput = container.querySelector('#mg-dp-pct');
    const rateInput = container.querySelector('#mg-rate');
    const termSelect = container.querySelector('#mg-term');
    const taxInput = container.querySelector('#mg-tax');
    const insInput = container.querySelector('#mg-ins');
    const hoaInput = container.querySelector('#mg-hoa');

    const totalMonthlyRes = container.querySelector('#mg-total-monthly-res');
    const piRes = container.querySelector('#mg-pi-res');
    const taxRes = container.querySelector('#mg-tax-res');
    const insRes = container.querySelector('#mg-ins-res');
    const feesRes = container.querySelector('#mg-fees-res');
    const pmiAlert = container.querySelector('#mg-pmi-alert');
    const chartContainer = container.querySelector('#mg-chart-container');

    let isUpdatingDp = false;

    function calculate() {
      const price = Math.max(0, parseFloat(priceInput.value) || 0);
      priceDisp.textContent = formatCurrency(price);

      const dpAmt = Math.min(price, Math.max(0, parseFloat(dpAmtInput.value) || 0));
      const dpPct = price > 0 ? (dpAmt / price) * 100 : 0;

      const rate = Math.max(0, parseFloat(rateInput.value) || 0);
      const years = parseInt(termSelect.value) || 30;
      const annualTax = Math.max(0, parseFloat(taxInput.value) || 0);
      const annualIns = Math.max(0, parseFloat(insInput.value) || 0);
      const monthlyHoa = Math.max(0, parseFloat(hoaInput.value) || 0);

      const loanAmt = Math.max(0, price - dpAmt);
      const months = years * 12;
      const r = rate / 100 / 12;

      let monthlyPI = 0;
      if (loanAmt > 0 && months > 0) {
        monthlyPI = r > 0 ? (loanAmt * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1) : loanAmt / months;
      }

      const monthlyTax = annualTax / 12;
      const monthlyIns = annualIns / 12;

      // PMI if down payment < 20%
      let monthlyPmi = 0;
      if (dpPct < 20 && loanAmt > 0) {
        monthlyPmi = (loanAmt * 0.007) / 12; // ~0.7% annual PMI
        pmiAlert.textContent = `Includes PMI (~${formatCurrency(monthlyPmi)}/mo) due to <20% down payment`;
      } else {
        pmiAlert.textContent = 'No PMI required (>=20% down payment)';
      }

      const totalMonthly = monthlyPI + monthlyTax + monthlyIns + monthlyPmi + monthlyHoa;

      totalMonthlyRes.textContent = `${formatCurrency(totalMonthly)}/mo`;
      piRes.textContent = formatCurrency(monthlyPI);
      taxRes.textContent = formatCurrency(monthlyTax);
      insRes.textContent = formatCurrency(monthlyIns);
      feesRes.textContent = formatCurrency(monthlyPmi + monthlyHoa);

      chartContainer.innerHTML = createDonutChart([
        { label: 'Principal & Interest', value: monthlyPI, color: '#10b981' },
        { label: 'Property Taxes', value: monthlyTax, color: '#f59e0b' },
        { label: 'Homeowners Ins.', value: monthlyIns, color: '#8b5cf6' },
        { label: 'PMI & HOA', value: monthlyPmi + monthlyHoa, color: '#f43f5e' }
      ], 135);
    }

    priceInput.addEventListener('input', () => {
      const price = parseFloat(priceInput.value) || 0;
      const pct = parseFloat(dpPctInput.value) || 20;
      dpAmtInput.value = Math.round(price * (pct / 100));
      calculate();
    });

    dpAmtInput.addEventListener('input', () => {
      const price = parseFloat(priceInput.value) || 0;
      const amt = parseFloat(dpAmtInput.value) || 0;
      if (price > 0) {
        dpPctInput.value = ((amt / price) * 100).toFixed(1);
      }
      calculate();
    });

    dpPctInput.addEventListener('input', () => {
      const price = parseFloat(priceInput.value) || 0;
      const pct = parseFloat(dpPctInput.value) || 0;
      dpAmtInput.value = Math.round(price * (pct / 100));
      calculate();
    });

    [rateInput, termSelect, taxInput, insInput, hoaInput].forEach(el => {
      el.addEventListener('input', calculate);
      el.addEventListener('change', calculate);
    });

    calculate();
    if (window.lucide) window.lucide.createIcons();
  }
};
