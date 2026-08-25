/**
 * TDEE & Calorie Needs Calculator
 */
import { formatNumber } from '../../utils/formatters.js';
import { createDonutChart } from '../../utils/charts.js';

export const calorieTdeeCalculator = {
  id: 'calorie-tdee',
  title: 'TDEE & Calorie Needs Calculator',
  category: 'health',
  icon: 'flame',
  description: 'Calculate Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and macro split targets.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <i data-lucide="user" class="w-4 h-4 text-accent-rose"></i>
              Biometrics & Lifestyle
            </h3>

            <div class="grid grid-cols-2 gap-3 calc-input-group">
              <div>
                <label class="calc-label"><span>Sex</span></label>
                <select id="tdee-sex" class="calc-select">
                  <option value="male" selected>Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label class="calc-label"><span>Age</span></label>
                <input type="number" id="tdee-age" class="calc-input" value="28" min="15" max="100">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 calc-input-group">
              <div>
                <label class="calc-label"><span>Height (cm)</span></label>
                <input type="number" id="tdee-height" class="calc-input" value="175" min="100" max="230">
              </div>
              <div>
                <label class="calc-label"><span>Weight (kg)</span></label>
                <input type="number" id="tdee-weight" class="calc-input" value="75" min="30" max="250" step="0.5">
              </div>
            </div>

            <!-- Activity Level -->
            <div class="calc-input-group">
              <label class="calc-label"><span>Daily Activity Level</span></label>
              <select id="tdee-activity" class="calc-select">
                <option value="1.2">Sedentary (Desk job, little or no exercise)</option>
                <option value="1.375" selected>Lightly Active (Light exercise 1-3 days/week)</option>
                <option value="1.55">Moderately Active (Moderate exercise 3-5 days/week)</option>
                <option value="1.725">Very Active (Hard training 6-7 days/week)</option>
                <option value="1.9">Extra Active (Athlete, physical job & training)</option>
              </select>
            </div>

            <!-- Fitness Goal -->
            <div class="calc-input-group mb-0">
              <label class="calc-label"><span>Your Fitness Goal</span></label>
              <select id="tdee-goal" class="calc-select">
                <option value="lose_fast">Fast Weight Loss (-500 kcal/day)</option>
                <option value="lose_slow">Mild Weight Loss (-250 kcal/day)</option>
                <option value="maintain" selected>Maintain Weight (TDEE)</option>
                <option value="gain_lean">Lean Muscle Build (+300 kcal/day)</option>
                <option value="gain_bulk">Aggressive Bulk (+500 kcal/day)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="lg:col-span-6 space-y-4">
          <div class="result-card success">
            <div class="result-label">Target Daily Calorie Intake</div>
            <div class="result-value text-accent-emerald text-3xl" id="tdee-target-cal">-</div>
            <div class="result-subtext" id="tdee-goal-desc">Calories per day to reach goal</div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="result-card">
              <div class="result-label">Maintenance (TDEE)</div>
              <div class="result-value text-accent-primary" id="tdee-maint-cal">-</div>
              <div class="result-subtext">Total Daily Expenditure</div>
            </div>
            <div class="result-card violet">
              <div class="result-label">Basal Metabolic Rate</div>
              <div class="result-value text-accent-violet" id="tdee-bmr-cal">-</div>
              <div class="result-subtext">Calories burned at rest</div>
            </div>
          </div>

          <!-- Macro Split Breakdown -->
          <div class="glass-card p-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-3">Daily Macronutrient Targets</h4>
            <div id="tdee-macro-chart"></div>
            <div class="grid grid-cols-3 gap-2 mt-3 text-center">
              <div class="bg-tertiary p-2 rounded-lg">
                <div class="text-[11px] font-bold text-accent-primary">PROTEIN (30%)</div>
                <div class="font-mono font-bold text-base mt-0.5" id="macro-protein">-</div>
              </div>
              <div class="bg-tertiary p-2 rounded-lg">
                <div class="text-[11px] font-bold text-accent-amber">CARBS (40%)</div>
                <div class="font-mono font-bold text-base mt-0.5" id="macro-carbs">-</div>
              </div>
              <div class="bg-tertiary p-2 rounded-lg">
                <div class="text-[11px] font-bold text-accent-rose">FATS (30%)</div>
                <div class="font-mono font-bold text-base mt-0.5" id="macro-fats">-</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const sexSelect = container.querySelector('#tdee-sex');
    const ageInput = container.querySelector('#tdee-age');
    const heightInput = container.querySelector('#tdee-height');
    const weightInput = container.querySelector('#tdee-weight');
    const actSelect = container.querySelector('#tdee-activity');
    const goalSelect = container.querySelector('#tdee-goal');

    const targetCalRes = container.querySelector('#tdee-target-cal');
    const maintCalRes = container.querySelector('#tdee-maint-cal');
    const bmrCalRes = container.querySelector('#tdee-bmr-cal');
    const goalDesc = container.querySelector('#tdee-goal-desc');

    const macroChart = container.querySelector('#tdee-macro-chart');
    const macroProtein = container.querySelector('#macro-protein');
    const macroCarbs = container.querySelector('#macro-carbs');
    const macroFats = container.querySelector('#macro-fats');

    function calculate() {
      const sex = sexSelect.value;
      const age = Math.max(1, parseFloat(ageInput.value) || 28);
      const h = Math.max(50, parseFloat(heightInput.value) || 175);
      const w = Math.max(20, parseFloat(weightInput.value) || 75);
      const act = parseFloat(actSelect.value) || 1.375;
      const goal = goalSelect.value;

      // Mifflin-St Jeor Equation
      // Men: 10W + 6.25H - 5A + 5
      // Women: 10W + 6.25H - 5A - 161
      let bmr = 10 * w + 6.25 * h - 5 * age + (sex === 'male' ? 5 : -161);
      let tdee = bmr * act;

      let targetCal = tdee;
      let descText = 'To maintain current weight';

      if (goal === 'lose_fast') {
        targetCal = tdee - 500;
        descText = 'Aiming for ~0.5 kg (1 lb) loss per week';
      } else if (goal === 'lose_slow') {
        targetCal = tdee - 250;
        descText = 'Aiming for steady, sustainable fat loss';
      } else if (goal === 'gain_lean') {
        targetCal = tdee + 300;
        descText = 'Optimized for lean muscle hypertrophy';
      } else if (goal === 'gain_bulk') {
        targetCal = tdee + 500;
        descText = 'Accelerated muscle & mass building';
      }

      targetCal = Math.max(1000, Math.round(targetCal));
      tdee = Math.round(tdee);
      bmr = Math.round(bmr);

      targetCalRes.textContent = `${formatNumber(targetCal)} kcal`;
      maintCalRes.textContent = `${formatNumber(tdee)} kcal`;
      bmrCalRes.textContent = `${formatNumber(bmr)} kcal`;
      goalDesc.textContent = descText;

      // Macro breakdown: 30% Protein (4 kcal/g), 40% Carbs (4 kcal/g), 30% Fat (9 kcal/g)
      const proteinGrams = Math.round((targetCal * 0.30) / 4);
      const carbsGrams = Math.round((targetCal * 0.40) / 4);
      const fatGrams = Math.round((targetCal * 0.30) / 9);

      macroProtein.textContent = `${proteinGrams}g`;
      macroCarbs.textContent = `${carbsGrams}g`;
      macroFats.textContent = `${fatGrams}g`;

      macroChart.innerHTML = createDonutChart([
        { label: 'Protein (30%)', value: proteinGrams * 4, color: '#3b82f6' },
        { label: 'Carbs (40%)', value: carbsGrams * 4, color: '#f59e0b' },
        { label: 'Fats (30%)', value: fatGrams * 9, color: '#f43f5e' }
      ], 130);
    }

    [sexSelect, ageInput, heightInput, weightInput, actSelect, goalSelect].forEach(el => {
      el.addEventListener('input', calculate);
      el.addEventListener('change', calculate);
    });

    calculate();
    if (window.lucide) window.lucide.createIcons();
  }
};
