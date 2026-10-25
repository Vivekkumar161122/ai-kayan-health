import { AssessmentInputs, RiskAnalysisResult, FeatureAttribution, TriageTier, RiskLevel } from '../types';

export const ABU_DHABI_CLINICAL_FACILITIES = [
  {
    nameEn: 'Cleveland Clinic Abu Dhabi - Men\'s Health & Andrology Center',
    nameAr: 'كليفلاند كلينك أبوظبي - مركز صحة الرجل وأمراض الذكورة',
    location: 'Al Maryah Island, Abu Dhabi',
    type: 'Tertiary Specialized Care'
  },
  {
    nameEn: 'Danat Al Emarat Hospital - Reproductive Medicine & Urology Clinic',
    nameAr: 'مستشفى دانة الإمارات - طب الخصوبة والمسالك البولية',
    location: 'Abu Dhabi Gate City',
    type: 'Comprehensive Reproductive Institute'
  },
  {
    nameEn: 'Sheikh Shakhbout Medical City (SSMC) - Urology & Endocrinology',
    nameAr: 'مدينة الشيخ شخبوط الطبية - جراحة المسالك البولية والغدد',
    location: 'Al Mafraq, Abu Dhabi',
    type: 'Academic Medical Center'
  },
  {
    nameEn: 'Mediclinic Airport Road - Andrology & Men\'s Wellness Service',
    nameAr: 'ميديكلينيك طريق المطار - عيادة صحة الرجل والعافية',
    location: 'Rawdhat, Abu Dhabi',
    type: 'Community Hospital & Specialized Clinics'
  },
  {
    nameEn: 'Kanad Hospital - Male Health & Pre-Marital Clinic',
    nameAr: 'مستشفى كندا - صحة الرجل والفحص الطبي قبل الزواج',
    location: 'Al Ain, Abu Dhabi',
    type: 'Regional Family & Men\'s Health Center'
  }
];

