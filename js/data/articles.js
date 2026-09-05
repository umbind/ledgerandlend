export function getKnowledgeArticles() {
  return [
    {
      id: 'sip-mastery',
      title: 'The Mathematics of Wealth: How SIP & Compound Growth Build Fortunes',
      category: 'investing',
      readTime: '6 min read',
      content: `
        <p class="lead">Systematic Investment Planning (SIP) harnesses the compounding power of dollar-cost averaging to turn modest monthly contributions into multi-million dollar portfolios.</p>
        <h4>The SIP Compound Formula</h4>
        <p>Future wealth is governed by the compound annuity equation: <code>M = P × ({[1 + i]^n - 1} / i) × (1 + i)</code>, where <em>P</em> is your regular monthly allocation, <em>i</em> is the monthly periodic interest, and <em>n</em> is the tenure in months.</p>
        <h4>The 10% Step-Up Advantage</h4>
        <p>By increasing your monthly allocation by just 10% each year as your income grows, your 20-year portfolio maturity value more than doubles compared to a fixed SIP contribution.</p>
      `
    },
    {
      id: 'emi-amortization-guide',
      title: 'Smart Debt Reduction: How Loan Amortization & Prepayments Slash Interest',
      category: 'loans',
      readTime: '5 min read',
      content: `
        <p class="lead">In the early years of any standard fixed-rate loan, over 70% of each monthly EMI goes directly toward interest rather than principal reduction.</p>
        <h4>The Reducing Balance Formula</h4>
        <p>Standard bank EMI is calculated via: <code>E = [P × r × (1 + r)^n] / [(1 + r)^n - 1]</code>. Making just one extra EMI payment per year can shorten a 20-year loan by more than 4.5 years and save tens of thousands in interest.</p>
      `
    },
    {
      id: 'mortgage-piti-breakdown',
      title: 'Understanding Mortgage PITI: Principal, Interest, Taxes & Escrow',
      category: 'loans',
      readTime: '7 min read',
      content: `
        <p class="lead">A complete mortgage payment consists of four distinct components: Principal, Interest, Property Taxes, and Homeowners Insurance (PITI).</p>
        <h4>The 28/36 Qualifying Rule</h4>
        <p>Top lenders recommend keeping your total monthly housing expenses (PITI) under 28% of your gross income, and total debt obligations under 36%.</p>
      `
    },
    {
      id: 'compound-interest-magic',
      title: 'The Rule of 72 & Compound Growth: Why Time in the Market Beats Timing',
      category: 'investing',
      readTime: '5 min read',
      content: `
        <p class="lead">Compound interest generates exponential return on both your initial capital and reinvested dividends.</p>
        <h4>The Rule of 72 Shortcut</h4>
        <p>Divide 72 by your annual expected return to determine how many years it takes your investment to double. At a 10% equity return, money doubles every 7.2 years.</p>
      `
    },
    {
      id: 'sales-tax-vat-guide',
      title: 'Sales Tax, GST & VAT Demystified: Retail Pricing & True Net Savings',
      category: 'taxes',
      readTime: '4 min read',
      content: `
        <p class="lead">Calculating discounts stacked with government sales tax ensures you always know your exact checkout total before reaching the register.</p>
      `
    },
    {
      id: 'gratuity-tipping-guide',
      title: 'Dining Gratuity Standards & Fair Bill Splitting Across Groups',
      category: 'taxes',
      readTime: '4 min read',
      content: `
        <p class="lead">Fair group bill splitting accounts for shared appetizers, individual orders, tax, and appropriate gratuity percentages (15% - 22%).</p>
      `
    },
    {
      id: 'fuel-economy-commute',
      title: 'Commute & Road Trip Economics: Optimizing Fuel Costs & MPG',
      category: 'taxes',
      readTime: '5 min read',
      content: `
        <p class="lead">Calculating true highway vs city fuel burn allows accurate road trip expense budgeting and shared commute carpooling costs.</p>
      `
    },
    {
      id: 'freelance-billable-hours',
      title: 'Freelance & Shift Wage Accounting: Converting Hours to True Earnings',
      category: 'taxes',
      readTime: '5 min read',
      content: `
        <p class="lead">Accurately calculating decimal hours worked and factoring unpaid breaks gives exact gross payroll numbers for contractors and hourly employees.</p>
      `
    }
  ];
}
