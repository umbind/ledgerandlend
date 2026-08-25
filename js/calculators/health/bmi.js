/**
 * BMI & Healthy Weight Range Calculator
 */
import { formatNumber } from '../../utils/formatters.js';
import { createGaugeChart } from '../../utils/charts.js';

export const bmiCalculator = {
  id: 'bmi',
  title: 'BMI & Healthy Weight Calculator',
  category: 'health',
  icon: 'activity',
  description: 'Calculate Body Mass Index (BMI), visual health status gauge, and ideal healthy weight range.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base font-bold text-primary flex items-center gap-2">
                <i data-lucide="scale" class="w-4 h-4 text-accent-rose"></i>
                Body Measurements
              </h3>
              <!-- Unit Switcher -->
              <div class="inline-flex rounded-md p-0.5 bg-tertiary border border-subtle text-xs">
                <button id="bmi-unit-metric" class="px-2.5 py-1 rounded font-semibold bg-accent-primary text-white transition-all">Metric (kg, cm)</button>
                <button id="bmi-unit-imperial" class="px-2.5 py-1 rounded font-semibold text-secondary hover:text-primary transition-all">US (lbs, ft/in)</button>
              </div>
            </div>

            <!-- Metric Inputs -->
            <div id="bmi-metric-inputs" class="space-y-3">
              <div class="calc-input-group">
                <div class="calc-label"><span>Height (cm)</span><span class="font-mono text-accent-rose font-bold" id="bmi-cm-disp">175 cm</span></div>
                <div class="calc-input-wrapper has-suffix">
                  <input type="number" id="bmi-height-cm" class="calc-input" value="175" min="50" max="250">
                  <span class="calc-input-suffix font-bold">cm</span>
                </div>
                <input type="range" id="bmi-height-cm-range" class="calc-range" value="175" min="100" max="220">
              </div>

              <div class="calc-input-group">
                <div class="calc-label"><span>Weight (kg)</span><span class="font-mono text-accent-rose font-bold" id="bmi-kg-disp">70 kg</span></div>
                <div class="calc-input-wrapper has-suffix">
                  <input type="number" id="bmi-weight-kg" class="calc-input" value="70" min="20" max="300" step="0.5">
                  <span class="calc-input-suffix font-bold">kg</span>
                </div>
                <input type="range" id="bmi-weight-kg-range" class="calc-range" value="70" min="30" max="160" step="0.5">
              </div>
            </div>

            <!-- Imperial Inputs -->
            <div id="bmi-imperial-inputs" class="space-y-3 hidden">
              <div class="calc-input-group">
                <div class="calc-label"><span>Height (Feet & Inches)</span></div>
                <div class="grid grid-cols-2 gap-2">
                  <div class="calc-input-wrapper has-suffix">
                    <input type="number" id="bmi-height-ft" class="calc-input" value="5" min="2" max="8">
                    <span class="calc-input-suffix font-bold">ft</span>
                  </div>
                  <div class="calc-input-wrapper has-suffix">
                    <input type="number" id="bmi-height-in" class="calc-input" value="9" min="0" max="11">
                    <span class="calc-input-suffix font-bold">in</span>
                  </div>
                </div>
              </div>

              <div class="calc-input-group">
                <div class="calc-label"><span>Weight (lbs)</span><span class="font-mono text-accent-rose font-bold" id="bmi-lbs-disp">154 lbs</span></div>
                <div class="calc-input-wrapper has-suffix">
                  <input type="number" id="bmi-weight-lbs" class="calc-input" value="154" min="40" max="600" step="1">
                  <span class="calc-input-suffix font-bold">lbs</span>
                </div>
              </div>
            </div>

            <!-- Gender & Age -->
            <div class="grid grid-cols-2 gap-3 pt-2 border-t border-subtle">
              <div>
                <label class="text-xs font-semibold text-secondary">Biological Sex</label>
                <select id="bmi-sex" class="calc-select text-xs mt-1">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label class="text-xs font-semibold text-secondary">Age</label>
                <input type="number" id="bmi-age" class="calc-input text-xs mt-1" value="28" min="2" max="120">
              </div>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="lg:col-span-6 space-y-4">
          <div class="result-card" id="bmi-result-card">
            <div class="flex items-center justify-between">
              <div class="result-label">Body Mass Index (BMI)</div>
              <span class="badge" id="bmi-status-badge">Normal</span>
            </div>
            <div class="result-value text-4xl" id="bmi-value-res">22.9</div>
            <div class="result-subtext" id="bmi-category-desc">Healthy Weight Range</div>
          </div>

          <!-- Gauge Chart -->
          <div class="glass-card p-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-2 text-center">WHO BMI Classification</h4>
            <div id="bmi-gauge-wrapper"></div>
          </div>

          <!-- Ideal Weight Recommendations -->
          <div class="grid grid-cols-2 gap-3">
            <div class="result-card success">
              <div class="result-label">Healthy Weight Range</div>
              <div class="result-value text-accent-emerald text-lg" id="bmi-ideal-weight-res">-</div>
              <div class="result-subtext">For your height (BMI 18.5 - 24.9)</div>
            </div>

            <div class="result-card">
              <div class="result-label">Weight Difference</div>
              <div class="result-value text-accent-primary text-lg" id="bmi-diff-res">-</div>
              <div class="result-subtext" id="bmi-diff-note">Target to reach normal BMI</div>
            </div>
          </div>
        </div>
      </div>
    `;

    let isMetric = true;
    const metricBtn = container.querySelector('#bmi-unit-metric');
    const imperialBtn = container.querySelector('#bmi-unit-imperial');
    const metricSection = container.querySelector('#bmi-metric-inputs');
    const imperialSection = container.querySelector('#bmi-imperial-inputs');

    const heightCm = container.querySelector('#bmi-height-cm');
    const heightCmRange = container.querySelector('#bmi-height-cm-range');
    const heightCmDisp = container.querySelector('#bmi-cm-disp');
    const weightKg = container.querySelector('#bmi-weight-kg');
    const weightKgRange = container.querySelector('#bmi-weight-kg-range');
    const weightKgDisp = container.querySelector('#bmi-kg-disp');

    const heightFt = container.querySelector('#bmi-height-ft');
    const heightIn = container.querySelector('#bmi-height-in');
    const weightLbs = container.querySelector('#bmi-weight-lbs');
    const weightLbsDisp = container.querySelector('#bmi-lbs-disp');

    const bmiCard = container.querySelector('#bmi-result-card');
    const bmiValRes = container.querySelector('#bmi-value-res');
    const statusBadge = container.querySelector('#bmi-status-badge');
    const categoryDesc = container.querySelector('#bmi-category-desc');
    const gaugeWrapper = container.querySelector('#bmi-gauge-wrapper');
    const idealWeightRes = container.querySelector('#bmi-ideal-weight-res');
    const diffRes = container.querySelector('#bmi-diff-res');
    const diffNote = container.querySelector('#bmi-diff-note');

    function calculate() {
      let weightInKg = 0;
      let heightInM = 0;

      if (isMetric) {
        const cm = parseFloat(heightCm.value) || 170;
        const kg = parseFloat(weightKg.value) || 70;
        heightCmDisp.textContent = `${cm} cm`;
        weightKgDisp.textContent = `${kg} kg`;
        weightInKg = kg;
        heightInM = cm / 100;
      } else {
        const ft = parseFloat(heightFt.value) || 5;
        const inc = parseFloat(heightIn.value) || 9;
        const lbs = parseFloat(weightLbs.value) || 154;
        weightLbsDisp.textContent = `${lbs} lbs`;
        const totalInches = ft * 12 + inc;
        heightInM = totalInches * 0.0254;
        weightInKg = lbs * 0.453592;
      }

      if (heightInM <= 0 || weightInKg <= 0) return;

      const bmi = weightInKg / (heightInM * heightInM);
      bmiValRes.textContent = bmi.toFixed(1);

      // Status classification
      let category = '';
      let badgeClass = '';
      let borderClass = '';
      let desc = '';

      if (bmi < 18.5) {
        category = 'Underweight';
        badgeClass = 'bg-accent-amber-light text-accent-amber';
        borderClass = 'warning';
        desc = 'Below healthy threshold. Consider a nutrient-dense diet.';
      } else if (bmi < 25) {
        category = 'Normal Weight';
        badgeClass = 'bg-accent-emerald-light text-accent-emerald';
        borderClass = 'success';
        desc = 'Congratulations! You are within the healthy BMI range.';
      } else if (bmi < 30) {
        category = 'Overweight';
        badgeClass = 'bg-accent-amber-light text-accent-amber';
        borderClass = 'warning';
        desc = 'Slightly above standard range. Moderate exercise recommended.';
      } else if (bmi < 35) {
        category = 'Obesity Class I';
        badgeClass = 'bg-accent-rose-light text-accent-rose';
        borderClass = 'danger';
        desc = 'Increased health risk. Consult a healthcare provider.';
      } else {
        category = 'Obesity Class II/III';
        badgeClass = 'bg-accent-rose-light text-accent-rose';
        borderClass = 'danger';
        desc = 'High health risk. Medical guidance is advised.';
      }

      statusBadge.textContent = category;
      statusBadge.className = `badge ${badgeClass}`;
      categoryDesc.textContent = desc;
      bmiCard.className = `result-card ${borderClass}`;

      // Ideal Weight Calculation
      const minIdealKg = 18.5 * (heightInM * heightInM);
      const maxIdealKg = 24.9 * (heightInM * heightInM);

      if (isMetric) {
        idealWeightRes.textContent = `${minIdealKg.toFixed(1)} - ${maxIdealKg.toFixed(1)} kg`;
        if (weightInKg < minIdealKg) {
          const diff = minIdealKg - weightInKg;
          diffRes.textContent = `+${diff.toFixed(1)} kg`;
          diffNote.textContent = 'Gain to reach healthy BMI';
        } else if (weightInKg > maxIdealKg) {
          const diff = weightInKg - maxIdealKg;
          diffRes.textContent = `-${diff.toFixed(1)} kg`;
          diffNote.textContent = 'Lose to reach healthy BMI';
        } else {
          diffRes.textContent = '0 kg (In Range)';
          diffNote.textContent = 'You are already in healthy range!';
        }
      } else {
        const minIdealLbs = minIdealKg * 2.20462;
        const maxIdealLbs = maxIdealKg * 2.20462;
        const weightLbsVal = weightInKg * 2.20462;
        idealWeightRes.textContent = `${minIdealLbs.toFixed(1)} - ${maxIdealLbs.toFixed(1)} lbs`;

        if (weightLbsVal < minIdealLbs) {
          const diff = minIdealLbs - weightLbsVal;
          diffRes.textContent = `+${diff.toFixed(1)} lbs`;
          diffNote.textContent = 'Gain to reach healthy BMI';
        } else if (weightLbsVal > maxIdealLbs) {
          const diff = weightLbsVal - maxIdealLbs;
          diffRes.textContent = `-${diff.toFixed(1)} lbs`;
          diffNote.textContent = 'Lose to reach healthy BMI';
        } else {
          diffRes.textContent = '0 lbs (In Range)';
          diffNote.textContent = 'You are already in healthy range!';
        }
      }

      // Gauge Chart
      gaugeWrapper.innerHTML = createGaugeChart(bmi, 15, 40, [
        { label: 'Underweight', maxVal: 18.5, color: '#f59e0b' },
        { label: 'Normal', maxVal: 25, color: '#10b981' },
        { label: 'Overweight', maxVal: 30, color: '#fbbf24' },
        { label: 'Obese', maxVal: 40, color: '#f43f5e' }
      ]);
    }

    metricBtn.addEventListener('click', () => {
      if (!isMetric) {
        isMetric = true;
        metricBtn.className = 'px-2.5 py-1 rounded font-semibold bg-accent-primary text-white transition-all';
        imperialBtn.className = 'px-2.5 py-1 rounded font-semibold text-secondary hover:text-primary transition-all';
        metricSection.classList.remove('hidden');
        imperialSection.classList.add('hidden');
        calculate();
      }
    });

    imperialBtn.addEventListener('click', () => {
      if (isMetric) {
        isMetric = false;
        imperialBtn.className = 'px-2.5 py-1 rounded font-semibold bg-accent-primary text-white transition-all';
        metricBtn.className = 'px-2.5 py-1 rounded font-semibold text-secondary hover:text-primary transition-all';
        imperialSection.classList.remove('hidden');
        metricSection.classList.add('hidden');

        // Convert current metric values to imperial
        const cm = parseFloat(heightCm.value) || 175;
        const totalInches = Math.round(cm / 2.54);
        heightFt.value = Math.floor(totalInches / 12);
        heightIn.value = totalInches % 12;
        weightLbs.value = Math.round((parseFloat(weightKg.value) || 70) * 2.20462);
        calculate();
      }
    });

    function sync(input, range, cb) {
      input.addEventListener('input', () => { range.value = input.value; cb(); });
      range.addEventListener('input', () => { input.value = range.value; cb(); });
    }

    sync(heightCm, heightCmRange, calculate);
    sync(weightKg, weightKgRange, calculate);
    [heightFt, heightIn, weightLbs].forEach(el => el.addEventListener('input', calculate));

    calculate();
    if (window.lucide) window.lucide.createIcons();
  }
};
