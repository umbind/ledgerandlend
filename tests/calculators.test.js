/**
 * Ledger & Lend - Mathematical & Financial Algorithm Unit Tests
 * Run with: node tests/calculators.test.js
 */

import assert from 'node:assert/strict';

console.log('🧪 Running Ledger & Lend Formula Unit Tests...\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    failed++;
  }
}

// 1. Finance: Loan EMI Calculations
test('Finance: EMI Calculation Formula', () => {
  const p = 100000;
  const rAnnual = 8.5;
  const tenureYears = 15;
  const r = (rAnnual / 12) / 100;
  const n = tenureYears * 12;

  // Formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayable = emi * n;
  const totalInterest = totalPayable - p;

  assert.strictEqual(Math.round(emi), 985, 'Monthly EMI should be approx 985');
  assert.strictEqual(Math.round(totalPayable), 177259, 'Total payable should be approx 177,259');
  assert.strictEqual(Math.round(totalInterest), 77259, 'Total interest should be approx 77,259');
});

// 2. Finance: SIP Compound Growth
test('Finance: Monthly SIP Wealth Compounding', () => {
  const monthly = 500;
  const rateAnnual = 12;
  const years = 10;
  const i = (rateAnnual / 12) / 100;
  const n = years * 12;

  // Formula: FV = P * [((1+i)^n - 1) / i] * (1+i)
  const fv = monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const totalInvested = monthly * n;
  const estimatedGains = fv - totalInvested;

  assert.strictEqual(totalInvested, 60000, 'Total invested should be 60,000');
  assert.strictEqual(Math.round(fv), 116170, 'Future value should be approx 116,170');
  assert.strictEqual(Math.round(estimatedGains), 56170, 'Estimated gains should be approx 56,170');
});

// 3. Finance: Mortgage & PMI Calculation
test('Finance: Mortgage Monthly P&I and Down Payment', () => {
  const homePrice = 400000;
  const downPayment = 80000; // 20%
  const principal = homePrice - downPayment; // 320000
  const rate = 6.5;
  const r = (rate / 12) / 100;
  const n = 30 * 12;

  const monthlyPI = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  assert.strictEqual(Math.round(monthlyPI), 2023, 'Mortgage P&I should be approx 2023/mo');
});

// 4. Health: BMI & Classification
test('Health: Metric BMI Calculation', () => {
  const weightKg = 70;
  const heightCm = 175;
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  assert.strictEqual(Number(bmi.toFixed(1)), 22.9, 'BMI for 70kg / 175cm should be 22.9');
});

// 5. Health: Ideal Body Weight (Devine Formula)
test('Health: Devine Ideal Body Weight Formula', () => {
  const heightCm = 178; // ~70.08 inches
  const heightInches = heightCm / 2.54;
  const over60Inches = Math.max(0, heightInches - 60);

  // Male: 50kg + 2.3kg * (inches - 60)
  const maleIbld = 50 + (2.3 * over60Inches);
  // Female: 45.5kg + 2.3kg * (inches - 60)
  const femaleIbld = 45.5 + (2.3 * over60Inches);

  assert.strictEqual(Math.round(maleIbld), 73, 'Male ideal weight at 178cm should be approx 73kg');
  assert.strictEqual(Math.round(femaleIbld), 69, 'Female ideal weight at 178cm should be approx 69kg');
});

// 6. Health: BMR & TDEE (Mifflin-St Jeor)
test('Health: Mifflin-St Jeor Basal Metabolic Rate', () => {
  const weightKg = 80;
  const heightCm = 180;
  const age = 30;

  // Male: (10 * weight) + (6.25 * height) - (5 * age) + 5
  const maleBmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
  // Sedentary TDEE: BMR * 1.2
  const tdee = maleBmr * 1.2;

  assert.strictEqual(maleBmr, 1780, 'Male BMR should be 1780 kcal');
  assert.strictEqual(tdee, 2136, 'Sedentary TDEE should be 2136 kcal');
});

// 7. Math: Percentage Calculations
test('Math: 4-in-1 Percentage Suite Math', () => {
  // Case 1: What is 15% of 200?
  const pctOf = (15 / 100) * 200;
  assert.strictEqual(pctOf, 30, '15% of 200 is 30');

  // Case 2: Percentage Change from 50 to 75
  const change = ((75 - 50) / 50) * 100;
  assert.strictEqual(change, 50, 'Increase from 50 to 75 is +50%');
});

// 8. Math: Unit Converter Dimensions
test('Math: Metric & Imperial Unit Conversions', () => {
  // Length: 10 Kilometers to Miles
  const kmToMiles = 10 * 0.621371;
  assert.strictEqual(Number(kmToMiles.toFixed(2)), 6.21, '10 km is approx 6.21 miles');

  // Mass: 100 Kilograms to Pounds
  const kgToLbs = 100 * 2.20462;
  assert.strictEqual(Number(kgToLbs.toFixed(2)), 220.46, '100 kg is 220.46 lbs');

  // Temp: 100 Celsius to Fahrenheit
  const cToF = (100 * 9 / 5) + 32;
  assert.strictEqual(cToF, 212, '100C is 212F');
});

console.log(`\n========================================`);
console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}
