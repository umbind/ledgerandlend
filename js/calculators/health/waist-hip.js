/**
 * Waist-to-Hip (WHR) & Waist-to-Height (WHtR) Ratio Calculator
 * Assesses Visceral Adiposity & Cardiovascular Disease Risk (WHO Guidelines)
 */
import { formatNumber } from '../../utils/formatters.js';
import { saveHistoryItem } from '../../utils/storage.js';

export const waistHipCalculator = {
  id: 'waist-hip',
  title: 'Waist-to-Hip & Body Shape Calculator',
  category: 'health',
  icon: 'git-commit',
  description: 'Evaluate abdominal fat distribution, body shape (Apple vs. Pear), and WHO cardiovascular risk.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <i data-lucide="scissors" class="w-4 h-4 text-accent-rose"></i>
              Body Circumference Inputs
            </h3>

            <!-- Gender -->
            <div class="calc-input-group">
              <label class="calc-label"><span>Biological Sex</span></label>
              <select id="whr-gender" class="calc-select">
                <option value="male" selected>Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <!-- Waist Circumference -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Waist Circumference (at narrowest point)</span>
                <span class="font-mono text-accent-rose font-bold" id="whr-waist-disp">82 cm</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="whr-waist" class="calc-input" value="82" min="40" max="180" step="0.5">
                <span class="calc-input-suffix font-bold">cm</span>
              </div>
              <input type="range" id="whr-waist-range" class="calc-range" value="82" min="50" max="150" step="0.5">
            </div>

            <!-- Hip Circumference -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Hip Circumference (at widest point)</span>
                <span class="font-mono text-accent-rose font-bold" id="whr-hip-disp">98 cm</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="whr-hip" class="calc-input" value="98" min="50" max="200" step="0.5">
                <span class="calc-input-suffix font-bold">cm</span>
              </div>
              <input type="range" id="whr-hip-range" class="calc-range" value="98" min="60" max="160" step="0.5">
            </div>

            <!-- Height (for WHtR) -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Height (for Waist-to-Height Ratio)</span>
                <span class="font-mono text-accent-primary font-bold" id="whr-height-disp">175 cm</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="whr-height" class="calc-input" value="175" min="100" max="230">
                <span class="calc-input-suffix font-bold">cm</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="lg:col-span-6 space-y-4">
          <!-- Primary WHR Card -->
          <div class="result-card success" id="whr-card">
            <div class="flex items-center justify-between">
              <div class="result-label">Waist-to-Hip Ratio (WHR)</div>
              <span class="badge badge-health" id="whr-badge">Low Risk</span>
            </div>
            <div class="result-value text-accent-emerald text-4xl" id="whr-val-res">0.84</div>
            <div class="result-subtext" id="whr-desc-res">Healthy body fat distribution</div>
          </div>

          <!-- Secondary Metrics Grid -->
          <div class="grid grid-cols-2 gap-3">
            <div class="result-card">
              <div class="result-label">Waist-to-Height Ratio</div>
              <div class="result-value text-accent-primary text-xl" id="whtr-val-res">0.47</div>
              <div class="result-subtext" id="whtr-desc-res">Target: Below 0.50</div>
            </div>

            <div class="result-card">
              <div class="result-label">Body Shape Type</div>
              <div class="result-value text-accent-violet text-xl" id="shape-val-res">Pear Shape</div>
              <div class="result-subtext">Lower visceral fat load</div>
            </div>
          </div>

          <!-- WHO Risk Reference Table -->
          <div class="glass-card p-4 text-xs space-y-2">
            <h4 class="font-bold text-primary uppercase tracking-wider text-[11px]">WHO Risk Thresholds:</h4>
            <div class="grid grid-cols-3 gap-1.5 text-center text-[11px]">
              <div class="p-2 rounded bg-accent-emerald-light text-accent-emerald font-bold">Low Risk<br><span class="font-normal text-secondary">M: &lt;0.90 | F: &lt;0.80</span></div>
              <div class="p-2 rounded bg-accent-amber-light text-accent-amber font-bold">Moderate<br><span class="font-normal text-secondary">M: 0.90-0.99 | F: 0.80-0.84</span></div>
              <div class="p-2 rounded bg-accent-rose-light text-accent-rose font-bold">High Risk<br><span class="font-normal text-secondary">M: ≥1.00 | F: ≥0.85</span></div>
            </div>
          </div>
        </div>
      </div>
    `;

    const genderSelect = container.querySelector('#whr-gender');
    const waistInput = container.querySelector('#whr-waist');
    const waistRange = container.querySelector('#whr-waist-range');
    const waistDisp = container.querySelector('#whr-waist-disp');
    const hipInput = container.querySelector('#whr-hip');
    const hipRange = container.querySelector('#whr-hip-range');
    const hipDisp = container.querySelector('#whr-hip-disp');
    const heightInput = container.querySelector('#whr-height');
    const heightDisp = container.querySelector('#whr-height-disp');

    const whrCard = container.querySelector('#whr-card');
    const whrBadge = container.querySelector('#whr-badge');
    const whrValRes = container.querySelector('#whr-val-res');
    const whrDescRes = container.querySelector('#whr-desc-res');
    const whtrValRes = container.querySelector('#whtr-val-res');
    const whtrDescRes = container.querySelector('#whtr-desc-res');
    const shapeValRes = container.querySelector('#shape-val-res');

    function calculate() {
      const isMale = genderSelect.value === 'male';
      const waist = Math.max(1, parseFloat(waistInput.value) || 82);
      const hip = Math.max(1, parseFloat(hipInput.value) || 98);
      const height = Math.max(1, parseFloat(heightInput.value) || 175);

      waistDisp.textContent = `${waist} cm`;
      hipDisp.textContent = `${hip} cm`;
      heightDisp.textContent = `${height} cm`;

      const whr = waist / hip;
      const whtr = waist / height;

      whrValRes.textContent = whr.toFixed(2);
      whtrValRes.textContent = whtr.toFixed(2);

      let riskCategory = 'Low Risk';
      let badgeClass = 'bg-accent-emerald-light text-accent-emerald';
      let borderClass = 'success';
      let desc = 'Optimal visceral fat distribution and low cardiovascular risk.';

      if (isMale) {
        if (whr < 0.90) {
          riskCategory = 'Low Health Risk';
          badgeClass = 'bg-accent-emerald-light text-accent-emerald';
          borderClass = 'success';
        } else if (whr < 1.0) {
          riskCategory = 'Moderate Risk';
          badgeClass = 'bg-accent-amber-light text-accent-amber';
          borderClass = 'warning';
          desc = 'Moderate central fat accumulation. Aerobic activity recommended.';
        } else {
          riskCategory = 'High Cardiovascular Risk';
          badgeClass = 'bg-accent-rose-light text-accent-rose';
          borderClass = 'danger';
          desc = 'High central adiposity (Apple shape). Associated with elevated cardiovascular risk.';
        }
      } else {
        if (whr < 0.80) {
          riskCategory = 'Low Health Risk';
          badgeClass = 'bg-accent-emerald-light text-accent-emerald';
          borderClass = 'success';
        } else if (whr < 0.85) {
          riskCategory = 'Moderate Risk';
          badgeClass = 'bg-accent-amber-light text-accent-amber';
          borderClass = 'warning';
          desc = 'Moderate central fat accumulation.';
        } else {
          riskCategory = 'High Cardiovascular Risk';
          badgeClass = 'bg-accent-rose-light text-accent-rose';
          borderClass = 'danger';
          desc = 'High central adiposity (Apple shape). Associated with elevated cardiovascular risk.';
        }
      }

      whrBadge.textContent = riskCategory;
      whrBadge.className = `badge ${badgeClass}`;
      whrDescRes.textContent = desc;
      whrCard.className = `result-card ${borderClass}`;

      shapeValRes.textContent = whr > (isMale ? 0.95 : 0.82) ? 'Apple Shape' : 'Pear Shape';

      if (whtr < 0.4) {
        whtrDescRes.textContent = 'Underweight range';
      } else if (whtr <= 0.5) {
        whtrDescRes.textContent = 'Healthy ratio (Keep waist < half height)';
      } else if (whtr <= 0.6) {
        whtrDescRes.textContent = 'Increased central fat risk';
      } else {
        whtrDescRes.textContent = 'Very high central obesity risk';
      }
    }

    function sync(input, range) {
      input.addEventListener('input', () => { range.value = input.value; calculate(); });
      range.addEventListener('input', () => { input.value = range.value; calculate(); });
    }

    sync(waistInput, waistRange);
    sync(hipInput, hipRange);
    [genderSelect, heightInput].forEach(el => el.addEventListener('input', calculate));

    calculate();
    if (window.lucide) window.lucide.createIcons();
  }
};
