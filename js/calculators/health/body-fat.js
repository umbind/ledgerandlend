/**
 * Body Fat Percentage Calculator (US Navy Method)
 * Safe Mathematical log10 Guards
 */
import { formatNumber } from '../../utils/formatters.js';

export const bodyFatCalculator = {
  id: 'body-fat',
  title: 'Body Fat Percentage Calculator',
  category: 'health',
  icon: 'percent',
  description: 'Estimate body fat percentage, lean mass, and fat mass using the validated US Navy circumference method.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <i data-lucide="tape" class="w-4 h-4 text-accent-rose"></i>
              Circumference Measurements (cm)
            </h3>

            <div class="grid grid-cols-2 gap-3 calc-input-group">
              <div>
                <label class="calc-label"><span>Sex</span></label>
                <select id="bf-gender" class="calc-select">
                  <option value="male" selected>Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label class="calc-label"><span>Weight (kg)</span></label>
                <input type="number" id="bf-weight" class="calc-input" value="75" min="20" max="250" step="0.5">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 calc-input-group">
              <div>
                <label class="calc-label"><span>Height (cm)</span></label>
                <input type="number" id="bf-height" class="calc-input" value="175" min="50" max="250">
              </div>
              <div>
                <label class="calc-label"><span>Neck (cm)</span></label>
                <input type="number" id="bf-neck" class="calc-input" value="38" min="15" max="70" step="0.5">
              </div>
            </div>

            <div class="calc-input-group">
              <label class="calc-label"><span>Waist circumference (at navel) (cm)</span></label>
              <input type="number" id="bf-waist" class="calc-input" value="84" min="30" max="200" step="0.5">
            </div>

            <div class="calc-input-group hidden" id="bf-hip-wrapper">
              <label class="calc-label"><span>Hip circumference (at widest point) (cm)</span></label>
              <input type="number" id="bf-hip" class="calc-input" value="98" min="30" max="200" step="0.5">
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="lg:col-span-6 space-y-4">
          <div class="result-card success" id="bf-res-card">
            <div class="flex items-center justify-between">
              <div class="result-label">Estimated Body Fat</div>
              <span class="badge" id="bf-category-badge">Fitness</span>
            </div>
            <div class="result-value text-accent-emerald text-4xl" id="bf-pct-res">-</div>
            <div class="result-subtext" id="bf-desc-res">-</div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="result-card">
              <div class="result-label">Lean Body Mass</div>
              <div class="result-value text-accent-primary text-xl" id="bf-lean-res">-</div>
              <div class="result-subtext">Muscles, bones & organs</div>
            </div>
            <div class="result-card warning">
              <div class="result-label">Fat Mass</div>
              <div class="result-value text-accent-amber text-xl" id="bf-fat-res">-</div>
              <div class="result-subtext">Total adipose tissue</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const genderSelect = container.querySelector('#bf-gender');
    const hipWrapper = container.querySelector('#bf-hip-wrapper');
    const weightInput = container.querySelector('#bf-weight');
    const heightInput = container.querySelector('#bf-height');
    const neckInput = container.querySelector('#bf-neck');
    const waistInput = container.querySelector('#bf-waist');
    const hipInput = container.querySelector('#bf-hip');

    const pctRes = container.querySelector('#bf-pct-res');
    const categoryBadge = container.querySelector('#bf-category-badge');
    const descRes = container.querySelector('#bf-desc-res');
    const leanRes = container.querySelector('#bf-lean-res');
    const fatRes = container.querySelector('#bf-fat-res');

    function calculate() {
      const isFemale = genderSelect.value === 'female';
      const weight = Math.max(1, parseFloat(weightInput.value) || 75);
      const height = Math.max(1, parseFloat(heightInput.value) || 175);
      const neck = Math.max(1, parseFloat(neckInput.value) || 38);
      const waist = Math.max(1, parseFloat(waistInput.value) || 84);
      const hip = Math.max(1, parseFloat(hipInput.value) || 98);

      let bodyFatPct = 0;

      // Safe US Navy formula with zero/negative log guards
      if (!isFemale) {
        const diff = Math.max(0.1, waist - neck);
        bodyFatPct = 495 / (1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(height)) - 450;
      } else {
        const sumDiff = Math.max(0.1, waist + hip - neck);
        bodyFatPct = 495 / (1.29579 - 0.35004 * Math.log10(sumDiff) + 0.22100 * Math.log10(height)) - 450;
      }

      if (isNaN(bodyFatPct) || !isFinite(bodyFatPct)) {
        bodyFatPct = 15;
      }

      bodyFatPct = Math.min(65, Math.max(2, bodyFatPct));
      const fatMass = weight * (bodyFatPct / 100);
      const leanMass = Math.max(0, weight - fatMass);

      pctRes.textContent = `${bodyFatPct.toFixed(1)}%`;
      leanRes.textContent = `${leanMass.toFixed(1)} kg`;
      fatRes.textContent = `${fatMass.toFixed(1)} kg`;

      let category = 'Fitness';
      let badgeClass = 'badge-health';

      if (!isFemale) {
        if (bodyFatPct < 6) { category = 'Essential Fat'; badgeClass = 'bg-accent-amber-light text-accent-amber'; }
        else if (bodyFatPct <= 13) { category = 'Athletes'; badgeClass = 'bg-accent-emerald-light text-accent-emerald'; }
        else if (bodyFatPct <= 17) { category = 'Fitness'; badgeClass = 'bg-accent-primary-light text-accent-primary'; }
        else if (bodyFatPct <= 24) { category = 'Average'; badgeClass = 'bg-accent-violet-light text-accent-violet'; }
        else { category = 'High / Obese'; badgeClass = 'bg-accent-rose-light text-accent-rose'; }
      } else {
        if (bodyFatPct < 14) { category = 'Essential Fat'; badgeClass = 'bg-accent-amber-light text-accent-amber'; }
        else if (bodyFatPct <= 20) { category = 'Athletes'; badgeClass = 'bg-accent-emerald-light text-accent-emerald'; }
        else if (bodyFatPct <= 24) { category = 'Fitness'; badgeClass = 'bg-accent-primary-light text-accent-primary'; }
        else if (bodyFatPct <= 31) { category = 'Average'; badgeClass = 'bg-accent-violet-light text-accent-violet'; }
        else { category = 'High / Obese'; badgeClass = 'bg-accent-rose-light text-accent-rose'; }
      }

      categoryBadge.textContent = category;
      categoryBadge.className = `badge ${badgeClass}`;
      descRes.textContent = `ACE Standard category classification`;
    }

    genderSelect.addEventListener('change', () => {
      hipWrapper.classList.toggle('hidden', genderSelect.value !== 'female');
      calculate();
    });

    [weightInput, heightInput, neckInput, waistInput, hipInput].forEach(el => el.addEventListener('input', calculate));

    calculate();
    if (window.lucide) window.lucide.createIcons();
  }
};
