/**
 * Sales Tax, GST & Discount Calculator
 */
import { formatCurrency, formatNumber, formatPercent } from '../../utils/formatters.js';

export const taxDiscountCalculator = {
  id: 'tax-discount',
  title: 'Discount & Sales Tax / GST Calculator',
  category: 'finance',
  icon: 'tag',
  description: 'Calculate final prices after discounts, stacked coupons, and sales tax or VAT with reverse tax calculation.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base font-bold text-primary flex items-center gap-2">
                <i data-lucide="tag" class="w-4 h-4 text-accent-primary"></i>
                Pricing Details
              </h3>
              <button id="tax-mode-toggle" class="btn btn-secondary btn-sm text-xs">
                <i data-lucide="refresh-cw" class="w-3 h-3"></i>
                <span id="tax-mode-label">Forward Mode</span>
              </button>
            </div>

            <!-- Price Input -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span id="price-input-label">Original Price</span>
              </div>
              <div class="calc-input-wrapper has-prefix">
                <span class="calc-input-prefix font-bold">$</span>
                <input type="number" id="td-price" class="calc-input" value="120" min="0" step="0.01">
              </div>
            </div>

            <!-- Discounts (Forward Mode) -->
            <div id="discount-inputs-section" class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div class="calc-input-group mb-0">
                  <div class="calc-label"><span>Primary Discount</span></div>
                  <div class="calc-input-wrapper has-suffix">
                    <input type="number" id="td-disc1" class="calc-input" value="25" min="0" max="100" step="1">
                    <span class="calc-input-suffix font-bold">%</span>
                  </div>
                </div>
                <div class="calc-input-group mb-0">
                  <div class="calc-label"><span>Extra Coupon</span></div>
                  <div class="calc-input-wrapper has-suffix">
                    <input type="number" id="td-disc2" class="calc-input" value="0" min="0" max="100" step="1">
                    <span class="calc-input-suffix font-bold">%</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tax Rate -->
            <div class="calc-input-group mt-3">
              <div class="calc-label">
                <span>Tax Rate (GST / VAT / Sales Tax)</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="td-tax" class="calc-input" value="8.5" min="0" max="50" step="0.1">
                <span class="calc-input-suffix font-bold">%</span>
              </div>
              <div class="flex gap-1.5 mt-2">
                <button class="tax-preset-btn btn btn-secondary btn-sm text-[11px] py-0.5 px-2" data-tax="0">0%</button>
                <button class="tax-preset-btn btn btn-secondary btn-sm text-[11px] py-0.5 px-2" data-tax="5">5%</button>
                <button class="tax-preset-btn btn btn-secondary btn-sm text-[11px] py-0.5 px-2" data-tax="8.25">8.25%</button>
                <button class="tax-preset-btn btn btn-secondary btn-sm text-[11px] py-0.5 px-2" data-tax="12">12%</button>
                <button class="tax-preset-btn btn btn-secondary btn-sm text-[11px] py-0.5 px-2" data-tax="18">18%</button>
                <button class="tax-preset-btn btn btn-secondary btn-sm text-[11px] py-0.5 px-2" data-tax="20">20%</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="lg:col-span-6 space-y-4">
          <div class="result-card success">
            <div class="result-label" id="final-res-label">Final Amount to Pay</div>
            <div class="result-value text-accent-emerald text-3xl" id="td-final-res">-</div>
            <div class="result-subtext" id="td-savings-pill">-</div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="result-card">
              <div class="result-label" id="pretax-label">Discounted Pre-Tax</div>
              <div class="result-value text-accent-primary" id="td-pretax-res">-</div>
            </div>
            <div class="result-card warning">
              <div class="result-label">Tax Amount</div>
              <div class="result-value text-accent-amber" id="td-tax-amt-res">-</div>
            </div>
          </div>

          <div class="glass-card p-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-3">Itemized Summary</h4>
            <div class="space-y-2 text-xs" id="td-itemized-summary"></div>
          </div>
        </div>
      </div>
    `;

    let isReverse = false;
    const priceInput = container.querySelector('#td-price');
    const priceLabel = container.querySelector('#price-input-label');
    const disc1Input = container.querySelector('#td-disc1');
    const disc2Input = container.querySelector('#td-disc2');
    const taxInput = container.querySelector('#td-tax');
    const discountSection = container.querySelector('#discount-inputs-section');
    const modeToggle = container.querySelector('#tax-mode-toggle');
    const modeLabel = container.querySelector('#tax-mode-label');

    const finalRes = container.querySelector('#td-final-res');
    const finalResLabel = container.querySelector('#final-res-label');
    const savingsPill = container.querySelector('#td-savings-pill');
    const pretaxLabel = container.querySelector('#pretax-label');
    const pretaxRes = container.querySelector('#td-pretax-res');
    const taxAmtRes = container.querySelector('#td-tax-amt-res');
    const itemizedSummary = container.querySelector('#td-itemized-summary');

    function calculate() {
      const price = Math.max(0, parseFloat(priceInput.value) || 0);
      const taxRate = Math.max(0, parseFloat(taxInput.value) || 0);

      if (!isReverse) {
        // Forward Mode: Price -> Apply discounts -> Apply tax
        const d1 = Math.min(100, Math.max(0, parseFloat(disc1Input.value) || 0));
        const d2 = Math.min(100, Math.max(0, parseFloat(disc2Input.value) || 0));

        const priceAfterD1 = price * (1 - d1 / 100);
        const priceAfterD2 = priceAfterD1 * (1 - d2 / 100);
        const totalDiscountAmt = price - priceAfterD2;
        const totalDiscountPct = price > 0 ? (totalDiscountAmt / price) * 100 : 0;

        const taxAmount = priceAfterD2 * (taxRate / 100);
        const finalPrice = priceAfterD2 + taxAmount;

        finalRes.textContent = formatCurrency(finalPrice);
        pretaxRes.textContent = formatCurrency(priceAfterD2);
        taxAmtRes.textContent = formatCurrency(taxAmount);
        savingsPill.textContent = totalDiscountAmt > 0
          ? `You save ${formatCurrency(totalDiscountAmt)} (${totalDiscountPct.toFixed(1)}% total discount)`
          : `No discount applied`;

        itemizedSummary.innerHTML = `
          <div class="flex justify-between py-1 border-b border-subtle"><span>Original Price:</span><span class="font-mono">${formatCurrency(price)}</span></div>
          ${d1 > 0 ? `<div class="flex justify-between py-1 border-b border-subtle text-accent-emerald"><span>Discount (${d1}%):</span><span class="font-mono">-${formatCurrency(price * (d1 / 100))}</span></div>` : ''}
          ${d2 > 0 ? `<div class="flex justify-between py-1 border-b border-subtle text-accent-emerald"><span>Extra Coupon (${d2}%):</span><span class="font-mono">-${formatCurrency(priceAfterD1 * (d2 / 100))}</span></div>` : ''}
          <div class="flex justify-between py-1 border-b border-subtle"><span>Subtotal (Net Price):</span><span class="font-mono font-bold">${formatCurrency(priceAfterD2)}</span></div>
          <div class="flex justify-between py-1 border-b border-subtle text-accent-amber"><span>Tax (${taxRate}%):</span><span class="font-mono">+${formatCurrency(taxAmount)}</span></div>
          <div class="flex justify-between py-1 font-bold text-sm"><span>Total:</span><span class="font-mono text-accent-primary">${formatCurrency(finalPrice)}</span></div>
        `;
      } else {
        // Reverse Mode: Price is Gross (tax included) -> Extract pre-tax and tax
        const preTax = taxRate > 0 ? price / (1 + taxRate / 100) : price;
        const taxAmount = price - preTax;

        finalRes.textContent = formatCurrency(preTax);
        pretaxRes.textContent = formatCurrency(price);
        taxAmtRes.textContent = formatCurrency(taxAmount);
        savingsPill.textContent = `Extracted from gross amount of ${formatCurrency(price)}`;

        itemizedSummary.innerHTML = `
          <div class="flex justify-between py-1 border-b border-subtle"><span>Gross Total (Tax-Included):</span><span class="font-mono font-bold">${formatCurrency(price)}</span></div>
          <div class="flex justify-between py-1 border-b border-subtle text-accent-amber"><span>Tax Content (${taxRate}%):</span><span class="font-mono">${formatCurrency(taxAmount)}</span></div>
          <div class="flex justify-between py-1 font-bold text-sm text-accent-primary"><span>Pre-Tax Base Price:</span><span class="font-mono">${formatCurrency(preTax)}</span></div>
        `;
      }
    }

    modeToggle.addEventListener('click', () => {
      isReverse = !isReverse;
      if (isReverse) {
        modeLabel.textContent = 'Reverse (Tax-Extract)';
        priceLabel.textContent = 'Total Price (Including Tax)';
        discountSection.classList.add('hidden');
        finalResLabel.textContent = 'Pre-Tax Base Price';
        pretaxLabel.textContent = 'Gross Total Paid';
      } else {
        modeLabel.textContent = 'Forward Mode';
        priceLabel.textContent = 'Original Price';
        discountSection.classList.remove('hidden');
        finalResLabel.textContent = 'Final Amount to Pay';
        pretaxLabel.textContent = 'Discounted Pre-Tax';
      }
      calculate();
    });

    container.querySelectorAll('.tax-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        taxInput.value = btn.dataset.tax;
        calculate();
      });
    });

    [priceInput, disc1Input, disc2Input, taxInput].forEach(el => el.addEventListener('input', calculate));

    calculate();
    if (window.lucide) window.lucide.createIcons();
  }
};
