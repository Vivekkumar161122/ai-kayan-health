import { SimulatedPatientCase, AtHomeDiagnosticKit } from '../types';

export const SIMULATED_PATIENT_CASES: SimulatedPatientCase[] = [
  {
    id: 'case_tariq',
    name: 'Tariq Al-Nuaimi',
    nameAr: 'طارق النعيمي',
    age: 32,
    archetype: 'Sedentary Tech Professional & Dokha Smoker',
    archetypeAr: 'موظف تقني مكتبي ومدخن للمدواخ',
    clinicalSummaryEn: '32-year-old married engineer in Abu Dhabi. Sits 10 hours daily, uses traditional Dokha/Midwakh, frequent weekend saunas. BMI 28.4. Asymptomatic with no prior semen analysis.',
    clinicalSummaryAr: 'مهندس متزوج يبلغ 32 عاماً في أبوظبي. يجلس أكثر من 10 ساعات يومياً، يدخن المدواخ بانتظام، ويرتاد الساونا أسبوعياً. مؤشر الكتلة 28.4 دون أعراض مسبقة.',
    inputs: {
      age: 32,
      maritalStatus: 'married',
      familyPlanningTimeline: 'actively_trying',
      durationTryingMonths: 7,
      heatExposure: 'frequent',
      sedentaryHoursDaily: 10,
      smokingType: 'dokha_midwakh',
      sleepHours: 6,
      stressLevel: 'high',
      bmi: 28.4,
      hba1cKnown: true,
      hba1cValue: 5.9,
      hasHypertension: false,
      hasDyslipidemia: true,
      hasFattyLiver: false,
      gymSupplements: 'clean',
      hasGynecomastia: false,
      hasLowLibidoOrFatigue: true,
      varicoceleKnown: 'no',
      cryptorchidismHistory: false,
      inguinalHerniaHistory: false,
      testicularTraumaOrTorsion: false,
      historyOfMumpsAfterPuberty: false,
      historyOfSTIsOrProstatitis: false,
      recurrentUTI: false,
      hasPainlessTesticularLump: false,
      hasAcuteTesticularPain: false,
      hasHematospermia: false
    },
    expectedOutcomeEn: 'AI detects elevated oxidative stress and scrotal hyperthermia risk. Triage: Tele-Andrology + At-home semen test + 90-day Dokha cessation protocol. Avoids 18 months of couple fertility delay.',
    expectedOutcomeAr: 'النظام يرصد إجهاداً تأكسدياً ناتجاً عن الحرارة والمدواخ. التوجيه: استشارة ذكورة عن بُعد وفحص منزلي وبرنامج تعافٍ وقائي يوفر 18 شهراً من التأخير.',
    timeToCareTraditional: '16 - 22 Months',
    timeToCareAlKayan: '11 Days'
  },
  {
    id: 'case_rashid',
    name: 'Rashid Al-Kaabi',
    nameAr: 'راشد الكعبي',
    age: 27,
    archetype: 'Bodybuilder with Hidden Anabolic / SARM Use',
    archetypeAr: 'رياضي يستخدم مكملات بناء الأجسام والستيرويدات',
    clinicalSummaryEn: '27-year-old engaged fitness enthusiast taking underground SARMs and testosterone ester cycles. Experiencing testicular softening and decreased morning erections.',
    clinicalSummaryAr: 'شاب مقبل على الزواج يمارس كمال الأجسام ويستخدم السارمس وحقن التستوستيرون. يعاني من خمول في الانتصاب الصباحي وضمور طفيف في الخصية.',
    inputs: {
      age: 27,
      maritalStatus: 'engaged',
      familyPlanningTimeline: 'future_1_2_years',
      durationTryingMonths: 0,
      heatExposure: 'occasional',
      sedentaryHoursDaily: 4,
      smokingType: 'none',
      sleepHours: 7,
      stressLevel: 'moderate',
      bmi: 26.2,
      hba1cKnown: false,
      hasHypertension: true,
      hasDyslipidemia: false,
      hasFattyLiver: false,
      gymSupplements: 'anabolic_steroids_sarms',
      hasGynecomastia: true,
      hasLowLibidoOrFatigue: true,
      varicoceleKnown: 'no',
      cryptorchidismHistory: false,
      inguinalHerniaHistory: false,
      testicularTraumaOrTorsion: false,
      historyOfMumpsAfterPuberty: false,
      historyOfSTIsOrProstatitis: false,
      recurrentUTI: false,
      hasPainlessTesticularLump: false,
      hasAcuteTesticularPain: false,
      hasHematospermia: false
    },
    expectedOutcomeEn: 'AI detects acute hypogonadotropic hypogonadism risk with azoospermia potential. Immediate fast-track andrology referral for endocrine preservation and PCT recovery.',
    expectedOutcomeAr: 'النظام يكشف عن تثبيط حاد في الغدة النخامية وخطر انعدام النطاف، مع توجيه عاجل لاستشاري غدد وذكورة لإعادة تنشيط المحور الهرموني الطبيعي.',
    timeToCareTraditional: '24 - 36 Months',
    timeToCareAlKayan: '4 Days'
  },
  {
    id: 'case_sultan',
    name: 'Sultan Al-Mansouri',
    nameAr: 'سلطان المنصوري',
    age: 35,
    archetype: 'Asymptomatic Grade 3 Varicocele & DNA Fragmentation',
    archetypeAr: 'دوالي الخصية غير المشخصة من الدرجة الثالثة',
    clinicalSummaryEn: '35-year-old government employee. Reports mild scrotal heaviness after evening walks. No formal fertility test conducted. Normal sexual performance masking silent germ-cell stress.',
    clinicalSummaryAr: 'موظف حكومي يبلغ 35 عاماً. يشعر بثقل خفيف في كيس الصفن بعد المشي الطويل، مع أداء طبيعي يخفي تلفاً تدريجياً في خلايا الحيوانات المنوية.',
    inputs: {
      age: 35,
      maritalStatus: 'married',
      familyPlanningTimeline: 'actively_trying',
      durationTryingMonths: 12,
      heatExposure: 'none',
      sedentaryHoursDaily: 7,
      smokingType: 'shisha',
      sleepHours: 7,
      stressLevel: 'low',
      bmi: 24.8,
      hba1cKnown: true,
      hba1cValue: 5.4,
      hasHypertension: false,
      hasDyslipidemia: false,
      hasFattyLiver: false,
      gymSupplements: 'clean',
      hasGynecomastia: false,
      hasLowLibidoOrFatigue: false,
      varicoceleKnown: 'diagnosed_grade3',
      cryptorchidismHistory: false,
      inguinalHerniaHistory: true,
      testicularTraumaOrTorsion: false,
      historyOfMumpsAfterPuberty: false,
      historyOfSTIsOrProstatitis: false,
      recurrentUTI: false,
      hasPainlessTesticularLump: false,
      hasAcuteTesticularPain: false,
      hasHematospermia: false
    },
    expectedOutcomeEn: 'High anatomical risk score. Direct referral to Cleveland Clinic Abu Dhabi for scrotal Doppler and sperm DNA fragmentation index (DFI). Subinguinal microsurgery indicated before IVF.',
    expectedOutcomeAr: 'درجة خطورة تشريحية مرتفعة. إحالة مباشرة إلى مركز متقدم لإجراء أشعة دوبلر وفحص تكسر المادة الوراثية وتحديد مدى الحاجة للجراحة الميكروسكوبية.',
    timeToCareTraditional: '18 Months',
    timeToCareAlKayan: '14 Days'
  },
  {
    id: 'case_mansoor',
    name: 'Mansoor Al-Zaabi',
    nameAr: 'منصور الزعابي',
    age: 24,
    archetype: 'Pre-Marital Health & Proactive Preconception Check',
    archetypeAr: 'فحص استباقي وقائي قبل الزواج',
    clinicalSummaryEn: '24-year-old engaged Emirati completing pre-marital screening. Seeks confidential proactive reassurance regarding male reproductive stamina and baseline wellness.',
    clinicalSummaryAr: 'شاب إماراتي مقبل على الزواج يقوم بالفحص الطبي قبل الزواج، ويرغب في الاطمئنان المبكر على صحته الإنجابية ضمن خصوصية تامة.',
    inputs: {
      age: 24,
      maritalStatus: 'engaged',
      familyPlanningTimeline: 'pre_marital',
      durationTryingMonths: 0,
      heatExposure: 'none',
      sedentaryHoursDaily: 5,
      smokingType: 'none',
      sleepHours: 8,
      stressLevel: 'low',
      bmi: 22.9,
      hba1cKnown: true,
      hba1cValue: 5.1,
      hasHypertension: false,
      hasDyslipidemia: false,
      hasFattyLiver: false,
      gymSupplements: 'protein_creatine',
      hasGynecomastia: false,
      hasLowLibidoOrFatigue: false,
      varicoceleKnown: 'no',
      cryptorchidismHistory: false,
      inguinalHerniaHistory: false,
      testicularTraumaOrTorsion: false,
      historyOfMumpsAfterPuberty: false,
      historyOfSTIsOrProstatitis: false,
      recurrentUTI: false,
      hasPainlessTesticularLump: false,
      hasAcuteTesticularPain: false,
      hasHematospermia: false
    },
    expectedOutcomeEn: 'Optimal baseline score (Risk score: 14/100). Validates healthy lifestyle, reinforces pre-marital counseling guidelines, and provides proactive nutritional advice.',
    expectedOutcomeAr: 'مؤشرات ممتازة (درجة الخطر: 14/100). تعزيز التوجيه الوقائي قبل الزواج وتقديم نصائح غذائية استباقية مع طمأنة المريض.',
    timeToCareTraditional: 'Not Offered (Zero Pathway)',
    timeToCareAlKayan: 'Instant Digital Intake'
  },
  {
    id: 'case_zayd_redflag',
    name: 'Zayd Al-Dhaheri',
    nameAr: 'زايد الظاهري',
    age: 29,
    archetype: 'Emergency Red Flag: Palpable Painless Testicular Nodule',
    archetypeAr: 'حالة طوارئ وسرعة تحويل: كتلة غير مؤلمة في الخصية',
    clinicalSummaryEn: '29-year-old noticed a firm, non-tender lump on right lower pole of testis during self-exam. Believed it was related to fertility or a simple cyst. Delayed clinic visit due to hesitation.',
    clinicalSummaryAr: 'شاب يبلغ 29 عاماً لاحظ وجود كتلة صلبة غير مؤلمة في الخصية اليمنى. كان يظن أنها كيس دهني وتردد في مراجعة المستشفى بداعي الحرج.',
    inputs: {
      age: 29,
      maritalStatus: 'single',
      familyPlanningTimeline: 'general_wellness',
      durationTryingMonths: 0,
      heatExposure: 'none',
      sedentaryHoursDaily: 6,
      smokingType: 'cigarettes',
      sleepHours: 7,
      stressLevel: 'high',
      bmi: 25.0,
      hba1cKnown: false,
      hasHypertension: false,
      hasDyslipidemia: false,
      hasFattyLiver: false,
      gymSupplements: 'clean',
      hasGynecomastia: false,
      hasLowLibidoOrFatigue: false,
      varicoceleKnown: 'no',
      cryptorchidismHistory: true, // Known risk factor
      inguinalHerniaHistory: false,
      testicularTraumaOrTorsion: false,
      historyOfMumpsAfterPuberty: false,
      historyOfSTIsOrProstatitis: false,
      recurrentUTI: false,
      hasPainlessTesticularLump: true, // CRITICAL RED FLAG
      hasAcuteTesticularPain: false,
      hasHematospermia: false
    },
    expectedOutcomeEn: 'URGENT RED FLAG TRIGGERED. System bypasses routine fertility screening, alerts human triage coordinator, and books priority 48-hour ultrasound + urologic oncology consult.',
    expectedOutcomeAr: 'تنبيه سريري فوري عاجل. النظام يتجاوز مسار الخصوبة الروتيني ويفعل مسار المسالك البولية فائق السرعة خلال 48 ساعة لإجراء الموجات الصوتية.',
    timeToCareTraditional: '4 - 7 Months (Delayed)',
    timeToCareAlKayan: 'Within 24 Hours'
  }
];

