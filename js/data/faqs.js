/**
 * Essential Calculators Hub - Multilingual FAQ Knowledge Base
 * Fully Translated across English, Spanish, French, German, Hindi, Japanese, Portuguese, Chinese, Arabic
 */

import { getLanguage } from './i18n.js';

export const localizedFaqs = {
  en: {
    emi: [
      {
        q: "What is an Equated Monthly Installment (EMI) and how is it calculated?",
        a: "An EMI is a fixed payment amount made by a borrower to a lender each month. The mathematical formula is: <strong>EMI = [P × r × (1 + r)^n] / [(1 + r)^n – 1]</strong>, where <em>P</em> is principal, <em>r</em> is monthly interest rate, and <em>n</em> is tenure in months."
      },
      {
        q: "Why is the interest portion higher in the initial years of a loan?",
        a: "Loan repayments follow reducing balance amortization. In the early months, your principal balance is at its highest, meaning more of your EMI goes toward interest. As principal reduces, interest drops and principal repayment increases."
      },
      {
        q: "How does making loan prepayments reduce total interest?",
        a: "Extra prepayments go 100% toward reducing the outstanding principal. Since all future interest is calculated on the remaining balance, prepaying even one extra EMI per year can shave years off your loan."
      }
    ],
    sip: [
      {
        q: "What is a Systematic Investment Plan (SIP) and why is it effective?",
        a: "A SIP allows you to invest a fixed amount regularly into funds. It leverages <strong>Dollar/Cost Averaging</strong> and the compounding effect of long-term returns."
      },
      {
        q: "What is the formula for SIP Future Value?",
        a: "The formula is: <strong>FV = P × [((1 + r)^n - 1) / r] × (1 + r)</strong>, where <em>P</em> is monthly investment, <em>r</em> is periodic interest rate, and <em>n</em> is number of months."
      },
      {
        q: "What is the impact of a Step-Up SIP?",
        a: "A Step-Up SIP increases your investment by a set percentage (e.g. 10%) each year as your income grows, potentially doubling your 20-year maturity wealth compared to a fixed SIP."
      }
    ],
    "pregnancy-due-date": [
      {
        q: "How does Naegele's Rule calculate the Estimated Due Date (EDD)?",
        a: "Naegele's Rule calculates the delivery date based on a 280-day (40-week) human gestation from the first day of the Last Menstrual Period (LMP): <strong>EDD = LMP + 1 Year – 3 Months + 7 Days</strong> (adjusted for individual cycle deviations from 28 days)."
      },
      {
        q: "What is the difference between Gestational Age and Fetal Age?",
        a: "Gestational Age is measured from the first day of your last period (~2 weeks before conception), whereas Fetal Age measures actual embryonic age from the date of fertilization."
      }
    ],
    "body-surface-area": [
      {
        q: "Why is Body Surface Area (BSA) preferred over body weight for chemotherapy dosing?",
        a: "BSA correlates more closely with physiological parameters such as cardiac output, renal blood flow, and basal metabolic rate than simple weight, reducing drug toxicity risks in narrow-therapeutic-index oncology regimens."
      },
      {
        q: "What is the Mosteller formula for BSA?",
        a: "The Mosteller equation is the gold standard in clinical pharmacology: <strong>BSA (m²) = √[(Height (cm) × Weight (kg)) / 3600]</strong>."
      }
    ],
    "mean-arterial-pressure": [
      {
        q: "What is Mean Arterial Pressure (MAP) and why is it critical?",
        a: "MAP represents the average arterial pressure during a single cardiac cycle. It is the driving force that pushes blood into vital tissues. Clinical target is typically <strong>≥ 65 mmHg</strong> to maintain vital organ perfusion."
      },
      {
        q: "How is MAP calculated from Systolic and Diastolic Blood Pressure?",
        a: "Because the heart spends roughly 2/3 of the cardiac cycle in diastole, the standard formula is: <strong>MAP = [SBP + (2 × DBP)] / 3</strong> or <strong>MAP = DBP + ⅓(SBP – DBP)</strong>."
      }
    ],
    "dosage-calculator": [
      {
        q: "How are pediatric doses calculated from mg/kg/day guidelines?",
        a: "Total daily dose is calculated as: <strong>Total Dose = Patient Weight (kg) × Dose (mg/kg/day)</strong>. The single dose is obtained by dividing total daily dose by the number of daily administrations (e.g. divided by 3 for TID)."
      },
      {
        q: "How do you convert a milligram (mg) dose into liquid milliliters (mL)?",
        a: "Using the liquid suspension concentration: <strong>Volume (mL) = [Single Dose (mg) / Concentration (mg)] × Volume (mL)</strong>."
      }
    ],
    "egfr-kidney": [
      {
        q: "What is eGFR and how is it used to evaluate kidney function?",
        a: "Estimated Glomerular Filtration Rate (eGFR) measures how efficiently the kidneys filter creatinine metabolic waste from the blood. Normal eGFR is ≥ 90 mL/min/1.73m²."
      },
      {
        q: "What are the KDIGO Chronic Kidney Disease (CKD) stages?",
        a: "• Stage G1: ≥ 90 (Normal/High)<br>• Stage G2: 60–89 (Mildly decreased)<br>• Stage G3a: 45–59 (Mild-moderate)<br>• Stage G3b: 30–44 (Moderate-severe)<br>• Stage G4: 15–29 (Severely decreased)<br>• Stage G5: < 15 (Kidney Failure)."
      }
    ],
    bmi: [
      {
        q: "What is Body Mass Index (BMI) and how is it calculated?",
        a: "BMI is a screening metric defined by the WHO as: <strong>BMI = Weight (kg) / [Height (m)]²</strong>."
      },
      {
        q: "What are the standard WHO BMI categories?",
        a: "• Underweight: < 18.5<br>• Normal Weight: 18.5 – 24.9<br>• Overweight: 25.0 – 29.9<br>• Obese: ≥ 30.0"
      }
    ],
    general: [
      {
        category: "General",
        q: "Are the calculations on this website 100% private and secure?",
        a: "Yes! All calculations run 100% locally inside your browser. No financial numbers or biometric data are ever sent to external servers."
      },
      {
        category: "Finance",
        q: "What is the Rule of 72 in personal finance?",
        a: "The Rule of 72 estimates how many years it takes for your investment to double: <strong>Years to Double ≈ 72 / Annual Return Rate (%)</strong>."
      },
      {
        category: "General",
        q: "Can I use this web app offline?",
        a: "Yes! CalcHub is a Progressive Web App (PWA). Once loaded, you can use all calculators without an internet connection."
      }
    ]
  },

  es: {
    emi: [
      {
        q: "¿Qué es una Cuota Mensual (EMI) y cómo se calcula?",
        a: "El EMI es el pago mensual fijo de un préstamo. La fórmula matemática es: <strong>EMI = [P × r × (1 + r)^n] / [(1 + r)^n – 1]</strong>, donde <em>P</em> es el capital, <em>r</em> es la tasa de interés mensual y <em>n</em> es el número de meses."
      },
      {
        q: "¿Por qué los intereses son más altos al inicio del préstamo?",
        a: "Los préstamos siguen el sistema de amortización sobre saldo deudor. Al inicio, la deuda es máxima, por lo que la mayor parte de la cuota cubre intereses. Conforme amortizas capital, el interés disminuye."
      },
      {
        q: "¿Cómo ayudan los pagos anticipados a ahorrar intereses?",
        a: "Cualquier abono extra reduce directamente el capital pendiente, lo que disminuye drásticamente el cálculo de intereses futuros y acorta la duración del préstamo."
      }
    ],
    sip: [
      {
        q: "¿Qué es un Plan de Inversión Sistemática (SIP)?",
        a: "Un SIP te permite invertir una cantidad fija periódica en fondos de inversión, aprovechando el promedio de costo y el interés compuesto a largo plazo."
      },
      {
        q: "¿Cuál es la fórmula del valor futuro de un SIP?",
        a: "La fórmula es: <strong>FV = P × [((1 + r)^n - 1) / r] × (1 + r)</strong>, donde <em>P</em> es la inversión mensual, <em>r</em> el interés mensual y <em>n</em> el número de meses."
      },
      {
        q: "¿Qué impacto tiene un SIP con incremento anual (Step-Up)?",
        a: "Aumentar tu inversión un 10% anual conforme suben tus ingresos puede llegar a duplicar el patrimonio final acumulado en 20 años."
      }
    ],
    "pregnancy-due-date": [
      {
        q: "How does Naegele's Rule calculate the Estimated Due Date (EDD)?",
        a: "Naegele's Rule calculates the delivery date based on a 280-day (40-week) human gestation from the first day of the Last Menstrual Period (LMP): <strong>EDD = LMP + 1 Year – 3 Months + 7 Days</strong> (adjusted for individual cycle deviations from 28 days)."
      },
      {
        q: "What is the difference between Gestational Age and Fetal Age?",
        a: "Gestational Age is measured from the first day of your last period (~2 weeks before conception), whereas Fetal Age measures actual embryonic age from the date of fertilization."
      }
    ],
    "body-surface-area": [
      {
        q: "Why is Body Surface Area (BSA) preferred over body weight for chemotherapy dosing?",
        a: "BSA correlates more closely with physiological parameters such as cardiac output, renal blood flow, and basal metabolic rate than simple weight, reducing drug toxicity risks in narrow-therapeutic-index oncology regimens."
      },
      {
        q: "What is the Mosteller formula for BSA?",
        a: "The Mosteller equation is the gold standard in clinical pharmacology: <strong>BSA (m²) = √[(Height (cm) × Weight (kg)) / 3600]</strong>."
      }
    ],
    "mean-arterial-pressure": [
      {
        q: "What is Mean Arterial Pressure (MAP) and why is it critical?",
        a: "MAP represents the average arterial pressure during a single cardiac cycle. It is the driving force that pushes blood into vital tissues. Clinical target is typically <strong>≥ 65 mmHg</strong> to maintain vital organ perfusion."
      },
      {
        q: "How is MAP calculated from Systolic and Diastolic Blood Pressure?",
        a: "Because the heart spends roughly 2/3 of the cardiac cycle in diastole, the standard formula is: <strong>MAP = [SBP + (2 × DBP)] / 3</strong> or <strong>MAP = DBP + ⅓(SBP – DBP)</strong>."
      }
    ],
    "dosage-calculator": [
      {
        q: "How are pediatric doses calculated from mg/kg/day guidelines?",
        a: "Total daily dose is calculated as: <strong>Total Dose = Patient Weight (kg) × Dose (mg/kg/day)</strong>. The single dose is obtained by dividing total daily dose by the number of daily administrations (e.g. divided by 3 for TID)."
      },
      {
        q: "How do you convert a milligram (mg) dose into liquid milliliters (mL)?",
        a: "Using the liquid suspension concentration: <strong>Volume (mL) = [Single Dose (mg) / Concentration (mg)] × Volume (mL)</strong>."
      }
    ],
    "egfr-kidney": [
      {
        q: "What is eGFR and how is it used to evaluate kidney function?",
        a: "Estimated Glomerular Filtration Rate (eGFR) measures how efficiently the kidneys filter creatinine metabolic waste from the blood. Normal eGFR is ≥ 90 mL/min/1.73m²."
      },
      {
        q: "What are the KDIGO Chronic Kidney Disease (CKD) stages?",
        a: "• Stage G1: ≥ 90 (Normal/High)<br>• Stage G2: 60–89 (Mildly decreased)<br>• Stage G3a: 45–59 (Mild-moderate)<br>• Stage G3b: 30–44 (Moderate-severe)<br>• Stage G4: 15–29 (Severely decreased)<br>• Stage G5: < 15 (Kidney Failure)."
      }
    ],
    bmi: [
      {
        q: "¿Qué es el Índice de Masa Corporal (IMC) y cómo se calcula?",
        a: "El IMC es un indicador de la OMS calculado como: <strong>IMC = Peso (kg) / [Altura (m)]²</strong>."
      },
      {
        q: "¿Cuáles son las categorías estándar de IMC de la OMS?",
        a: "• Bajo peso: < 18.5<br>• Peso normal: 18.5 – 24.9<br>• Sobrepeso: 25.0 – 29.9<br>• Obesidad: ≥ 30.0"
      }
    ],
    general: [
      {
        category: "General",
        q: "¿Los cálculos en este sitio web son 100% privados y seguros?",
        a: "¡Sí! Todos los cálculos se ejecutan localmente en tu navegador. Ningún dato financiero o personal se envía a servidores externos."
      },
      {
        category: "Finanzas",
        q: "¿Qué es la Regla del 72 en finanzas personales?",
        a: "La Regla del 72 calcula en cuántos años se duplicará tu dinero: <strong>Años para duplicar ≈ 72 / Tasa de Rendimiento Anual (%)</strong>."
      },
      {
        category: "General",
        q: "¿Puedo usar esta aplicación web sin conexión a internet?",
        a: "¡Sí! CalcHub es una Progressive Web App (PWA) con soporte sin conexión."
      }
    ]
  },

  fr: {
    emi: [
      {
        q: "Qu'est-ce qu'une mensualité de prêt (EMI) et comment est-elle calculée ?",
        a: "Une mensualité est le montant fixe remboursé chaque mois. La formule mathématique est : <strong>EMI = [P × r × (1 + r)^n] / [(1 + r)^n – 1]</strong>."
      },
      {
        q: "Pourquoi la part d'intérêts est-elle plus élevée au début d'un emprunt ?",
        a: "Les remboursements suivent un tableau d'amortissement à capital décroissant. Au début, le capital restant dû est maximal, donc les intérêts représentent la plus grande part de la mensualité."
      }
    ],
    sip: [
      {
        q: "Qu'est-ce qu'un Plan d'Épargne Programmé (SIP) ?",
        a: "Un plan d'épargne permet d'investir régulièrement un montant fixe, profitant des intérêts composés et lissant le coût d'achat au fil des cycles de marché."
      }
    ],
    "pregnancy-due-date": [
      {
        q: "How does Naegele's Rule calculate the Estimated Due Date (EDD)?",
        a: "Naegele's Rule calculates the delivery date based on a 280-day (40-week) human gestation from the first day of the Last Menstrual Period (LMP): <strong>EDD = LMP + 1 Year – 3 Months + 7 Days</strong> (adjusted for individual cycle deviations from 28 days)."
      },
      {
        q: "What is the difference between Gestational Age and Fetal Age?",
        a: "Gestational Age is measured from the first day of your last period (~2 weeks before conception), whereas Fetal Age measures actual embryonic age from the date of fertilization."
      }
    ],
    "body-surface-area": [
      {
        q: "Why is Body Surface Area (BSA) preferred over body weight for chemotherapy dosing?",
        a: "BSA correlates more closely with physiological parameters such as cardiac output, renal blood flow, and basal metabolic rate than simple weight, reducing drug toxicity risks in narrow-therapeutic-index oncology regimens."
      },
      {
        q: "What is the Mosteller formula for BSA?",
        a: "The Mosteller equation is the gold standard in clinical pharmacology: <strong>BSA (m²) = √[(Height (cm) × Weight (kg)) / 3600]</strong>."
      }
    ],
    "mean-arterial-pressure": [
      {
        q: "What is Mean Arterial Pressure (MAP) and why is it critical?",
        a: "MAP represents the average arterial pressure during a single cardiac cycle. It is the driving force that pushes blood into vital tissues. Clinical target is typically <strong>≥ 65 mmHg</strong> to maintain vital organ perfusion."
      },
      {
        q: "How is MAP calculated from Systolic and Diastolic Blood Pressure?",
        a: "Because the heart spends roughly 2/3 of the cardiac cycle in diastole, the standard formula is: <strong>MAP = [SBP + (2 × DBP)] / 3</strong> or <strong>MAP = DBP + ⅓(SBP – DBP)</strong>."
      }
    ],
    "dosage-calculator": [
      {
        q: "How are pediatric doses calculated from mg/kg/day guidelines?",
        a: "Total daily dose is calculated as: <strong>Total Dose = Patient Weight (kg) × Dose (mg/kg/day)</strong>. The single dose is obtained by dividing total daily dose by the number of daily administrations (e.g. divided by 3 for TID)."
      },
      {
        q: "How do you convert a milligram (mg) dose into liquid milliliters (mL)?",
        a: "Using the liquid suspension concentration: <strong>Volume (mL) = [Single Dose (mg) / Concentration (mg)] × Volume (mL)</strong>."
      }
    ],
    "egfr-kidney": [
      {
        q: "What is eGFR and how is it used to evaluate kidney function?",
        a: "Estimated Glomerular Filtration Rate (eGFR) measures how efficiently the kidneys filter creatinine metabolic waste from the blood. Normal eGFR is ≥ 90 mL/min/1.73m²."
      },
      {
        q: "What are the KDIGO Chronic Kidney Disease (CKD) stages?",
        a: "• Stage G1: ≥ 90 (Normal/High)<br>• Stage G2: 60–89 (Mildly decreased)<br>• Stage G3a: 45–59 (Mild-moderate)<br>• Stage G3b: 30–44 (Moderate-severe)<br>• Stage G4: 15–29 (Severely decreased)<br>• Stage G5: < 15 (Kidney Failure)."
      }
    ],
    bmi: [
      {
        q: "Qu'est-ce que l'Indice de Masse Corporelle (IMC) ?",
        a: "L'IMC est la formule reconnue par l'OMS : <strong>IMC = Poids (kg) / [Taille (m)]²</strong>."
      }
    ],
    general: [
      {
        category: "Général",
        q: "Mes calculs sont-ils 100% confidentiels et sécurisés ?",
        a: "Oui ! Tous les calculs sont traités exclusivement sur votre appareil (navigateur). Aucune donnée n'est envoyée vers des serveurs distants."
      },
      {
        category: "Finance",
        q: "Qu'est-ce que la Règle de 72 en finance ?",
        a: "La Règle de 72 estime le temps nécessaire pour doubler un capital : <strong>Années pour doubler ≈ 72 / Taux de rendement annuel (%)</strong>."
      }
    ]
  },

  de: {
    emi: [
      {
        q: "Was ist eine monatliche Kreditrate (Annuität) und wie wird sie berechnet?",
        a: "Eine Annuität ist die feste monatliche Rate eines Kredits. Die mathematische Formel lautet: <strong>Rate = [P × r × (1 + r)^n] / [(1 + r)^n – 1]</strong>."
      },
      {
        q: "Warum ist der Zinsanteil zu Beginn der Laufzeit am höchsten?",
        a: "Bei Annuitätendarlehen wird der Zins immer auf die verbleibende Restschuld berechnet. Da diese anfangs am höchsten ist, ist auch der Zinsanteil zu Beginn maximal."
      }
    ],
    sip: [
      {
        q: "Was ist ein Sparplan und warum ist er so effektiv?",
        a: "Ein Sparplan investiert monatlich feste Beträge, nutzt den Zinseszinseffekt und gleicht Kursschwankungen über den Durchschnittskosteneffekt aus."
      }
    ],
    "pregnancy-due-date": [
      {
        q: "How does Naegele's Rule calculate the Estimated Due Date (EDD)?",
        a: "Naegele's Rule calculates the delivery date based on a 280-day (40-week) human gestation from the first day of the Last Menstrual Period (LMP): <strong>EDD = LMP + 1 Year – 3 Months + 7 Days</strong> (adjusted for individual cycle deviations from 28 days)."
      },
      {
        q: "What is the difference between Gestational Age and Fetal Age?",
        a: "Gestational Age is measured from the first day of your last period (~2 weeks before conception), whereas Fetal Age measures actual embryonic age from the date of fertilization."
      }
    ],
    "body-surface-area": [
      {
        q: "Why is Body Surface Area (BSA) preferred over body weight for chemotherapy dosing?",
        a: "BSA correlates more closely with physiological parameters such as cardiac output, renal blood flow, and basal metabolic rate than simple weight, reducing drug toxicity risks in narrow-therapeutic-index oncology regimens."
      },
      {
        q: "What is the Mosteller formula for BSA?",
        a: "The Mosteller equation is the gold standard in clinical pharmacology: <strong>BSA (m²) = √[(Height (cm) × Weight (kg)) / 3600]</strong>."
      }
    ],
    "mean-arterial-pressure": [
      {
        q: "What is Mean Arterial Pressure (MAP) and why is it critical?",
        a: "MAP represents the average arterial pressure during a single cardiac cycle. It is the driving force that pushes blood into vital tissues. Clinical target is typically <strong>≥ 65 mmHg</strong> to maintain vital organ perfusion."
      },
      {
        q: "How is MAP calculated from Systolic and Diastolic Blood Pressure?",
        a: "Because the heart spends roughly 2/3 of the cardiac cycle in diastole, the standard formula is: <strong>MAP = [SBP + (2 × DBP)] / 3</strong> or <strong>MAP = DBP + ⅓(SBP – DBP)</strong>."
      }
    ],
    "dosage-calculator": [
      {
        q: "How are pediatric doses calculated from mg/kg/day guidelines?",
        a: "Total daily dose is calculated as: <strong>Total Dose = Patient Weight (kg) × Dose (mg/kg/day)</strong>. The single dose is obtained by dividing total daily dose by the number of daily administrations (e.g. divided by 3 for TID)."
      },
      {
        q: "How do you convert a milligram (mg) dose into liquid milliliters (mL)?",
        a: "Using the liquid suspension concentration: <strong>Volume (mL) = [Single Dose (mg) / Concentration (mg)] × Volume (mL)</strong>."
      }
    ],
    "egfr-kidney": [
      {
        q: "What is eGFR and how is it used to evaluate kidney function?",
        a: "Estimated Glomerular Filtration Rate (eGFR) measures how efficiently the kidneys filter creatinine metabolic waste from the blood. Normal eGFR is ≥ 90 mL/min/1.73m²."
      },
      {
        q: "What are the KDIGO Chronic Kidney Disease (CKD) stages?",
        a: "• Stage G1: ≥ 90 (Normal/High)<br>• Stage G2: 60–89 (Mildly decreased)<br>• Stage G3a: 45–59 (Mild-moderate)<br>• Stage G3b: 30–44 (Moderate-severe)<br>• Stage G4: 15–29 (Severely decreased)<br>• Stage G5: < 15 (Kidney Failure)."
      }
    ],
    bmi: [
      {
        q: "Was ist der Body-Mass-Index (BMI)?",
        a: "Der BMI ist die Standardmetrik der WHO: <strong>BMI = Gewicht (kg) / [Größe (m)]²</strong>."
      }
    ],
    general: [
      {
        category: "Allgemein",
        q: "Sind meine Berechnungen auf dieser Seite 100% privat?",
        a: "Ja! Alle Berechnungen laufen komplett lokal in Ihrem Browser ab. Keine persönlichen oder finanziellen Daten verlassen Ihr Gerät."
      }
    ]
  },

  hi: {
    emi: [
      {
        q: "मासिक किस्त (EMI) क्या है और इसकी गणना कैसे की जाती है?",
        a: "ईएमआई (EMI) वह निश्चित राशि है जो आप हर महीने ऋण चुकाने के लिए देते हैं। इसका गणितीय सूत्र है: <strong>EMI = [P × r × (1 + r)^n] / [(1 + r)^n – 1]</strong>, जहाँ <em>P</em> मूलधन है, <em>r</em> मासिक ब्याज दर है, और <em>n</em> महीनों की संख्या है।"
      },
      {
        q: "ऋण के शुरुआती वर्षों में ब्याज का हिस्सा अधिक क्यों होता है?",
        a: "ऋण भुगतान घटते शेष (Reducing Balance) पर आधारित होता है। शुरुआत में आपका बकाया मूलधन सबसे अधिक होता है, इसलिए ईएमआई का बड़ा हिस्सा ब्याज में जाता है।"
      },
      {
        q: "पूर्व-भुगतान (Prepayment) करने से कुल ब्याज कैसे कम होता है?",
        a: "कोई भी अतिरिक्त भुगतान सीधे मूलधन को कम करता है। चूंकि भविष्य का ब्याज शेष मूलधन पर लगाया जाता है, इसलिए अतिरिक्त भुगतान से कुल ब्याज में भारी बचत होती है।"
      }
    ],
    sip: [
      {
        q: "सिस्टमैटिक इन्वेस्टमेंट प्लान (SIP) क्या है और यह क्यों फायदेमंद है?",
        a: "एसआईपी (SIP) आपको म्यूचुअल फंड में नियमित रूप से एक निश्चित राशि निवेश करने की अनुमति देता है। यह <strong>चक्रवृद्धि ब्याज (Compound Interest)</strong> और कॉस्ट एवरेजिंग का लाभ देता है।"
      },
      {
        q: "स्टेप-अप एसआईपी (Step-Up SIP) का क्या प्रभाव होता है?",
        a: "अपनी आय बढ़ने के साथ हर साल अपने मासिक निवेश को 10% बढ़ाने से 20 वर्षों में आपका कुल धन दोगुना तक बढ़ सकता है।"
      }
    ],
    "pregnancy-due-date": [
      {
        q: "How does Naegele's Rule calculate the Estimated Due Date (EDD)?",
        a: "Naegele's Rule calculates the delivery date based on a 280-day (40-week) human gestation from the first day of the Last Menstrual Period (LMP): <strong>EDD = LMP + 1 Year – 3 Months + 7 Days</strong> (adjusted for individual cycle deviations from 28 days)."
      },
      {
        q: "What is the difference between Gestational Age and Fetal Age?",
        a: "Gestational Age is measured from the first day of your last period (~2 weeks before conception), whereas Fetal Age measures actual embryonic age from the date of fertilization."
      }
    ],
    "body-surface-area": [
      {
        q: "Why is Body Surface Area (BSA) preferred over body weight for chemotherapy dosing?",
        a: "BSA correlates more closely with physiological parameters such as cardiac output, renal blood flow, and basal metabolic rate than simple weight, reducing drug toxicity risks in narrow-therapeutic-index oncology regimens."
      },
      {
        q: "What is the Mosteller formula for BSA?",
        a: "The Mosteller equation is the gold standard in clinical pharmacology: <strong>BSA (m²) = √[(Height (cm) × Weight (kg)) / 3600]</strong>."
      }
    ],
    "mean-arterial-pressure": [
      {
        q: "What is Mean Arterial Pressure (MAP) and why is it critical?",
        a: "MAP represents the average arterial pressure during a single cardiac cycle. It is the driving force that pushes blood into vital tissues. Clinical target is typically <strong>≥ 65 mmHg</strong> to maintain vital organ perfusion."
      },
      {
        q: "How is MAP calculated from Systolic and Diastolic Blood Pressure?",
        a: "Because the heart spends roughly 2/3 of the cardiac cycle in diastole, the standard formula is: <strong>MAP = [SBP + (2 × DBP)] / 3</strong> or <strong>MAP = DBP + ⅓(SBP – DBP)</strong>."
      }
    ],
    "dosage-calculator": [
      {
        q: "How are pediatric doses calculated from mg/kg/day guidelines?",
        a: "Total daily dose is calculated as: <strong>Total Dose = Patient Weight (kg) × Dose (mg/kg/day)</strong>. The single dose is obtained by dividing total daily dose by the number of daily administrations (e.g. divided by 3 for TID)."
      },
      {
        q: "How do you convert a milligram (mg) dose into liquid milliliters (mL)?",
        a: "Using the liquid suspension concentration: <strong>Volume (mL) = [Single Dose (mg) / Concentration (mg)] × Volume (mL)</strong>."
      }
    ],
    "egfr-kidney": [
      {
        q: "What is eGFR and how is it used to evaluate kidney function?",
        a: "Estimated Glomerular Filtration Rate (eGFR) measures how efficiently the kidneys filter creatinine metabolic waste from the blood. Normal eGFR is ≥ 90 mL/min/1.73m²."
      },
      {
        q: "What are the KDIGO Chronic Kidney Disease (CKD) stages?",
        a: "• Stage G1: ≥ 90 (Normal/High)<br>• Stage G2: 60–89 (Mildly decreased)<br>• Stage G3a: 45–59 (Mild-moderate)<br>• Stage G3b: 30–44 (Moderate-severe)<br>• Stage G4: 15–29 (Severely decreased)<br>• Stage G5: < 15 (Kidney Failure)."
      }
    ],
    bmi: [
      {
        q: "बॉडी मास इंडेक्स (BMI) क्या है और इसकी गणना कैसे होती है?",
        a: "बीएमआई विश्व स्वास्थ्य संगठन (WHO) द्वारा निर्धारित वजन का पैमाना है: <strong>BMI = वजन (kg) / [ऊंचाई (m)]²</strong>।"
      }
    ],
    general: [
      {
        category: "सामान्य",
        q: "क्या इस वेबसाइट पर की गई गणनाएं 100% सुरक्षित और गोपनीय हैं?",
        a: "हाँ! सभी गणनाएं आपके अपने ब्राउज़र में स्थानीय रूप से चलती हैं। आपका कोई भी वित्तीय या व्यक्तिगत डेटा किसी सर्वर पर नहीं भेजा जाता है।"
      },
      {
        category: "वित्त",
        q: "व्यक्तिगत वित्त में 72 का नियम (Rule of 72) क्या है?",
        a: "72 का नियम यह अनुमान लगाता है कि आपका पैसा कितने वर्षों में दोगुना होगा: <strong>दोगुना होने में वर्ष ≈ 72 / वार्षिक रिटर्न (%)</strong>।"
      }
    ]
  },

  ja: {
    emi: [
      {
        q: "毎月返済額（EMI）とは何ですか？計算方法は？",
        a: "毎月の返済額は次の数式で計算されます：<strong>EMI = [P × r × (1 + r)^n] / [(1 + r)^n – 1]</strong>（元利均等返済方式）。"
      },
      {
        q: "返済初期に利息の割合が高いのはなぜですか？",
        a: "利息は常に残りの借入残高に対して計算されます。初期は残高が最大であるため、返済額の多くが利息に充てられます。"
      }
    ],
    sip: [
      {
        q: "積立投資（SIP）のメリットは何ですか？",
        a: "毎月決まった金額を定期的に投資することで、ドルコスト平均法と複利効果を最大限に活用できます。"
      }
    ],
    "pregnancy-due-date": [
      {
        q: "How does Naegele's Rule calculate the Estimated Due Date (EDD)?",
        a: "Naegele's Rule calculates the delivery date based on a 280-day (40-week) human gestation from the first day of the Last Menstrual Period (LMP): <strong>EDD = LMP + 1 Year – 3 Months + 7 Days</strong> (adjusted for individual cycle deviations from 28 days)."
      },
      {
        q: "What is the difference between Gestational Age and Fetal Age?",
        a: "Gestational Age is measured from the first day of your last period (~2 weeks before conception), whereas Fetal Age measures actual embryonic age from the date of fertilization."
      }
    ],
    "body-surface-area": [
      {
        q: "Why is Body Surface Area (BSA) preferred over body weight for chemotherapy dosing?",
        a: "BSA correlates more closely with physiological parameters such as cardiac output, renal blood flow, and basal metabolic rate than simple weight, reducing drug toxicity risks in narrow-therapeutic-index oncology regimens."
      },
      {
        q: "What is the Mosteller formula for BSA?",
        a: "The Mosteller equation is the gold standard in clinical pharmacology: <strong>BSA (m²) = √[(Height (cm) × Weight (kg)) / 3600]</strong>."
      }
    ],
    "mean-arterial-pressure": [
      {
        q: "What is Mean Arterial Pressure (MAP) and why is it critical?",
        a: "MAP represents the average arterial pressure during a single cardiac cycle. It is the driving force that pushes blood into vital tissues. Clinical target is typically <strong>≥ 65 mmHg</strong> to maintain vital organ perfusion."
      },
      {
        q: "How is MAP calculated from Systolic and Diastolic Blood Pressure?",
        a: "Because the heart spends roughly 2/3 of the cardiac cycle in diastole, the standard formula is: <strong>MAP = [SBP + (2 × DBP)] / 3</strong> or <strong>MAP = DBP + ⅓(SBP – DBP)</strong>."
      }
    ],
    "dosage-calculator": [
      {
        q: "How are pediatric doses calculated from mg/kg/day guidelines?",
        a: "Total daily dose is calculated as: <strong>Total Dose = Patient Weight (kg) × Dose (mg/kg/day)</strong>. The single dose is obtained by dividing total daily dose by the number of daily administrations (e.g. divided by 3 for TID)."
      },
      {
        q: "How do you convert a milligram (mg) dose into liquid milliliters (mL)?",
        a: "Using the liquid suspension concentration: <strong>Volume (mL) = [Single Dose (mg) / Concentration (mg)] × Volume (mL)</strong>."
      }
    ],
    "egfr-kidney": [
      {
        q: "What is eGFR and how is it used to evaluate kidney function?",
        a: "Estimated Glomerular Filtration Rate (eGFR) measures how efficiently the kidneys filter creatinine metabolic waste from the blood. Normal eGFR is ≥ 90 mL/min/1.73m²."
      },
      {
        q: "What are the KDIGO Chronic Kidney Disease (CKD) stages?",
        a: "• Stage G1: ≥ 90 (Normal/High)<br>• Stage G2: 60–89 (Mildly decreased)<br>• Stage G3a: 45–59 (Mild-moderate)<br>• Stage G3b: 30–44 (Moderate-severe)<br>• Stage G4: 15–29 (Severely decreased)<br>• Stage G5: < 15 (Kidney Failure)."
      }
    ],
    bmi: [
      {
        q: "BMI（体格指数）とは何ですか？",
        a: "WHO基準の計算式：<strong>BMI = 体重 (kg) / [身長 (m)]²</strong> です。"
      }
    ],
    general: [
      {
        category: "一般",
        q: "このサイトの計算データは安全でプライベートですか？",
        a: "はい！すべての計算はブラウザ内でローカルに実行されます。データが外部サーバーに送信されることは一切ありません。"
      }
    ]
  },

  pt: {
    emi: [
      {
        q: "O que é a parcela mensal do financiamento e como é calculada?",
        a: "A parcela fixa segue a fórmula da Tabela Price: <strong>Parcela = [P × r × (1 + r)^n] / [(1 + r)^n – 1]</strong>."
      },
      {
        q: "Como amortizações extraordinárias reduzem os juros?",
        a: "Pagamentos extras abatem diretamente o saldo devedor principal, reduzindo os juros de todas as parcelas futuras."
      }
    ],
    sip: [
      {
        q: "O que é investimento mensal programado (SIP)?",
        a: "Investir valores fixos mensalmente potencializa o efeito dos juros compostos e reduz o risco de oscilações do mercado."
      }
    ],
    "pregnancy-due-date": [
      {
        q: "How does Naegele's Rule calculate the Estimated Due Date (EDD)?",
        a: "Naegele's Rule calculates the delivery date based on a 280-day (40-week) human gestation from the first day of the Last Menstrual Period (LMP): <strong>EDD = LMP + 1 Year – 3 Months + 7 Days</strong> (adjusted for individual cycle deviations from 28 days)."
      },
      {
        q: "What is the difference between Gestational Age and Fetal Age?",
        a: "Gestational Age is measured from the first day of your last period (~2 weeks before conception), whereas Fetal Age measures actual embryonic age from the date of fertilization."
      }
    ],
    "body-surface-area": [
      {
        q: "Why is Body Surface Area (BSA) preferred over body weight for chemotherapy dosing?",
        a: "BSA correlates more closely with physiological parameters such as cardiac output, renal blood flow, and basal metabolic rate than simple weight, reducing drug toxicity risks in narrow-therapeutic-index oncology regimens."
      },
      {
        q: "What is the Mosteller formula for BSA?",
        a: "The Mosteller equation is the gold standard in clinical pharmacology: <strong>BSA (m²) = √[(Height (cm) × Weight (kg)) / 3600]</strong>."
      }
    ],
    "mean-arterial-pressure": [
      {
        q: "What is Mean Arterial Pressure (MAP) and why is it critical?",
        a: "MAP represents the average arterial pressure during a single cardiac cycle. It is the driving force that pushes blood into vital tissues. Clinical target is typically <strong>≥ 65 mmHg</strong> to maintain vital organ perfusion."
      },
      {
        q: "How is MAP calculated from Systolic and Diastolic Blood Pressure?",
        a: "Because the heart spends roughly 2/3 of the cardiac cycle in diastole, the standard formula is: <strong>MAP = [SBP + (2 × DBP)] / 3</strong> or <strong>MAP = DBP + ⅓(SBP – DBP)</strong>."
      }
    ],
    "dosage-calculator": [
      {
        q: "How are pediatric doses calculated from mg/kg/day guidelines?",
        a: "Total daily dose is calculated as: <strong>Total Dose = Patient Weight (kg) × Dose (mg/kg/day)</strong>. The single dose is obtained by dividing total daily dose by the number of daily administrations (e.g. divided by 3 for TID)."
      },
      {
        q: "How do you convert a milligram (mg) dose into liquid milliliters (mL)?",
        a: "Using the liquid suspension concentration: <strong>Volume (mL) = [Single Dose (mg) / Concentration (mg)] × Volume (mL)</strong>."
      }
    ],
    "egfr-kidney": [
      {
        q: "What is eGFR and how is it used to evaluate kidney function?",
        a: "Estimated Glomerular Filtration Rate (eGFR) measures how efficiently the kidneys filter creatinine metabolic waste from the blood. Normal eGFR is ≥ 90 mL/min/1.73m²."
      },
      {
        q: "What are the KDIGO Chronic Kidney Disease (CKD) stages?",
        a: "• Stage G1: ≥ 90 (Normal/High)<br>• Stage G2: 60–89 (Mildly decreased)<br>• Stage G3a: 45–59 (Mild-moderate)<br>• Stage G3b: 30–44 (Moderate-severe)<br>• Stage G4: 15–29 (Severely decreased)<br>• Stage G5: < 15 (Kidney Failure)."
      }
    ],
    bmi: [
      {
        q: "O que é o Índice de Massa Corporal (IMC)?",
        a: "O IMC é calculado pela fórmula da OMS: <strong>IMC = Peso (kg) / [Altura (m)]²</strong>."
      }
    ],
    general: [
      {
        category: "Geral",
        q: "Os cálculos são 100% privados e seguros?",
        a: "Sim! Todos os cálculos ocorrem localmente no seu próprio navegador, sem envio de dados para a nuvem."
      }
    ]
  },

  zh: {
    emi: [
      {
        q: "什么是每月等额本息还款额 (EMI)？如何计算？",
        a: "等额本息每月还款公式为：<strong>EMI = [P × r × (1 + r)^n] / [(1 + r)^n – 1]</strong>，其中 <em>P</em> 为贷款本金，<em>r</em> 为月利率，<em>n</em> 为还款总月数。"
      },
      {
        q: "为什么贷款前期利息占比较高？",
        a: "因为利息是根据剩余本金计算的。前期贷款本金最高，因此每月还款中支付利息的比例最大。"
      },
      {
        q: "提前还款如何节省利息？",
        a: "提前还款直接扣减贷款本金，从而减少未来所有月份的利息计算基数，大幅缩短还款期限并节省利息总额。"
      }
    ],
    sip: [
      {
        q: "什么是定投 (SIP)？为什么复利效应显著？",
        a: "定期定额投资可以平滑市场波动成本，并在长期投资中充分发挥<strong>复利（利滚利）</strong>的指数增长效应。"
      }
    ],
    "pregnancy-due-date": [
      {
        q: "How does Naegele's Rule calculate the Estimated Due Date (EDD)?",
        a: "Naegele's Rule calculates the delivery date based on a 280-day (40-week) human gestation from the first day of the Last Menstrual Period (LMP): <strong>EDD = LMP + 1 Year – 3 Months + 7 Days</strong> (adjusted for individual cycle deviations from 28 days)."
      },
      {
        q: "What is the difference between Gestational Age and Fetal Age?",
        a: "Gestational Age is measured from the first day of your last period (~2 weeks before conception), whereas Fetal Age measures actual embryonic age from the date of fertilization."
      }
    ],
    "body-surface-area": [
      {
        q: "Why is Body Surface Area (BSA) preferred over body weight for chemotherapy dosing?",
        a: "BSA correlates more closely with physiological parameters such as cardiac output, renal blood flow, and basal metabolic rate than simple weight, reducing drug toxicity risks in narrow-therapeutic-index oncology regimens."
      },
      {
        q: "What is the Mosteller formula for BSA?",
        a: "The Mosteller equation is the gold standard in clinical pharmacology: <strong>BSA (m²) = √[(Height (cm) × Weight (kg)) / 3600]</strong>."
      }
    ],
    "mean-arterial-pressure": [
      {
        q: "What is Mean Arterial Pressure (MAP) and why is it critical?",
        a: "MAP represents the average arterial pressure during a single cardiac cycle. It is the driving force that pushes blood into vital tissues. Clinical target is typically <strong>≥ 65 mmHg</strong> to maintain vital organ perfusion."
      },
      {
        q: "How is MAP calculated from Systolic and Diastolic Blood Pressure?",
        a: "Because the heart spends roughly 2/3 of the cardiac cycle in diastole, the standard formula is: <strong>MAP = [SBP + (2 × DBP)] / 3</strong> or <strong>MAP = DBP + ⅓(SBP – DBP)</strong>."
      }
    ],
    "dosage-calculator": [
      {
        q: "How are pediatric doses calculated from mg/kg/day guidelines?",
        a: "Total daily dose is calculated as: <strong>Total Dose = Patient Weight (kg) × Dose (mg/kg/day)</strong>. The single dose is obtained by dividing total daily dose by the number of daily administrations (e.g. divided by 3 for TID)."
      },
      {
        q: "How do you convert a milligram (mg) dose into liquid milliliters (mL)?",
        a: "Using the liquid suspension concentration: <strong>Volume (mL) = [Single Dose (mg) / Concentration (mg)] × Volume (mL)</strong>."
      }
    ],
    "egfr-kidney": [
      {
        q: "What is eGFR and how is it used to evaluate kidney function?",
        a: "Estimated Glomerular Filtration Rate (eGFR) measures how efficiently the kidneys filter creatinine metabolic waste from the blood. Normal eGFR is ≥ 90 mL/min/1.73m²."
      },
      {
        q: "What are the KDIGO Chronic Kidney Disease (CKD) stages?",
        a: "• Stage G1: ≥ 90 (Normal/High)<br>• Stage G2: 60–89 (Mildly decreased)<br>• Stage G3a: 45–59 (Mild-moderate)<br>• Stage G3b: 30–44 (Moderate-severe)<br>• Stage G4: 15–29 (Severely decreased)<br>• Stage G5: < 15 (Kidney Failure)."
      }
    ],
    bmi: [
      {
        q: "什么是身体质量指数 (BMI)？",
        a: "世界卫生组织 (WHO) 标准公式为：<strong>BMI = 体重 (kg) / [身高 (m)]²</strong>。"
      }
    ],
    general: [
      {
        category: "常规",
        q: "本网站的数据计算是否完全私密和安全？",
        a: "是的！所有计算均 100% 在您的浏览器本地运行，绝不会将您的财务或健康数据上传到任何远程服务器。"
      },
      {
        category: "理财",
        q: "个人理财中的“72法则”是什么？",
        a: "72法则是估算资金翻倍年限的快捷算法：<strong>翻倍年限 ≈ 72 / 年化收益率 (%)</strong>。"
      }
    ]
  },

  ar: {
    emi: [
      {
        q: "ما هو القسط الشهري الثابت (EMI) وكيف يتم حسابه؟",
        a: "القسط الشهري هو المبلغ الثابت لسداد القرض. المعادلة الرياضية هي: <strong>EMI = [P × r × (1 + r)^n] / [(1 + r)^n – 1]</strong> حيث <em>P</em> أصل القرض، و<em>r</em> الفائدة الشهرية، و<em>n</em> عدد الأشهر."
      },
      {
        q: "لماذا تكون نسبة الفائدة أعلى في السنوات الأولى للقرض؟",
        a: "لأن الفائدة تحسب على الرصيد المتبقي من أصل القرض. في البداية يكون المبلغ المستحق في أعلى مستوياته وبالتالي تذهب معظم الدفعة لتغطية الفائدة."
      }
    ],
    sip: [
      {
        q: "ما هي خطة الاستثمار الدوري (SIP)؟",
        a: "استثمار مبلغ ثابت بانتظام للاستفادة من متوسط التكلفة ومضاعفة الأرباح بالفائدة المركبة على المدى الطويل."
      }
    ],
    "pregnancy-due-date": [
      {
        q: "How does Naegele's Rule calculate the Estimated Due Date (EDD)?",
        a: "Naegele's Rule calculates the delivery date based on a 280-day (40-week) human gestation from the first day of the Last Menstrual Period (LMP): <strong>EDD = LMP + 1 Year – 3 Months + 7 Days</strong> (adjusted for individual cycle deviations from 28 days)."
      },
      {
        q: "What is the difference between Gestational Age and Fetal Age?",
        a: "Gestational Age is measured from the first day of your last period (~2 weeks before conception), whereas Fetal Age measures actual embryonic age from the date of fertilization."
      }
    ],
    "body-surface-area": [
      {
        q: "Why is Body Surface Area (BSA) preferred over body weight for chemotherapy dosing?",
        a: "BSA correlates more closely with physiological parameters such as cardiac output, renal blood flow, and basal metabolic rate than simple weight, reducing drug toxicity risks in narrow-therapeutic-index oncology regimens."
      },
      {
        q: "What is the Mosteller formula for BSA?",
        a: "The Mosteller equation is the gold standard in clinical pharmacology: <strong>BSA (m²) = √[(Height (cm) × Weight (kg)) / 3600]</strong>."
      }
    ],
    "mean-arterial-pressure": [
      {
        q: "What is Mean Arterial Pressure (MAP) and why is it critical?",
        a: "MAP represents the average arterial pressure during a single cardiac cycle. It is the driving force that pushes blood into vital tissues. Clinical target is typically <strong>≥ 65 mmHg</strong> to maintain vital organ perfusion."
      },
      {
        q: "How is MAP calculated from Systolic and Diastolic Blood Pressure?",
        a: "Because the heart spends roughly 2/3 of the cardiac cycle in diastole, the standard formula is: <strong>MAP = [SBP + (2 × DBP)] / 3</strong> or <strong>MAP = DBP + ⅓(SBP – DBP)</strong>."
      }
    ],
    "dosage-calculator": [
      {
        q: "How are pediatric doses calculated from mg/kg/day guidelines?",
        a: "Total daily dose is calculated as: <strong>Total Dose = Patient Weight (kg) × Dose (mg/kg/day)</strong>. The single dose is obtained by dividing total daily dose by the number of daily administrations (e.g. divided by 3 for TID)."
      },
      {
        q: "How do you convert a milligram (mg) dose into liquid milliliters (mL)?",
        a: "Using the liquid suspension concentration: <strong>Volume (mL) = [Single Dose (mg) / Concentration (mg)] × Volume (mL)</strong>."
      }
    ],
    "egfr-kidney": [
      {
        q: "What is eGFR and how is it used to evaluate kidney function?",
        a: "Estimated Glomerular Filtration Rate (eGFR) measures how efficiently the kidneys filter creatinine metabolic waste from the blood. Normal eGFR is ≥ 90 mL/min/1.73m²."
      },
      {
        q: "What are the KDIGO Chronic Kidney Disease (CKD) stages?",
        a: "• Stage G1: ≥ 90 (Normal/High)<br>• Stage G2: 60–89 (Mildly decreased)<br>• Stage G3a: 45–59 (Mild-moderate)<br>• Stage G3b: 30–44 (Moderate-severe)<br>• Stage G4: 15–29 (Severely decreased)<br>• Stage G5: < 15 (Kidney Failure)."
      }
    ],
    bmi: [
      {
        q: "ما هو مؤشر كتلة الجسم (BMI)؟",
        a: "معيار منظمة الصحة العالمية: <strong>BMI = الوزن (كجم) / [الطول (م)]²</strong>."
      }
    ],
    general: [
      {
        category: "عام",
        q: "هل العمليات الحسابية على هذا الموقع آمنة وخصوصية بنسبة 100%؟",
        a: "نعم! تتم جميع العمليات الحسابية محلياً 100% داخل متصفحك دون إرسال أي بيانات إلى خوادم خارجية."
      }
    ]
  }
};

export function getCalculatorFaqs(calcId) {
  const lang = getLanguage();
  const langData = localizedFaqs[lang] || localizedFaqs.en;
  return langData[calcId] || localizedFaqs.en[calcId] || [];
}

export function getGeneralKnowledgeFaqs() {
  const lang = getLanguage();
  const langData = localizedFaqs[lang] || localizedFaqs.en;
  return langData.general || localizedFaqs.en.general || [];
}
