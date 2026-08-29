/**
 * Essential Calculators Hub - Master App Controller
 * With Instant i18n, Deep Synonym Search, Affiliate Engine, Embed Widget, Breadcrumbs & Lead Capture
 */

// Import Finance Calculators
import { emiCalculator } from './calculators/finance/emi.js';
import { sipCalculator } from './calculators/finance/sip.js';
import { mortgageCalculator } from './calculators/finance/mortgage.js';
import { taxDiscountCalculator } from './calculators/finance/tax-discount.js';
import { tipSplitCalculator } from './calculators/finance/tip-split.js';

// Import Health & Fitness Calculators
import { bmiCalculator } from './calculators/health/bmi.js';
import { idealWeightCalculator } from './calculators/health/ideal-weight.js';
import { waistHipCalculator } from './calculators/health/waist-hip.js';
import { targetHeartRateCalculator } from './calculators/health/target-heart-rate.js';
import { macroCalculator } from './calculators/health/macro-calculator.js';
import { calorieTdeeCalculator } from './calculators/health/calorie-tdee.js';
import { bodyFatCalculator } from './calculators/health/body-fat.js';
import { waterIntakeCalculator } from './calculators/health/water-intake.js';

// Import Clinical & Medical Calculators
import { pregnancyCalculator } from './calculators/medical/pregnancy-due-date.js';
import { bsaCalculator } from './calculators/medical/body-surface-area.js';
import { mapCalculator } from './calculators/medical/mean-arterial-pressure.js';
import { dosageCalculator } from './calculators/medical/dosage-calculator.js';
import { egfrCalculator } from './calculators/medical/egfr-kidney.js';

// Import Math & Utility Calculators
import { scientificCalculator } from './calculators/math/scientific.js';
import { percentageCalculator } from './calculators/math/percentage.js';
import { unitConverter } from './calculators/math/unit-converter.js';
import { ageDateCalculator } from './calculators/math/age-date.js';
import { fuelCostCalculator } from './calculators/math/fuel-cost.js';
import { timeDurationCalculator } from './calculators/math/time-duration.js';

// Import Utilities & Components
import { setGlobalCurrency, getGlobalCurrency, currencies } from './utils/formatters.js';
import { getHistory, deleteHistoryItem, clearHistory, getFavorites, toggleFavorite, isFavorite } from './utils/storage.js';
import { supportedLanguages, getLanguage, setLanguage, t } from './data/i18n.js';
import { KnowledgeComponent } from './components/knowledge.js';
import { legalDocs } from './data/legal.js';
import { searchSynonyms } from './data/searchIndex.js';
import { getAffiliateOffer } from './data/affiliates.js';
import { parseShareUrl, generateShareUrl, downloadCsvFile, generateMarkdownSummary } from './utils/exportShare.js';
import { diagnosticSuite } from './data/diagnosticRunner.js';

const allCalculators = [
  // Finance
  emiCalculator,
  sipCalculator,
  mortgageCalculator,
  taxDiscountCalculator,
  tipSplitCalculator,
  // Health
  bmiCalculator,
  idealWeightCalculator,
  waistHipCalculator,
  targetHeartRateCalculator,
  macroCalculator,
  calorieTdeeCalculator,
  bodyFatCalculator,
  waterIntakeCalculator,
    // Clinical & Medical Suite
  pregnancyCalculator,
  bsaCalculator,
  mapCalculator,
  dosageCalculator,
  egfrCalculator,
  // Math & Utilities
  scientificCalculator,
  percentageCalculator,
  unitConverter,
  ageDateCalculator,
  fuelCostCalculator,
  timeDurationCalculator
];

class App {
  constructor() {
    this.currentCalc = null;
    this.activeCategory = 'all';
    this.knowledge = null;
    this.init();
  }

