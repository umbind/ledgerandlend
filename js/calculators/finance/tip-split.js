/**
 * Tip & Bill Split Calculator
 */
import { formatCurrency } from '../../utils/formatters.js';

export const tipSplitCalculator = {
  id: 'tip-split',
  title: 'Tip & Bill Split Calculator',
  category: 'finance',
  icon: 'receipt',
  description: 'Calculate restaurant tips, custom gratuity, and split bills fairly among dining groups.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <i data-lucide="receipt" class="w-4 h-4 text-accent-primary"></i>
              Bill & Gratuity
            </h3>

            <!-- Bill Amount -->
            <div class="calc-input-group">
              <div class="calc-label"><span>Bill Amount (Subtotal)</span></div>
              <div class="calc-input-wrapper has-prefix">
                <span class="calc-input-prefix font-bold">$</span>
                <input type="number" id="tip-bill" class="calc-input" value="85.50" min="0" step="0.50">
              </div>
            </div>

            <!-- Tip Percentage -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Tip Percentage</span>
                <span class="font-mono text-accent-primary font-bold" id="tip-pct-display">18%</span>
              </div>
              <div class="grid grid-cols-5 gap-2 mb-2">
                <button class="tip-preset btn btn-secondary btn-sm text-xs font-bold" data-tip="10">10%</button>
                <button class="tip-preset btn btn-secondary btn-sm text-xs font-bold" data-tip="15">15%</button>
                <button class="tip-preset btn btn-primary btn-sm text-xs font-bold" data-tip="18">18%</button>
                <button class="tip-preset btn btn-secondary btn-sm text-xs font-bold" data-tip="20">20%</button>
                <button class="tip-preset btn btn-secondary btn-sm text-xs font-bold" data-tip="25">25%</button>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="tip-custom-pct" class="calc-input" value="18" min="0" max="100" step="1">
                <span class="calc-input-suffix font-bold">%</span>
              </div>
            </div>

            <!-- Number of People -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Split Between (People)</span>
                <span class="font-mono text-accent-primary font-bold" id="tip-people-display">3 People</span>
              </div>
              <div class="flex items-center gap-3">
                <button id="tip-ppl-minus" class="btn btn-secondary px-3.5 py-1.5 font-bold">-</button>
                <input type="number" id="tip-people" class="calc-input text-center font-bold text-lg" value="3" min="1" max="100">
                <button id="tip-ppl-plus" class="btn btn-secondary px-3.5 py-1.5 font-bold">+</button>
              </div>
            </div>

            <!-- Rounding -->
            <div class="pt-2 border-t border-subtle">
              <label class="flex items-center gap-2 text-xs font-semibold text-secondary cursor-pointer">
                <input type="checkbox" id="tip-round-up" class="rounded text-accent-primary">
                Round up total to nearest whole dollar
              </label>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="lg:col-span-6 space-y-4">
          <div class="result-card success">
            <div class="result-label">Per Person Share</div>
            <div class="result-value text-accent-emerald text-3xl" id="tip-per-person-res">-</div>
            <div class="result-subtext" id="tip-ppl-breakdown">-</div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="result-card">
              <div class="result-label">Total Tip Amount</div>
              <div class="result-value text-accent-primary" id="tip-total-amt-res">-</div>
              <div class="result-subtext" id="tip-per-person-tip">-</div>
            </div>
            <div class="result-card violet">
              <div class="result-label">Grand Total Bill</div>
              <div class="result-value text-accent-violet" id="tip-grand-total-res">-</div>
              <div class="result-subtext">Bill + Gratuity</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const billInput = container.querySelector('#tip-bill');
    const customPctInput = container.querySelector('#tip-custom-pct');
    const pctDisplay = container.querySelector('#tip-pct-display');
    const peopleInput = container.querySelector('#tip-people');
    const peopleDisplay = container.querySelector('#tip-people-display');
    const roundUpToggle = container.querySelector('#tip-round-up');

    const pplMinus = container.querySelector('#tip-ppl-minus');
    const pplPlus = container.querySelector('#tip-ppl-plus');

    const perPersonRes = container.querySelector('#tip-per-person-res');
    const pplBreakdown = container.querySelector('#tip-ppl-breakdown');
    const totalTipRes = container.querySelector('#tip-total-amt-res');
    const perPersonTip = container.querySelector('#tip-per-person-tip');
    const grandTotalRes = container.querySelector('#tip-grand-total-res');

    function calculate() {
      const bill = Math.max(0, parseFloat(billInput.value) || 0);
      const tipPct = Math.max(0, parseFloat(customPctInput.value) || 0);
      const people = Math.max(1, parseInt(peopleInput.value) || 1);

      pctDisplay.textContent = `${tipPct}%`;
      peopleDisplay.textContent = `${people} ${people === 1 ? 'Person' : 'People'}`;

      let tipAmt = bill * (tipPct / 100);
      let grandTotal = bill + tipAmt;

      if (roundUpToggle.checked && grandTotal > 0) {
        const roundedTotal = Math.ceil(grandTotal);
        tipAmt = roundedTotal - bill;
        grandTotal = roundedTotal;
      }

      const perPersonTotal = grandTotal / people;
      const perPersonTipAmt = tipAmt / people;
      const perPersonBillAmt = bill / people;

      perPersonRes.textContent = formatCurrency(perPersonTotal);
      pplBreakdown.textContent = `${formatCurrency(perPersonBillAmt)} bill + ${formatCurrency(perPersonTipAmt)} tip each`;
      totalTipRes.textContent = formatCurrency(tipAmt);
      perPersonTip.textContent = `${formatCurrency(perPersonTipAmt)} tip / person`;
      grandTotalRes.textContent = formatCurrency(grandTotal);
    }

    container.querySelectorAll('.tip-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.tip-preset').forEach(b => {
          b.className = 'tip-preset btn btn-secondary btn-sm text-xs font-bold';
        });
        btn.className = 'tip-preset btn btn-primary btn-sm text-xs font-bold';
        customPctInput.value = btn.dataset.tip;
        calculate();
      });
    });

    customPctInput.addEventListener('input', () => {
      container.querySelectorAll('.tip-preset').forEach(b => {
        if (b.dataset.tip === customPctInput.value) {
          b.className = 'tip-preset btn btn-primary btn-sm text-xs font-bold';
        } else {
          b.className = 'tip-preset btn btn-secondary btn-sm text-xs font-bold';
        }
      });
      calculate();
    });

    pplMinus.addEventListener('click', () => {
      let val = parseInt(peopleInput.value) || 1;
      if (val > 1) {
        peopleInput.value = val - 1;
        calculate();
      }
    });

    pplPlus.addEventListener('click', () => {
      let val = parseInt(peopleInput.value) || 1;
      peopleInput.value = val + 1;
      calculate();
    });

    billInput.addEventListener('input', calculate);
    peopleInput.addEventListener('input', calculate);
    roundUpToggle.addEventListener('change', calculate);

    calculate();
    if (window.lucide) window.lucide.createIcons();
  }
};
