/**
 * Universal Unit Converter
 */
import { formatNumber } from '../../utils/formatters.js';

export const unitConverter = {
  id: 'unit-converter',
  title: 'Universal Unit Converter',
  category: 'math',
  icon: 'arrow-left-right',
  description: 'Instant multi-unit conversion for Length, Weight, Temperature, Area, Volume, Speed, and Digital Storage.',

  render(container) {
    const unitsData = {
      length: {
        name: 'Length & Distance',
        base: 'm',
        units: {
          m: { name: 'Meters (m)', factor: 1 },
          km: { name: 'Kilometers (km)', factor: 1000 },
          cm: { name: 'Centimeters (cm)', factor: 0.01 },
          mm: { name: 'Millimeters (mm)', factor: 0.001 },
          mi: { name: 'Miles (mi)', factor: 1609.344 },
          yd: { name: 'Yards (yd)', factor: 0.9144 },
          ft: { name: 'Feet (ft)', factor: 0.3048 },
          in: { name: 'Inches (in)', factor: 0.0254 },
          nmi: { name: 'Nautical Miles', factor: 1852 }
        }
      },
      mass: {
        name: 'Mass & Weight',
        base: 'kg',
        units: {
          kg: { name: 'Kilograms (kg)', factor: 1 },
          g: { name: 'Grams (g)', factor: 0.001 },
          mg: { name: 'Milligrams (mg)', factor: 0.000001 },
          t: { name: 'Metric Tonnes (t)', factor: 1000 },
          lb: { name: 'Pounds (lb)', factor: 0.45359237 },
          oz: { name: 'Ounces (oz)', factor: 0.028349523 },
          st: { name: 'Stones (st)', factor: 6.35029 }
        }
      },
      temperature: {
        name: 'Temperature',
        isSpecial: true,
        units: {
          c: { name: 'Celsius (°C)' },
          f: { name: 'Fahrenheit (°F)' },
          k: { name: 'Kelvin (K)' }
        }
      },
      area: {
        name: 'Area',
        base: 'sqm',
        units: {
          sqm: { name: 'Square Meters (m²)', factor: 1 },
          sqkm: { name: 'Square Kilometers (km²)', factor: 1000000 },
          sqft: { name: 'Square Feet (ft²)', factor: 0.092903 },
          sqyd: { name: 'Square Yards (yd²)', factor: 0.836127 },
          ac: { name: 'Acres (ac)', factor: 4046.86 },
          ha: { name: 'Hectares (ha)', factor: 10000 },
          sqmi: { name: 'Square Miles (mi²)', factor: 2589988 }
        }
      },
      volume: {
        name: 'Volume & Capacity',
        base: 'l',
        units: {
          l: { name: 'Liters (L)', factor: 1 },
          ml: { name: 'Milliliters (mL)', factor: 0.001 },
          gal_us: { name: 'Gallons (US)', factor: 3.78541 },
          gal_uk: { name: 'Gallons (UK)', factor: 4.54609 },
          floz: { name: 'Fluid Ounces (US)', factor: 0.0295735 },
          cup: { name: 'Cups (US)', factor: 0.236588 },
          cum: { name: 'Cubic Meters (m³)', factor: 1000 }
        }
      },
      speed: {
        name: 'Speed & Velocity',
        base: 'mps',
        units: {
          mps: { name: 'Meters/sec (m/s)', factor: 1 },
          kmh: { name: 'Kilometers/hour (km/h)', factor: 0.277778 },
          mph: { name: 'Miles/hour (mph)', factor: 0.44704 },
          knot: { name: 'Knots (kn)', factor: 0.514444 },
          mach: { name: 'Mach (std atm)', factor: 340.29 }
        }
      },
      digital: {
        name: 'Digital Data & Storage',
        base: 'b',
        units: {
          b: { name: 'Bytes (B)', factor: 1 },
          kb: { name: 'Kilobytes (KB)', factor: 1024 },
          mb: { name: 'Megabytes (MB)', factor: 1048576 },
          gb: { name: 'Gigabytes (GB)', factor: 1073741824 },
          tb: { name: 'Terabytes (TB)', factor: 1099511627776 },
          bit: { name: 'Bits (b)', factor: 0.125 }
        }
      }
    };

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Category selector bar -->
        <div class="flex flex-wrap gap-2 pb-2 border-b border-subtle" id="unit-cat-bar">
          ${Object.entries(unitsData).map(([key, cat], i) => `
            <button class="unit-cat-btn tab-pill ${i === 0 ? 'active' : ''}" data-cat="${key}">
              ${cat.name}
            </button>
          `).join('')}
        </div>

        <!-- Conversion Interface -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-6 space-y-4">
            <div class="glass-card p-5">
              <h3 class="text-sm font-bold text-muted uppercase tracking-wider mb-4">From</h3>
              <div class="calc-input-group">
                <input type="number" id="unit-val-from" class="calc-input text-xl font-bold font-mono" value="1" step="any">
              </div>
              <div class="calc-input-group mb-0">
                <select id="unit-sel-from" class="calc-select font-semibold"></select>
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 space-y-4">
            <div class="glass-card p-5">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-bold text-muted uppercase tracking-wider">To (Result)</h3>
                <button id="unit-swap-btn" class="btn btn-secondary btn-sm text-xs" title="Swap Units">
                  <i data-lucide="arrow-left-right" class="w-3.5 h-3.5"></i> Swap
                </button>
              </div>
              <div class="result-card success p-3 mb-4">
                <div class="font-mono text-2xl font-bold text-accent-emerald truncate" id="unit-val-to">-</div>
              </div>
              <div class="calc-input-group mb-0">
                <select id="unit-sel-to" class="calc-select font-semibold"></select>
              </div>
            </div>
          </div>
        </div>

        <!-- Full Multi-Unit Cross Conversion Grid -->
        <div class="glass-card p-5">
          <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-3 flex items-center gap-2">
            <i data-lucide="grid" class="w-3.5 h-3.5 text-accent-primary"></i>
            All Unit Conversions (Equivalent Values)
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2" id="unit-matrix-grid"></div>
        </div>
      </div>
    `;

    let currentCategory = 'length';
    const catBtns = container.querySelectorAll('.unit-cat-btn');
    const valFrom = container.querySelector('#unit-val-from');
    const selFrom = container.querySelector('#unit-sel-from');
    const valTo = container.querySelector('#unit-val-to');
    const selTo = container.querySelector('#unit-sel-to');
    const swapBtn = container.querySelector('#unit-swap-btn');
    const matrixGrid = container.querySelector('#unit-matrix-grid');

    function populateSelects() {
      const cat = unitsData[currentCategory];
      const keys = Object.keys(cat.units);

      selFrom.innerHTML = keys.map(k => `<option value="${k}">${cat.units[k].name}</option>`).join('');
      selTo.innerHTML = keys.map(k => `<option value="${k}">${cat.units[k].name}</option>`).join('');

      if (keys.length > 1) {
        selTo.selectedIndex = 1;
      }
    }

    function convertTemp(val, from, to) {
      if (from === to) return val;
      // Convert to Celsius first
      let c = val;
      if (from === 'f') c = (val - 32) * (5 / 9);
      else if (from === 'k') c = val - 273.15;

      // Convert Celsius to target
      if (to === 'c') return c;
      if (to === 'f') return (c * 9 / 5) + 32;
      if (to === 'k') return c + 273.15;
      return val;
    }

    function calculate() {
      const cat = unitsData[currentCategory];
      const val = parseFloat(valFrom.value) || 0;
      const fromKey = selFrom.value;
      const toKey = selTo.value;

      let result = 0;

      if (cat.isSpecial) {
        result = convertTemp(val, fromKey, toKey);
      } else {
        const fromFactor = cat.units[fromKey]?.factor || 1;
        const toFactor = cat.units[toKey]?.factor || 1;
        const baseVal = val * fromFactor;
        result = baseVal / toFactor;
      }

      valTo.textContent = formatNumber(result, 6);

      // Render Matrix Grid
      let matrixHtml = '';
      Object.entries(cat.units).forEach(([k, unitObj]) => {
        let converted = 0;
        if (cat.isSpecial) {
          converted = convertTemp(val, fromKey, k);
        } else {
          const fromFactor = cat.units[fromKey]?.factor || 1;
          const targetFactor = unitObj.factor || 1;
          converted = (val * fromFactor) / targetFactor;
        }

        matrixHtml += `
          <div class="p-2.5 rounded-lg bg-tertiary border border-subtle flex flex-col justify-between">
            <span class="text-[11px] text-muted truncate">${unitObj.name}</span>
            <span class="font-mono font-bold text-sm text-primary mt-1 truncate">${formatNumber(converted, 5)}</span>
          </div>
        `;
      });
      matrixGrid.innerHTML = matrixHtml;
    }

    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.cat;
        populateSelects();
        calculate();
      });
    });

    valFrom.addEventListener('input', calculate);
    selFrom.addEventListener('change', calculate);
    selTo.addEventListener('change', calculate);

    swapBtn.addEventListener('click', () => {
      const temp = selFrom.value;
      selFrom.value = selTo.value;
      selTo.value = temp;
      calculate();
    });

    populateSelects();
    calculate();
    if (window.lucide) window.lucide.createIcons();
  }
};
