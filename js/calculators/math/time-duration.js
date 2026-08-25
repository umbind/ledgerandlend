/**
 * Time & Duration Calculator
 */
import { formatNumber } from '../../utils/formatters.js';

export const timeDurationCalculator = {
  id: 'time-duration',
  title: 'Time & Duration Calculator',
  category: 'math',
  icon: 'clock',
  description: 'Add or subtract hours/minutes from time, calculate elapsed work shifts, and time differences.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 1. Work Shift / Time Span -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5 space-y-4">
            <h3 class="text-base font-bold text-primary flex items-center gap-2">
              <i data-lucide="clock" class="w-4 h-4 text-accent-primary"></i>
              Elapsed Time / Work Shift
            </h3>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="calc-label"><span>Start Time</span></label>
                <input type="time" id="time-start" class="calc-input font-bold" value="09:00">
              </div>
              <div>
                <label class="calc-label"><span>End Time</span></label>
                <input type="time" id="time-end" class="calc-input font-bold" value="17:30">
              </div>
            </div>

            <div class="calc-input-group">
              <label class="calc-label"><span>Break / Lunch Time (Minutes)</span></label>
              <input type="number" id="time-break" class="calc-input" value="45" min="0" max="240" step="5">
            </div>

            <div class="result-card success p-4">
              <div class="result-label">Total Working Duration</div>
              <div class="result-value text-accent-emerald text-2xl" id="time-work-res">-</div>
              <div class="result-subtext" id="time-decimal-res">-</div>
            </div>
          </div>
        </div>

        <!-- 2. Add / Subtract Time -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5 space-y-4">
            <h3 class="text-base font-bold text-primary flex items-center gap-2">
              <i data-lucide="plus-circle" class="w-4 h-4 text-accent-violet"></i>
              Add / Subtract Time from Clock
            </h3>

            <div class="calc-input-group">
              <label class="calc-label"><span>Base Time</span></label>
              <input type="time" id="time-base" class="calc-input font-bold" value="14:15">
            </div>

            <div class="grid grid-cols-3 gap-2">
              <div>
                <label class="text-[11px] font-semibold text-secondary">Operation</label>
                <select id="time-op" class="calc-select text-xs mt-1">
                  <option value="add">+ Add</option>
                  <option value="sub">- Subtract</option>
                </select>
              </div>
              <div>
                <label class="text-[11px] font-semibold text-secondary">Hours</label>
                <input type="number" id="time-add-hrs" class="calc-input text-xs mt-1" value="3" min="0">
              </div>
              <div>
                <label class="text-[11px] font-semibold text-secondary">Minutes</label>
                <input type="number" id="time-add-mins" class="calc-input text-xs mt-1" value="45" min="0" max="59">
              </div>
            </div>

            <div class="result-card violet p-4">
              <div class="result-label">Resulting Clock Time</div>
              <div class="result-value text-accent-violet text-2xl" id="time-calc-res">-</div>
              <div class="result-subtext" id="time-calc-sub">-</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const startInput = container.querySelector('#time-start');
    const endInput = container.querySelector('#time-end');
    const breakInput = container.querySelector('#time-break');
    const workRes = container.querySelector('#time-work-res');
    const decRes = container.querySelector('#time-decimal-res');

    const baseInput = container.querySelector('#time-base');
    const opSelect = container.querySelector('#time-op');
    const addHrs = container.querySelector('#time-add-hrs');
    const addMins = container.querySelector('#time-add-mins');
    const calcRes = container.querySelector('#time-calc-res');
    const calcSub = container.querySelector('#time-calc-sub');

    function calcShift() {
      const [sh, sm] = (startInput.value || '00:00').split(':').map(Number);
      const [eh, em] = (endInput.value || '00:00').split(':').map(Number);
      const breakMins = Math.max(0, parseInt(breakInput.value) || 0);

      let startTotal = sh * 60 + sm;
      let endTotal = eh * 60 + em;

      if (endTotal < startTotal) {
        endTotal += 24 * 60; // Overnight shift
      }

      let elapsed = endTotal - startTotal - breakMins;
      if (elapsed < 0) elapsed = 0;

      const hrs = Math.floor(elapsed / 60);
      const mins = elapsed % 60;
      const decHours = (elapsed / 60).toFixed(2);

      workRes.textContent = `${hrs} hrs ${mins} mins`;
      decRes.textContent = `Equal to ${decHours} decimal hours (billable time)`;
    }

    function calcArithmetic() {
      const [bh, bm] = (baseInput.value || '00:00').split(':').map(Number);
      const h = Math.max(0, parseInt(addHrs.value) || 0);
      const m = Math.max(0, parseInt(addMins.value) || 0);
      const op = opSelect.value;

      let totalBaseMins = bh * 60 + bm;
      const deltaMins = h * 60 + m;

      let resultMins = op === 'add' ? totalBaseMins + deltaMins : totalBaseMins - deltaMins;

      // Handle 24 hour wrap
      while (resultMins < 0) resultMins += 24 * 60;
      resultMins = resultMins % (24 * 60);

      const finalH = Math.floor(resultMins / 60);
      const finalM = resultMins % 60;

      const pad = (n) => String(n).padStart(2, '0');
      const time24 = `${pad(finalH)}:${pad(finalM)}`;

      const ampmH = finalH % 12 || 12;
      const ampm = finalH >= 12 ? 'PM' : 'AM';
      const time12 = `${ampmH}:${pad(finalM)} ${ampm}`;

      calcRes.textContent = `${time12} (${time24})`;
      calcSub.textContent = `${op === 'add' ? 'Added' : 'Subtracted'} ${h}h ${m}m to ${baseInput.value}`;
    }

    [startInput, endInput, breakInput].forEach(el => el.addEventListener('input', calcShift));
    [baseInput, opSelect, addHrs, addMins].forEach(el => {
      el.addEventListener('input', calcArithmetic);
      el.addEventListener('change', calcArithmetic);
    });

    calcShift();
    calcArithmetic();
    if (window.lucide) window.lucide.createIcons();
  }
};