export const AVAILABLE_AT_HOME_KITS: AtHomeDiagnosticKit[] = [
  {
    id: 'kit_semen_microfluidic',
    nameEn: 'Al-Kayan Vitality™ Semen Micro-Analysis Kit',
    nameAr: 'حقيبة الكيان™ للفحص المنزلي للسائل المنوي بتقنية الموائع الدقيقة',
    descriptionEn: 'Clinically validated, discreet home collection with temperature-stabilized courier transport to accredited Abu Dhabi reference laboratories.',
    descriptionAr: 'جمع عينة منزلي ميسر وخاص مع نقل مبرد محكوم الحرارة عبر ناقل معتمد إلى مختبرات أبوظبي المرجعية.',
    turnaroundHours: 24,
    includes: [
      'Thermal-insulated specimen cup with liquefaction indicator',
      'Automated WHO 6th Edition parameter scan (Concentration, Total Motility, Progressive Motility, Normal Forms)',
      'Digital video motility recording for andrologist review',
      'End-to-end encrypted chain-of-custody tracking'
    ],
    whoStandard: 'WHO Laboratory Manual 6th Edition (2021)',
    status: 'available'
  },
  {
    id: 'kit_endocrine_panel',
    nameEn: 'Complete Male Reproductive Hormone Dried Blood Spot',
    nameAr: 'باقة الهرمونات الذكورية المتكاملة بنقاط الدم المجففة',
    descriptionEn: 'Painless micro-finger prick collection at 8:00 AM in the privacy of home. Measures critical hypothalamic-pituitary-gonadal axis markers.',
    descriptionAr: 'وخز لطيف غير مؤلم في راحة المنزل عند الساعة 8 صباحاً لقياس هرمونات الغدة النخامية والذكورة بدقة عالية.',
    turnaroundHours: 48,
    includes: [
      'Total Testosterone & Calculated Free Testosterone',
      'Pituitary Luteinizing Hormone (LH) & Follicle-Stimulating Hormone (FSH)',
      'Prolactin (PRL) & Estradiol (E2)',
      'Sex Hormone-Binding Globulin (SHBG)'
    ],
    whoStandard: 'ISO 15189 Accredited Immunoassay',
    status: 'available'
  },
  {
    id: 'kit_metabolic_oxidative',
    nameEn: 'Cardio-Metabolic & Seminal Oxidative Stress Panel',
    nameAr: 'فحص المؤشرات الأيضية والإجهاد التأكسدي',
    descriptionEn: 'Identifies systemic metabolic syndrome and subclinical cellular oxidative stress before it harms sperm DNA integrity.',
    descriptionAr: 'يكشف عن متلازمة التمثيل الغذائي والإجهاد التأكسدي الخلوي قبل أن يؤثر على سلامة المادة الوراثية.',
    turnaroundHours: 36,
    includes: [
      'HbA1c & Fasting Glucose',
      'Advanced Lipid Subfractions (LDL, HDL, Triglycerides)',
      'Seminal Reactive Oxygen Species (ROS) Proxy Index',
      'C-Reactive Protein (hs-CRP) for micro-inflammation'
    ],
    whoStandard: 'Clinical Chemistry & EAU Consensus',
    status: 'available'
  }
];

