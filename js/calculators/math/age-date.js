/**
 * Age & Date Difference Calculator
 */
import { formatNumber } from '../../utils/formatters.js';

export const ageDateCalculator = {
  id: 'age-date',
  title: 'Age & Date Difference Calculator',
  category: 'math',
  icon: 'calendar',
  description: 'Calculate exact age in years, months, days, hours, zodiac signs, next birthday countdown, and date spans.',

  render(container) {
    const todayStr = new Date().toISOString().split('T')[0];
    const defaultDob = '1998-05-15';

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <i data-lucide="calendar" class="w-4 h-4 text-accent-violet"></i>
              Date Selection
            </h3>

            <!-- Date of Birth -->
            <div class="calc-input-group">
              <label class="calc-label"><span>Date of Birth</span></label>
              <input type="date" id="age-dob" class="calc-input font-bold" value="${defaultDob}">
            </div>

            <!-- Target Date / Age at date of -->
            <div class="calc-input-group mb-0">
              <label class="calc-label"><span>Calculate Age As Of</span></label>
              <input type="date" id="age-target" class="calc-input font-bold" value="${todayStr}">
            </div>
          </div>

          <!-- Date Difference Tool -->
          <div class="glass-card p-5">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-3 flex items-center gap-1.5">
              <i data-lucide="calendar-range" class="w-3.5 h-3.5 text-accent-primary"></i>
              Calculate Span Between Any Two Dates
            </h4>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-[11px] font-semibold text-secondary">Start Date</label>
                <input type="date" id="diff-start" class="calc-input text-xs mt-1" value="2024-01-01">
              </div>
              <div>
                <label class="text-[11px] font-semibold text-secondary">End Date</label>
                <input type="date" id="diff-end" class="calc-input text-xs mt-1" value="${todayStr}">
              </div>
            </div>
            <div class="mt-3 p-3 rounded-lg bg-tertiary border border-subtle">
              <div class="text-xs text-muted">Difference:</div>
              <div class="font-bold text-sm text-accent-primary mt-0.5" id="diff-res-text">-</div>
              <div class="text-[11px] text-muted mt-1" id="diff-workdays-text">-</div>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="lg:col-span-6 space-y-4">
          <!-- Main Age Result -->
          <div class="result-card success">
            <div class="result-label">Exact Age</div>
            <div class="result-value text-accent-emerald text-2xl sm:text-3xl" id="age-exact-res">-</div>
            <div class="result-subtext" id="age-born-day">-</div>
          </div>

          <!-- Next Birthday & Zodiac -->
          <div class="grid grid-cols-2 gap-3">
            <div class="result-card violet">
              <div class="result-label">Next Birthday</div>
              <div class="result-value text-accent-violet text-lg" id="age-next-bday">-</div>
              <div class="result-subtext" id="age-next-bday-day">-</div>
            </div>

            <div class="result-card">
              <div class="result-label">Astrology / Zodiac</div>
              <div class="result-value text-accent-primary text-lg" id="age-zodiac">-</div>
              <div class="result-subtext" id="age-zodiac-symbol">-</div>
            </div>
          </div>

          <!-- Age in Other Units -->
          <div class="glass-card p-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-3">Total Time Lived Breakdown</h4>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div class="p-2.5 rounded-lg bg-tertiary text-center">
                <div class="text-[10px] text-muted font-bold uppercase">Months</div>
                <div class="font-mono font-bold text-sm text-primary mt-0.5" id="age-total-months">-</div>
              </div>
              <div class="p-2.5 rounded-lg bg-tertiary text-center">
                <div class="text-[10px] text-muted font-bold uppercase">Weeks</div>
                <div class="font-mono font-bold text-sm text-primary mt-0.5" id="age-total-weeks">-</div>
              </div>
              <div class="p-2.5 rounded-lg bg-tertiary text-center">
                <div class="text-[10px] text-muted font-bold uppercase">Days</div>
                <div class="font-mono font-bold text-sm text-primary mt-0.5" id="age-total-days">-</div>
              </div>
              <div class="p-2.5 rounded-lg bg-tertiary text-center">
                <div class="text-[10px] text-muted font-bold uppercase">Hours</div>
                <div class="font-mono font-bold text-sm text-primary mt-0.5" id="age-total-hours">-</div>
              </div>
              <div class="p-2.5 rounded-lg bg-tertiary text-center">
                <div class="text-[10px] text-muted font-bold uppercase">Minutes</div>
                <div class="font-mono font-bold text-sm text-primary mt-0.5" id="age-total-minutes">-</div>
              </div>
              <div class="p-2.5 rounded-lg bg-tertiary text-center">
                <div class="text-[10px] text-muted font-bold uppercase">Seconds</div>
                <div class="font-mono font-bold text-sm text-primary mt-0.5" id="age-total-seconds">-</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const dobInput = container.querySelector('#age-dob');
    const targetInput = container.querySelector('#age-target');
    const exactRes = container.querySelector('#age-exact-res');
    const bornDayRes = container.querySelector('#age-born-day');
    const nextBdayRes = container.querySelector('#age-next-bday');
    const nextBdayDay = container.querySelector('#age-next-bday-day');
    const zodiacRes = container.querySelector('#age-zodiac');
    const zodiacSym = container.querySelector('#age-zodiac-symbol');

    const totalMonths = container.querySelector('#age-total-months');
    const totalWeeks = container.querySelector('#age-total-weeks');
    const totalDays = container.querySelector('#age-total-days');
    const totalHours = container.querySelector('#age-total-hours');
    const totalMinutes = container.querySelector('#age-total-minutes');
    const totalSeconds = container.querySelector('#age-total-seconds');

    const diffStart = container.querySelector('#diff-start');
    const diffEnd = container.querySelector('#diff-end');
    const diffResText = container.querySelector('#diff-res-text');
    const diffWorkdaysText = container.querySelector('#diff-workdays-text');

    function getZodiac(month, day) {
      const zodiacs = [
        { name: 'Capricorn ♑', sign: 'Earth', maxDay: 19 },
        { name: 'Aquarius ♒', sign: 'Air', maxDay: 18 },
        { name: 'Pisces ♓', sign: 'Water', maxDay: 20 },
        { name: 'Aries ♈', sign: 'Fire', maxDay: 19 },
        { name: 'Taurus ♉', sign: 'Earth', maxDay: 20 },
        { name: 'Gemini ♊', sign: 'Air', maxDay: 20 },
        { name: 'Cancer ♋', sign: 'Water', maxDay: 22 },
        { name: 'Leo ♌', sign: 'Fire', maxDay: 22 },
        { name: 'Virgo ♍', sign: 'Earth', maxDay: 22 },
        { name: 'Libra ♎', sign: 'Air', maxDay: 22 },
        { name: 'Scorpio ♏', sign: 'Water', maxDay: 21 },
        { name: 'Sagittarius ♐', sign: 'Fire', maxDay: 21 },
        { name: 'Capricorn ♑', sign: 'Earth', maxDay: 31 }
      ];
      return day <= zodiacs[month - 1].maxDay ? zodiacs[month - 1] : zodiacs[month % 12];
    }

    function calculateAge() {
      const dob = new Date(dobInput.value + 'T00:00:00');
      const target = new Date(targetInput.value + 'T00:00:00');

      if (isNaN(dob.getTime()) || isNaN(target.getTime()) || target < dob) {
        exactRes.textContent = 'Invalid date range';
        return;
      }

      let y = target.getFullYear() - dob.getFullYear();
      let m = target.getMonth() - dob.getMonth();
      let d = target.getDate() - dob.getDate();

      if (d < 0) {
        m--;
        const prevMonthDays = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
        d += prevMonthDays;
      }
      if (m < 0) {
        y--;
        m += 12;
      }

      exactRes.textContent = `${y} years, ${m} months, ${d} days`;

      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      bornDayRes.textContent = `Born on a ${daysOfWeek[dob.getDay()]}`;

      // Next birthday calculation
      let nextBday = new Date(target.getFullYear(), dob.getMonth(), dob.getDate());
      if (nextBday < target) {
        nextBday = new Date(target.getFullYear() + 1, dob.getMonth(), dob.getDate());
      }
      const msDiff = nextBday.getTime() - target.getTime();
      const daysUntilBday = Math.ceil(msDiff / (1000 * 60 * 60 * 24));
      nextBdayRes.textContent = daysUntilBday === 0 ? 'Today! 🎉' : `in ${daysUntilBday} days`;
      nextBdayDay.textContent = `Falls on a ${daysOfWeek[nextBday.getDay()]}`;

      // Zodiac
      const z = getZodiac(dob.getMonth() + 1, dob.getDate());
      zodiacRes.textContent = z.name;
      zodiacSym.textContent = `${z.sign} Element`;

      // Total Breakdown
      const totalMs = target.getTime() - dob.getTime();
      const totalD = Math.floor(totalMs / (1000 * 60 * 60 * 24));
      const totalM = (y * 12) + m;
      const totalW = Math.floor(totalD / 7);
      const totalH = totalD * 24;
      const totalMin = totalH * 60;
      const totalSec = totalMin * 60;

      totalMonths.textContent = formatNumber(totalM, 0);
      totalWeeks.textContent = formatNumber(totalW, 0);
      totalDays.textContent = formatNumber(totalD, 0);
      totalHours.textContent = formatNumber(totalH, 0);
      totalMinutes.textContent = formatNumber(totalMin, 0);
      totalSeconds.textContent = formatNumber(totalSec, 0);
    }

    function calculateDiff() {
      const d1 = new Date(diffStart.value + 'T00:00:00');
      const d2 = new Date(diffEnd.value + 'T00:00:00');

      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return;

      const minDate = d1 < d2 ? d1 : d2;
      const maxDate = d1 < d2 ? d2 : d1;

      const totalDays = Math.round((maxDate - minDate) / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(totalDays / 7);
      const remDays = totalDays % 7;

      let workdays = 0;
      const cur = new Date(minDate);
      while (cur < maxDate) {
        const day = cur.getDay();
        if (day !== 0 && day !== 6) workdays++;
        cur.setDate(cur.getDate() + 1);
      }

      diffResText.textContent = `${totalDays} total days (${weeks} weeks, ${remDays} days)`;
      diffWorkdaysText.textContent = `Includes approx ${workdays} working / business days`;
    }

    dobInput.addEventListener('change', calculateAge);
    targetInput.addEventListener('change', calculateAge);
    diffStart.addEventListener('change', calculateDiff);
    diffEnd.addEventListener('change', calculateDiff);

    calculateAge();
    calculateDiff();
    if (window.lucide) window.lucide.createIcons();
  }
};
