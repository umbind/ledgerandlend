/**
 * Macronutrient & Daily Meal Distribution Calculator
 * Calculates precise Protein, Carb, and Fat gram distributions based on goals
 */
import { formatNumber } from '../../utils/formatters.js';
import { createDonutChart } from '../../utils/charts.js';
import { saveHistoryItem } from '../../utils/storage.js';

export const macroCalculator = {
  id: 'macro-calculator',
  title: 'Macronutrient & Diet Split Calculator',
  category: 'health',
  icon: 'pie-chart',
  description: 'Calculate daily grams of Protein, Carbohydrates, and Fats for muscle gain, fat loss, or ketogenic diets.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <i data-lucide="utensils" class="w-4 h-4 text-accent-rose"></i>
              Calorie & Nutrition Goals
            </h3>

            <!-- Daily Calories Target -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Daily Calorie Target</span>
                <span class="font-mono text-accent-rose font-bold" id="macro-cal-disp">2,200 kcal</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="macro-calories" class="calc-input" value="2200" min="800" max="6000" step="50">
                <span class="calc-input-suffix font-bold">kcal</span>
              </div>
              <input type="range" id="macro-calories-range" class="calc-range" value="2200" min="1200" max="4000" step="50">
            </div>

            <!-- Diet Preset Selection -->
            <div class="calc-input-group">
              <label class="calc-label"><span>Dietary Strategy / Macro Split</span></label>
              <select id="macro-preset" class="calc-select text-xs">
                <option value="balanced" selected>Balanced Nutrition (30% Protein, 40% Carbs, 30% Fat)</option>
                <option value="high-protein">High-Protein / Athletic (40% Protein, 35% Carbs, 25% Fat)</option>
                <option value="low-carb">Low-Carb / Fat Loss (35% Protein, 20% Carbs, 45% Fat)</option>
                <option value="keto">Ketogenic Diet (25% Protein, 5% Carbs, 70% Fat)</option>
                <option value="bodybuilding">Bulking / Muscle Hypertrophy (30% Protein, 50% Carbs, 20% Fat)</option>
              </select>
            </div>

            <!-- Meals Per Day -->
            <div class="calc-input-group pt-2 border-t border-subtle">
              <div class="calc-label">
                <span>Meals Per Day (for portion breakdown)</span>
                <span class="font-mono text-accent-primary font-bold" id="macro-meals-disp">3 meals</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="macro-meals" class="calc-input" value="3" min="1" max="6">
                <span class="calc-input-suffix font-bold">Meals</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Results & Donut Chart -->
        <div class="lg:col-span-6 space-y-4">
          <!-- 3 Macro Cards -->
          <div class="grid grid-cols-3 gap-2 text-center">
            <!-- Protein -->
            <div class="result-card danger p-3">
              <div class="result-label text-[10px]">Protein (4 kcal/g)</div>
              <div class="result-value text-accent-rose text-xl sm:text-2xl mt-1" id="macro-protein-res">-</div>
              <div class="result-subtext text-[10px]" id="macro-protein-pct">30%</div>
            </div>

            <!-- Carbs -->
            <div class="result-card success p-3">
              <div class="result-label text-[10px]">Carbs (4 kcal/g)</div>
              <div class="result-value text-accent-emerald text-xl sm:text-2xl mt-1" id="macro-carbs-res">-</div>
              <div class="result-subtext text-[10px]" id="macro-carbs-pct">40%</div>
            </div>

            <!-- Fat -->
            <div class="result-card warning p-3">
              <div class="result-label text-[10px]">Fats (9 kcal/g)</div>
              <div class="result-value text-accent-amber text-xl sm:text-2xl mt-1" id="macro-fat-res">-</div>
              <div class="result-subtext text-[10px]" id="macro-fat-pct">30%</div>
            </div>
          </div>

          <!-- Donut Breakdown Chart -->
          <div class="glass-card p-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-2 text-center">Caloric Macro Distribution</h4>
            <div id="macro-chart-wrapper"></div>
          </div>

          <!-- Per-Meal Target -->
          <div class="p-3 rounded-lg bg-tertiary border border-subtle text-xs space-y-1">
            <div class="font-bold text-primary flex items-center justify-between">
              <span>Per-Meal Average Target:</span>
              <span id="macro-per-meal-cals" class="text-accent-primary font-mono">733 kcal</span>
            </div>
            <div class="text-secondary flex justify-between text-[11px]" id="macro-per-meal-breakdown">
              <span>P: 55g</span>
              <span>C: 73g</span>
              <span>F: 24g</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const calInput = container.querySelector('#macro-calories');
    const calRange = container.querySelector('#macro-calories-range');
    const calDisp = container.querySelector('#macro-cal-disp');
    const presetSelect = container.querySelector('#macro-preset');
    const mealsInput = container.querySelector('#macro-meals');
    const mealsDisp = container.querySelector('#macro-meals-disp');

    const proteinRes = container.querySelector('#macro-protein-res');
    const proteinPct = container.querySelector('#macro-protein-pct');
    const carbsRes = container.querySelector('#macro-carbs-res');
    const carbsPct = container.querySelector('#macro-carbs-pct');
    const fatRes = container.querySelector('#macro-fat-res');
    const fatPct = container.querySelector('#macro-fat-pct');
    const chartWrapper = container.querySelector('#macro-chart-wrapper');
    const perMealCals = container.querySelector('#macro-per-meal-cals');
    const perMealBreakdown = container.querySelector('#macro-per-meal-breakdown');

    const presets = {
      balanced: { p: 0.30, c: 0.40, f: 0.30 },
      'high-protein': { p: 0.40, c: 0.35, f: 0.25 },
      'low-carb': { p: 0.35, c: 0.20, f: 0.45 },
      keto: { p: 0.25, c: 0.05, f: 0.70 },
      bodybuilding: { p: 0.30, c: 0.50, f: 0.20 }
    };

    function calculate() {
      const cals = Math.max(500, parseFloat(calInput.value) || 2200);
      const meals = Math.max(1, Math.min(8, parseInt(mealsInput.value) || 3));
      const split = presets[presetSelect.value] || presets.balanced;

      calDisp.textContent = `${cals.toLocaleString()} kcal`;
      mealsDisp.textContent = `${meals} ${meals === 1 ? 'meal' : 'meals'}`;

      const proteinCals = cals * split.p;
      const carbsCals = cals * split.c;
      const fatCals = cals * split.f;

      const proteinGrams = Math.round(proteinCals / 4);
      const carbsGrams = Math.round(carbsCals / 4);
      const fatGrams = Math.round(fatCals / 9);

      proteinRes.textContent = `${proteinGrams}g`;
      proteinPct.textContent = `${Math.round(split.p * 100)}% (${Math.round(proteinCals)} kcal)`;

      carbsRes.textContent = `${carbsGrams}g`;
      carbsPct.textContent = `${Math.round(split.c * 100)}% (${Math.round(carbsCals)} kcal)`;

      fatRes.textContent = `${fatGrams}g`;
      fatPct.textContent = `${Math.round(split.f * 100)}% (${Math.round(fatCals)} kcal)`;

      chartWrapper.innerHTML = createDonutChart([
        { label: `Protein (${proteinGrams}g)`, value: Math.round(proteinCals), color: '#f43f5e' },
        { label: `Carbohydrates (${carbsGrams}g)`, value: Math.round(carbsCals), color: '#10b981' },
        { label: `Fats (${fatGrams}g)`, value: Math.round(fatCals), color: '#f59e0b' }
      ], 130);

      const perMealCalVal = Math.round(cals / meals);
      perMealCals.textContent = `${perMealCalVal} kcal`;
      perMealBreakdown.innerHTML = `
        <span>Protein: <strong>${Math.round(proteinGrams / meals)}g</strong></span>
        <span>Carbs: <strong>${Math.round(carbsGrams / meals)}g</strong></span>
        <span>Fats: <strong>${Math.round(fatGrams / meals)}g</strong></span>
      `;
    }

    calInput.addEventListener('input', () => { calRange.value = calInput.value; calculate(); });
    calRange.addEventListener('input', () => { calInput.value = calRange.value; calculate(); });
    presetSelect.addEventListener('change', calculate);
    mealsInput.addEventListener('input', calculate);

    calculate();
    if (window.lucide) window.lucide.createIcons();
  }
};
