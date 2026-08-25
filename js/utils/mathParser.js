/**
 * Essential Calculators Hub - Secure Math Expression Evaluator
 * Zero-Eval, Zero-Function, 100% Sandboxed Mathematical AST Evaluator
 * Prevents all XSS, code injection, and unsafe-eval CSP violations.
 */

export function evaluateSafeMath(expr, isDeg = true) {
  if (!expr || typeof expr !== 'string') return 0;

  // Clean expression and replace symbols
  let clean = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π/g, 'PI')
    .replace(/Math\.PI/g, 'PI')
    .replace(/Math\.E/g, 'E')
    .trim();

  // Validate allowed characters strictly: digits, operators, parentheses, math keywords
  if (!/^[0-9\.\+\-\*\/\%\^\(\)\s\,a-zA-Z]+$/.test(clean)) {
    throw new Error('Invalid mathematical characters');
  }

  // Tokenize
  const tokens = tokenize(clean);
  const rpn = toRPN(tokens);
  return evaluateRPN(rpn, isDeg);
}

function tokenize(str) {
  const tokens = [];
  let i = 0;

  while (i < str.length) {
    const ch = str[i];

    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    if (/[0-9\.]/.test(ch)) {
      let num = '';
      while (i < str.length && /[0-9\.]/.test(str[i])) {
        num += str[i];
        i++;
      }
      tokens.push({ type: 'number', value: parseFloat(num) });
      continue;
    }

    if (/[a-zA-Z]/.test(ch)) {
      let ident = '';
      while (i < str.length && /[a-zA-Z0-9]/.test(str[i])) {
        ident += str[i];
        i++;
      }
      tokens.push({ type: 'ident', value: ident });
      continue;
    }

    if ('+-*/%^()'.includes(ch)) {
      // Handle unary minus (negative number)
      if (ch === '-') {
        const prev = tokens[tokens.length - 1];
        if (!prev || prev.type === 'operator' || (prev.type === 'paren' && prev.value === '(')) {
          tokens.push({ type: 'number', value: 0 });
        }
      }

      if (ch === '(' || ch === ')') {
        tokens.push({ type: 'paren', value: ch });
      } else {
        tokens.push({ type: 'operator', value: ch });
      }
      i++;
      continue;
    }

    throw new Error(`Unexpected character: ${ch}`);
  }

  return tokens;
}

const PRECEDENCE = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2, '^': 3 };

function toRPN(tokens) {
  const output = [];
  const ops = [];

  for (let token of tokens) {
    if (token.type === 'number') {
      output.push(token);
    } else if (token.type === 'ident') {
      if (token.value === 'PI') output.push({ type: 'number', value: Math.PI });
      else if (token.value === 'E') output.push({ type: 'number', value: Math.E });
      else ops.push(token);
    } else if (token.type === 'operator') {
      while (
        ops.length > 0 &&
        ops[ops.length - 1].type === 'operator' &&
        PRECEDENCE[ops[ops.length - 1].value] >= PRECEDENCE[token.value]
      ) {
        output.push(ops.pop());
      }
      ops.push(token);
    } else if (token.type === 'paren' && token.value === '(') {
      ops.push(token);
    } else if (token.type === 'paren' && token.value === ')') {
      while (ops.length > 0 && !(ops[ops.length - 1].type === 'paren' && ops[ops.length - 1].value === '(')) {
        output.push(ops.pop());
      }
      ops.pop(); // discard '('
      if (ops.length > 0 && ops[ops.length - 1].type === 'ident') {
        output.push(ops.pop()); // function call
      }
    }
  }

  while (ops.length > 0) {
    output.push(ops.pop());
  }

  return output;
}

function evaluateRPN(rpn, isDeg) {
  const stack = [];

  const toRad = (x) => isDeg ? (x * Math.PI) / 180 : x;
  const toDeg = (x) => isDeg ? (x * 180) / Math.PI : x;

  for (let token of rpn) {
    if (token.type === 'number') {
      stack.push(token.value);
    } else if (token.type === 'operator') {
      if (stack.length < 2) throw new Error('Malformed expression');
      const b = stack.pop();
      const a = stack.pop();
      let res = 0;
      if (token.value === '+') res = a + b;
      else if (token.value === '-') res = a - b;
      else if (token.value === '*') res = a * b;
      else if (token.value === '/') {
        if (b === 0) throw new Error('Division by zero');
        res = a / b;
      } else if (token.value === '%') res = a % b;
      else if (token.value === '^') res = Math.pow(a, b);
      stack.push(res);
    } else if (token.type === 'ident') {
      if (stack.length < 1) throw new Error('Function argument missing');
      const arg = stack.pop();
      const fn = token.value.toLowerCase();
      let res = 0;

      if (fn === 'sin') res = Math.sin(toRad(arg));
      else if (fn === 'cos') res = Math.cos(toRad(arg));
      else if (fn === 'tan') res = Math.tan(toRad(arg));
      else if (fn === 'asin') res = toDeg(Math.asin(arg));
      else if (fn === 'acos') res = toDeg(Math.acos(arg));
      else if (fn === 'atan') res = toDeg(Math.atan(arg));
      else if (fn === 'sqrt') {
        if (arg < 0) throw new Error('Negative square root');
        res = Math.sqrt(arg);
      }
      else if (fn === 'log') {
        if (arg <= 0) throw new Error('Non-positive log');
        res = Math.log10(arg);
      }
      else if (fn === 'ln') {
        if (arg <= 0) throw new Error('Non-positive ln');
        res = Math.log(arg);
      }
      else if (fn === 'abs') res = Math.abs(arg);
      else throw new Error(`Unknown function: ${fn}`);

      stack.push(res);
    }
  }

  if (stack.length !== 1 || isNaN(stack[0])) {
    throw new Error('Calculation error');
  }

  return stack[0];
}