  init() {
    this.initTheme();
    this.initLanguage();
    this.initCurrency();
    this.renderCategoryPills();
    this.renderCalculatorGrid();
    this.renderFavoritesChips();
    this.setupEventListeners();
    this.setupLegalModal();
    this.setupEmbedModal();
    this.setupExportModal();
    this.setupDiagnosticsModal();
    this.setupOfflineDetection();
    this.setupNewsletter();
    this.setupBackToTop();
    this.setupKeyboardShortcuts();

    this.knowledge = new KnowledgeComponent(this);

    // Detect calculator from clean path (e.g. /emi/) or hash (e.g. #emi)
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    const hash = window.location.hash.replace('#', '');
    const initialCalcId = (path && allCalculators.some(c => c.id === path)) ? path : (hash || 'emi');
    this.switchCalculator(initialCalcId, false);

    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace('#', '');
      if (h && !h.startsWith('legal-')) this.switchCalculator(h, false);
    });

    window.addEventListener('history-updated', () => this.renderHistoryDrawer());
    window.addEventListener('favorites-updated', () => {
      this.renderFavoritesChips();
      this.updateHeaderFavBtn();
    });

    window.addEventListener('language-changed', () => {
      this.applyLanguageTranslations();
      this.renderCategoryPills();
      this.renderCalculatorGrid();
      this.renderFavoritesChips();
      if (this.currentCalc) {
        this.switchCalculator(this.currentCalc.id, false);
      }
      this.knowledge?.renderGlobalKnowledgeSection();
      this.knowledge?.renderGlobalFaqSection();
      this.renderHistoryDrawer();
      this.showToast(`Language switched to ${supportedLanguages[getLanguage()]?.name || 'English'}`);
    });

    this.applyLanguageTranslations();
    if (window.lucide) window.lucide.createIcons();
  }

  initTheme() {
    const savedTheme = localStorage.getItem('calc_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('calc_theme', isDark ? 'dark' : 'light');
    if (this.currentCalc) {
      this.currentCalc.render(document.getElementById('calc-mount'));
    }
  }

  initLanguage() {
    const langSelect = document.getElementById('language-selector');
    if (!langSelect) return;
    const current = getLanguage();

    const langObj = supportedLanguages[current] || supportedLanguages.en;
    document.documentElement.setAttribute('dir', langObj.dir || 'ltr');
    document.documentElement.setAttribute('lang', current);

    langSelect.innerHTML = Object.entries(supportedLanguages).map(([code, lang]) => `
      <option value="${code}" ${code === current ? 'selected' : ''}>${lang.flag} ${lang.name}</option>
    `).join('');

    langSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }

  applyLanguageTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const translated = t(key);
      if (translated) {
        if (el.tagName === 'INPUT' && el.placeholder) {
          el.placeholder = translated;
        } else {
          el.textContent = translated;
        }
      }
    });

    const searchInput = document.getElementById('search-modal-input');
    if (searchInput) {
      searchInput.placeholder = t('searchPlaceholder');
    }
  }

  initCurrency() {
    const currSelect = document.getElementById('currency-selector');
    if (!currSelect) return;
    const current = getGlobalCurrency();
    currSelect.innerHTML = Object.entries(currencies).map(([k, c]) => `
      <option value="${k}" ${k === current ? 'selected' : ''}>${c.symbol} ${k}</option>
    `).join('');

    currSelect.addEventListener('change', (e) => {
      setGlobalCurrency(e.target.value);
      if (this.currentCalc) {
        this.currentCalc.render(document.getElementById('calc-mount'));
      }
    });
  }

  renderCategoryPills() {
    const container = document.getElementById('category-pills-container');
    if (!container) return;

    const categories = [
      { id: 'all', label: t('allTools'), icon: 'layout-grid' },
      { id: 'finance', label: t('finance'), icon: 'landmark' },
      { id: 'health', label: t('health'), icon: 'heart-pulse' },
      { id: 'medical', label: t('medical') || 'Clinical & Medical', icon: 'stethoscope' },
      { id: 'math', label: t('math'), icon: 'function-square' }
    ];

    container.innerHTML = categories.map(cat => `
      <button class="category-pill ${cat.id === this.activeCategory ? 'active' : ''}" data-cat="${cat.id}">
        <i data-lucide="${cat.icon}" class="w-3.5 h-3.5"></i>
        <span>${cat.label}</span>
      </button>
    `).join('');

    container.querySelectorAll('.category-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategory = btn.dataset.cat;
        this.renderCalculatorGrid();
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  renderCalculatorGrid() {
    const grid = document.getElementById('calculator-selector-grid');
    const countEl = document.getElementById('grid-tool-count');
    const titleEl = document.getElementById('grid-category-title');
    if (!grid) return;

    const filtered = this.activeCategory === 'all'
      ? allCalculators
      : allCalculators.filter(c => c.category === this.activeCategory);

    if (countEl) countEl.textContent = `${filtered.length} tools available`;
    if (titleEl) {
      const catLabels = { all: 'All Calculators', finance: 'Finance & Loans', health: 'Health & Fitness', medical: 'Clinical & Medical', math: 'Math & Utilities' };
      titleEl.textContent = catLabels[this.activeCategory] || 'Calculators';
    }

    grid.innerHTML = filtered.map(c => `
      <a href="#${c.id}" class="glass-card p-3 cursor-pointer hover:border-accent-primary flex items-center justify-between group calc-card-item no-underline transition-all ${this.currentCalc?.id === c.id ? 'ring-2 ring-accent-primary border-accent-primary bg-accent-primary-light shadow-md' : 'opacity-90 hover:opacity-100'}" data-id="${c.id}">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${this.getCategoryBg(c.category)} shadow-sm">
            <i data-lucide="${c.icon}" class="w-4 h-4 text-white"></i>
          </div>
          <div class="min-w-0">
            <div class="text-xs font-bold text-primary group-hover:text-accent-primary transition-colors truncate">${c.title}</div>
            <div class="text-[10px] text-muted truncate">${c.description}</div>
          </div>
        </div>
        <div class="shrink-0 flex items-center ml-2">
          ${this.currentCalc?.id === c.id ? '<span class="w-2 h-2 rounded-full bg-accent-primary animate-pulse mr-1"></span>' : ''}
          <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-muted group-hover:text-accent-primary group-hover:translate-x-0.5 transition-all"></i>
        </div>
      </a>
    `).join('');

    grid.querySelectorAll('.calc-card-item').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const cid = card.dataset.id;
        this.switchCalculator(cid);
        const stage = document.getElementById('calc-mount');
        if (stage) {
          const yOffset = -100;
          const y = stage.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  getCategoryBg(cat) {
    if (cat === 'finance') return 'gradient-finance';
    if (cat === 'health') return 'gradient-health';
    if (cat === 'medical') return 'gradient-medical';
    return 'gradient-math';
  }

  renderFavoritesChips() {
    const container = document.getElementById('favorites-chips-container');
    if (!container) return;

    const favIds = getFavorites();
    const favCalcs = allCalculators.filter(c => favIds.includes(c.id));

    if (favCalcs.length === 0) {
      container.innerHTML = `<span class="text-xs text-muted font-normal">${t('favoritesEmpty')}</span>`;
      return;
    }

    container.innerHTML = favCalcs.map(c => `
      <button class="tab-pill ${this.currentCalc?.id === c.id ? 'active' : ''}" data-id="${c.id}">
        <i data-lucide="${c.icon}" class="w-3.5 h-3.5"></i>
        <span>${c.title.split(' ')[0]}</span>
      </button>
    `).join('');

    container.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => this.switchCalculator(btn.dataset.id));
    });

    if (window.lucide) window.lucide.createIcons();
  }

  renderBreadcrumbs(calc) {
    const nav = document.getElementById('calc-breadcrumbs');
    if (!nav || !calc) return;

    const categoryLabel = t(calc.category) || calc.category;

    nav.innerHTML = `
      <div class="breadcrumb-bar">
        <a href="#" class="hover:text-accent-primary transition-colors flex items-center gap-1 text-xs">
          <i data-lucide="home" class="w-3.5 h-3.5"></i>
          <span>Home</span>
        </a>
        <span class="text-muted/50">/</span>
        <button class="hover:text-accent-primary transition-colors text-xs font-medium cursor-pointer" id="breadcrumb-cat-btn">${categoryLabel}</button>
        <span class="text-muted/50">/</span>
        <span class="text-primary font-bold text-xs">${calc.title}</span>
      </div>
    `;

    nav.querySelector('#breadcrumb-cat-btn')?.addEventListener('click', () => {
      this.activeCategory = calc.category;
      this.renderCategoryPills();
      this.renderCalculatorGrid();
      const grid = document.getElementById('calculator-selector-grid');
      grid?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  renderAffiliateRecommendation(category) {
    const mount = document.getElementById('calc-affiliate-mount');
    if (!mount) return;

    const offer = getAffiliateOffer(category);
    if (!offer) {
      mount.innerHTML = '';
      return;
    }

    mount.innerHTML = `
      <div class="p-4 rounded-xl bg-gradient-to-r from-secondary to-tertiary border border-accent-primary/20 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-start gap-3">
          <div class="w-9 h-9 rounded-lg bg-accent-${offer.color}-light text-accent-${offer.color} flex items-center justify-center shrink-0 mt-0.5">
            <i data-lucide="${offer.icon}" class="w-4 h-4"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent-primary-light text-accent-primary">${offer.badge}</span>
              <h4 class="text-xs sm:text-sm font-bold text-primary">${offer.title}</h4>
            </div>
            <p class="text-[11px] text-secondary mt-0.5 max-w-xl">${offer.desc}</p>
          </div>
        </div>

        <a href="${offer.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm shrink-0 whitespace-nowrap">
          <span>${offer.cta}</span>
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  switchCalculator(calcIdOrHash, updateHash = true) {
    const { calcId, params } = parseShareUrl();
    const targetId = (calcIdOrHash ? calcIdOrHash.split('?')[0] : '') || calcId || 'emi';
    const calc = allCalculators.find(c => c.id === targetId) || allCalculators[0];
    this.currentCalc = calc;

    if (updateHash) {
      const queryStr = new URLSearchParams(params).toString();
      window.location.hash = queryStr ? `${calc.id}?${queryStr}` : calc.id;
    }

    // Dynamically update document title, meta description & canonical URL for SEO
    document.title = `${calc.title} | Free Online Calculator - Ledger & Lend`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', `${calc.title}: ${calc.description} Free, privacy-first online calculations with instant accuracy.`);
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute('href', `https://ledgerandlend.netlify.app/#${calc.id}`);

    // Update active Header
    const titleEl = document.getElementById('active-calc-title');
    const descEl = document.getElementById('active-calc-desc');
    const badgeEl = document.getElementById('active-calc-badge');
    const iconContainer = document.getElementById('active-calc-icon-container');

    if (titleEl) titleEl.textContent = calc.title;
    if (descEl) descEl.textContent = calc.description;
    if (badgeEl) {
      badgeEl.textContent = (t(calc.category) || calc.category).toUpperCase();
      badgeEl.className = `badge badge-${calc.category}`;
    }
    if (iconContainer) {
      iconContainer.className = `w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${this.getCategoryBg(calc.category)}`;
      iconContainer.innerHTML = `<i data-lucide="${calc.icon}" class="w-5 h-5 text-white"></i>`;
    }

    this.updateHeaderFavBtn();
    this.renderBreadcrumbs(calc);

    // Render Calculator Form
    const mount = document.getElementById('calc-mount');
    if (mount) {
      mount.innerHTML = '';
      mount.className = 'animate-fade-in';
      calc.render(mount);

      // Hydrate inputs from URL parameters if available
      if (params && Object.keys(params).length > 0) {
        for (const [key, val] of Object.entries(params)) {
          const input = mount.querySelector(`#${calc.id}-${key}`) ||
                        mount.querySelector(`#${key}`) ||
                        mount.querySelector(`[name="${key}"]`);
          if (input) {
            input.value = val;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      }
    }

    // Render Contextual Affiliate / Sponsor Recommendation
    this.renderAffiliateRecommendation(calc.category);

    // Render Calculator Specific FAQs & Formulas
    const faqMount = document.getElementById('calc-faq-mount');
    if (faqMount && this.knowledge) {
      this.knowledge.renderActiveCalcFaqs(calc.id, faqMount);
    }

    // Google Analytics 4: Track Calculator Usage Event & Virtual Page View
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'select_content', {
        content_type: 'calculator',
        item_id: calc.id,
        item_name: calc.title
      });
      window.gtag('event', 'page_view', {
        page_title: `${calc.title} | Ledger & Lend`,
        page_path: `/#${calc.id}`
      });
    }

    this.renderCalculatorGrid();
    this.renderFavoritesChips();

    if (window.lucide) window.lucide.createIcons();
  }

  updateHeaderFavBtn() {
    const favBtn = document.getElementById('header-fav-btn');
    if (!favBtn || !this.currentCalc) return;
    const isFav = isFavorite(this.currentCalc.id);
    favBtn.innerHTML = `
      <i data-lucide="${isFav ? 'star' : 'star'}" class="w-4 h-4 ${isFav ? 'text-accent-amber fill-accent-amber' : 'text-muted'}"></i>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i data-lucide="check-circle-2" class="w-4 h-4 text-accent-emerald"></i>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  setupBackToTop() {
    const btn = document.getElementById('back-to-top-btn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
      } else {
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  setupNewsletter() {
    const form = document.getElementById('newsletter-form');
    const input = document.getElementById('newsletter-email');
    if (!form || !input) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input.value.trim();
      if (email) {
        try {
          const subscribers = JSON.parse(localStorage.getItem('calc_subscribers') || '[]');
          if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('calc_subscribers', JSON.stringify(subscribers));
          }
        } catch (err) {}
        this.showToast('🎉 Success! Your Free Toolkit has been unlocked!');
        input.value = '';
      }
    });
  }

  setupEventListeners() {
    // Theme Toggle
    document.getElementById('theme-toggle-btn')?.addEventListener('click', () => this.toggleTheme());

    // Favorite Header Button
    document.getElementById('header-fav-btn')?.addEventListener('click', () => {
      if (this.currentCalc) {
        const added = toggleFavorite(this.currentCalc.id);
        this.showToast(added ? `Added "${this.currentCalc.title}" to favorites` : `Removed from favorites`);
      }
    });

    // Dismiss Sticky Bottom Ad
    document.getElementById('close-sticky-ad-btn')?.addEventListener('click', () => {
      const ad = document.getElementById('sticky-bottom-ad-container');
      if (ad) ad.style.display = 'none';
    });

    // History Drawer
    const drawer = document.getElementById('history-drawer');
    const backdrop = document.getElementById('history-backdrop');
    const openBtn = document.getElementById('open-history-btn');
    const closeBtn = document.getElementById('close-history-btn');
    const clearBtn = document.getElementById('clear-history-btn');

    const openDrawer = () => {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      this.renderHistoryDrawer();
    };

    const closeDrawer = () => {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
    };

    openBtn?.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', closeDrawer);

    clearBtn?.addEventListener('click', () => {
      clearHistory();
      this.showToast('History cleared');
    });

    // Search Modal
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-modal-input');
    const openSearchBtns = document.querySelectorAll('.search-bar-trigger');
    const closeSearchBtn = document.getElementById('close-search-btn');

    const openSearch = () => {
      searchModal.classList.add('open');
      searchInput.value = '';
      this.renderSearchResults('');
      setTimeout(() => searchInput.focus(), 100);
    };

    const closeSearch = () => {
      searchModal.classList.remove('open');
    };

    openSearchBtns.forEach(btn => btn.addEventListener('click', openSearch));
    closeSearchBtn?.addEventListener('click', closeSearch);

    searchModal?.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });

    searchInput?.addEventListener('input', (e) => {
      this.renderSearchResults(e.target.value);
    });
  }

  setupLegalModal() {
    const modal = document.getElementById('legal-modal');
    const closeBtn = document.getElementById('close-legal-modal-btn');
    const titleEl = document.getElementById('legal-modal-title');
    const badgeEl = document.getElementById('legal-modal-badge');
    const updatedEl = document.getElementById('legal-modal-updated');
    const bodyEl = document.getElementById('legal-modal-body');

    closeBtn?.addEventListener('click', () => modal?.classList.remove('open'));
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });

    document.querySelectorAll('.legal-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const docKey = link.dataset.doc;
        const doc = legalDocs[docKey];
        if (doc && modal && titleEl && bodyEl) {
          titleEl.textContent = doc.title;
          badgeEl.textContent = doc.badge;
          updatedEl.textContent = `Last Updated: ${doc.lastUpdated}`;
          bodyEl.innerHTML = doc.content;
          modal.classList.add('open');
          if (window.lucide) window.lucide.createIcons();
        }
      });
    });
  }

  setupEmbedModal() {
    const modal = document.getElementById('embed-modal');
    const openBtn = document.getElementById('header-embed-btn');
    const closeBtn = document.getElementById('close-embed-modal-btn');
    const textarea = document.getElementById('embed-code-textarea');
    const copyBtn = document.getElementById('copy-embed-code-btn');

    openBtn?.addEventListener('click', () => {
      const calcId = this.currentCalc?.id || 'emi';
      const embedUrl = `${window.location.origin}${window.location.pathname}#${calcId}`;
      textarea.value = `<iframe src="${embedUrl}" width="100%" height="700" frameborder="0" style="border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);" title="${this.currentCalc?.title || 'Calculator'}"></iframe><p style="text-align:right; font-size:11px; color:#64748b;">Powered by <a href="${window.location.origin}" target="_blank" rel="noopener">Ledger & Lend</a></p>`;
      modal.classList.add('open');
    });

    closeBtn?.addEventListener('click', () => modal?.classList.remove('open'));
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });

    copyBtn?.addEventListener('click', () => {
      navigator.clipboard.writeText(textarea.value).then(() => {
        this.showToast('Embed code copied to clipboard!');
        modal.classList.remove('open');
      });
    });
  }

  getCalcInputValues() {
    const mount = document.getElementById('calc-mount');
    if (!mount || !this.currentCalc) return {};
    const inputs = {};
    mount.querySelectorAll('input, select').forEach(el => {
      if (el.type !== 'range' && el.id && el.value) {
        const cleanKey = el.id.replace(`${this.currentCalc.id}-`, '').replace(/^calc-/, '');
        inputs[cleanKey] = el.value;
      }
    });
    return inputs;
  }

  getCalcResultValues() {
    const mount = document.getElementById('calc-mount');
    if (!mount) return {};
    const results = {};
    mount.querySelectorAll('.result-card, .glass-card').forEach(card => {
      const label = card.querySelector('.result-label, .text-xs, h4')?.textContent?.trim();
      const val = card.querySelector('.result-value, .font-mono, .text-2xl, .text-xl')?.textContent?.trim();
      if (label && val && !results[label] && val.length < 50) {
        results[label] = val;
      }
    });
    return results;
  }

  populateExportModalData() {
    if (!this.currentCalc) return;
    const inputs = this.getCalcInputValues();
    const results = this.getCalcResultValues();

    // Tab 1: Share Link
    const linkInput = document.getElementById('share-link-input');
    if (linkInput) {
      linkInput.value = generateShareUrl(this.currentCalc.id, inputs);
    }

    // Tab 2: Print / PDF Report Preview
    const preview = document.getElementById('pdf-report-preview');
    if (preview) {
      let previewHtml = `<div class="font-bold text-sm text-primary mb-1">${this.currentCalc.title} Summary</div>`;
      previewHtml += `<div class="text-[10px] text-muted mb-2">Ledger &amp; Lend • ${new Date().toLocaleDateString()}</div>`;
      previewHtml += `<div class="space-y-1">`;
      for (const [k, v] of Object.entries(inputs)) {
        previewHtml += `<div class="flex justify-between border-b border-subtle/50 py-0.5"><span class="text-secondary">${k}:</span> <span class="font-bold text-primary">${v}</span></div>`;
      }
      previewHtml += `</div><div class="mt-2 pt-2 border-t border-subtle space-y-1">`;
      for (const [k, v] of Object.entries(results)) {
        previewHtml += `<div class="flex justify-between py-0.5"><span class="text-secondary">${k}:</span> <span class="font-bold text-accent-primary">${v}</span></div>`;
      }
      previewHtml += `</div>`;
      preview.innerHTML = previewHtml;
    }

    // Tab 3: CSV Info
    const csvDesc = document.getElementById('csv-export-description');
    if (csvDesc) {
      const hasTable = ['emi', 'sip', 'mortgage', 'time-duration', 'fuel-cost'].includes(this.currentCalc.id);
      csvDesc.textContent = hasTable
        ? `Export full tabular schedule data for ${this.currentCalc.title} directly as a CSV spreadsheet.`
        : `Export calculation parameters and results for ${this.currentCalc.title} as CSV data.`;
    }

    // Tab 4: Markdown Summary
    const mdTextarea = document.getElementById('md-summary-textarea');
    if (mdTextarea) {
      mdTextarea.value = generateMarkdownSummary(this.currentCalc.title, inputs, results);
    }
  }

  downloadCurrentCalcCsv() {
    if (!this.currentCalc) return;
    const inputs = this.getCalcInputValues();
    const results = this.getCalcResultValues();

    // If the active calculator container has its own csv export button, trigger it for richest table data
    const mountedCsvBtn = document.querySelector('#calc-mount button[id$="-csv-btn"], #calc-mount #emi-csv-btn, #calc-mount #sip-csv-btn');
    if (mountedCsvBtn) {
      mountedCsvBtn.click();
      return;
    }

    // Otherwise generate universal CSV summary
    let csv = "Parameter,Value\n";
    for (const [k, v] of Object.entries(inputs)) {
      csv += `"${k}","${v}"\n`;
    }
    for (const [k, v] of Object.entries(results)) {
      csv += `"[Result] ${k}","${v}"\n`;
    }

    downloadCsvFile(`${this.currentCalc.id}_calculation_report.csv`, csv);
    this.showToast('Calculation data exported as CSV!');
  }

  setupExportModal() {
    const modal = document.getElementById('export-share-modal');
    const closeBtn = document.getElementById('close-export-modal-btn');
    const tabs = document.querySelectorAll('.export-tab-btn');
    const panes = document.querySelectorAll('.export-tab-pane');

    const openExportModal = (targetTab = 'share-link') => {
      if (!this.currentCalc) return;
      this.populateExportModalData();

      tabs.forEach(btn => {
        if (btn.dataset.tab === targetTab) {
          btn.classList.add('active', 'font-bold', 'text-accent-primary', 'bg-accent-primary-light');
          btn.classList.remove('text-secondary');
        } else {
          btn.classList.remove('active', 'font-bold', 'text-accent-primary', 'bg-accent-primary-light');
          btn.classList.add('text-secondary');
        }
      });

      panes.forEach(pane => {
        pane.classList.toggle('hidden', pane.id !== `tab-${targetTab}`);
      });

      modal?.classList.add('open');
      if (window.lucide) window.lucide.createIcons();
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('active', 'font-bold', 'text-accent-primary', 'bg-accent-primary-light');
          t.classList.add('text-secondary');
        });
        tab.classList.add('active', 'font-bold', 'text-accent-primary', 'bg-accent-primary-light');
        tab.classList.remove('text-secondary');

        panes.forEach(p => {
          p.classList.toggle('hidden', p.id !== `tab-${tab.dataset.tab}`);
        });
      });
    });

    closeBtn?.addEventListener('click', () => modal?.classList.remove('open'));
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });

    // Wire Header buttons to open Export Modal
    document.getElementById('header-share-btn')?.addEventListener('click', () => {
      openExportModal('share-link');
    });
    document.getElementById('header-print-btn')?.addEventListener('click', () => {
      openExportModal('pdf-report');
    });

    // Action buttons inside modal
    document.getElementById('copy-share-link-btn')?.addEventListener('click', () => {
      const input = document.getElementById('share-link-input');
      if (input) {
        navigator.clipboard.writeText(input.value).then(() => {
          this.showToast('Shareable link copied to clipboard!');
        });
      }
    });

    document.getElementById('trigger-print-report-btn')?.addEventListener('click', () => {
      modal?.classList.remove('open');
      setTimeout(() => window.print(), 200);
    });

    document.getElementById('copy-md-summary-btn')?.addEventListener('click', () => {
      const textarea = document.getElementById('md-summary-textarea');
      if (textarea) {
        navigator.clipboard.writeText(textarea.value).then(() => {
          this.showToast('Calculation summary copied to clipboard!');
        });
      }
    });

    document.getElementById('trigger-csv-download-btn')?.addEventListener('click', () => {
      this.downloadCurrentCalcCsv();
    });
  }

  setupDiagnosticsModal() {
    const modal = document.getElementById('diagnostics-modal');
    const openLink = document.getElementById('open-diagnostics-link');
    const closeBtn = document.getElementById('close-diagnostics-modal-btn');
    const runBtn = document.getElementById('run-diagnostics-btn');
    const summaryBar = document.getElementById('diagnostics-summary-bar');
    const resultsList = document.getElementById('diagnostics-results-list');

    const openDiagnostics = () => {
      modal?.classList.add('open');
      runTests();
    };

    const runTests = async () => {
      if (!resultsList || !summaryBar) return;
      resultsList.innerHTML = '<div class="text-center py-6 text-muted"><p class="text-xs">Running mathematical assertions...</p></div>';

      const report = await diagnosticSuite.runAllTests();

      summaryBar.classList.remove('hidden');
      summaryBar.className = `p-3 rounded-lg flex items-center justify-between text-xs font-bold font-mono ${report.failed === 0 ? 'bg-emerald-500/10 text-accent-emerald border border-emerald-500/20' : 'bg-rose-500/10 text-accent-rose border border-rose-500/20'}`;
      summaryBar.innerHTML = `
        <div class="flex items-center gap-2">
          <i data-lucide="${report.failed === 0 ? 'check-circle' : 'alert-triangle'}" class="w-4 h-4"></i>
          <span>${report.passed}/${report.total} Formulas Verified Pass</span>
        </div>
        <span class="text-[11px] opacity-80">Latency: ${report.elapsedMs}ms</span>
      `;

      resultsList.innerHTML = report.results.map(r => `
        <div class="diagnostic-item">
          <div class="flex items-center gap-2.5">
            <span class="w-2 h-2 rounded-full ${r.status === 'PASS' ? 'bg-accent-emerald' : 'bg-accent-rose'}"></span>
            <div>
              <div class="font-bold text-primary text-xs">${r.name}</div>
              <div class="text-[10px] text-muted">${r.category} Domain • Value: ${r.actual} (Expected ${r.expected})</div>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${r.status === 'PASS' ? 'diagnostic-badge-pass' : 'diagnostic-badge-fail'}">${r.status}</span>
        </div>
      `).join('');

      if (window.lucide) window.lucide.createIcons();
    };

    openLink?.addEventListener('click', (e) => {
      e.preventDefault();
      openDiagnostics();
    });

    runBtn?.addEventListener('click', runTests);
    closeBtn?.addEventListener('click', () => modal?.classList.remove('open'));
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal?.classList.remove('open');
    });
  }

  setupOfflineDetection() {
    const banner = document.getElementById('offline-banner');
    const updateStatus = () => {
      if (!banner) return;
      if (navigator.onLine) {
        banner.classList.add('hidden');
      } else {
        banner.classList.remove('hidden');
      }
    };

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    updateStatus();
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchModal = document.getElementById('search-modal');
        if (searchModal.classList.contains('open')) {
          searchModal.classList.remove('open');
        } else {
          document.querySelector('.search-bar-trigger')?.click();
        }
      }
      if (e.key === 'Escape') {
        document.getElementById('search-modal')?.classList.remove('open');
        document.getElementById('history-drawer')?.classList.remove('open');
        document.getElementById('history-backdrop')?.classList.remove('open');
        document.getElementById('article-modal')?.classList.remove('open');
        document.getElementById('legal-modal')?.classList.remove('open');
        document.getElementById('embed-modal')?.classList.remove('open');
        document.getElementById('export-share-modal')?.classList.remove('open');
        document.getElementById('diagnostics-modal')?.classList.remove('open');
      }
    });
  }

  renderSearchResults(query) {
    const container = document.getElementById('search-modal-results');
    if (!container) return;

    const q = query.trim().toLowerCase();

    const matches = allCalculators.filter(c => {
      const synonyms = searchSynonyms[c.id] || [];
      const hasSynonym = synonyms.some(s => s.toLowerCase().includes(q));
      return (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        hasSynonym
      );
    });

    if (matches.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8 text-muted">
          <i data-lucide="search-x" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
          <p class="text-xs">No calculators matching "${query}"</p>
        </div>
      `;
    } else {
      container.innerHTML = matches.map(c => `
        <div class="p-3 rounded-lg hover:bg-tertiary cursor-pointer flex items-center justify-between group search-item transition-all" data-id="${c.id}">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center ${this.getCategoryBg(c.category)}">
              <i data-lucide="${c.icon}" class="w-4 h-4 text-white"></i>
            </div>
            <div>
              <div class="text-xs font-bold text-primary group-hover:text-accent-primary">${c.title}</div>
              <div class="text-[11px] text-muted truncate max-w-[320px]">${c.description}</div>
            </div>
          </div>
          <span class="badge badge-${c.category}">${(t(c.category) || c.category).toUpperCase()}</span>
        </div>
      `).join('');

      container.querySelectorAll('.search-item').forEach(el => {
        el.addEventListener('click', () => {
          this.switchCalculator(el.dataset.id);
          document.getElementById('search-modal')?.classList.remove('open');
        });
      });
    }

    if (window.lucide) window.lucide.createIcons();
  }

  renderHistoryDrawer() {
    const list = document.getElementById('history-items-list');
    if (!list) return;

    const history = getHistory();
    if (history.length === 0) {
      list.innerHTML = `
        <div class="text-center py-16 text-muted">
          <i data-lucide="history" class="w-10 h-10 mx-auto mb-3 opacity-40"></i>
          <p class="text-xs font-semibold">${t('noSavedCalculations')}</p>
          <p class="text-[11px] mt-1">${t('savedCalculationsDesc')}</p>
        </div>
      `;
    } else {
      list.innerHTML = history.map(item => `
        <div class="p-3 rounded-lg bg-tertiary border border-subtle relative group">
          <div class="flex items-center justify-between text-[11px] text-muted mb-1">
            <span class="font-bold text-accent-primary">${item.calcTitle}</span>
            <span>${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div class="text-xs font-mono font-medium text-primary">${item.summary}</div>
          <button class="delete-history-btn absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-muted hover:text-accent-rose transition-all p-1" data-id="${item.id}" title="Delete">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `).join('');

      list.querySelectorAll('.delete-history-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          deleteHistoryItem(btn.dataset.id);
        });
      });
    }

    if (window.lucide) window.lucide.createIcons();
  }
}

// Instantiate on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.calcApp = new App();
});
