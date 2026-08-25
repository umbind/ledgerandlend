/**
 * Essential Calculators Hub - Formatters & Sanitization Utility
 */

export const currencies = {
  USD: { symbol: '$', name: 'US Dollar (USD)', locale: 'en-US' },
  EUR: { symbol: '€', name: 'Euro (EUR)', locale: 'de-DE' },
  GBP: { symbol: '£', name: 'British Pound (GBP)', locale: 'en-GB' },
  INR: { symbol: '₹', name: 'Indian Rupee (INR)', locale: 'en-IN' },
  AUD: { symbol: 'A$', name: 'Australian Dollar (AUD)', locale: 'en-AU' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar (CAD)', locale: 'en-CA' },
  JPY: { symbol: '¥', name: 'Japanese Yen (JPY)', locale: 'ja-JP' },
  AED: { symbol: 'AED', name: 'UAE Dirham (AED)', locale: 'en-AE' },
};

let currentCurrency = 'USD';

export function setGlobalCurrency(currCode) {
  if (currencies[currCode]) {
    currentCurrency = currCode;
    localStorage.setItem('calc_currency', currCode);
  }
}

export function getGlobalCurrency() {
  const saved = localStorage.getItem('calc_currency');
  return (saved && currencies[saved]) ? saved : 'USD';
}

export function formatCurrency(amount, currencyCode = null, maxDecimals = 2) {
  const code = currencyCode || getGlobalCurrency();
  const curr = currencies[code] || currencies.USD;
  const num = Number(amount);
  if (isNaN(num) || !isFinite(num)) return `${curr.symbol}0.00`;

  try {
    return new Intl.NumberFormat(curr.locale, {
      style: 'currency',
      currency: code,
      maximumFractionDigits: maxDecimals,
      minimumFractionDigits: Number.isInteger(num) ? 0 : 2
    }).format(num);
  } catch (e) {
    return `${curr.symbol}${num.toLocaleString('en-US', { maximumFractionDigits: maxDecimals })}`;
  }
}

export function formatNumber(num, decimals = 2) {
  const val = Number(num);
  if (isNaN(val) || !isFinite(val)) return '0';
  return val.toLocaleString('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0
  });
}

export function formatPercent(val, decimals = 2) {
  const num = Number(val);
  if (isNaN(num) || !isFinite(num)) return '0%';
  return `${num.toFixed(decimals).replace(/\.0+$/, '')}%`;
}

/**
 * Strict HTML Entity Escaper for XSS Prevention
 */
export function escapeHTML(str) {
  if (typeof str !== 'string') return String(str || '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