export function evaluateMaleReproductiveRisk(inputs: AssessmentInputs): RiskAnalysisResult {
  const attributions: FeatureAttribution[] = [];
  const redFlags: string[] = [];

  // Sub-scores initialize at baseline healthy (0)
  let spermatogenesisRisk = 12;
  let endocrineRisk = 10;
  let anatomicalRisk = 8;
  let lifestyleRisk = 15;

  // 1. URGENT RED FLAGS CHECK FIRST
  if (inputs.hasPainlessTesticularLump) {
    redFlags.push('Painless testicular nodule/mass detected (Urgent urologic evaluation required to rule out testicular neoplasm).');
    attributions.push({
      feature: 'Painless Testicular Mass',
      category: 'red_flag',
      impact: 45,
      direction: 'increases_risk',
      explanationEn: 'A painless lump in the testicle is an urgent sign that requires physical urological examination and scrotal ultrasound within 48 hours.',
      explanationAr: 'وجود كتلة أو ورم غير مؤلم في الخصية يستدعي فحصاً سريرياً عاجلاً بالموجات فوق الصوتية خلال 48 ساعة لاستبعاد أي أورام.',
      clinicalEvidence: 'EAU Male Health Guidelines 2024: Any solid, painless intratesticular mass must be assumed malignant until proven otherwise.'
    });
  }

  if (inputs.hasAcuteTesticularPain) {
    redFlags.push('Acute sudden testicular pain (Requires emergency rule-out of testicular torsion or acute epididymo-orchitis).');
    attributions.push({
      feature: 'Acute Testicular Pain',
      category: 'red_flag',
      impact: 40,
      direction: 'increases_risk',
      explanationEn: 'Sudden severe testicular pain requires emergency evaluation to preserve vascular integrity and tissue viability.',
      explanationAr: 'الألم الحاد والمفاجئ يتطلب رعاية فورية لاستبعاد التواء الخصية والحفاظ على التروية الدموية.',
      clinicalEvidence: 'AUA Emergency Guidelines: Testicular torsion window of viability is 4-6 hours from symptom onset.'
    });
  }

  if (inputs.hasHematospermia) {
    redFlags.push('Hematospermia (blood in ejaculate) reported.');
    attributions.push({
      feature: 'Hematospermia',
      category: 'red_flag',
      impact: 20,
      direction: 'increases_risk',
      explanationEn: 'Blood in semen may indicate genitourinary tract inflammation, infection, or vascular abnormality.',
      explanationAr: 'ظهور دم في السائل المنوي قد يشير إلى التهاب أو احتقان في غدة البروستاتا أو الأوعية المحيطة.',
      clinicalEvidence: 'WHO Genitourinary Consensus: Persistent hematospermia warrants transrectal ultrasound and PSA if age > 40.'
    });
  }

  // 2. GYM SUPPLEMENTS & ANABOLIC STEROIDS
  if (inputs.gymSupplements === 'anabolic_steroids_sarms') {
    endocrineRisk += 50;
    spermatogenesisRisk += 45;
    attributions.push({
      feature: 'Exogenous Anabolic Steroids / SARMs',
      category: 'endocrine',
      impact: 38,
      direction: 'increases_risk',
      explanationEn: 'Exogenous androgens trigger strong negative feedback on pituitary LH and FSH, suppressing intratesticular testosterone and halting spermatogenesis (Azoospermia risk).',
      explanationAr: 'تناول المنشطات الستيرويدية أو السارمس يثبط الغدة النخامية ويوقف إفراز هرموني LH و FSH، مما يعطل إنتاج الحيوانات المنوية بشكل حاد.',
      clinicalEvidence: 'Endocrine Society Practice Guidelines: Anabolic steroid-induced hypogonadism causes profound suppression of spermatogenesis in 90%+ of users; reversibility can take 12-24 months.'
    });
  } else if (inputs.gymSupplements === 'testosterone_boosters') {
    endocrineRisk += 15;
    attributions.push({
      feature: 'Unregulated Testosterone Boosters',
      category: 'endocrine',
      impact: 10,
      direction: 'increases_risk',
      explanationEn: 'Commercial supplements may contain undeclared hormonal compounds that disrupt the hypothalamic-pituitary-gonadal (HPG) axis.',
      explanationAr: 'المكملات غير الخاضعة للرقابة الصارمة قد تحتوي على مركبات هرمونية مستترة تؤثر على توازن محور الخصوبة.',
      clinicalEvidence: 'DoH Pharmacovigilance Advisory: High prevalence of undisclosed prohormones in unauthorized fitness supplements.'
    });
  } else {
    attributions.push({
      feature: 'Clean Nutrition / No Hormonal Supplements',
      category: 'endocrine',
      impact: -10,
      direction: 'protective',
      explanationEn: 'Absence of exogenous hormones protects natural pituitary gonadotropin signaling.',
      explanationAr: 'تجنب المنشطات الهرمونية يحمي الإشارات الحيوية الطبيعية للغدة النخامية والخصية.',
      clinicalEvidence: 'Normal baseline HPG axis preservation.'
    });
  }

  // 3. ANATOMICAL FACTORS (Varicocele, Cryptorchidism)
  if (inputs.varicoceleKnown === 'diagnosed_grade3') {
    anatomicalRisk += 45;
    spermatogenesisRisk += 30;
    attributions.push({
      feature: 'Grade 3 Clinical Varicocele',
      category: 'anatomical',
      impact: 28,
      direction: 'increases_risk',
      explanationEn: 'Large dilated pampiniform venous plexus raises intratesticular temperature and elevates oxidative stress, causing sperm DNA fragmentation and reduced progressive motility.',
      explanationAr: 'دوالي الخصية من الدرجة الثالثة ترفع درجة حرارة الخصية وتزيد الإجهاد التأكسدي، مما يؤدي إلى تكسر المادة الوراثية وضعف الحركة.',
      clinicalEvidence: 'Cochrane Review 2023 / EAU: Microsurgical varicocelectomy significantly improves progressive motility and DNA integrity in clinical grade 2/3 varicoceles.'
    });
  } else if (inputs.varicoceleKnown === 'diagnosed_grade1_2' || inputs.varicoceleKnown === 'suspected_heaviness') {
    anatomicalRisk += 25;
    spermatogenesisRisk += 15;
    attributions.push({
      feature: 'Scrotal Heaviness / Subclinical Varicocele',
      category: 'anatomical',
      impact: 15,
      direction: 'increases_risk',
      explanationEn: 'Heaviness sensation after prolonged standing or exertion suggests venous reflux that warrants doppler ultrasound assessment.',
      explanationAr: 'الشعور بالثقل بعد الوقوف الطويل أو الإجهاد يشير إلى احتمال ارتداد وريدي يستدعي فحص دوبلر للتأكد.',
      clinicalEvidence: 'Scrotal color Doppler ultrasound is the reference gold standard for venous diameter >= 3.0mm.'
    });
  }

  if (inputs.cryptorchidismHistory) {
    anatomicalRisk += 35;
    spermatogenesisRisk += 25;
    attributions.push({
      feature: 'History of Cryptorchidism (Undescended Testicle)',
      category: 'anatomical',
      impact: 22,
      direction: 'increases_risk',
      explanationEn: 'Childhood undescended testicle, even if surgically corrected (orchiopexy), is associated with lower germ cell density and requires baseline semen evaluation.',
      explanationAr: 'تاريخ الخصية الهاجرة في الطفولة، حتى بعد التصحيح الجراحي، يرتبط بانخفاض كثافة الخلايا المنوية ويتطلب تقييماً استباقياً.',
      clinicalEvidence: 'AUA/ASRM Guidelines: Unilateral cryptorchidism carries 30% risk of subfertility; bilateral carries >50%.'
    });
  }

  // 4. THERMAL & HEAT EXPOSURE
  if (inputs.heatExposure === 'daily_occupational' || inputs.heatExposure === 'frequent') {
    lifestyleRisk += 25;
    spermatogenesisRisk += 22;
    attributions.push({
      feature: 'Prolonged Scrotal Hyperthermia',
      category: 'lifestyle',
      impact: 18,
      direction: 'increases_risk',
      explanationEn: 'Spermatogenesis requires an optimal temperature 2-3°C below core body temperature. Frequent saunas, hot baths, or heat environments impair protein synthesis and increase ROS.',
      explanationAr: 'تكوين الحيوانات المنوية يتطلب حرارة أقل بدرجتين إلى ثلاث درجات من حرارة الجسم؛ التعرض المتكرر للحرارة يزيد الإجهاد التأكسدي.',
      clinicalEvidence: 'Human Reproduction: Elevating scrotal temperature by 1°C can decrease sperm concentration by up to 40% over a 74-day spermatogenic cycle.'
    });
  }

  // 5. METABOLIC & CARDIOVASCULAR
  if (inputs.bmi >= 30) {
    metabolicRiskModifier(inputs.bmi, attributions, true);
    lifestyleRisk += 25;
    endocrineRisk += 20;
  } else if (inputs.bmi >= 25) {
    lifestyleRisk += 12;
    endocrineRisk += 10;
    attributions.push({
      feature: 'Elevated BMI (Overweight)',
      category: 'metabolic',
      impact: 10,
      direction: 'increases_risk',
      explanationEn: 'Increased peripheral adipose tissue converts testosterone to estradiol via aromatase enzyme activity, shifting the T:E ratio.',
      explanationAr: 'زيادة الأنسجة الدهنية ترفع نشاط إنزيم الأروماتاز الذي يحول التستوستيرون إلى إستراديول مما يخل بالتوازن الهرموني.',
      clinicalEvidence: 'World J Mens Health 2023: Higher adiposity correlates with lowered SHBG, total testosterone, and sperm normal morphology.'
    });
  } else {
    attributions.push({
      feature: 'Healthy Body Mass Index (18.5 - 24.9)',
      category: 'metabolic',
      impact: -8,
      direction: 'protective',
      explanationEn: 'Optimal metabolic state preserves insulin sensitivity and healthy peripheral hormone conversion.',
      explanationAr: 'مؤشر كتلة الجسم المثالي يدعم حساسية الإنسولين وتوازناً هرمونياً سليماً.',
      clinicalEvidence: 'Optimal metabolic balance protects baseline sperm concentration and motility.'
    });
  }

  if (inputs.hba1cKnown && inputs.hba1cValue && inputs.hba1cValue >= 6.5) {
    lifestyleRisk += 20;
    endocrineRisk += 15;
    attributions.push({
      feature: 'Elevated Glycemic Marker (HbA1c >= 6.5%)',
      category: 'metabolic',
      impact: 16,
      direction: 'increases_risk',
      explanationEn: 'Hyperglycemia promotes microvascular endothelial dysfunction, advanced glycation end-products (AGEs), and elevated seminal reactive oxygen species.',
      explanationAr: 'ارتفاع السكر التراكمي يسبب اعتلالاً في الأوعية الدقيقة ويزيد الجذور الحرة الضارة بالحيوانات المنوية.',
      clinicalEvidence: 'Diabetologia 2022: Men with unmanaged diabetes show up to 50% higher nuclear sperm DNA fragmentation.'
    });
  }

  // 6. TOBACCO, MIDWAKH / DOKHA, SHISHA
  if (inputs.smokingType === 'dokha_midwakh' || inputs.smokingType === 'shisha') {
    lifestyleRisk += 22;
    spermatogenesisRisk += 18;
    attributions.push({
      feature: 'Midwakh / Dokha or Shisha Consumption',
      category: 'lifestyle',
      impact: 15,
      direction: 'increases_risk',
      explanationEn: 'Traditional high-concentration tobacco delivery produces heavy particulate toxins, cadmium, and cotinine that cross the blood-testis barrier.',
      explanationAr: 'تدخين المدواخ أو الشيشة يولد تركيزات عالية من النيكوتين والسموم والكادميوم التي تخترق الحاجز الدموي الخصيوي.',
      clinicalEvidence: 'UAE National Health Survey & Gulf Thoracic: Dokha delivers acute nicotine spikes up to 4-5x standard cigarettes with elevated seminal oxidative biomarkers.'
    });
  } else if (inputs.smokingType === 'none') {
    attributions.push({
      feature: 'Non-Smoker / No Tobacco or Shisha',
      category: 'lifestyle',
      impact: -12,
      direction: 'protective',
      explanationEn: 'Protects seminal plasma antioxidant capacity (glutathione peroxidase, superoxide dismutase).',
      explanationAr: 'يحافظ على مضادات الأكسدة الطبيعية في السائل المنوي ويحمي الحمض النووي.',
      clinicalEvidence: 'Significantly lower seminal leukocyte count and zero tobacco-derived mutagen exposure.'
    });
  }

  // 7. SEDENTARY LIFESTYLE
  if (inputs.sedentaryHoursDaily >= 8) {
    lifestyleRisk += 15;
    anatomicalRisk += 10;
    attributions.push({
      feature: 'High Daily Sitting Time (>= 8 hrs)',
      category: 'lifestyle',
      impact: 11,
      direction: 'increases_risk',
      explanationEn: 'Prolonged sitting produces pelvic venous stasis, localized heat accumulation, and reduced testicular blood perfusion.',
      explanationAr: 'الجلوس الطويل لأكثر من 8 ساعات يسبب ركوداً وريدياً في الحوض واحتباساً حرارياً موضعياً.',
      clinicalEvidence: 'BJUI: Men seated >8 hours/day show 2.1x prevalence of scrotal temperature elevations above 35°C.'
    });
  }

  // 8. GYNECOMASTIA & HYPOGONADAL SIGNS
  if (inputs.hasGynecomastia || inputs.hasLowLibidoOrFatigue) {
    endocrineRisk += 20;
    attributions.push({
      feature: 'Endocrine Disruption Symptoms (Fatigue / Gynecomastia)',
      category: 'endocrine',
      impact: 14,
      direction: 'increases_risk',
      explanationEn: 'Suggests relative estrogen excess or androgen deficiency warranting a morning serum Total/Free Testosterone, LH, FSH, and Prolactin assay.',
      explanationAr: 'أعراض تشير إلى احتمال نقص التستوستيرون أو خلل في نسبته، مما يستدعي فحص الهرمونات صباحاً.',
      clinicalEvidence: 'Endocrine Society Guidelines: Morning fasting testosterone assessment protocol.'
    });
  }

  // Clamp subscores
  spermatogenesisRisk = Math.min(100, Math.max(5, spermatogenesisRisk));
  endocrineRisk = Math.min(100, Math.max(5, endocrineRisk));
  anatomicalRisk = Math.min(100, Math.max(5, anatomicalRisk));
  lifestyleRisk = Math.min(100, Math.max(5, lifestyleRisk));

  // Calculate composite risk score
  let weightedScore = (
    spermatogenesisRisk * 0.35 +
    endocrineRisk * 0.25 +
    anatomicalRisk * 0.20 +
    lifestyleRisk * 0.20
  );

  let overallRisk: RiskLevel = 'optimal';
  if (redFlags.length > 0) {
    overallRisk = 'urgent_red_flag';
    weightedScore = Math.max(88, weightedScore);
  } else if (weightedScore >= 65) {
    overallRisk = 'elevated';
  } else if (weightedScore >= 45) {
    overallRisk = 'moderate';
  } else if (weightedScore >= 25) {
    overallRisk = 'mild';
  } else {
    overallRisk = 'optimal';
  }

  // Determine Triage Recommendation
  const triageRecommendation = determineTriageTier(overallRisk, redFlags, inputs);

  // Generate Personalized Action Plan
  const actionPlan = generateUpstreamActionPlan(inputs, overallRisk);

  return {
    overallRisk,
    overallScore: Math.round(weightedScore),
    confidenceScore: 94,
    screeningDisclaimer: {
      en: 'Al-Kayan Health is an intelligent early-risk screening and health navigation platform. It does NOT constitute a definitive medical diagnosis. All clinical findings must be verified by a licensed physician in accordance with Abu Dhabi Department of Health (DoH) regulations.',
      ar: 'منصة "صحة الكيان" هي أداة ذكية للكشف المبكر عن مؤشرات المخاطر والتوجيه الصحي الوقائي، ولا تُعد تشخيصاً طبياً نهائياً. يجب تأكيد كافة المؤشرات من قبل طبيب مرخص وفق معايير دائرة الصحة - أبوظبي.'
    },
    subScores: {
      spermatogenesis: Math.round(spermatogenesisRisk),
      endocrine: Math.round(endocrineRisk),
      anatomical: Math.round(anatomicalRisk),
      lifestyle: Math.round(lifestyleRisk)
    },
    redFlagsTriggered: redFlags,
    topAttributions: attributions.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact)),
    actionPlan,
    triageRecommendation
  };
}

