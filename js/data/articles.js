/**
 * Essential Calculators Hub - Multilingual In-Depth Knowledge Articles
 * Supporting English, Spanish, French, German, Hindi, Japanese, Portuguese, Chinese, Arabic
 */

import { getLanguage } from './i18n.js';

export const localizedArticles = {
  en: [
    {
      id: "compound-wealth-guide",
      title: "The Mathematical Power of Compound Interest & SIP Wealth Creation",
      category: "finance",
      readTime: "5 min read",
      summary: "Discover how compounding turns small recurring investments into exponential wealth, why starting 5 years earlier doubles your outcome, and how inflation-adjusted calculations protect your future purchasing power.",
      content: `
        <h3>1. What is Compound Interest?</h3>
        <p>Albert Einstein famously remarked that <em>"Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it."</em></p>
        <p>Unlike simple interest where you only earn returns on your initial principal, compound interest generates <strong>returns on your previously earned returns</strong>. Past the 7–10 year mark, the growth curve turns parabolic, generating explosive expansion.</p>
        <div class="p-3 my-3 bg-tertiary border-l-4 border-accent-emerald rounded text-sm font-mono">
          <strong>Compound Interest Formula:</strong><br>
          A = P × (1 + r / n)^(n × t)
        </div>
        <h3>2. The Step-Up Multiplier</h3>
        <p>By implementing a <strong>Step-Up SIP</strong> (increasing monthly investment by 10% each year as your income grows), an investor starting with just $200/month can build over $1.8 Million in 25 years at 12% CAGR, compared to $380,000 with a static contribution.</p>
      `
    },
    {
      id: "amortization-prepayment-guide",
      title: "The Math of Loan Amortization: How Extra Payments Save Fortunes in Interest",
      category: "finance",
      readTime: "6 min read",
      summary: "A deep dive into reducing balance amortization schedules, the front-loaded interest trap in mortgages, and mathematically proven prepayment strategies.",
      content: `
        <h3>1. How Loan Amortization Actually Works</h3>
        <p>When you take a fixed-rate loan, your monthly payment (EMI) remains identical throughout the term. However, the internal distribution of that payment between <strong>Principal</strong> and <strong>Interest</strong> shifts dramatically over time.</p>
        <div class="p-3 my-3 bg-tertiary border-l-4 border-accent-primary rounded text-sm font-mono">
          <strong>EMI Formula:</strong><br>
          EMI = [P × r × (1 + r)^n] / [(1 + r)^n – 1]
        </div>
        <h3>2. The Prepayment Advantage</h3>
        <p>Any extra dollar paid towards your loan is applied <strong>100% to the principal balance</strong>. Making just one extra EMI per year on a 30-year mortgage reduces your loan tenure by approximately 6 years and saves tens of thousands in interest.</p>
      `
    },
    {
      id: "energy-balance-tdee-guide",
      title: "The Science of Energy Balance: BMR, TDEE, NEAT & Fat Loss",
      category: "health",
      readTime: "5 min read",
      summary: "Understand the biological mechanisms governing your daily caloric expenditure, the role of Non-Exercise Activity Thermogenesis (NEAT), and how to set macro splits.",
      content: `
        <h3>1. Total Daily Energy Expenditure (TDEE)</h3>
        <p>Your body expends calories through: <strong>Basal Metabolic Rate (BMR ~60-70%)</strong>, <strong>NEAT (~15-20%)</strong>, <strong>TEF (~10%)</strong>, and <strong>Exercise (~5-10%)</strong>.</p>
        <h3>2. Setting Sustainable Calorie Deficits</h3>
        <p>A daily deficit of <strong>300 to 500 kcal</strong> yields roughly 1 lb (0.45 kg) of fat loss per week while preserving lean muscle mass and metabolic health.</p>
      `
    },
    {
      id: "math-percentages-margins-guide",
      title: "Everyday Math Demystified: Markup, Margin, and Tax Arithmetic",
      category: "math",
      readTime: "4 min read",
      summary: "Clear mathematical explanations distinguishing profit margins from markups, along with forward and reverse sales tax formulas.",
      content: `
        <h3>1. Markup vs. Margin</h3>
        <p><strong>Markup:</strong> <code>(Profit / Cost) × 100</code>.<br><strong>Margin:</strong> <code>(Profit / Selling Price) × 100</code>.</p>
        <p>If cost is $80 and selling price is $100, the markup is 25%, but the gross profit margin is 20%.</p>
        <h3>2. Reverse Tax Formula</h3>
        <p>To extract sales tax from a gross amount: <code>Pre-Tax Base = Gross Total / (1 + Tax Rate / 100)</code>.</p>
      `
    }
  ],

  es: [
    {
      id: "compound-wealth-guide",
      title: "El Poder Matemático del Interés Compuesto y la Inversión SIP",
      category: "finance",
      readTime: "5 min de lectura",
      summary: "Descubre cómo el interés compuesto convierte pequeñas aportaciones periódicas en un patrimonio millonario y por qué empezar 5 años antes duplica tus resultados.",
      content: `
        <h3>1. ¿Qué es el Interés Compuesto?</h3>
        <p>A diferencia del interés simple, el interés compuesto genera <strong>rendimientos sobre los rendimientos ya acumulados</strong>. A partir del séptimo año, el crecimiento se vuelve exponencial.</p>
        <div class="p-3 my-3 bg-tertiary border-l-4 border-accent-emerald rounded text-sm font-mono">
          <strong>Fórmula de Interés Compuesto:</strong><br>
          A = P × (1 + r / n)^(n × t)
        </div>
        <h3>2. La Ventaja del Incremento Anual (Step-Up)</h3>
        <p>Aumentar tu aporte mensual un 10% cada año conforme crece tu sueldo multiplica el resultado final exponencialmente.</p>
      `
    },
    {
      id: "amortization-prepayment-guide",
      title: "Matemáticas de la Amortización: Cómo los Pagos Extra Ahorran Fortunas",
      category: "finance",
      readTime: "6 min de lectura",
      summary: "Aprende cómo funciona el sistema de amortización sobre saldo deudor y cómo amortizar capital reduce años de hipoteca.",
      content: `
        <h3>1. La Distribución de tu Cuota</h3>
        <p>Al principio del préstamo, la mayor parte de tu cuota mensual va destinada a pagar intereses, no capital.</p>
        <h3>2. El Poder de los Abonos Extra</h3>
        <p>Cualquier pago extraordinario reduce 100% el capital adeudado, ahorrando miles en intereses futuros.</p>
      `
    },
    {
      id: "energy-balance-tdee-guide",
      title: "La Ciencia del Balance Energético: TMB, Gasto Total y Pérdida de Grasa",
      category: "health",
      readTime: "5 min de lectura",
      summary: "Comprende el metabolismo basal (TMB), el gasto diario total (TDEE) y cómo fijar un déficit calórico saludable.",
      content: `
        <h3>1. Gasto Calórico Total Diario</h3>
        <p>Tu cuerpo consume calorías a través de: Tasa Metabólica Basal (60-70%), Actividad Cotidiana NEAT (15-20%) y Ejercicio.</p>
      `
    },
    {
      id: "math-percentages-margins-guide",
      title: "Matemáticas Cotidianas: Margen, Margen de Beneficio e Impuestos",
      category: "math",
      readTime: "4 min de lectura",
      summary: "Diferencias claras entre margen comercial y margen sobre coste, además de cómo extraer impuestos de un precio total.",
      content: `
        <h3>1. Margen vs. Markup</h3>
        <p><strong>Markup:</strong> (Beneficio / Coste) × 100.<br><strong>Margen de Beneficio:</strong> (Beneficio / Precio de Venta) × 100.</p>
      `
    }
  ],

  fr: [
    {
      id: "compound-wealth-guide",
      title: "La Puissance des Intérêts Composés & de l'Épargne Programmée",
      category: "finance",
      readTime: "5 min de lecture",
      summary: "Comprendre la croissance exponentielle du capital et pourquoi commencer tôt démultiplie vos gains financiers.",
      content: `
        <h3>1. Les Intérêts Composés</h3>
        <p>Les intérêts génèrent à leur tour des intérêts. Avec le temps, la courbe de croissance devient exponentielle.</p>
      `
    },
    {
      id: "amortization-prepayment-guide",
      title: "L'Amortissement du Prêt : Comment Réduire la Durée et les Intérêts",
      category: "finance",
      readTime: "6 min de lecture",
      summary: "Comprendre les mensualités dégressives et l'impact des remboursements anticipés sur le coût global d'un crédit.",
      content: `
        <h3>1. Structure du Remboursement</h3>
        <p>Au début, la mensualité rembourse principalement des intérêts. Les remboursements anticipés ciblent directement le capital restant dû.</p>
      `
    }
  ],

  de: [
    {
      id: "compound-wealth-guide",
      title: "Die Macht des Zinseszinses & des langfristigen Vermögensaufbaus",
      category: "finance",
      readTime: "5 Min. Lesezeit",
      summary: "Erfahren Sie, wie regelmäßiges Sparen durch exponentielles Zinswachstum beträchtliches Vermögen aufbaut.",
      content: `
        <h3>1. Der Zinseszinseffekt</h3>
        <p>Zinsen auf bereits erwirtschaftete Erträge beschleunigen das Vermögenswachstum über längere Zeiträume dramatisch.</p>
      `
    }
  ],

  hi: [
    {
      id: "compound-wealth-guide",
      title: "चक्रवृद्धि ब्याज (Compound Interest) और एसआईपी की शक्ति",
      category: "finance",
      readTime: "5 मिनट पढ़ें",
      summary: "जानें कि कैसे नियमित छोटी बचत समय के साथ करोड़ों का फंड बनाती है और 5 साल पहले शुरू करने से क्या बड़ा अंतर आता है।",
      content: `
        <h3>1. चक्रवृद्धि ब्याज क्या है?</h3>
        <p>साधारण ब्याज के विपरीत, चक्रवृद्धि ब्याज में आपको पहले कमाए गए ब्याज पर भी ब्याज मिलता है। 7-10 वर्षों के बाद इसकी वृद्धि तेजी से बढ़ती है।</p>
        <div class="p-3 my-3 bg-tertiary border-l-4 border-accent-emerald rounded text-sm font-mono">
          <strong>चक्रवृद्धि ब्याज सूत्र:</strong><br>
          A = P × (1 + r / n)^(n × t)
        </div>
      `
    },
    {
      id: "amortization-prepayment-guide",
      title: "ऋण परिशोधन (Amortization) का गणित: अतिरिक्त भुगतान से लाखों की बचत",
      category: "finance",
      readTime: "6 मिनट पढ़ें",
      summary: "ऋण के ब्याज को समझने और समय से पहले होम लोन चुकाने की बेहतरीन रणनीतियाँ।",
      content: `
        <h3>1. आपकी ईएमआई कैसे काम करती है</h3>
        <p>ऋण के शुरुआती वर्षों में आपकी अधिकांश किस्त ब्याज में जाती है। कोई भी अतिरिक्त मूलधन भुगतान भविष्य के ब्याज को तेजी से घटाता है।</p>
      `
    }
  ],

  ja: [
    {
      id: "compound-wealth-guide",
      title: "複利効果と積立投資（SIP）による資産形成の数学",
      category: "finance",
      readTime: "読了目安 5分",
      summary: "少額の定期積立がなぜ長期で莫大な資産を生み出すのか、複利の仕組みと時間の影響を分かりやすく解説。",
      content: `
        <h3>1. 複利とは何か？</h3>
        <p>単利とは異なり、複利は「利息がさらに利息を生む」仕組みです。年数が経つほど資産曲線は急上昇します。</p>
      `
    }
  ],

  pt: [
    {
      id: "compound-wealth-guide",
      title: "O Poder dos Juros Compostos e da Criação de Patrimônio",
      category: "finance",
      readTime: "5 min de leitura",
      summary: "Descubra como aportes mensais constantes se transformam em patrimônio exponencial com o passar dos anos.",
      content: `
        <h3>1. O Que São Juros Compostos?</h3>
        <p>Juros que incidem sobre juros acumulados produzem um crescimento exponencial do patrimônio ao longo do tempo.</p>
      `
    }
  ],

  zh: [
    {
      id: "compound-wealth-guide",
      title: "复利的数学奇迹与定投（SIP）财富积累指南",
      category: "finance",
      readTime: "5 分钟阅读",
      summary: "探索定期小额投资如何借助复利实现指数级增长，以及为什么早开始5年收益可以翻倍。",
      content: `
        <h3>1. 什么是复利？</h3>
        <p>复利即“利滚利”，让之前赚取的收益继续产生新的收益。经过7到10年的积累，资产增长曲线将呈现爆发式增长。</p>
        <div class="p-3 my-3 bg-tertiary border-l-4 border-accent-emerald rounded text-sm font-mono">
          <strong>复利公式：</strong><br>
          A = P × (1 + r / n)^(n × t)
        </div>
      `
    },
    {
      id: "amortization-prepayment-guide",
      title: "贷款等额本息摊销数学：提前还款如何大幅节省利息",
      category: "finance",
      readTime: "6 分钟阅读",
      summary: "深度剖析贷款前期利息占比高的本质，以及提前偿还本金缩短年限的有效策略。",
      content: `
        <h3>1. 贷款等额本息的结构</h3>
        <p>贷款前期本金余额最高，因此月供中绝大部分是利息。任何提前还款均直接冲抵本金，立即降低未来所有月份的利息。</p>
      `
    }
  ],

  ar: [
    {
      id: "compound-wealth-guide",
      title: "القوة الرياضية للفائدة المركبة وبناء الثروة بالاستثمار الدوري",
      category: "finance",
      readTime: "5 دقائق قراءة",
      summary: "اكتشف كيف تحول الاستثمارات الدورية البسيطة إلى ثروة متسارعة بفضل الفائدة المركبة بمرور الوقت.",
      content: `
        <h3>1. ما هي الفائدة المركبة؟</h3>
        <p>تولد الفائدة المركبة أرباحاً إضافية على الأرباح المحققة سابقاً، مما يجعل مسار النمو يتسارع بشكل هائل مع مرور السنوات.</p>
      `
    }
  ]
};

export function getKnowledgeArticles() {
  const lang = getLanguage();
  const list = localizedArticles[lang] || localizedArticles.en;
  return (list && list.length > 0) ? list : localizedArticles.en;
}
