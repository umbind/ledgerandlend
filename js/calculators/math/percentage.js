/**
 * Percentage Calculator Suite
 */
import { formatNumber, formatPercent } from '../../utils/formatters.js';

export const percentageCalculator = {
  id: 'percentage',
  title: 'Percentage Calculator Suite',
  category: 'math',
  icon: 'percent',
  description: 'Solve all percentage questions: percentage of a value, percentage change, increase/decrease, and ratios.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 1. What is X% of Y? -->
        <div class="glass-card p-5 space-y-4">
          <div class="flex items-center gap-2 text-sm font-bold text-accent-primary">
            <span class="w-5 h-5 rounded-full bg-accent-primary-light flex items-center justify-center text-xs">1</span>
            What is X% of Y?
          </div>
          <div class="flex items-center gap-2">
            <div class="flex-1">
              <label class="text-[11px] font-semibold text-muted">Percentage (X)</label>
              <div class="calc-input-wrapper has-suffix mt-1">
                <input type="number" id="pct1-x" class="calc-input" value="15" step="any">
                <span class="calc-input-suffix font-bold">%</span>
              </div>
            </div>
            <span class="text-sm font-bold text-muted pt-5">of</span>
            <div class="flex-1">
              <label class="text-[11px] font-semibold text-muted">Total (Y)</label>
              <input type="number" id="pct1-y" class="calc-input mt-1" value="250" step="any">
            </div>
          </div>
          <div class="result-card p-3 flex items-center justify-between">
            <span class="text-xs font-bold text-muted uppercase">Result:</span>
            <span class="font-mono text-xl font-bold text-accent-primary" id="pct1-res">37.5</span>
          </div>
        </div>

        <!-- 2. X is what percent of Y? -->
        <div class="glass-card p-5 space-y-4">
          <div class="flex items-center gap-2 text-sm font-bold text-accent-emerald">
            <span class="w-5 h-5 rounded-full bg-accent-emerald-light flex items-center justify-center text-xs">2</span>
            X is what percent of Y?
          </div>
          <div class="flex items-center gap-2">
            <div class="flex-1">
              <label class="text-[11px] font-semibold text-muted">Part (X)</label>
              <input type="number" id="pct2-x" class="calc-input mt-1" value="45" step="any">
            </div>
            <span class="text-sm font-bold text-muted pt-5">is of</span>
            <div class="flex-1">
              <label class="text-[11px] font-semibold text-muted">Whole (Y)</label>
              <input type="number" id="pct2-y" class="calc-input mt-1" value="180" step="any">
            </div>
          </div>
          <div class="result-card success p-3 flex items-center justify-between">
            <span class="text-xs font-bold text-muted uppercase">Result:</span>
            <span class="font-mono text-xl font-bold text-accent-emerald" id="pct2-res">25%</span>
          </div>
        </div>

        <!-- 3. Percentage Increase / Decrease -->
        <div class="glass-card p-5 space-y-4">
          <div class="flex items-center gap-2 text-sm font-bold text-accent-amber">
            <span class="w-5 h-5 rounded-full bg-accent-amber-light flex items-center justify-center text-xs">3</span>
            Percentage Change (Increase / Decrease)
          </div>
          <div class="flex items-center gap-2">
            <div class="flex-1">
              <label class="text-[11px] font-semibold text-muted">Initial Value</label>
              <input type="number" id="pct3-x" class="calc-input mt-1" value="100" step="any">
            </div>
            <span class="text-sm font-bold text-muted pt-5">to</span>
            <div class="flex-1">
              <label class="text-[11px] font-semibold text-muted">Final Value</label>
              <input type="number" id="pct3-y" class="calc-input mt-1" value="135" step="any">
            </div>
          </div>
          <div class="result-card warning p-3 flex items-center justify-between">
            <span class="text-xs font-bold text-muted uppercase">Change:</span>
            <span class="font-mono text-xl font-bold text-accent-amber" id="pct3-res">+35.0%</span>
          </div>
        </div>

        <!-- 4. Add / Subtract Percentage -->
        <div class="glass-card p-5 space-y-4">
          <div class="flex items-center gap-2 text-sm font-bold text-accent-violet">
            <span class="w-5 h-5 rounded-full bg-accent-violet-light flex items-center justify-center text-xs">4</span>
            Add or Subtract X% to/from Y
          </div>
          <div class="flex items-center gap-2">
            <div class="flex-1">
              <label class="text-[11px] font-semibold text-muted">Base Value</label>
              <input type="number" id="pct4-y" class="calc-input mt-1" value="500" step="any">
            </div>
            <div class="w-24">
              <label class="text-[11px] font-semibold text-muted">Operation</label>
              <select id="pct4-op" class="calc-select mt-1 text-xs">
                <option value="add">+ Add</option>
                <option value="sub">- Sub</option>
              </select>
            </div>
            <div class="flex-1">
              <label class="text-[11px] font-semibold text-muted">Percentage</label>
              <div class="calc-input-wrapper has-suffix mt-1">
                <input type="number" id="pct4-x" class="calc-input" value="10" step="any">
                <span class="calc-input-suffix font-bold">%</span>
              </div>
            </div>
          </div>
          <div class="result-card violet p-3 flex items-center justify-between">
            <span class="text-xs font-bold text-muted uppercase">Final Result:</span>
            <span class="font-mono text-xl font-bold text-accent-violet" id="pct4-res">550</span>
          </div>
        </div>
      </div>
    `;

    // Calculation handlers
    function calc1() {
      const x = parseFloat(container.querySelector('#pct1-x').value) || 0;
      const y = parseFloat(container.querySelector('#pct1-y').value) || 0;
      container.querySelector('#pct1-res').textContent = formatNumber((x / 100) * y, 4);
    }

    function calc2() {
      const x = parseFloat(container.querySelector('#pct2-x').value) || 0;
      const y = parseFloat(container.querySelector('#pct2-y').value) || 0;
      const res = y !== 0 ? (x / y) * 100 : 0;
      container.querySelector('#pct2-res').textContent = `${formatNumber(res, 2)}%`;
    }

    function calc3() {
      const x = parseFloat(container.querySelector('#pct3-x').value) || 0;
      const y = parseFloat(container.querySelector('#pct3-y').value) || 0;
      if (x === 0) {
        container.querySelector('#pct3-res').textContent = 'N/A';
        return;
      }
      const change = ((y - x) / Math.abs(x)) * 100;
      const sign = change > 0 ? '+' : '';
      container.querySelector('#pct3-res').textContent = `${sign}${formatNumber(change, 2)}%`;
    }

    function calc4() {
      const y = parseFloat(container.querySelector('#pct4-y').value) || 0;
      const x = parseFloat(container.querySelector('#pct4-x').value) || 0;
      const op = container.querySelector('#pct4-op').value;
      const delta = y * (x / 100);
      const res = op === 'add' ? y + delta : y - delta;
      container.querySelector('#pct4-res').textContent = formatNumber(res, 4);
    }

    container.querySelector('#pct1-x').addEventListener('input', calc1);
    container.querySelector('#pct1-y').addEventListener('input', calc1);

    container.querySelector('#pct2-x').addEventListener('input', calc2);
    container.querySelector('#pct2-y').addEventListener('input', calc2);

    container.querySelector('#pct3-x').addEventListener('input', calc3);
    container.querySelector('#pct3-y').addEventListener('input', calc3);

    container.querySelector('#pct4-y').addEventListener('input', calc4);
    container.querySelector('#pct4-x').addEventListener('input', calc4);
    container.querySelector('#pct4-op').addEventListener('change', calc4);

    calc1(); calc2(); calc3(); calc4();
  }
};
