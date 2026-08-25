/**
 * Essential Calculators Hub - Lightweight Dynamic Charts
 * Pure SVG & Canvas rendering with zero external dependencies
 * Enhanced with interactive hover states, micro-animations & tooltips
 */

/**
 * Creates an interactive Donut / Pie chart SVG
 * @param {Array<{label: string, value: number, color: string}>} slices
 * @param {number} size
 */
export function createDonutChart(slices, size = 180) {
  const total = slices.reduce((sum, s) => sum + Math.max(0, s.value), 0);
  if (total <= 0) return '<div class="text-xs text-muted">No data to chart</div>';

  const radius = size * 0.38;
  const cx = size / 2;
  const cy = size / 2;
  const strokeWidth = size * 0.18;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  let circlesSvg = '';

  slices.forEach((slice, idx) => {
    const percent = slice.value / total;
    const strokeDasharray = `${percent * circumference} ${circumference}`;
    const strokeDashoffset = -cumulativePercent * circumference;

    circlesSvg += `
      <circle
        cx="${cx}"
        cy="${cy}"
        r="${radius}"
        fill="transparent"
        stroke="${slice.color}"
        stroke-width="${strokeWidth}"
        stroke-dasharray="${strokeDasharray}"
        stroke-dashoffset="${strokeDashoffset}"
        transform="rotate(-90 ${cx} ${cy})"
        class="chart-slice transition-all duration-300 ease-out cursor-pointer hover:opacity-90 hover:stroke-[22]"
        data-label="${slice.label}"
        data-val="${slice.value}"
        data-pct="${(percent * 100).toFixed(1)}"
      >
        <title>${slice.label}: ${slice.value.toLocaleString(undefined, {maximumFractionDigits: 2})} (${(percent * 100).toFixed(1)}%)</title>
      </circle>
    `;
    cumulativePercent += percent;
  });

  const legend = slices.map((s, idx) => `
    <div class="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-tertiary transition-colors cursor-default" title="${s.label}">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full inline-block shadow-sm" style="background-color: ${s.color};"></span>
        <span class="text-secondary font-medium">${s.label}</span>
      </div>
      <div class="text-right">
        <span class="font-mono font-bold text-primary">${((s.value / total) * 100).toFixed(1)}%</span>
      </div>
    </div>
  `).join('');

  return `
    <div class="flex flex-col sm:flex-row items-center gap-4">
      <div class="relative shrink-0 flex items-center justify-center">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="shrink-0 overflow-visible">
          ${circlesSvg}
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span class="text-[10px] uppercase font-bold text-muted tracking-wider">Total</span>
          <span class="text-xs font-mono font-bold text-primary">${total.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
        </div>
      </div>
      <div class="flex-1 w-full space-y-1">
        ${legend}
      </div>
    </div>
  `;
}

/**
 * Creates a Half-Circle Gauge SVG (e.g. for BMI)
 * @param {number} value - current value (e.g. 24.5)
 * @param {number} min - min range (e.g. 15)
 * @param {number} max - max range (e.g. 40)
 * @param {Array<{label: string, maxVal: number, color: string}>} zones
 */
export function createGaugeChart(value, min = 15, max = 40, zones = []) {
  const clampedVal = Math.min(Math.max(value, min), max);
  const percent = (clampedVal - min) / (max - min);

  const width = 240;
  const height = 135;
  const cx = 120;
  const cy = 115;
  const r = 90;

  let zoneSegments = '';
  let prevPercent = 0;

  zones.forEach(zone => {
    const zonePercent = Math.min(Math.max((zone.maxVal - min) / (max - min), 0), 1);
    const startAngle = Math.PI + (prevPercent * Math.PI);
    const endAngle = Math.PI + (zonePercent * Math.PI);

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    zoneSegments += `
      <path d="M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}"
            fill="none"
            stroke="${zone.color}"
            stroke-width="14"
            stroke-linecap="round"
            class="transition-all duration-300"
      >
        <title>${zone.label} (Up to ${zone.maxVal})</title>
      </path>
    `;
    prevPercent = zonePercent;
  });

  // Needle calculations
  const needleRad = Math.PI + (percent * Math.PI);
  const nx = cx + (r - 18) * Math.cos(needleRad);
  const ny = cy + (r - 18) * Math.sin(needleRad);

  return `
    <div class="flex flex-col items-center">
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" class="overflow-visible">
        ${zoneSegments}
        <circle cx="${cx}" cy="${cy}" r="7" fill="var(--text-primary)" class="shadow" />
        <circle cx="${cx}" cy="${cy}" r="3" fill="var(--bg-secondary)" />
        <line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}"
              stroke="var(--text-primary)" stroke-width="3.5" stroke-linecap="round"
              class="transition-all duration-700 ease-out" />
      </svg>
      <div class="flex justify-between w-full text-[11px] text-muted px-4 -mt-2 font-mono">
        <span>${min}</span>
        <span class="font-bold text-accent-primary">${value.toFixed(1)}</span>
        <span>${max}+</span>
      </div>
    </div>
  `;
}

