/**
 * Essential Calculators Hub - Secure Storage Utility
 * Input sanitization & safe LocalStorage manager
 */

import { escapeHTML } from './formatters.js';

const HISTORY_KEY = 'calc_hub_history';
const FAVORITES_KEY = 'calc_hub_favorites';
const MAX_HISTORY = 50;

export function getHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load history', e);
    return [];
  }
}

export function saveHistoryItem(item) {
  try {
    const history = getHistory();
    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      calcId: escapeHTML(item.calcId || ''),
      calcTitle: escapeHTML(item.calcTitle || ''),
      summary: escapeHTML(item.summary || ''),
      inputs: item.inputs || {},
      results: item.results || {}
    };

    history.unshift(entry);
    if (history.length > MAX_HISTORY) {
      history.pop();
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    window.dispatchEvent(new CustomEvent('history-updated', { detail: history }));
    return entry;
  } catch (e) {
    console.error('Failed to save history item', e);
  }
}

export function deleteHistoryItem(id) {
  try {
    let history = getHistory();
    history = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    window.dispatchEvent(new CustomEvent('history-updated', { detail: history }));
  } catch (e) {
    console.error('Failed to delete history item', e);
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
    window.dispatchEvent(new CustomEvent('history-updated', { detail: [] }));
  } catch (e) {
    console.error('Failed to clear history', e);
  }
}

export function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : ['emi', 'sip', 'bmi', 'scientific', 'unit-converter', 'percentage'];
  } catch (e) {
    return ['emi', 'sip', 'bmi', 'scientific'];
  }
}

export function toggleFavorite(calcId) {
  try {
    let favs = getFavorites();
    const cleanId = String(calcId || '').trim();
    if (favs.includes(cleanId)) {
      favs = favs.filter(id => id !== cleanId);
    } else {
      favs.push(cleanId);
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    window.dispatchEvent(new CustomEvent('favorites-updated', { detail: favs }));
    return favs.includes(cleanId);
  } catch (e) {
    console.error('Failed to toggle favorite', e);
    return false;
  }
}

export function isFavorite(calcId) {
  return getFavorites().includes(String(calcId || '').trim());
}
