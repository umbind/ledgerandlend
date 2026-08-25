/**
 * Essential Calculators Hub - Unified Export, Share & Deep-Linking Suite
 * Provides Markdown generation, CSV downloading, URL parameter serialization and print templates.
 */

/**
 * Encodes active calculation parameters into a shareable URL hash
 * @param {string} calcId
 * @param {Record<string, any>} inputs
 * @returns {string} Full shareable URL
 */
export function generateShareUrl(calcId, inputs = {}) {
  const base = `${window.location.origin}${window.location.pathname}`;
  const searchParams = new URLSearchParams();
  
  for (const [key, val] of Object.entries(inputs)) {
    if (val !== undefined && val !== null && val !== '') {
      searchParams.set(key, String(val));
    }
  }

  const queryStr = searchParams.toString();
  return `${base}#${calcId}${queryStr ? '?' + queryStr : ''}`;
}

/**
 * Parses the current window hash for calculator ID and serialized parameters
 * Example: #emi?amount=250000&rate=7.5&tenure=20
 * @returns {{ calcId: string, params: Record<string, string> }}
 */
export function parseShareUrl() {
  const rawHash = window.location.hash.replace('#', '');
  if (!rawHash) return { calcId: 'emi', params: {} };

  const [calcId, queryString] = rawHash.split('?');
  const params = {};

  if (queryString) {
    const searchParams = new URLSearchParams(queryString);
    for (const [key, val] of searchParams.entries()) {
      params[key] = val;
    }
  }

  return { calcId, params };
}

/**
 * Downloads arbitrary string data as a CSV file in the browser
 * @param {string} filename
 * @param {string} csvContent
 */
export function downloadCsvFile(filename, csvContent) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Formats a clean executive Markdown / Text summary for sharing via email, chat or notes
 * @param {string} title
 * @param {Record<string, any>} inputs
 * @param {Record<string, any>} results
 * @returns {string}
 */
export function generateMarkdownSummary(title, inputs = {}, results = {}) {
  const timestamp = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  let md = `📊 **${title} - Calculation Summary**\n`;
  md += `🗓️ Date: ${timestamp}\n`;
  md += `🌐 Source: Ledger & Lend (https://ledgerandlend.netlify.app)\n\n`;

  md += `🔹 **Input Parameters:**\n`;
  for (const [key, val] of Object.entries(inputs)) {
    const label = formatLabel(key);
    md += `  • ${label}: **${val}**\n`;
  }

  md += `\n🎯 **Calculation Results:**\n`;
  for (const [key, val] of Object.entries(results)) {
    const label = formatLabel(key);
    md += `  • ${label}: **${val}**\n`;
  }

  md += `\n---\n*Generated using Ledger & Lend Essential Calculators Hub.*`;
  return md;
}

/**
 * Helper to humanize camelCase or snake_case keys into readable labels
 */
function formatLabel(str) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}
