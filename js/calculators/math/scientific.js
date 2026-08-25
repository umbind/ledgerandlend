/**
 * Standard & Scientific Calculator
 * 100% Safe, Zero-Eval AST Evaluator
 */
import { saveHistoryItem } from '../../utils/storage.js';
import { evaluateSafeMath } from '../../utils/mathParser.js';

export const scientificCalculator = {
  id: 'scientific',
  title: 'Standard & Scientific Calculator',
  category: 'math',
  icon: 'calculator',
  description: 'Full-featured scientific calculator with trigonometric, logarithmic, memory, and exponential functions.',

  render(container) {
    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-4xl mx-auto">
        <!-- Calculator Unit -->
        <div class="lg:col-span-8 space-y-3">
          <div class="glass-card p-5 shadow-xl">
            <!-- Screen Display -->
            <div class="bg-tertiary border border-subtle rounded-xl p-4 mb-4 text-right">
              <div class="flex items-center justify-between text-xs text-muted mb-1">
                <span id="calc-angle-indicator" class="font-bold uppercase tracking-wider text-accent-primary">DEG</span>
                <span id="calc-expr" class="font-mono truncate max-w-[280px]">0</span>
              </div>
              <div id="calc-display" class="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-primary truncate">0</div>
            </div>

            <!-- Top Option Row -->
            <div class="flex items-center justify-between gap-2 mb-3">
              <div class="inline-flex rounded-md p-0.5 bg-tertiary border border-subtle text-xs">
                <button id="calc-deg-btn" class="px-2.5 py-1 rounded font-semibold bg-accent-primary text-white">DEG</button>
                <button id="calc-rad-btn" class="px-2.5 py-1 rounded font-semibold text-secondary hover:text-primary">RAD</button>
              </div>

              <div class="flex items-center gap-1 text-xs">
                <button id="calc-mc" class="btn btn-secondary btn-sm py-1 px-2 text-[11px]">MC</button>
                <button id="calc-mr" class="btn btn-secondary btn-sm py-1 px-2 text-[11px]">MR</button>
                <button id="calc-mplus" class="btn btn-secondary btn-sm py-1 px-2 text-[11px]">M+</button>
                <button id="calc-mminus" class="btn btn-secondary btn-sm py-1 px-2 text-[11px]">M-</button>
              </div>
            </div>

            <!-- Keypad -->
            <div class="calc-keypad" id="scientific-keypad">
              <!-- Row 1 -->
              <button class="calc-btn op" data-fn="sin">sin</button>
              <button class="calc-btn op" data-fn="cos">cos</button>
              <button class="calc-btn op" data-fn="tan">tan</button>
              <button class="calc-btn action" data-action="clear">AC</button>
              <button class="calc-btn action" data-action="backspace">⌫</button>

              <!-- Row 2 -->
              <button class="calc-btn op" data-fn="ln">ln</button>
              <button class="calc-btn op" data-fn="log">log</button>
              <button class="calc-btn op" data-insert="(">(</button>
              <button class="calc-btn op" data-insert=")">)</button>
              <button class="calc-btn op" data-insert="/">÷</button>

              <!-- Row 3 -->
              <button class="calc-btn op" data-fn="sqrt">√</button>
              <button class="calc-btn" data-insert="7">7</button>
              <button class="calc-btn" data-insert="8">8</button>
              <button class="calc-btn" data-insert="9">9</button>
              <button class="calc-btn op" data-insert="*">×</button>

              <!-- Row 4 -->
              <button class="calc-btn op" data-fn="square">x²</button>
              <button class="calc-btn" data-insert="4">4</button>
              <button class="calc-btn" data-insert="5">5</button>
              <button class="calc-btn" data-insert="6">6</button>
              <button class="calc-btn op" data-insert="-">-</button>

              <!-- Row 5 -->
              <button class="calc-btn op" data-fn="power">xʸ</button>
              <button class="calc-btn" data-insert="1">1</button>
              <button class="calc-btn" data-insert="2">2</button>
              <button class="calc-btn" data-insert="3">3</button>
              <button class="calc-btn op" data-insert="+">+</button>

              <!-- Row 6 -->
              <button class="calc-btn op" data-insert="π">π</button>
              <button class="calc-btn op" data-insert="e">e</button>
              <button class="calc-btn" data-insert="0">0</button>
              <button class="calc-btn" data-insert=".">.</button>
              <button class="calc-btn equals" data-action="calculate">=</button>
            </div>
          </div>
        </div>

        <!-- History Tape -->
        <div class="lg:col-span-4 space-y-3">
          <div class="glass-card p-4 h-full flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <i data-lucide="history" class="w-3.5 h-3.5"></i>
                Calculation Tape
              </h4>
              <button id="calc-clear-tape" class="text-xs text-muted hover:text-accent-rose">Clear</button>
            </div>
            <div id="calc-tape-list" class="space-y-2 overflow-y-auto max-h-[350px] flex-1 text-xs font-mono">
              <div class="text-muted text-center py-8">No calculations yet</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // State
    let isDeg = true;
    let memoryVal = 0;
    let currentExpr = '';
    let justCalculated = false;
    const tape = [];

    const display = container.querySelector('#calc-display');
    const exprDisplay = container.querySelector('#calc-expr');
    const angleIndicator = container.querySelector('#calc-angle-indicator');
    const degBtn = container.querySelector('#calc-deg-btn');
    const radBtn = container.querySelector('#calc-rad-btn');
    const tapeList = container.querySelector('#calc-tape-list');
    const clearTapeBtn = container.querySelector('#calc-clear-tape');

    function updateDisplay(val, expr = null) {
      display.textContent = val || '0';
      if (expr !== null) exprDisplay.textContent = expr || '0';
    }

    function renderTape() {
      if (tape.length === 0) {
        tapeList.innerHTML = '<div class="text-muted text-center py-8">No calculations yet</div>';
        return;
      }
      tapeList.innerHTML = tape.map((item, idx) => `
        <div class="p-2 rounded bg-tertiary border border-subtle cursor-pointer hover:border-accent-primary transition-all tape-item" data-idx="${idx}">
          <div class="text-muted truncate">${item.expr} =</div>
          <div class="font-bold text-accent-primary text-sm">${item.result}</div>
        </div>
      `).join('');

      tapeList.querySelectorAll('.tape-item').forEach(el => {
        el.addEventListener('click', () => {
          const item = tape[parseInt(el.dataset.idx)];
          currentExpr = String(item.result);
          updateDisplay(currentExpr, item.expr);
        });
      });
    }

    function evaluateExpression() {
      if (!currentExpr) return;
      try {
        const rawResult = evaluateSafeMath(currentExpr, isDeg);
        let result = Number(rawResult.toFixed(10));

        tape.unshift({ expr: currentExpr, result });
        renderTape();

        saveHistoryItem({
          calcId: 'scientific',
          calcTitle: 'Scientific Calculator',
          summary: `${currentExpr} = ${result}`,
          inputs: { expression: currentExpr },
          results: { result }
        });

        updateDisplay(result, currentExpr);
        currentExpr = String(result);
        justCalculated = true;
      } catch (err) {
        updateDisplay('Error', currentExpr);
        currentExpr = '';
      }
    }

    degBtn.addEventListener('click', () => {
      isDeg = true;
      degBtn.className = 'px-2.5 py-1 rounded font-semibold bg-accent-primary text-white';
      radBtn.className = 'px-2.5 py-1 rounded font-semibold text-secondary hover:text-primary';
      angleIndicator.textContent = 'DEG';
    });

    radBtn.addEventListener('click', () => {
      isDeg = false;
      radBtn.className = 'px-2.5 py-1 rounded font-semibold bg-accent-primary text-white';
      degBtn.className = 'px-2.5 py-1 rounded font-semibold text-secondary hover:text-primary';
      angleIndicator.textContent = 'RAD';
    });

    container.querySelector('#scientific-keypad').addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      const insert = btn.dataset.insert;
      const fn = btn.dataset.fn;
      const action = btn.dataset.action;

      if (action === 'clear') {
        currentExpr = '';
        updateDisplay('0', '0');
        return;
      }

      if (action === 'backspace') {
        currentExpr = currentExpr.slice(0, -1);
        updateDisplay(currentExpr || '0', currentExpr);
        return;
      }

      if (action === 'calculate') {
        evaluateExpression();
        return;
      }

      if (justCalculated && !['+', '-', '*', '/', '%', '^'].includes(insert)) {
        currentExpr = '';
      }
      justCalculated = false;

      if (insert) {
        currentExpr += insert;
        updateDisplay(currentExpr, currentExpr);
      } else if (fn) {
        if (fn === 'square') currentExpr += '^2';
        else if (fn === 'power') currentExpr += '^';
        else currentExpr += `${fn}(`;
        updateDisplay(currentExpr, currentExpr);
      }
    });

    // Memory keys
    container.querySelector('#calc-mc').addEventListener('click', () => { memoryVal = 0; });
    container.querySelector('#calc-mr').addEventListener('click', () => {
      currentExpr += String(memoryVal);
      updateDisplay(currentExpr, currentExpr);
    });
    container.querySelector('#calc-mplus').addEventListener('click', () => {
      memoryVal += parseFloat(display.textContent) || 0;
    });
    container.querySelector('#calc-mminus').addEventListener('click', () => {
      memoryVal -= parseFloat(display.textContent) || 0;
    });

    clearTapeBtn.addEventListener('click', () => {
      tape.length = 0;
      renderTape();
    });

    if (window.lucide) window.lucide.createIcons();
  }
};