/**
 * Creates an interactive SVG Multi-Line Growth Chart
 * @param {Array<{year: number, invested: number, returns: number, total: number}>} dataPoints
 */
export function createGrowthChart(dataPoints, width = 460, height = 210) {
  if (!dataPoints || dataPoints.length < 2) return '';

  const padding = { top: 25, right: 25, bottom: 35, left: 65 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const maxVal = Math.max(...dataPoints.map(d => d.total));
  const minVal = 0;

  const getX = (idx) => padding.left + (idx / (dataPoints.length - 1)) * plotW;
  const getY = (val) => padding.top + plotH - ((val - minVal) / (maxVal - minVal || 1)) * plotH;

  // Build line paths
  const investedPoints = dataPoints.map((d, i) => `${getX(i)},${getY(d.invested)}`).join(' ');
  const totalPoints = dataPoints.map((d, i) => `${getX(i)},${getY(d.total)}`).join(' ');

  // Build area under curve for total
  const areaTotal = `M ${getX(0)},${getY(0)} ` + dataPoints.map((d, i) => `L ${getX(i)},${getY(d.total)}`).join(' ') + ` L ${getX(dataPoints.length - 1)},${getY(0)} Z`;

  // Interactive dots
  const dotsSvg = dataPoints.filter((_, i) => i === 0 || i === dataPoints.length - 1 || i % Math.ceil(dataPoints.length / 6) === 0).map(d => {
    const idx = dataPoints.indexOf(d);
    const cx = getX(idx);
    const cy = getY(d.total);
    return `
      <circle cx="${cx}" cy="${cy}" r="4" fill="#10b981" stroke="var(--bg-secondary)" stroke-width="2" class="cursor-pointer hover:r-6 transition-all">
        <title>Year ${d.year}: Total ${d.total.toLocaleString(undefined, {maximumFractionDigits: 0})} (Invested: ${d.invested.toLocaleString(undefined, {maximumFractionDigits: 0})})</title>
      </circle>
    `;
  }).join('');

  return `
    <div class="w-full overflow-x-auto">
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" class="overflow-visible font-sans text-[10px]">
        <!-- Background Grid -->
        <line x1="${padding.left}" y1="${getY(maxVal * 0.75)}" x2="${width - padding.right}" y2="${getY(maxVal * 0.75)}" stroke="var(--border-subtle)" stroke-dasharray="3 3" />
        <line x1="${padding.left}" y1="${getY(maxVal * 0.5)}" x2="${width - padding.right}" y2="${getY(maxVal * 0.5)}" stroke="var(--border-subtle)" stroke-dasharray="3 3" />
        <line x1="${padding.left}" y1="${getY(maxVal * 0.25)}" x2="${width - padding.right}" y2="${getY(maxVal * 0.25)}" stroke="var(--border-subtle)" stroke-dasharray="3 3" />

        <!-- Total Wealth Area Gradient -->
        <defs>
          <linearGradient id="totalGrowthGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <path d="${areaTotal}" fill="url(#totalGrowthGrad)" />

        <!-- Invested Line -->
        <polyline fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4 3" stroke-linecap="round" points="${investedPoints}" />

        <!-- Total Wealth Line -->
        <polyline fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" points="${totalPoints}" />

        <!-- Key Data Points -->
        ${dotsSvg}

        <!-- X Axis labels -->
        <text x="${padding.left}" y="${height - 10}" fill="var(--text-muted)">Yr 1</text>
        <text x="${padding.left + plotW / 2}" y="${height - 10}" fill="var(--text-muted)" text-anchor="middle">Yr ${Math.round(dataPoints.length / 2)}</text>
        <text x="${width - padding.right}" y="${height - 10}" fill="var(--text-muted)" text-anchor="end">Yr ${dataPoints.length}</text>
      </svg>
      <div class="flex justify-center gap-6 mt-1 text-xs">
        <span class="flex items-center gap-1.5 font-medium"><span class="w-3 h-1.5 bg-[#10b981] rounded-full"></span> Total Wealth</span>
        <span class="flex items-center gap-1.5 font-medium"><span class="w-3 h-1 bg-[#3b82f6] rounded border border-dashed border-[#3b82f6]"></span> Capital Invested</span>
      </div>
    </div>
  `;
}