export const POPULATION_HEALTH_METRICS = {
  totalScreenedAbuDhabi: 1250,
  regionalDistribution: [
    { region: 'Abu Dhabi City', regionAr: 'مدينة أبوظبي', count: 780, percentage: 62.4 },
    { region: 'Al Ain', regionAr: 'العين', count: 340, percentage: 27.2 },
    { region: 'Al Dhafra', regionAr: 'الظفرة', count: 130, percentage: 10.4 }
  ],
  assessmentCompletionRate: 78.4, // vs 23.1% for traditional clinical visit
  averageDaysToEvaluation: 13.8,   // vs 512 days (17 months) traditionally
  referralAdherenceRate: 86.2,    // men who completed recommended next step
  culturalTrustScore: 94.6,       // patient reported comfort with language and privacy
  redFlagsDetectedSafely: 28,     // urgent urological masses/torsions caught early
  riskStratificationBreakdown: [
    { tier: 'Optimal Baseline', tierAr: 'عافية مثالية', percentage: 38.2, count: 477, color: '#10B981' },
    { tier: 'Mild Modifiable', tierAr: 'مخاطر خفيفة قابلة للتعديل', percentage: 29.6, count: 370, color: '#0284C7' },
    { tier: 'Moderate Risk', tierAr: 'مخاطر متوسطة', percentage: 19.4, count: 243, color: '#F59E0B' },
    { tier: 'Elevated Clinical Risk', tierAr: 'مخاطر سريرية مرتفعة', percentage: 10.6, count: 132, color: '#EA580C' },
    { tier: 'Urgent Red Flag', tierAr: 'إنذار سريري عاجل', percentage: 2.2, count: 28, color: '#DC2626' }
  ],
  equityAudit: {
    disparateImpactRatio: 0.98, // near 1.0 = highly fair across Emirati & expatriate cohorts
    calibrationBrierScore: 0.084,
    falseNegativeRateRedFlags: 0.00
  }
};
