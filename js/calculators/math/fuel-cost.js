/**
 * Fuel Cost & Trip Economy Calculator
 */
import { formatCurrency, formatNumber } from '../../utils/formatters.js';

export const fuelCostCalculator = {
  id: 'fuel-cost',
  title: 'Fuel Cost & Road Trip Calculator',
  category: 'math',
  icon: 'fuel',
  description: 'Calculate fuel consumption, total gas cost for road trips, and split fuel expense among passengers.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <i data-lucide="fuel" class="w-4 h-4 text-accent-amber"></i>
              Trip & Vehicle Parameters
            </h3>

            <!-- Trip Distance -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Trip Distance</span>
                <label class="flex items-center gap-1.5 text-xs text-secondary cursor-pointer">
                  <input type="checkbox" id="fuel-roundtrip" class="rounded text-accent-primary"> Round Trip (2x)
                </label>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <div class="col-span-2 calc-input-wrapper">
                  <input type="number" id="fuel-dist" class="calc-input font-bold" value="350" min="1" step="5">
                </div>
                <select id="fuel-dist-unit" class="calc-select text-xs">
                  <option value="km" selected>Kilometers (km)</option>
                  <option value="mi">Miles (mi)</option>
                </select>
              </div>
            </div>

            <!-- Efficiency -->
            <div class="calc-input-group">
              <div class="calc-label"><span>Vehicle Fuel Efficiency</span></div>
              <div class="grid grid-cols-3 gap-2">
                <div class="col-span-2 calc-input-wrapper">
                  <input type="number" id="fuel-eff" class="calc-input font-bold" value="15" min="1" step="0.5">
                </div>
                <select id="fuel-eff-unit" class="calc-select text-xs">
                  <option value="kml" selected>km / Liter</option>
                  <option value="l100km">L / 100 km</option>
                  <option value="mpg_us">MPG (US)</option>
                  <option value="mpg_uk">MPG (UK)</option>
                </select>
              </div>
            </div>

            <!-- Price & Passengers -->
            <div class="grid grid-cols-2 gap-3 calc-input-group mb-0">
              <div>
                <div class="calc-label"><span>Fuel Price / Unit</span></div>
                <div class="calc-input-wrapper has-prefix">
                  <span class="calc-input-prefix font-bold">$</span>
                  <input type="number" id="fuel-price" class="calc-input" value="1.45" min="0.01" step="0.05">
                </div>
              </div>
              <div>
                <div class="calc-label"><span>Passengers</span></div>
                <input type="number" id="fuel-passengers" class="calc-input" value="3" min="1" max="50">
              </div>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="lg:col-span-6 space-y-4">
          <div class="result-card success">
            <div class="result-label">Total Estimated Fuel Cost</div>
            <div class="result-value text-accent-emerald text-3xl" id="fuel-total-cost">-</div>
            <div class="result-subtext" id="fuel-total-volume">-</div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="result-card violet">
              <div class="result-label">Cost Per Passenger</div>
              <div class="result-value text-accent-violet text-xl" id="fuel-per-person">-</div>
              <div class="result-subtext">Fair trip split</div>
            </div>

            <div class="result-card">
              <div class="result-label">Cost per Distance</div>
              <div class="result-value text-accent-primary text-xl" id="fuel-cost-per-unit">-</div>
              <div class="result-subtext" id="fuel-unit-dist-label">Per km / mile</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const distInput = container.querySelector('#fuel-dist');
    const distUnit = container.querySelector('#fuel-dist-unit');
    const roundTripToggle = container.querySelector('#fuel-roundtrip');
    const effInput = container.querySelector('#fuel-eff');
    const effUnit = container.querySelector('#fuel-eff-unit');
    const priceInput = container.querySelector('#fuel-price');
    const passengersInput = container.querySelector('#fuel-passengers');

    const totalCostRes = container.querySelector('#fuel-total-cost');
    const totalVolRes = container.querySelector('#fuel-total-volume');
    const perPersonRes = container.querySelector('#fuel-per-person');
    const costPerUnitRes = container.querySelector('#fuel-cost-per-unit');
    const unitDistLabel = container.querySelector('#fuel-unit-dist-label');

    function calculate() {
      let rawDist = Math.max(0, parseFloat(distInput.value) || 0);
      if (roundTripToggle.checked) rawDist *= 2;

      const isDistKm = distUnit.value === 'km';
      const distInKm = isDistKm ? rawDist : rawDist * 1.60934;

      const effType = effUnit.value;
      const rawEff = Math.max(0.1, parseFloat(effInput.value) || 15);
      const pricePerL = Math.max(0, parseFloat(priceInput.value) || 1.45);
      const passengers = Math.max(1, parseInt(passengersInput.value) || 1);

      // Convert fuel consumed into Liters
      let totalLiters = 0;
      if (effType === 'kml') {
        totalLiters = distInKm / rawEff;
      } else if (effType === 'l100km') {
        totalLiters = (distInKm / 100) * rawEff;
      } else if (effType === 'mpg_us') {
        const distInMiles = distInKm / 1.60934;
        const gallons = distInMiles / rawEff;
        totalLiters = gallons * 3.78541;
      } else if (effType === 'mpg_uk') {
        const distInMiles = distInKm / 1.60934;
        const gallons = distInMiles / rawEff;
        totalLiters = gallons * 4.54609;
      }

      const totalCost = totalLiters * pricePerL;
      const costPerPerson = totalCost / passengers;
      const costPerDist = rawDist > 0 ? totalCost / rawDist : 0;

      totalCostRes.textContent = formatCurrency(totalCost);
      totalVolRes.textContent = `Requires ~${totalLiters.toFixed(1)} Liters (${(totalLiters / 3.78541).toFixed(1)} US gal) for ${rawDist} ${distUnit.value}`;
      perPersonRes.textContent = formatCurrency(costPerPerson);
      costPerUnitRes.textContent = `${formatCurrency(costPerDist, null, 3)} / ${distUnit.value}`;
      unitDistLabel.textContent = `Operating fuel cost per ${distUnit.value}`;
    }

    [distInput, distUnit, roundTripToggle, effInput, effUnit, priceInput, passengersInput].forEach(el => {
      el.addEventListener('input', calculate);
      el.addEventListener('change', calculate);
    });

    calculate();
    if (window.lucide) window.lucide.createIcons();
  }
};