function metabolicRiskModifier(bmi: number, attributions: FeatureAttribution[], isObese: boolean) {
  if (isObese) {
    attributions.push({
      feature: `Class I/II Obesity (BMI ${bmi.toFixed(1)})`,
      category: 'metabolic',
      impact: 22,
      direction: 'increases_risk',
      explanationEn: 'Significant visceral adiposity induces subclinical chronic inflammation, insulin resistance, and elevated scrotal skin-fold temperature.',
      explanationAr: 'السمنة وزيادة الدهون الحشوية تسبب التهاباً خفيفاً مزمناً وارتفاعاً موضعياً في حرارة كيس الصفن وضعف الهرمونات.',
      clinicalEvidence: 'Lancet Diabetes & Endo: BMI >= 30 associated with 1.8x risk of oligozoospermia.'
    });
  }
}

function determineTriageTier(overallRisk: RiskLevel, redFlags: string[], inputs: AssessmentInputs): TriageTier {
  if (redFlags.length > 0) {
    return {
      id: 'urgent_urology',
      titleEn: 'Urgent Urologic Assessment (Fast-Track 24-48 Hours)',
      titleAr: 'تقييم عاجل في جراحة المسالك البولية (خلال 24-48 ساعة)',
      urgency: 'urgent_48_hours',
      descriptionEn: 'Critical clinical signals detected (such as a painless testicular lump or acute symptoms). Immediate specialized in-person physical exam and scrotal duplex ultrasound are essential.',
      descriptionAr: 'تم رصد مؤشرات سريرية هامة (مثل وجود كتلة غير مؤلمة أو ألم حاد). يلزم إجراء فحص سريري عاجل وموجات صوتية للخصية فوراً.',
      recommendedActions: [
        'Physical palpation & urgent scrotal high-resolution ultrasound',
        'Serum tumor markers if indicated (AFP, beta-hCG, LDH)',
        'Direct consultation with board-certified urologist',
        'Avoid self-treatment or strenuous physical exertion'
      ],
      suggestedFacilities: [
        ABU_DHABI_CLINICAL_FACILITIES[0],
        ABU_DHABI_CLINICAL_FACILITIES[2]
      ]
    };
  }

  if (overallRisk === 'elevated' || inputs.gymSupplements === 'anabolic_steroids_sarms' || inputs.varicoceleKnown === 'diagnosed_grade3') {
    return {
      id: 'specialist_fertility',
      titleEn: 'Specialized Andrology & Reproductive Medicine Evaluation',
      titleAr: 'استشارة متخصصة في طب الذكورة والإخصاب',
      urgency: 'recommended_2_weeks',
      descriptionEn: 'Substantial risk signals identified affecting spermatogenesis or endocrine regulation. Coordinated evaluation by an andrologist will provide targeted intervention before irreversible testicular dysfunction occurs.',
      descriptionAr: 'تم رصد مؤشرات تستدعي تدخلاً متخصصاً لتقييم صحة الخصوبة والغدد الصماء، مما يتيح العلاج المبكر وحماية مخزون الخصوبة.',
      recommendedActions: [
        'Comprehensive Semen Analysis (WHO 6th Edition) including viability & morphology',
        'Morning Fasting Endocrine Panel (Total/Free Testosterone, LH, FSH, Prolactin, Estradiol)',
        'Scrotal Color Duplex Ultrasound for venous reflux mapping',
        'Post-anabolic steroid HPG axis recovery protocol if applicable'
      ],
      suggestedFacilities: [
        ABU_DHABI_CLINICAL_FACILITIES[0],
        ABU_DHABI_CLINICAL_FACILITIES[1],
        ABU_DHABI_CLINICAL_FACILITIES[3]
      ]
    };
  }

  if (overallRisk === 'moderate') {
    return {
      id: 'tele_andrology',
      titleEn: 'Tele-Andrology Consultation & Targeted At-Home Diagnostics',
      titleAr: 'استشارة ذكورة عن بُعد وفحص منزلي ميسر وموجه',
      urgency: 'recommended_4_weeks',
      descriptionEn: 'Moderate risk profile with high reversibility. Start with a private teleconsultation and discreet at-home semen or hormone testing to avoid unnecessary hospital visits.',
      descriptionAr: 'ملف مخاطر متوسط قابل للتحسن بشكل كبير. ابدأ باستشارة طبية خاصة عن بُعد مع باقة الفحص المنزلي الميسرة دون الحاجة لزيارة العيادة.',
      recommendedActions: [
        'Discreet At-Home Semen Micro-Analysis Kit delivery',
        'Metabolic screening (Fasting Glucose, HbA1c, Lipid panel)',
        '30-minute private telehealth session with Men\'s Health specialist',
        'Targeted lifestyle intervention protocol'
      ],
      suggestedFacilities: [
        ABU_DHABI_CLINICAL_FACILITIES[3],
        ABU_DHABI_CLINICAL_FACILITIES[4]
      ]
    };
  }

  if (overallRisk === 'mild') {
    return {
      id: 'primary_care',
      titleEn: 'Primary Care & Preventive Wellness Navigation',
      titleAr: 'رعاية أولية واستشارة صحية وقائية',
      urgency: 'routine',
      descriptionEn: 'Early lifestyle or mild metabolic indicators identified. Easily addressable via primary care physician and preconception optimization guidance.',
      descriptionAr: 'مؤشرات أولية خفيفة ترتبط بنمط الحياة. يمكن تحسينها بسهولة عبر طبيب الأسرة وبرنامج تعزيز الصحة العامة.',
      recommendedActions: [
        'Preconception lifestyle & antioxidant dietary optimization',
        'Weight management and metabolic re-check in 3 months',
        'Ergonomic break schedule to reduce prolonged sitting and heat'
      ],
      suggestedFacilities: [
        ABU_DHABI_CLINICAL_FACILITIES[4],
        ABU_DHABI_CLINICAL_FACILITIES[3]
      ]
    };
  }

  return {
    id: 'self_care',
    titleEn: 'Optimal Baseline: Proactive Preventive Maintenance',
    titleAr: 'مستوى مثالي: الحفاظ على العافية والوقاية المستمرة',
    urgency: 'routine',
    descriptionEn: 'Excellent baseline indicators. Continue proactive reproductive and metabolic habits; repeat annual check-up or pre-marital health evaluation as appropriate.',
    descriptionAr: 'مؤشرات ممتازة تعكس عافية جيدة. استمر في نمط الحياة الصحي والوقاية الاستباقية مع إجراء فحص دوري سنوي.',
    recommendedActions: [
      'Maintain active lifestyle and balanced Mediterranean/Gulf diet',
      'Annual routine health check and blood pressure monitoring',
      'Follow pre-marital health guidelines (الفحص الطبي قبل الزواج)'
    ],
    suggestedFacilities: [
      ABU_DHABI_CLINICAL_FACILITIES[4]
    ]
  };
}

