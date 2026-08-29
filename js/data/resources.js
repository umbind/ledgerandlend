/**
 * Essential Calculators Hub - High-Value Educational & Research Resources
 * Configured with 100% risk-free, verified public authority links (Google Finance, WHO, AHA, USDA).
 * You can replace these with your own affiliate tracking URLs anytime you join affiliate programs.
 */

export const resourceOffers = {
  finance: [
    {
      id: "fin-1",
      badge: "Market Research",
      title: "Explore Current Live Loan & Mortgage Interest Rates",
      desc: "Review daily benchmark interest rates and treasury yields on Google Finance with zero credit impact.",
      cta: "Explore Market Rates",
      url: "https://www.google.com/finance/markets/indexes",
      icon: "trending-up",
      color: "primary"
    },
    {
      id: "fin-2",
      badge: "Financial Guide",
      title: "Master Personal Finance & Compounding with Khan Academy",
      desc: "Access Khan Academy's free world-class education on compound growth, investing, and financial planning.",
      cta: "Explore Free Course",
      url: "https://www.khanacademy.org/college-careers-more/personal-finance",
      icon: "badge-percent",
      color: "emerald"
    }
  ],

  health: [
    {
      id: "health-1",
      badge: "Global Authority",
      title: "World Health Organization (WHO) Healthy Diet Guidelines",
      desc: "Access global evidence-based dietary recommendations, nutrient balance, and energy requirements from WHO.",
      cta: "View WHO Guidelines",
      url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
      icon: "utensils",
      color: "emerald"
    },
    {
      id: "health-2",
      badge: "Nutrition Science",
      title: "Harvard School of Public Health Nutrition Source",
      desc: "Explore clinical macronutrient ratios, healthy eating guidelines, and metabolic health research from Harvard.",
      cta: "Explore Harvard Guide",
      url: "https://www.hsph.harvard.edu/nutritionsource/healthy-eating-plate/",
      icon: "apple",
      color: "emerald"
    },
    {
      id: "health-3",
      badge: "Cardio Health",
      title: "NHS UK Cardiovascular Endurance & Exercise Guidelines",
      desc: "Explore clinical cardiovascular training, aerobic zones, and physical fitness guidelines from the NHS.",
      cta: "View NHS Exercise Guide",
      url: "https://www.nhs.uk/live-well/exercise/running-and-aerobic-exercises/",
      icon: "activity",
      color: "rose"
    }
  ],

  medical: [
    {
      id: "med-1",
      badge: "Clinical Decision Support",
      title: "MDCalc Evidence-Based Clinical Equations & Calculators",
      desc: "Access peer-reviewed clinical decision algorithms, risk scores, and medical equations used by physicians worldwide.",
      cta: "Explore MDCalc",
      url: "https://www.mdcalc.com/",
      icon: "stethoscope",
      color: "rose"
    },
    {
      id: "med-2",
      badge: "Renal Health Guidelines",
      title: "National Kidney Foundation (NKF) Clinical Education",
      desc: "Explore clinical guidelines for eGFR staging, chronic kidney disease (CKD), and renal care protocols.",
      cta: "Visit Kidney.org",
      url: "https://www.kidney.org/",
      icon: "activity",
      color: "primary"
    }
  ],

  math: [
    {
      id: "math-1",
      badge: "Free Cloud Tool",
      title: "Google Sheets Free Financial & Calculation Templates",
      desc: "Access free budget templates, amortization spreadsheets, and cloud calculation tools from Google.",
      cta: "Open Google Sheets",
      url: "https://docs.google.com/spreadsheets/u/0/",
      icon: "file-spreadsheet",
      color: "violet"
    }
  ]
};

export function getResourceOffer(category) {
  const list = resourceOffers[category] || resourceOffers.finance;
  return list[Math.floor(Math.random() * list.length)];
}
