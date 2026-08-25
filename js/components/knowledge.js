/**
 * Essential Calculators Hub - Knowledge & FAQ UI Component
 * Dynamic Localization across all supported languages
 */

import { getCalculatorFaqs, getGeneralKnowledgeFaqs } from '../data/faqs.js';
import { getKnowledgeArticles } from '../data/articles.js';
import { t } from '../data/i18n.js';

export class KnowledgeComponent {
  constructor(app) {
    this.app = app;
    this.currentCalcId = 'emi';
    this.init();
  }

  init() {
    this.renderGlobalKnowledgeSection();
    this.renderGlobalFaqSection();
    this.setupArticleModal();
  }

  /**
   * Renders calculator-specific FAQs & guide directly underneath the active calculator form
   */
  renderActiveCalcFaqs(calcId, container) {
    if (!container) return;
    this.currentCalcId = calcId;
    const faqs = getCalculatorFaqs(calcId);

    if (!faqs || faqs.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div class="glass-card p-5 mt-6 border-t-2 border-t-accent-primary">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-bold text-primary flex items-center gap-2">
            <i data-lucide="help-circle" class="w-4 h-4 text-accent-primary"></i>
            <span>${t('faqsTitle')} & ${t('yearlySchedule')}</span>
          </h3>
          <span class="text-[11px] text-muted font-bold uppercase tracking-wider">${faqs.length} Answers</span>
        </div>

        <div class="space-y-3" id="calc-faq-accordion">
          ${faqs.map((faq, idx) => `
            <div class="faq-item border border-subtle rounded-lg bg-tertiary overflow-hidden transition-all">
              <button class="w-full p-3.5 text-left text-xs sm:text-sm font-bold text-primary flex items-center justify-between gap-3 faq-question-btn">
                <span>${faq.q}</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-muted transition-transform duration-200 faq-arrow"></i>
              </button>
              <div class="faq-answer px-3.5 pb-3.5 text-xs sm:text-sm text-secondary leading-relaxed border-t border-subtle pt-2.5 hidden">
                ${faq.a}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.faq-question-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const ans = item.querySelector('.faq-answer');
        const arrow = item.querySelector('.faq-arrow');
        const isOpen = !ans.classList.contains('hidden');

        if (isOpen) {
          ans.classList.add('hidden');
          arrow.style.transform = 'rotate(0deg)';
          item.classList.remove('border-accent-primary');
        } else {
          ans.classList.remove('hidden');
          arrow.style.transform = 'rotate(180deg)';
          item.classList.add('border-accent-primary');
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * Renders the Knowledge Base Educational Guides section
   */
  renderGlobalKnowledgeSection() {
    const container = document.getElementById('knowledge-articles-grid');
    if (!container) return;

    const articles = getKnowledgeArticles();

    container.innerHTML = articles.map(article => `
      <div class="glass-card p-5 flex flex-col justify-between hover:border-accent-primary cursor-pointer transition-all article-card group" data-id="${article.id}">
        <div>
          <div class="flex items-center justify-between text-[11px] text-muted mb-2.5">
            <span class="badge badge-${article.category}">${t(article.category) || article.category}</span>
            <span>${article.readTime}</span>
          </div>
          <h3 class="font-bold text-sm sm:text-base text-primary group-hover:text-accent-primary transition-colors leading-snug mb-2">
            ${article.title}
          </h3>
          <p class="text-xs text-secondary leading-relaxed line-clamp-3">
            ${article.summary}
          </p>
        </div>
        <div class="mt-4 pt-3 border-t border-subtle flex items-center justify-between text-xs font-bold text-accent-primary">
          <span>${t('readFullGuide')}</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.article-card').forEach(card => {
      card.addEventListener('click', () => {
        const article = articles.find(a => a.id === card.dataset.id);
        if (article) this.openArticleModal(article);
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * Renders the Global FAQ search & accordion list
   */
  renderGlobalFaqSection() {
    const list = document.getElementById('global-faq-list');
    if (!list) return;

    const faqs = getGeneralKnowledgeFaqs();

    list.innerHTML = faqs.map(faq => `
      <div class="faq-item border border-subtle rounded-lg bg-tertiary overflow-hidden transition-all">
        <button class="w-full p-4 text-left text-xs sm:text-sm font-bold text-primary flex items-center justify-between gap-3 faq-question-btn">
          <div class="flex items-center gap-2">
            <span class="badge badge-${faq.category.toLowerCase()} text-[10px]">${t(faq.category.toLowerCase()) || faq.category}</span>
            <span>${faq.q}</span>
          </div>
          <i data-lucide="chevron-down" class="w-4 h-4 text-muted transition-transform duration-200 faq-arrow"></i>
        </button>
        <div class="faq-answer px-4 pb-4 text-xs sm:text-sm text-secondary leading-relaxed border-t border-subtle pt-3 hidden">
          ${faq.a}
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.faq-question-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const ans = item.querySelector('.faq-answer');
        const arrow = item.querySelector('.faq-arrow');
        const isOpen = !ans.classList.contains('hidden');

        if (isOpen) {
          ans.classList.add('hidden');
          arrow.style.transform = 'rotate(0deg)';
          item.classList.remove('border-accent-primary');
        } else {
          ans.classList.remove('hidden');
          arrow.style.transform = 'rotate(180deg)';
          item.classList.add('border-accent-primary');
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  setupArticleModal() {
    const modal = document.getElementById('article-modal');
    const closeBtn = document.getElementById('close-article-modal-btn');

    closeBtn?.addEventListener('click', () => modal?.classList.remove('open'));
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  openArticleModal(article) {
    const modal = document.getElementById('article-modal');
    const titleEl = document.getElementById('article-modal-title');
    const badgeEl = document.getElementById('article-modal-badge');
    const timeEl = document.getElementById('article-modal-time');
    const bodyEl = document.getElementById('article-modal-body');

    if (!modal || !titleEl || !bodyEl) return;

    titleEl.textContent = article.title;
    badgeEl.textContent = (t(article.category) || article.category).toUpperCase();
    badgeEl.className = `badge badge-${article.category}`;
    timeEl.textContent = article.readTime;
    bodyEl.innerHTML = article.content;

    modal.classList.add('open');
    if (window.lucide) window.lucide.createIcons();
  }
}