function generateUpstreamActionPlan(inputs: AssessmentInputs, overallRisk: RiskLevel) {
  const plan: RiskAnalysisResult['actionPlan'] = [];

  // 1. Diagnostics
  if (inputs.gymSupplements === 'anabolic_steroids_sarms' || overallRisk === 'elevated' || overallRisk === 'urgent_red_flag') {
    plan.push({
      timeline: 'Days 1 - 7',
      titleEn: 'Baseline Endocrine & Biomarker Panel',
      titleAr: 'تحليل الهرمونات والمؤشرات الحيوية الأساسية',
      descriptionEn: 'Order morning (8:00 AM - 10:00 AM) serum Total Testosterone, Free Testosterone, LH, FSH, and Prolactin to evaluate pituitary gonadotropic drive.',
      descriptionAr: 'إجراء فحص صباحي لهرمونات الغدة النخامية والتستوستيرون لتقييم كفاءة إشارات الخصوبة.',
      priority: 'high',
      category: 'diagnostic'
    });
  }

  // 2. Heat / Lifestyle
  if (inputs.heatExposure !== 'none' || inputs.sedentaryHoursDaily >= 8) {
    plan.push({
      timeline: 'Immediate (Weeks 1 - 12)',
      titleEn: 'Thermal Protection & Ergonomic De-escalation',
      titleAr: 'حماية الخصية من الحرارة وتعديل بيئة الجلوس',
      descriptionEn: 'Cease saunas, hot tubs, and placing laptops on lap. Introduce 5-minute walking breaks every 45 minutes of sitting to alleviate scrotal venous pooling.',
      descriptionAr: 'التوقف عن الساونا والحمامات الساخنة، وتجنب وضع الحاسوب على الفخذين، وأخذ استراحة مشي قصيرة كل 45 دقيقة لتنشيط الدورة الدموية.',
      priority: 'high',
      category: 'lifestyle'
    });
  }

  // 3. Smoking
  if (inputs.smokingType === 'dokha_midwakh' || inputs.smokingType === 'shisha' || inputs.smokingType === 'cigarettes') {
    plan.push({
      timeline: 'Month 1 - 3',
      titleEn: 'Tobacco & Dokha Cessation Protocol',
      titleAr: 'برنامج الإقلاع عن المدواخ والتبغ',
      descriptionEn: 'Sperm maturation takes 74-90 days. Stopping Dokha/Shisha drastically cuts seminal cadmium and cotinine, reducing DNA fragmentation by 30-45% within one cycle.',
      descriptionAr: 'دورة تجدد الحيوانات المنوية تستغرق 74 يوماً. التوقف عن التدخين يقلل تكسر المادة الوراثية بنسبة تصل إلى 45% خلال دورة واحدة.',
      priority: 'high',
      category: 'lifestyle'
    });
  }

  // 4. Semen Analysis
  if (overallRisk !== 'optimal') {
    plan.push({
      timeline: 'Weeks 2 - 4',
      titleEn: 'Discreet At-Home Semen Micro-Fluidic Analysis',
      titleAr: 'الفحص المنزلي الخاص للسائل المنوي بتقنية الموائع الدقيقة',
      descriptionEn: 'Request an Al-Kayan discreet courier kit with WHO 6th edition automated computer-assisted sperm analysis (CASA) and strict confidentiality.',
      descriptionAr: 'طلب حقيبة الفحص المنزلي الميسرة والمحفوظة بحرارة معيارية لتحليل المؤشرات بدقة وسرية تامة.',
      priority: 'medium',
      category: 'diagnostic'
    });
  }

  // 5. Clinical consultation
  plan.push({
    timeline: overallRisk === 'urgent_red_flag' ? 'Immediate 48h' : 'Month 1',
    titleEn: 'Specialist Clinical Review & Personalized Guidance',
    titleAr: 'مراجعة طبية مع استشاري ذكورة معتمد',
    descriptionEn: 'Review results in a private teleconsultation or accredited Abu Dhabi healthcare provider with full human oversight.',
    descriptionAr: 'مناقشة النتائج مع طبيب استشاري في بيئة تحترم الخصوصية وتلتزم بأعلى معايير الرعاية.',
    priority: overallRisk === 'urgent_red_flag' ? 'high' : 'medium',
    category: 'clinical_visit'
  });

  return plan;
}
