/**
 * Daily Water Intake & Hydration Calculator
 */
import { formatNumber } from '../../utils/formatters.js';

export const waterIntakeCalculator = {
  id: 'water-intake',
  title: 'Daily Water Intake Calculator',
  category: 'health',
  icon: 'droplet',
  description: 'Calculate personalized daily hydration targets based on body mass, exercise intensity, and climate.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <i data-lucide="droplet" class="w-4 h-4 text-accent-primary"></i>
              Hydration Factors
            </h3>

            <!-- Weight -->
            <div class="calc-input-group">
              <div class="calc-label"><span>Body Weight (kg)</span></div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="water-weight" class="calc-input" value="70" min="20" max="250" step="1">
                <span class="calc-input-suffix font-bold">kg</span>
              </div>
            </div>

            <!-- Exercise Duration -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Daily Exercise / Physical Activity</span>
                <span class="font-mono text-accent-primary font-bold" id="water-exercise-disp">45 mins</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="water-exercise" class="calc-input" value="45" min="0" max="300" step="15">
                <span class="calc-input-suffix font-bold">Minutes</span>
              </div>
              <input type="range" id="water-exercise-range" class="calc-range" value="45" min="0" max="180" step="15">
            </div>

            <!-- Climate -->
            <div class="calc-input-group">
              <label class="calc-label"><span>Weather / Climate Condition</span></label>
              <select id="water-climate" class="calc-select">
                <option value="moderate" selected>Moderate / Temperature-Controlled (Indoor)</option>
                <option value="warm">Warm / Summer Weather (+0.35 L)</option>
                <option value="hot">Hot / High Humidity / Tropical (+0.7 L)</option>
                <option value="altitude">High Altitude / Cold & Dry (+0.5 L)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="lg:col-span-6 space-y-4">
          <div class="result-card success">
            <div class="result-label">Recommended Daily Water Goal</div>
            <div class="result-value text-accent-emerald text-4xl" id="water-liters-res">-</div>
            <div class="result-subtext" id="water-oz-res">-</div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="result-card">
              <div class="result-label">Standard Glasses (250ml)</div>
              <div class="result-value text-accent-primary text-2xl" id="water-glasses-res">-</div>
              <div class="result-subtext">Spread throughout the day</div>
            </div>
            <div class="result-card violet">
              <div class="result-label">Water Bottles (500ml)</div>
              <div class="result-value text-accent-violet text-2xl" id="water-bottles-res">-</div>
              <div class="result-subtext">Standard refilled bottles</div>
            </div>
          </div>

          <!-- Visual Glasses Display -->
          <div class="glass-card p-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-3">Daily Glass Visualizer</h4>
            <div class="flex flex-wrap gap-2" id="water-glasses-visual"></div>
          </div>
        </div>
      </div>
    `;

    const weightInput = container.querySelector('#water-weight');
    const exerciseInput = container.querySelector('#water-exercise');
    const exerciseRange = container.querySelector('#water-exercise-range');
    const exerciseDisp = container.querySelector('#water-exercise-disp');
    const climateSelect = container.querySelector('#water-climate');

    const litersRes = container.querySelector('#water-liters-res');
    const ozRes = container.querySelector('#water-oz-res');
    const glassesRes = container.querySelector('#water-glasses-res');
    const bottlesRes = container.querySelector('#water-bottles-res');
    const visualGlasses = container.querySelector('#water-glasses-visual');

    function calculate() {
      const weight = Math.max(1, parseFloat(weightInput.value) || 70);
      const exerciseMins = Math.max(0, parseFloat(exerciseInput.value) || 0);
      const climate = climateSelect.value;

      exerciseDisp.textContent = `${exerciseMins} mins`;

      // Base: ~35ml per kg of bodyweight
      let baseLiters = weight * 0.035;

      // Exercise addition: ~0.35L per 30 minutes
      const exerciseLiters = (exerciseMins / 30) * 0.35;

      // Climate addition:
      let climateLiters = 0;
      if (climate === 'warm') climateLiters = 0.35;
      else if (climate === 'hot') climateLiters = 0.70;
      else if (climate === 'altitude') climateLiters = 0.50;

      const totalLiters = baseLiters + exerciseLiters + climateLiters;
      const totalOz = totalLiters * 33.814;
      const totalGlasses = Math.round(totalLiters / 0.25);
      const totalBottles = (totalLiters / 0.5).toFixed(1);

      litersRes.textContent = `${totalLiters.toFixed(2)} Liters`;
      ozRes.textContent = `Equal to approx ${Math.round(totalOz)} fl oz / day`;
      glassesRes.textContent = `${totalGlasses} Glasses`;
      bottlesRes.textContent = `${totalBottles} Bottles`;

      // Build visual glasses
      let glassHtml = '';
      const displayCount = Math.min(24, totalGlasses);
      for (let i = 1; i <= displayCount; i++) {
        glassHtml += `
          <div class="flex flex-col items-center justify-center p-2 rounded-lg bg-tertiary text-accent-primary" title="Glass ${i}">
            <i data-lucide="cup-soda" class="w-5 h-5"></i>
            <span class="text-[9px] font-bold mt-1">#${i}</span>
          </div>
        `;
      }
      visualGlasses.innerHTML = glassHtml;
      if (window.lucide) window.lucide.createIcons();
    }

    exerciseInput.addEventListener('input', () => {
      exerciseRange.value = exerciseInput.value;
      calculate();
    });
    exerciseRange.addEventListener('input', () => {
      exerciseInput.value = exerciseRange.value;
      calculate();
    });
    weightInput.addEventListener('input', calculate);
    climateSelect.addEventListener('change', calculate);

    calculate();
    if (window.lucide) window.lucide.createIcons();
  }
};
