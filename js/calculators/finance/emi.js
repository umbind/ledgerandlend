/**
 * Loan EMI & Amortization Calculator
 * UX Enhanced: Quick Preset Chips, Interactive Schedule & 1-Click CSV Export
 */
import { formatCurrency, formatNumber } from '../../utils/formatters.js';
import { createDonutChart } from '../../utils/charts.js';
import { saveHistoryItem } from '../../utils/storage.js';

export const emiCalculator = {
  id: 'emi',
  title: 'Loan & EMI Calculator',
  category: 'finance',
  icon: 'landmark',
  description: 'Calculate monthly loan installments (EMI), total interest payable, and view yearly/monthly amortization schedule.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Inputs Section -->
        <div class="lg:col-span-6 space-y-4">
          <div class="glass-card p-5">
            <h3 class="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <i data-lucide="sliders" class="w-4 h-4 text-accent-primary"></i>
              Loan Parameters
            </h3>

            <!-- Loan Amount -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Loan Amount</span>
                <span class="font-mono text-accent-primary font-bold" id="emi-amount-display">$100,000</span>
              </div>
              <div class="calc-input-wrapper has-prefix">
                <span class="calc-input-prefix font-bold">$</span>
                <input type="number" id="emi-amount" class="calc-input" value="100000" min="1000" max="10000000" step="1000" oninput="if(document.getElementById('emi-amount-range'))document.getElementById('emi-amount-range').value=this.value; calculateEMI();">
              </div>
              <input type="range" id="emi-amount-range" class="calc-range" value="100000" min="10000" max="1000000" step="5000" oninput="if(document.getElementById('emi-amount'))document.getElementById('emi-amount').value=this.value; calculateEMI();">
              <!-- Quick Amount Presets -->
              <div class="flex items-center gap-1.5 overflow-x-auto pt-1 text-[11px]" id="emi-amount-presets">
                <span class="text-muted text-[10px] uppercase font-bold shrink-0">Presets:</span>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="25000" onclick="setEmiAmount(25000)">$25k</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="50000" onclick="setEmiAmount(50000)">$50k</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="100000" onclick="setEmiAmount(100000)">$100k</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="250000" onclick="setEmiAmount(250000)">$250k</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="500000" onclick="setEmiAmount(500000)">$500k</button>
              </div>
            </div>

            <!-- Interest Rate -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Annual Interest Rate (%)</span>
                <span class="font-mono text-accent-primary font-bold" id="emi-rate-display">8.5%</span>
              </div>
              <div class="calc-input-wrapper has-suffix">
                <input type="number" id="emi-rate" class="calc-input" value="8.5" min="0.1" max="40" step="0.1" oninput="if(document.getElementById('emi-rate-range'))document.getElementById('emi-rate-range').value=this.value; calculateEMI();">
                <span class="calc-input-suffix font-bold">%</span>
              </div>
              <input type="range" id="emi-rate-range" class="calc-range" value="8.5" min="1" max="25" step="0.1" oninput="if(document.getElementById('emi-rate'))document.getElementById('emi-rate').value=this.value; calculateEMI();">
              <!-- Quick Rate Presets -->
              <div class="flex items-center gap-1.5 overflow-x-auto pt-1 text-[11px]" id="emi-rate-presets">
                <span class="text-muted text-[10px] uppercase font-bold shrink-0">Rates:</span>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="7.0" onclick="setEmiRate(7.0)">7% (Low)</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="8.5" onclick="setEmiRate(8.5)">8.5% (Standard)</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="10.5" onclick="setEmiRate(10.5)">10.5% (High)</button>
              </div>
            </div>

            <!-- Loan Tenure -->
            <div class="calc-input-group">
              <div class="calc-label">
                <span>Loan Tenure</span>
                <span class="font-mono text-accent-primary font-bold" id="emi-tenure-display">15 Years (180 mos)</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="flex-1 calc-input-wrapper">
                  <input type="number" id="emi-tenure" class="calc-input" value="15" min="1" max="40" step="1" oninput="if(document.getElementById('emi-tenure-range'))document.getElementById('emi-tenure-range').value=this.value; calculateEMI();">
                </div>
                <div class="flex items-center p-1 bg-tertiary rounded-lg border border-subtle shrink-0">
                  <button type="button" id="emi-unit-yr" class="px-3 py-1 text-xs font-semibold rounded bg-accent-primary text-white shadow-sm transition-all" onclick="setEmiTenureUnit('years')">Years</button>
                  <button type="button" id="emi-unit-mo" class="px-3 py-1 text-xs font-semibold rounded text-secondary hover:text-primary transition-all" onclick="setEmiTenureUnit('months')">Months</button>
                </div>
              </div>
              <input type="range" id="emi-tenure-range" class="calc-range" value="15" min="1" max="30" step="1" oninput="if(document.getElementById('emi-tenure'))document.getElementById('emi-tenure').value=this.value; calculateEMI();">
              <!-- Quick Tenure Presets -->
              <div class="flex items-center gap-1.5 overflow-x-auto pt-1 text-[11px]" id="emi-tenure-presets">
                <span class="text-muted text-[10px] uppercase font-bold shrink-0">Tenure:</span>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="5" onclick="setEmiTenure(5)">5 Yrs</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="10" onclick="setEmiTenure(10)">10 Yrs</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="15" onclick="setEmiTenure(15)">15 Yrs</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="20" onclick="setEmiTenure(20)">20 Yrs</button>
                <button type="button" class="px-2 py-0.5 rounded bg-tertiary hover:bg-border-subtle text-secondary font-medium transition-all" data-val="30" onclick="setEmiTenure(30)">30 Yrs</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Results & Summary Section -->
        <div class="lg:col-span-6 space-y-4">
          <!-- Primary Monthly Payment Card -->
          <div class="result-card group cursor-pointer" id="copyable-emi-card" title="Click to copy EMI amount">
            <div class="flex items-center justify-between">
              <div class="result-label">Monthly EMI Payment</div>
              <span class="text-[10px] font-bold text-muted group-hover:text-accent-primary flex items-center gap-1">
                <i data-lucide="copy" class="w-3 h-3"></i> Click to Copy
              </span>
            </div>
            <div class="result-value text-accent-primary text-3xl sm:text-4xl font-mono font-extrabold" id="emi-monthly-res">$984.74</div>
            <div class="result-subtext">Principal + Interest per month</div>
          </div>

          <!-- Secondary Metric Breakdown Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="result-card warning">
              <div class="result-label">Total Interest</div>
              <div class="result-value text-accent-amber text-lg sm:text-xl font-mono font-bold" id="emi-interest-res">$77,253.12</div>
              <div class="result-subtext" id="emi-interest-pct">77.3% of loan principal</div>
            </div>

            <div class="result-card success">
              <div class="result-label">Total Amount Payable</div>
              <div class="result-value text-accent-emerald text-lg sm:text-xl font-mono font-bold" id="emi-total-res">$177,253.12</div>
              <div class="result-subtext">Principal + Total Interest</div>
            </div>
          </div>

          <!-- Donut Breakdown Chart -->
          <div class="glass-card p-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-3">Loan Payment Ratio</h4>
            <div id="emi-chart-container">
              <div class="flex flex-col sm:flex-row items-center gap-4">
                <div class="relative shrink-0 flex items-center justify-center">
                  <svg width="140" height="140" viewBox="0 0 140 140" class="shrink-0 overflow-visible">
                    <circle cx="70" cy="70" r="53.2" fill="transparent" stroke="#3b82f6" stroke-width="25.2" stroke-dasharray="188.5 334.27" stroke-dashoffset="0" transform="rotate(-90 70 70)" class="chart-slice transition-all duration-300 ease-out cursor-pointer hover:opacity-90"></circle>
                    <circle cx="70" cy="70" r="53.2" fill="transparent" stroke="#f59e0b" stroke-width="25.2" stroke-dasharray="145.7 334.27" stroke-dashoffset="-188.5" transform="rotate(-90 70 70)" class="chart-slice transition-all duration-300 ease-out cursor-pointer hover:opacity-90"></circle>
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span class="text-[10px] uppercase font-bold text-muted tracking-wider">Total</span>
                    <span class="text-xs font-mono font-bold text-primary" id="emi-donut-total">$177,253</span>
                  </div>
                </div>
                <div class="flex-1 w-full space-y-1">
                  <div class="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-tertiary transition-colors cursor-default" title="Principal Loan Amount">
                    <div class="flex items-center gap-2">
                      <span class="w-3 h-3 rounded-full inline-block shadow-sm" style="background-color: #3b82f6;"></span>
                      <span class="text-secondary font-medium">Principal Loan Amount</span>
                    </div>
                    <div class="text-right"><span class="font-mono font-bold text-primary">56.4%</span></div>
                  </div>
                  <div class="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-tertiary transition-colors cursor-default" title="Total Interest Payable">
                    <div class="flex items-center gap-2">
                      <span class="w-3 h-3 rounded-full inline-block shadow-sm" style="background-color: #f59e0b;"></span>
                      <span class="text-secondary font-medium">Total Interest Payable</span>
                    </div>
                    <div class="text-right"><span class="font-mono font-bold text-primary">43.6%</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Amortization Schedule Table & CSV Export -->
      <div class="glass-card p-5 mt-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 class="text-base font-bold text-primary flex items-center gap-2">
              <i data-lucide="table" class="w-4 h-4 text-accent-primary"></i>
              Yearly Amortization Schedule
            </h3>
            <p class="text-xs text-muted">Detailed year-by-year principal reduction breakdown</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="emi-csv-btn" class="btn btn-secondary btn-sm text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-subtle hover:bg-tertiary transition-all">
              <i data-lucide="download" class="w-3.5 h-3.5 text-accent-primary"></i>
              <span>Export Schedule CSV</span>
            </button>
            <button id="emi-save-btn" class="btn btn-secondary btn-sm text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-subtle hover:bg-tertiary transition-all">
              <i data-lucide="bookmark" class="w-3.5 h-3.5"></i>
              <span>Save to History</span>
            </button>
          </div>
        </div>
        <div class="overflow-x-auto max-h-[380px] rounded-lg border border-subtle">
          <table class="w-full text-left text-xs font-mono" id="emi-schedule-table">
            <thead class="bg-tertiary text-muted sticky top-0 uppercase text-[10px] tracking-wider font-sans">
              <tr>
                <th class="p-3">Year</th>
                <th class="p-3">Opening Balance</th>
                <th class="p-3">EMI Paid (Yr)</th>
                <th class="p-3 text-accent-primary">Principal Paid</th>
                <th class="p-3 text-accent-amber">Interest Paid</th>
                <th class="p-3">Closing Balance</th>
              </tr>
            </thead>
            <tbody id="emi-schedule-body" class="divide-y divide-subtle bg-secondary/50">
              <tr class="hover:bg-tertiary transition-colors">
                <td class="p-3 font-bold text-primary">1</td>
                <td class="p-3 text-secondary font-mono">$100,000.00</td>
                <td class="p-3 text-secondary font-mono">$11,816.87</td>
                <td class="p-3 font-bold text-accent-primary font-mono">$3,449.19</td>
                <td class="p-3 font-bold text-accent-amber font-mono">$8,367.68</td>
                <td class="p-3 text-secondary font-mono font-bold">$96,550.81</td>
              </tr>
              <tr class="hover:bg-tertiary transition-colors">
                <td class="p-3 font-bold text-primary">2</td>
                <td class="p-3 text-secondary font-mono">$96,550.81</td>
                <td class="p-3 text-secondary font-mono">$11,816.87</td>
                <td class="p-3 font-bold text-accent-primary font-mono">$3,754.07</td>
                <td class="p-3 font-bold text-accent-amber font-mono">$8,062.80</td>
                <td class="p-3 text-secondary font-mono font-bold">$92,796.73</td>
              </tr>
              <tr class="hover:bg-tertiary transition-colors">
                <td class="p-3 font-bold text-primary">3</td>
                <td class="p-3 text-secondary font-mono">$92,796.73</td>
                <td class="p-3 text-secondary font-mono">$11,816.87</td>
                <td class="p-3 font-bold text-accent-primary font-mono">$4,085.90</td>
                <td class="p-3 font-bold text-accent-amber font-mono">$7,730.98</td>
                <td class="p-3 text-secondary font-mono font-bold">$88,710.83</td>
              </tr>
              <tr class="hover:bg-tertiary transition-colors">
                <td class="p-3 font-bold text-primary">4</td>
                <td class="p-3 text-secondary font-mono">$88,710.83</td>
                <td class="p-3 text-secondary font-mono">$11,816.87</td>
                <td class="p-3 font-bold text-accent-primary font-mono">$4,447.05</td>
                <td class="p-3 font-bold text-accent-amber font-mono">$7,369.82</td>
                <td class="p-3 text-secondary font-mono font-bold">$84,263.78</td>
              </tr>
              <tr class="hover:bg-tertiary transition-colors">
                <td class="p-3 font-bold text-primary">5</td>
                <td class="p-3 text-secondary font-mono">$84,263.78</td>
                <td class="p-3 text-secondary font-mono">$11,816.87</td>
                <td class="p-3 font-bold text-accent-primary font-mono">$4,840.13</td>
                <td class="p-3 font-bold text-accent-amber font-mono">$6,976.74</td>
                <td class="p-3 text-secondary font-mono font-bold">$79,423.65</td>
              </tr>
              <tr class="hover:bg-tertiary transition-colors">
                <td class="p-3 font-bold text-primary">6</td>
                <td class="p-3 text-secondary font-mono">$79,423.65</td>
                <td class="p-3 text-secondary font-mono">$11,816.87</td>
                <td class="p-3 font-bold text-accent-primary font-mono">$5,267.96</td>
                <td class="p-3 font-bold text-accent-amber font-mono">$6,548.92</td>
                <td class="p-3 text-secondary font-mono font-bold">$74,155.69</td>
              </tr>
              <tr class="hover:bg-tertiary transition-colors">
                <td class="p-3 font-bold text-primary">7</td>
                <td class="p-3 text-secondary font-mono">$74,155.69</td>
                <td class="p-3 text-secondary font-mono">$11,816.87</td>
                <td class="p-3 font-bold text-accent-primary font-mono">$5,733.60</td>
                <td class="p-3 font-bold text-accent-amber font-mono">$6,083.28</td>
                <td class="p-3 text-secondary font-mono font-bold">$68,422.09</td>
              </tr>
              <tr class="hover:bg-tertiary transition-colors">
                <td class="p-3 font-bold text-primary">8</td>
                <td class="p-3 text-secondary font-mono">$68,422.09</td>
                <td class="p-3 text-secondary font-mono">$11,816.87</td>
                <td class="p-3 font-bold text-accent-primary font-mono">$6,240.39</td>
                <td class="p-3 font-bold text-accent-amber font-mono">$5,576.48</td>
                <td class="p-3 text-secondary font-mono font-bold">$62,181.70</td>
              </tr>
              <tr class="hover:bg-tertiary transition-colors">
                <td class="p-3 font-bold text-primary">9</td>
                <td class="p-3 text-secondary font-mono">$62,181.70</td>
                <td class="p-3 text-secondary font-mono">$11,816.87</td>
                <td class="p-3 font-bold text-accent-primary font-mono">$6,791.99</td>
                <td class="p-3 font-bold text-accent-amber font-mono">$5,024.89</td>
                <td class="p-3 text-secondary font-mono font-bold">$55,389.71</td>
              </tr>
              <tr class="hover:bg-tertiary transition-colors">
                <td class="p-3 font-bold text-primary">10</td>
                <td class="p-3 text-secondary font-mono">$55,389.71</td>
                <td class="p-3 text-secondary font-mono">$11,816.87</td>
                <td class="p-3 font-bold text-accent-primary font-mono">$7,392.34</td>
                <td class="p-3 font-bold text-accent-amber font-mono">$4,424.54</td>
                <td class="p-3 text-secondary font-mono font-bold">$47,997.37</td>
              </tr>
              <tr class="hover:bg-tertiary transition-colors">
                <td class="p-3 font-bold text-primary">11</td>
                <td class="p-3 text-secondary font-mono">$47,997.37</td>
                <td class="p-3 text-secondary font-mono">$11,816.87</td>
                <td class="p-3 font-bold text-accent-primary font-mono">$8,045.75</td>
                <td class="p-3 font-bold text-accent-amber font-mono">$3,771.12</td>
                <td class="p-3 text-secondary font-mono font-bold">$39,951.62</td>
              </tr>
              <tr class="hover:bg-tertiary transition-colors">
                <td class="p-3 font-bold text-primary">12</td>
                <td class="p-3 text-secondary font-mono">$39,951.62</td>
                <td class="p-3 text-secondary font-mono">$11,816.87</td>
                <td class="p-3 font-bold text-accent-primary font-mono">$8,756.93</td>
                <td class="p-3 font-bold text-accent-amber font-mono">$3,059.95</td>
                <td class="p-3 text-secondary font-mono font-bold">$31,194.69</td>
              </tr>
              <tr class="hover:bg-tertiary transition-colors">
                <td class="p-3 font-bold text-primary">13</td>
                <td class="p-3 text-secondary font-mono">$31,194.69</td>
                <td class="p-3 text-secondary font-mono">$11,816.87</td>
                <td class="p-3 font-bold text-accent-primary font-mono">$9,530.96</td>
                <td class="p-3 font-bold text-accent-amber font-mono">$2,285.92</td>
                <td class="p-3 text-secondary font-mono font-bold">$21,663.73</td>
              </tr>
              <tr class="hover:bg-tertiary transition-colors">
                <td class="p-3 font-bold text-primary">14</td>
                <td class="p-3 text-secondary font-mono">$21,663.73</td>
                <td class="p-3 text-secondary font-mono">$11,816.87</td>
                <td class="p-3 font-bold text-accent-primary font-mono">$10,373.41</td>
                <td class="p-3 font-bold text-accent-amber font-mono">$1,443.47</td>
                <td class="p-3 text-secondary font-mono font-bold">$11,290.32</td>
              </tr>
              <tr class="hover:bg-tertiary transition-colors">
                <td class="p-3 font-bold text-primary">15</td>
                <td class="p-3 text-secondary font-mono">$11,290.32</td>
                <td class="p-3 text-secondary font-mono">$11,816.87</td>
                <td class="p-3 font-bold text-accent-primary font-mono">$11,290.32</td>
                <td class="p-3 font-bold text-accent-amber font-mono">$526.55</td>
                <td class="p-3 text-secondary font-mono font-bold">$0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
`;

    const amountInput = container.querySelector('#emi-amount');
    const amountRange = container.querySelector('#emi-amount-range');
    const amountDisplay = container.querySelector('#emi-amount-display');
    const rateInput = container.querySelector('#emi-rate');
    const rateRange = container.querySelector('#emi-rate-range');
    const rateDisplay = container.querySelector('#emi-rate-display');
    const tenureInput = container.querySelector('#emi-tenure');
    const tenureRange = container.querySelector('#emi-tenure-range');
    const tenureDisplay = container.querySelector('#emi-tenure-display');
    const tenureYrBtn = container.querySelector('#emi-unit-yr');
    const tenureMoBtn = container.querySelector('#emi-unit-mo');

    const monthlyRes = container.querySelector('#emi-monthly-res');
    const interestRes = container.querySelector('#emi-interest-res');
    const totalRes = container.querySelector('#emi-total-res');
    const interestPct = container.querySelector('#emi-interest-pct');
    const chartContainer = container.querySelector('#emi-chart-container');
    const scheduleBody = container.querySelector('#emi-schedule-body');
    const saveBtn = container.querySelector('#emi-save-btn');
    const csvBtn = container.querySelector('#emi-csv-btn');
    const copyCard = container.querySelector('#copyable-emi-card');

    let currentScheduleData = [];
    let isYears = true;

    function calculate() {
      const p = Math.max(0, parseFloat(amountInput.value) || 0);
      const rAnnual = Math.max(0, parseFloat(rateInput.value) || 0);
      let tenure = Math.max(1, parseFloat(tenureInput.value) || 1);

      const months = isYears ? tenure * 12 : tenure;
      const rMonthly = (rAnnual / 12) / 100;

      amountDisplay.textContent = formatCurrency(p);
      rateDisplay.textContent = `${rAnnual}%`;
      tenureDisplay.textContent = isYears ? `${tenure} ${tenure === 1 ? 'Year' : 'Years'} (${months} mos)` : `${months} Months`;

      let emi = 0;
      if (rMonthly === 0) {
        emi = months > 0 ? p / months : 0;
      } else {
        const factor = Math.pow(1 + rMonthly, months);
        emi = (p * rMonthly * factor) / (factor - 1);
      }

      if (isNaN(emi) || !isFinite(emi)) emi = 0;

      const totalPayable = emi * months;
      const totalInterest = Math.max(0, totalPayable - p);
      const intPercentage = p > 0 ? ((totalInterest / p) * 100).toFixed(1) : 0;

      monthlyRes.textContent = formatCurrency(emi);
      interestRes.textContent = formatCurrency(totalInterest);
      totalRes.textContent = formatCurrency(totalPayable);
      if (interestPct) interestPct.textContent = `${intPercentage}% of loan principal`;

      // Render Donut Chart
      if (chartContainer && totalPayable > 0) {
        const prinPct = (p / totalPayable) * 100;
        const intPct = (totalInterest / totalPayable) * 100;
        const circ = 334.27;
        const prinDash = (prinPct / 100) * circ;
        const intDash = (intPct / 100) * circ;

        chartContainer.innerHTML = `
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <div class="relative shrink-0 flex items-center justify-center">
              <svg width="140" height="140" viewBox="0 0 140 140" class="shrink-0 overflow-visible">
                <circle cx="70" cy="70" r="53.2" fill="transparent" stroke="#3b82f6" stroke-width="25.2" stroke-dasharray="${prinDash.toFixed(1)} ${circ}" stroke-dashoffset="0" transform="rotate(-90 70 70)" class="chart-slice"></circle>
                <circle cx="70" cy="70" r="53.2" fill="transparent" stroke="#f59e0b" stroke-width="25.2" stroke-dasharray="${intDash.toFixed(1)} ${circ}" stroke-dashoffset="-${prinDash.toFixed(1)}" transform="rotate(-90 70 70)" class="chart-slice"></circle>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span class="text-[10px] uppercase font-bold text-muted tracking-wider">Total</span>
                <span class="text-xs font-mono font-bold text-primary">${formatCurrency(totalPayable)}</span>
              </div>
            </div>
            <div class="flex-1 w-full space-y-1">
              <div class="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-tertiary transition-colors cursor-default">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full inline-block shadow-sm" style="background-color: #3b82f6;"></span>
                  <span class="text-secondary font-medium">Principal Loan Amount</span>
                </div>
                <div class="text-right"><span class="font-mono font-bold text-primary">${prinPct.toFixed(1)}%</span></div>
              </div>
              <div class="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-tertiary transition-colors cursor-default">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full inline-block shadow-sm" style="background-color: #f59e0b;"></span>
                  <span class="text-secondary font-medium">Total Interest Payable</span>
                </div>
                <div class="text-right"><span class="font-mono font-bold text-primary">${intPct.toFixed(1)}%</span></div>
              </div>
            </div>
          </div>
        `;
      }

      // Generate Amortization Schedule
      if (scheduleBody) {
        let balance = p;
        let scheduleHtml = '';
        currentScheduleData = [];
        const totalYears = Math.ceil(months / 12);

        for (let y = 1; y <= totalYears; y++) {
          const startBalance = balance;
          let yearlyPrincipal = 0;
          let yearlyInterest = 0;

          for (let m = 1; m <= 12; m++) {
            const currentMonth = (y - 1) * 12 + m;
            if (currentMonth > months || balance <= 0) break;

            const intForMonth = balance * rMonthly;
            const prinForMonth = Math.min(balance, emi - intForMonth);

            yearlyInterest += intForMonth;
            yearlyPrincipal += prinForMonth;
            balance -= prinForMonth;
          }

          const yearlyTotalEmi = yearlyPrincipal + yearlyInterest;
          currentScheduleData.push({
            year: y,
            opening: startBalance,
            emi: yearlyTotalEmi,
            principal: yearlyPrincipal,
            interest: yearlyInterest,
            closing: Math.max(0, balance)
          });

          scheduleHtml += `
            <tr class="hover:bg-tertiary transition-colors">
              <td class="p-3 font-bold text-primary">${y}</td>
              <td class="p-3 text-secondary font-mono">${formatCurrency(startBalance)}</td>
              <td class="p-3 text-secondary font-mono">${formatCurrency(yearlyTotalEmi)}</td>
              <td class="p-3 font-bold text-accent-primary font-mono">${formatCurrency(yearlyPrincipal)}</td>
              <td class="p-3 font-bold text-accent-amber font-mono">${formatCurrency(yearlyInterest)}</td>
              <td class="p-3 text-secondary font-mono font-bold">${formatCurrency(Math.max(0, balance))}</td>
            </tr>
          `;
        }
        scheduleBody.innerHTML = scheduleHtml;
      }

      return { p, rAnnual, tenure, months, emi, totalInterest, totalPayable };
    }

    function sync(input, range, cb) {
      if (input && range) {
        input.addEventListener('input', () => { range.value = input.value; cb(); });
        range.addEventListener('input', () => { input.value = range.value; cb(); });
      }
    }

    sync(amountInput, amountRange, calculate);
    sync(rateInput, rateRange, calculate);
    sync(tenureInput, tenureRange, calculate);

    if (tenureYrBtn && tenureMoBtn) {
      tenureYrBtn.addEventListener('click', () => {
        isYears = true;
        tenureYrBtn.className = 'px-3 py-1 text-xs font-semibold rounded bg-accent-primary text-white shadow-sm transition-all';
        tenureMoBtn.className = 'px-3 py-1 text-xs font-semibold rounded text-secondary hover:text-primary transition-all';
        if (tenureRange) tenureRange.max = 30;
        calculate();
      });
      tenureMoBtn.addEventListener('click', () => {
        isYears = false;
        tenureMoBtn.className = 'px-3 py-1 text-xs font-semibold rounded bg-accent-primary text-white shadow-sm transition-all';
        tenureYrBtn.className = 'px-3 py-1 text-xs font-semibold rounded text-secondary hover:text-primary transition-all';
        if (tenureRange) tenureRange.max = 360;
        calculate();
      });
    }

    // Preset Amount Chips Click
    container.querySelectorAll('#emi-amount-presets button').forEach(btn => {
      btn.addEventListener('click', () => {
        if (amountInput) amountInput.value = btn.dataset.val;
        if (amountRange) amountRange.value = btn.dataset.val;
        calculate();
      });
    });

    // Preset Rate Chips Click
    container.querySelectorAll('#emi-rate-presets button').forEach(btn => {
      btn.addEventListener('click', () => {
        if (rateInput) rateInput.value = btn.dataset.val;
        if (rateRange) rateRange.value = btn.dataset.val;
        calculate();
      });
    });

    // Preset Tenure Chips Click
    container.querySelectorAll('#emi-tenure-presets button').forEach(btn => {
      btn.addEventListener('click', () => {
        isYears = true;
        if (tenureYrBtn) tenureYrBtn.className = 'px-3 py-1 text-xs font-semibold rounded bg-accent-primary text-white shadow-sm transition-all';
        if (tenureMoBtn) tenureMoBtn.className = 'px-3 py-1 text-xs font-semibold rounded text-secondary hover:text-primary transition-all';
        if (tenureInput) tenureInput.value = btn.dataset.val;
        if (tenureRange) tenureRange.value = btn.dataset.val;
        calculate();
      });
    });

    // 1-Click Copy Result Card
    if (copyCard) {
      copyCard.addEventListener('click', () => {
        const text = monthlyRes?.textContent;
        if (text && navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            window.calcApp?.showToast(`Copied Monthly EMI (${text}) to clipboard!`);
          });
        }
      });
    }

    // CSV Download Action
    if (csvBtn) {
      csvBtn.addEventListener('click', () => {
        if (currentScheduleData.length === 0) return;
        let csv = "Year,Opening Balance,Total EMI Paid,Principal Paid,Interest Paid,Closing Balance\r\n";
        currentScheduleData.forEach(row => {
          csv += `${row.year},${row.opening.toFixed(2)},${row.emi.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.closing.toFixed(2)}\r\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Loan_Amortization_Schedule.csv`;
        a.click();
        URL.revokeObjectURL(url);
        window.calcApp?.showToast('Amortization schedule downloaded as CSV!');
      });
    }

    // Save to History
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const data = calculate();
        saveHistoryItem({
          calcId: 'emi',
          calcTitle: 'Loan & EMI Calculator',
          summary: `Loan: ${formatCurrency(data.p)} @ ${data.rAnnual}% for ${data.tenure} ${isYears ? 'Years' : 'Months'} -> EMI: ${formatCurrency(data.emi)}/mo`,
          inputs: { amount: data.p, rate: data.rAnnual, tenure: data.tenure, unit: isYears ? 'years' : 'months' },
          results: { emi: data.emi, totalInterest: data.totalInterest, totalPayable: data.totalPayable }
        });
        saveBtn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-accent-emerald"></i> Saved!';
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          saveBtn.innerHTML = '<i data-lucide="bookmark" class="w-3.5 h-3.5"></i> Save to History';
          if (window.lucide) window.lucide.createIcons();
        }, 2000);
      });
    }

    calculate();
    if (window.lucide) window.lucide.createIcons();
  }
};
