/**
 * Ideal Body Weight (IBW) Calculator
 * Implements Devine, Robinson, Miller, and Hamwi Clinical Formulas
 */
import { formatNumber } from '../../utils/formatters.js';
import { saveHistoryItem } from '../../utils/storage.js';

export const idealWeightCalculator = {
  id: 'ideal-weight',
  title: 'Ideal Body Weight Calculator',
  category: 'health',
  icon: 'scale',
  description: 'Calculate your clinical ideal weight using the Devine, Robinson, Miller, Hamwi formulas and healthy BMI range.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <i data-lucide="user" class="w-4 h-4 text-accent-rose"></i>
              Personal Parameters
            </h3>

            <!-- Unit Switcher -->
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-semibold text-secondary">Measurement System</span>
              <div class="inline-flex rounded-md p-0.5 bg-tertiary border border-subtle text-xs">
                <button id="ibw-unit-metric" class="px-2.5 py-1 rounded font-semibold bg-accent-primary text-white">Metric (cm, kg)</button>
                <button id="ibw-unit-imperial" class="px-2.5 py-1 rounded font-semibold text-secondary hover:text-primary">US (ft/in, lbs)</button>
              </div>
            </div>

            <!-- Gender -->
            <div class="calc-input-group">
              <label class="calc-label"><span>Biological Sex</span></label>
              <select id="ibw-gender" class="calc-select">
                <option value="male" selected>Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <!-- Metric Height -->
            <div id="ibw-metric-inputs" class="calc-input-group">
              <div class="calc-label">
                <span>Height</span>
                <span class="font-mono text-accent-rose font-bold" id="ibw-cm-disp">175 cm</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="ibw-height-cm" class="calc-input" value="175" min="100" max="230">
                <span class="calc-input-suffix font-bold">cm</span>
              </div>
              <input type="range" id="ibw-height-cm-range" class="calc-range" value="175" min="120" max="220">
            </div>

            <!-- Imperial Height -->
            <div id="ibw-imperial-inputs" class="calc-input-group hidden">
              <label class="calc-label"><span>Height (Feet & Inches)</span></label>
              <div class="grid grid-cols-2 gap-2">
                <div class="calc-input-wrapper has-suffix">
                  <input type="number" id="ibw-height-ft" class="calc-input" value="5" min="3" max="7">
                  <span class="calc-input-suffix font-bold">ft</span>
                </div>
                <div class="calc-input-wrapper has-suffix">
                  <input type="number" id="ibw-height-in" class="calc-input" value="9" min="0" max="11">
                  <span class="calc-input-suffix font-bold">in</span>
                </div>
              </div>
            </div>

            <!-- Current Weight (Optional for comparison) -->
            <div class="calc-input-group pt-2 border-t border-subtle">
              <div class="calc-label">
                <span>Current Weight (for comparison)</span>
                <span class="font-mono text-accent-primary font-bold" id="ibw-curr-disp">75 kg</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="ibw-current-weight" class="calc-input" value="75" min="30" max="250">
                <span class="calc-input-suffix font-bold" id="ibw-weight-unit">kg</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="lg:col-span-6 space-y-4">
          <!-- Primary Composite Consensus Result -->
          <div class="result-card success">
            <div class="flex items-center justify-between">
              <div class="result-label">Clinical Ideal Weight Average</div>
              <span class="badge badge-health">Consensus</span>
            </div>
            <div class="result-value text-accent-emerald text-4xl" id="ibw-consensus-res">-</div>
            <div class="result-subtext" id="ibw-diff-text">-</div>
          </div>

          <!-- Formula Breakdown Grid -->
          <div class="glass-card p-4 space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-2">Scientific Formulas Breakdown</h4>
            
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="p-2.5 rounded bg-tertiary border border-subtle">
                <div class="text-muted font-medium">Devine Formula (1974)</div>
                <div class="font-bold text-primary text-sm mt-0.5" id="ibw-devine-res">-</div>
              </div>
              <div class="p-2.5 rounded bg-tertiary border border-subtle">
                <div class="text-muted font-medium">Robinson Formula (1983)</div>
                <div class="font-bold text-primary text-sm mt-0.5" id="ibw-robinson-res">-</div>
              </div>
              <div class="p-2.5 rounded bg-tertiary border border-subtle">
                <div class="text-muted font-medium">Miller Formula (1983)</div>
                <div class="font-bold text-primary text-sm mt-0.5" id="ibw-miller-res">-</div>
              </div>
              <div class="p-2.5 rounded bg-tertiary border border-subtle">
                <div class="text-muted font-medium">Hamwi Formula (1964)</div>
                <div class="font-bold text-primary text-sm mt-0.5" id="ibw-hamwi-res">-</div>
              </div>
            </div>

            <!-- Healthy BMI Range Comparison -->
            <div class="p-3 rounded bg-accent-primary-light border border-accent-primary/20 text-xs">
              <div class="flex justify-between font-bold text-primary mb-1">
                <span>WHO Healthy BMI Weight Range:</span>
                <span id="ibw-bmi-range-res" class="text-accent-primary">-</span>
              </div>
              <p class="text-muted text-[11px]">Based on normal BMI range of 18.5 – 24.9 kg/m²</p>
            </div>
          </div>
        </div>
      </div>
    `;

    let isMetric = true;
    const metricBtn = container.querySelector('#ibw-unit-metric');
    const imperialBtn = container.querySelector('#ibw-unit-imperial');
    const metricSection = container.querySelector('#ibw-metric-inputs');
    const imperialSection = container.querySelector('#ibw-imperial-inputs');

    const genderSelect = container.querySelector('#ibw-gender');
    const heightCmInput = container.querySelector('#ibw-height-cm');
    const heightCmRange = container.querySelector('#ibw-height-cm-range');
    const heightCmDisp = container.querySelector('#ibw-cm-disp');
    const heightFtInput = container.querySelector('#ibw-height-ft');
    const heightInInput = container.querySelector('#ibw-height-in');
    const currentWeightInput = container.querySelector('#ibw-current-weight');
    const currentWeightDisp = container.querySelector('#ibw-curr-disp');
    const weightUnitSpan = container.querySelector('#ibw-weight-unit');

    const consensusRes = container.querySelector('#ibw-consensus-res');
    const diffText = container.querySelector('#ibw-diff-text');
    const devineRes = container.querySelector('#ibw-devine-res');
    const robinsonRes = container.querySelector('#ibw-robinson-res');
    const millerRes = container.querySelector('#ibw-miller-res');
    const hamwiRes = container.querySelector('#ibw-hamwi-res');
    const bmiRangeRes = container.querySelector('#ibw-bmi-range-res');

    function calculate() {
      const isMale = genderSelect.value === 'male';
      let heightInInches = 0;
      let heightInMeters = 0;

      if (isMetric) {
        const cm = parseFloat(heightCmInput.value) || 175;
        heightCmDisp.textContent = `${cm} cm`;
        heightInInches = cm / 2.54;
        heightInMeters = cm / 100;
        weightUnitSpan.textContent = 'kg';
      } else {
        const ft = parseFloat(heightFtInput.value) || 5;
        const inc = parseFloat(heightInInput.value) || 9;
        heightInInches = ft * 12 + inc;
        heightInMeters = heightInInches * 0.0254;
        weightUnitSpan.textContent = 'lbs';
      }

      const currentWeight = parseFloat(currentWeightInput.value) || (isMetric ? 75 : 165);
      currentWeightDisp.textContent = `${currentWeight} ${isMetric ? 'kg' : 'lbs'}`;

      const inchesOver5Ft = Math.max(0, heightInInches - 60);

      // Devine Formula (kg)
      const devineKg = isMale
        ? 50.0 + 2.3 * inchesOver5Ft
        : 45.5 + 2.3 * inchesOver5Ft;

      // Robinson Formula (kg)
      const robinsonKg = isMale
        ? 52.0 + 1.9 * inchesOver5Ft
        : 49.0 + 1.7 * inchesOver5Ft;

      // Miller Formula (kg)
      const millerKg = isMale
        ? 56.2 + 1.41 * inchesOver5Ft
        : 53.1 + 1.36 * inchesOver5Ft;

      // Hamwi Formula (kg)
      const hamwiKg = isMale
        ? 48.0 + 2.7 * inchesOver5Ft
        : 45.5 + 2.2 * inchesOver5Ft;

      const avgKg = (devineKg + robinsonKg + millerKg + hamwiKg) / 4;

      // Healthy BMI Range (18.5 - 24.9)
      const minBmiKg = 18.5 * (heightInMeters * heightInMeters);
      const maxBmiKg = 24.9 * (heightInMeters * heightInMeters);

      const fmt = (kg) => {
        if (isMetric) return `${kg.toFixed(1)} kg`;
        return `${(kg * 2.20462).toFixed(1)} lbs`;
      };

      consensusRes.textContent = fmt(avgKg);
      devineRes.textContent = fmt(devineKg);
      robinsonRes.textContent = fmt(robinsonKg);
      millerRes.textContent = fmt(millerKg);
      hamwiRes.textContent = fmt(hamwiKg);
      bmiRangeRes.textContent = `${fmt(minBmiKg)} - ${fmt(maxBmiKg)}`;

      const currentWeightInKg = isMetric ? currentWeight : currentWeight / 2.20462;
      const weightDiff = currentWeightInKg - avgKg;

      if (Math.abs(weightDiff) < 1.5) {
        diffText.textContent = `You are right at your clinical ideal weight!`;
      } else if (weightDiff > 0) {
        diffText.textContent = `Current weight is ${fmt(Math.abs(weightDiff))} above average ideal weight.`;
      } else {
        diffText.textContent = `Current weight is ${fmt(Math.abs(weightDiff))} below average ideal weight.`;
      }
    }

    metricBtn.addEventListener('click', () => {
      if (!isMetric) {
        isMetric = true;
        metricBtn.className = 'px-2.5 py-1 rounded font-semibold bg-accent-primary text-white';
        imperialBtn.className = 'px-2.5 py-1 rounded font-semibold text-secondary hover:text-primary';
        metricSection.classList.remove('hidden');
        imperialSection.classList.add('hidden');
        currentWeightInput.value = '75';
        calculate();
      }
    });

    imperialBtn.addEventListener('click', () => {
      if (isMetric) {
        isMetric = false;
        imperialBtn.className = 'px-2.5 py-1 rounded font-semibold bg-accent-primary text-white';
        metricBtn.className = 'px-2.5 py-1 rounded font-semibold text-secondary hover:text-primary';
        imperialSection.classList.remove('hidden');
        metricSection.classList.add('hidden');
        currentWeightInput.value = '165';
        calculate();
      }
    });

    heightCmInput.addEventListener('input', () => {
      heightCmRange.value = heightCmInput.value;
      calculate();
    });
    heightCmRange.addEventListener('input', () => {
      heightCmInput.value = heightCmRange.value;
      calculate();
    });

    [genderSelect, heightFtInput, heightInInput, currentWeightInput].forEach(el =>
      el.addEventListener('input', calculate)
    );

    calculate();
    if (window.lucide) window.lucide.createIcons();
  }
};
