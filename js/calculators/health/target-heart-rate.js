/**
 * Target Heart Rate (THR) & Fitness Training Zones Calculator
 * Karvonen Formula & Tanaka Age-Predicted Max Heart Rate Formula
 */
import { formatNumber } from '../../utils/formatters.js';
import { saveHistoryItem } from '../../utils/storage.js';

export const targetHeartRateCalculator = {
  id: 'target-heart-rate',
  title: 'Target Heart Rate & Training Zones',
  category: 'health',
  icon: 'heart',
  description: 'Calculate maximum heart rate and target training zones for fat burning, aerobic cardio, and peak performance.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-5 space-y-4">
          <div class="glass-card p-5">
            <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <i data-lucide="heart-pulse" class="w-4 h-4 text-accent-rose"></i>
              Cardiovascular Parameters
            </h3>

            <!-- Age -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Your Age</span>
                <span class="font-mono text-accent-rose font-bold" id="thr-age-disp">30 yrs</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="thr-age" class="calc-input" value="30" min="10" max="100">
                <span class="calc-input-suffix font-bold">Years</span>
              </div>
              <input type="range" id="thr-age-range" class="calc-range" value="30" min="15" max="85">
            </div>

            <!-- Resting Heart Rate -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Resting Heart Rate (RHR)</span>
                <span class="font-mono text-accent-primary font-bold" id="thr-rhr-disp">65 bpm</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="thr-rhr" class="calc-input" value="65" min="35" max="120">
                <span class="calc-input-suffix font-bold">BPM</span>
              </div>
              <input type="range" id="thr-rhr-range" class="calc-range" value="65" min="40" max="100">
            </div>

            <!-- Formula Selection -->
            <div class="calc-input-group pt-2 border-t border-subtle">
              <label class="calc-label"><span>Max Heart Rate Formula</span></label>
              <select id="thr-formula" class="calc-select text-xs">
                <option value="tanaka" selected>Tanaka Formula (208 - 0.7 × Age) [Gold Standard]</option>
                <option value="traditional">Traditional Formula (220 - Age) [Haskell & Fox]</option>
                <option value="gellish">Gellish Formula (207 - 0.7 × Age)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Results & Training Zones Breakdown -->
        <div class="lg:col-span-7 space-y-4">
          <!-- Summary Cards -->
          <div class="grid grid-cols-2 gap-3">
            <div class="result-card danger">
              <div class="result-label">Max Heart Rate (HRmax)</div>
              <div class="result-value text-accent-rose text-3xl" id="thr-hrmax-res">187 BPM</div>
              <div class="result-subtext">Upper physiological limit</div>
            </div>

            <div class="result-card success">
              <div class="result-label">Heart Rate Reserve (HRR)</div>
              <div class="result-value text-accent-emerald text-3xl" id="thr-hrr-res">122 BPM</div>
              <div class="result-subtext">Training capacity window</div>
            </div>
          </div>

          <!-- Training Zones Breakdown Cards -->
          <div class="glass-card p-4 space-y-2.5">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-2">5 Cardiovascular Training Zones (Karvonen Method)</h4>
            
            <!-- Zone 1 -->
            <div class="p-2.5 rounded-lg bg-tertiary border border-subtle flex items-center justify-between">
              <div>
                <div class="font-bold text-xs text-primary flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                  Zone 1: Active Recovery (50% - 60%)
                </div>
                <div class="text-[11px] text-muted">Warm-up, cooldown & gentle recovery</div>
              </div>
              <div class="font-mono font-bold text-xs text-primary" id="z1-res">126 - 138 BPM</div>
            </div>

            <!-- Zone 2 -->
            <div class="p-2.5 rounded-lg bg-accent-emerald-light border border-accent-emerald/30 flex items-center justify-between">
              <div>
                <div class="font-bold text-xs text-accent-emerald flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  Zone 2: Fat Burning & Endurance (60% - 70%)
                </div>
                <div class="text-[11px] text-secondary">Optimal for fat oxidation and mitochondrial building</div>
              </div>
              <div class="font-mono font-bold text-xs text-accent-emerald" id="z2-res">138 - 150 BPM</div>
            </div>

            <!-- Zone 3 -->
            <div class="p-2.5 rounded-lg bg-tertiary border border-subtle flex items-center justify-between">
              <div>
                <div class="font-bold text-xs text-primary flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  Zone 3: Aerobic Cardio Fitness (70% - 80%)
                </div>
                <div class="text-[11px] text-muted">Increases aerobic stamina & lung capacity</div>
              </div>
              <div class="font-mono font-bold text-xs text-primary" id="z3-res">150 - 163 BPM</div>
            </div>

            <!-- Zone 4 -->
            <div class="p-2.5 rounded-lg bg-tertiary border border-subtle flex items-center justify-between">
              <div>
                <div class="font-bold text-xs text-primary flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span>
                  Zone 4: Anaerobic Threshold (80% - 90%)
                </div>
                <div class="text-[11px] text-muted">Increases lactate threshold and sprint power</div>
              </div>
              <div class="font-mono font-bold text-xs text-primary" id="z4-res">163 - 175 BPM</div>
            </div>

            <!-- Zone 5 -->
            <div class="p-2.5 rounded-lg bg-accent-rose-light border border-accent-rose/30 flex items-center justify-between">
              <div>
                <div class="font-bold text-xs text-accent-rose flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                  Zone 5: VO2 Max Peak Interval (90% - 100%)
                </div>
                <div class="text-[11px] text-secondary">Maximum performance & peak HIIT sprints</div>
              </div>
              <div class="font-mono font-bold text-xs text-accent-rose" id="z5-res">175 - 187 BPM</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const ageInput = container.querySelector('#thr-age');
    const ageRange = container.querySelector('#thr-age-range');
    const ageDisp = container.querySelector('#thr-age-disp');
    const rhrInput = container.querySelector('#thr-rhr');
    const rhrRange = container.querySelector('#thr-rhr-range');
    const rhrDisp = container.querySelector('#thr-rhr-disp');
    const formulaSelect = container.querySelector('#thr-formula');

    const hrmaxRes = container.querySelector('#thr-hrmax-res');
    const hrrRes = container.querySelector('#thr-hrr-res');
    const z1Res = container.querySelector('#z1-res');
    const z2Res = container.querySelector('#z2-res');
    const z3Res = container.querySelector('#z3-res');
    const z4Res = container.querySelector('#z4-res');
    const z5Res = container.querySelector('#z5-res');

    function calculate() {
      const age = Math.max(10, Math.min(100, parseFloat(ageInput.value) || 30));
      const rhr = Math.max(30, Math.min(120, parseFloat(rhrInput.value) || 65));
      const formula = formulaSelect.value;

      ageDisp.textContent = `${age} yrs`;
      rhrDisp.textContent = `${rhr} bpm`;

      let hrMax = 220 - age;
      if (formula === 'tanaka') {
        hrMax = 208 - 0.7 * age;
      } else if (formula === 'gellish') {
        hrMax = 207 - 0.7 * age;
      }

      hrMax = Math.round(hrMax);
      const hrr = Math.max(10, hrMax - rhr);

      hrmaxRes.textContent = `${hrMax} BPM`;
      hrrRes.textContent = `${hrr} BPM`;

      const zone = (lowPct, highPct) => {
        const low = Math.round(rhr + hrr * (lowPct / 100));
        const high = Math.round(rhr + hrr * (highPct / 100));
        return `${low} - ${high} BPM`;
      };

      z1Res.textContent = zone(50, 60);
      z2Res.textContent = zone(60, 70);
      z3Res.textContent = zone(70, 80);
      z4Res.textContent = zone(80, 90);
      z5Res.textContent = zone(90, 100);
    }

    function sync(input, range) {
      input.addEventListener('input', () => { range.value = input.value; calculate(); });
      range.addEventListener('input', () => { input.value = range.value; calculate(); });
    }

    sync(ageInput, ageRange);
    sync(rhrInput, rhrRange);
    formulaSelect.addEventListener('change', calculate);

    calculate();
    if (window.lucide) window.lucide.createIcons();
  }
};
