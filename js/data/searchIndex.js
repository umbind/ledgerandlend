/**
 * Essential Calculators Hub - Enhanced Search & Keyword Index
 * Maps synonyms, user intent, search tags, and localized search phrases
 */

export const searchSynonyms = {
  "pregnancy-due-date": [
    "pregnancy", "due date", "edd", "gestational age", "conception date", "baby due date", "trimester",
    "ultrasound", "naegele", "embarazo", "grossesse", "schwangerschaft", "गर्भावस्था", "妊娠", "gravidez", "怀孕", "حمل"
  ],
  "body-surface-area": [
    "bsa", "body surface area", "mosteller", "dubois", "haycock", "chemotherapy dosing", "oncology",
    "superficie corporal", "surface corporelle", "körperoberfläche", "शरीर की सतह का क्षेत्रफल", "体表面積", "superfície corporal", "体表面积", "مساحة سطح الجسم"
  ],
  "mean-arterial-pressure": [
    "map", "mean arterial pressure", "blood pressure", "pulse pressure", "perfusion", "hemodynamics",
    "organ perfusion", "presión arterial media", "pression artérielle moyenne", "mittlerer arterieller druck", "माध्य धमनी दाब", "平均動脈圧", "pressão arterial média", "平均动脉压", "متوسط الضغط الشرياني"
  ],
  "dosage-calculator": [
    "dosage", "medication dose", "pediatric dose", "mg/kg", "liquid medicine", "suspension", "drug dose",
    "dosis", "posologie", "dosierung", "दवा की खुराक", "投薬量", "dosagem", "药物剂量", "جرعة الدواء"
  ],
  "egfr-kidney": [
    "egfr", "kidney function", "ckd", "glomerular filtration", "serum creatinine", "ckd-epi",
    "renal function", "kidney failure", "función renal", "fonction rénale", "nierenfunktion", "गुर्दे का कार्य", "腎機能", "função renal", "肾功能", "وظائف الكلى"
  ],

  emi: [
    "loan", "emi", "mortgage", "car loan", "auto loan", "personal loan", "amortization",
    "installment", "interest rate", "borrowing", "debt", "bank loan", "repayment", "préstamo",
    "emprunt", "kredit", "ऋण", "कर्ज", "ローン", "financiamento", "贷款", "قرض"
  ],
  sip: [
    "sip", "mutual fund", "compound interest", "investment", "wealth", "future value",
    "stock market", "401k", "roth ira", "recurring deposit", "rd", "returns", "compounding",
    "inversión", "épargne", "sparplan", "निवेश", "एसआईपी", "積立", "定投", "استثمار"
  ],
  mortgage: [
    "mortgage", "home loan", "house loan", "property tax", "pmi", "down payment",
    "hoa fees", "home purchase", "real estate", "hipoteca", "immobilier", "baufinanzierung",
    "होम लोन", "住宅ローン", "financiamento imobiliário", "房贷", "رهن عقاري"
  ],
  "tax-discount": [
    "discount", "tax", "sales tax", "gst", "vat", "coupon", "reverse tax", "black friday",
    "sale price", "impuesto", "descuento", "tva", "rabatt", "mwst", "छूट", "जीएसटी",
    "税金", "割引", "desconto", "imposto", "打折", "税费", "خصم", "ضريبة"
  ],
  "tip-split": [
    "tip", "bill split", "gratuity", "restaurant bill", "dining", "split check", "propina",
    "pourboire", "trinkgeld", "टिप", "チップ", "gorjeta", "小费", "بقشيش"
  ],
  bmi: [
    "bmi", "body mass index", "weight", "height", "ideal weight", "underweight", "overweight",
    "obesity", "healthy weight", "imc", "peso", "altura", "körpergewicht", "बीएमआई", "वजन",
    "適正体重", "índice de massa corporal", "身体质量指数", "مؤشر كتلة الجسم"
  ],
  "ideal-weight": [
    "ideal weight", "ideal body weight", "ibw", "devine formula", "robinson formula",
    "miller formula", "hamwi formula", "target weight", "peso ideal", "poids idéal",
    "idealgewicht", "आदर्श वजन", "標準体重", "peso ideal", "标准体重", "الوزن المثالي"
  ],
  "waist-hip": [
    "waist to hip", "whr", "whtr", "waist to height", "body shape", "apple shape", "pear shape",
    "visceral fat", "abdominal obesity", "cintura cadera", "tour de taille", "taillenumfang",
    "कमर और कूल्हे का अनुपात", "ウエストヒップ比", "relação cintura quadril", "腰臀比", "نسبة الخصر إلى الورك"
  ],
  "target-heart-rate": [
    "heart rate", "target heart rate", "thr", "cardio", "fat burn zone", "pulse", "bpm",
    "aerobic", "anaerobic", "vo2 max", "karvonen", "tanaka", "frecuencia cardíaca",
    "fréquence cardiaque", "herzfrequenz", "हृदय गति", "目標心拍数", "frequência cardíaca", "目标心率", "معدل ضربات القلب"
  ],
  "macro-calculator": [
    "macros", "macronutrient", "protein", "carbs", "fats", "diet split", "keto", "bulking",
    "cutting", "meal prep", "macronutrientes", "protéines", "glucides", "lipides",
    "मैक्रोज़", "マクロ栄養素", "macronutrientes", "三大营养素", "المغذيات الكبرى"
  ],
  "calorie-tdee": [
    "calorie", "tdee", "bmr", "diet", "weight loss", "macros", "protein", "carbs", "fats",
    "metabolism", "maintenance calories", "deficit", "bulking", "cutting", "calorías",
    "calories", "kalorien", "कैलोरी", "カロリー", "热量", "سعرات حرارية"
  ],
  "body-fat": [
    "body fat", "fat percentage", "navy method", "lean mass", "fat mass", "tape measurement",
    "porcentaje de grasa", "masse grasse", "körperfett", "शरीर की चर्बी", "体脂肪率", "gordura corporal", "体脂率", "نسبة الدهون"
  ],
  "water-intake": [
    "water", "hydration", "daily water", "drink water", "fluid intake", "glasses of water",
    "agua", "eau", "wasser", "पानी", "水分補給", "água", "饮水量", "شرب الماء"
  ],
  scientific: [
    "scientific calculator", "calculator", "math", "trig", "sin", "cos", "tan", "log", "sqrt",
    "powers", "algebra", "calculadora científica", "calculatrice", "taschenrechner", "कैलकुलेटर", "関数電卓", "科学计算器", "آلة حاسبة علمية"
  ],
  percentage: [
    "percentage", "percent", "percentage change", "percentage increase", "percentage decrease",
    "markup", "margin", "porcentaje", "pourcentage", "prozent", "प्रतिशत", "パーセント", "porcentagem", "百分比", "نسبة مئوية"
  ],
  "unit-converter": [
    "unit converter", "convert", "length", "weight", "kg to lbs", "cm to inches", "miles to km",
    "celsius to fahrenheit", "temperature", "speed", "digital storage", "area", "volume",
    "conversor de unidades", "convertisseur d'unités", "einheitenrechner", "इकाई परिवर्तक", "単位変換", "单位换算", "محول وحدات"
  ],
  "age-date": [
    "age", "date difference", "birthday", "how old am i", "zodiac", "birth date", "edad",
    "âge", "alter", "उम्र", "आयु", "年齢", "idade", "年龄", "العمر"
  ],
  "fuel-cost": [
    "fuel cost", "gas cost", "trip cost", "mileage", "fuel economy", "road trip", "gasoline",
    "mpg", "km per liter", "combustible", "carburant", "spritkosten", "ईंधन खर्च", "ガソリン代", "combustível", "油耗计算", "تكلفة الوقود"
  ],
  "time-duration": [
    "time duration", "hours", "minutes", "shift hours", "work hours", "time difference",
    "clock arithmetic", "duración", "temps", "zeitrechner", "समय", "時間計算", "tempo", "工时计算", "حساب الوقت"
  ]
};
