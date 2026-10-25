import React, { useState } from 'react';
import { 
  AssessmentInputs, 
  Language, 
  RiskAnalysisResult 
} from '../types';
import { SIMULATED_PATIENT_CASES } from '../data/simulatedData';
import { 
  Shield, 
  Heart, 
  Flame, 
  Dumbbell, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  Info,
  Clock
} from 'lucide-react';

interface AssessmentIntakeProps {
  inputs: AssessmentInputs;
  setInputs: React.Dispatch<React.SetStateAction<AssessmentInputs>>;
  lang: Language;
  onComplete: (analysis: RiskAnalysisResult) => void;
  evaluateRisk: (inputs: AssessmentInputs) => RiskAnalysisResult;
}

export const AssessmentIntake: React.FC<AssessmentIntakeProps> = ({
  inputs,
  setInputs,
  lang,
  onComplete,
  evaluateRisk
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const isAr = lang === 'ar';

  const steps = [
    { num: 1, titleEn: 'Preconception & Goals', titleAr: 'الأهداف الإنجابية', icon: Heart },
    { num: 2, titleEn: 'Lifestyle & Thermal', titleAr: 'نمط الحياة والحرارة', icon: Flame },
    { num: 3, titleEn: 'Metabolic & Health', titleAr: 'المؤشرات الأيضية والصحية', icon: Shield },
    { num: 4, titleEn: 'Fitness & Supplements', titleAr: 'اللياقة والمكملات', icon: Dumbbell },
    { num: 5, titleEn: 'Anatomical & Red Flags', titleAr: 'العلامات التشريحية والأمان', icon: AlertTriangle }
  ];

  const handlePresetSelect = (caseId: string) => {
    const selected = SIMULATED_PATIENT_CASES.find(c => c.id === caseId);
    if (selected) {
      setInputs(selected.inputs);
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      const result = evaluateRisk(inputs);
      onComplete(result);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Intro & Preset Bar */}
      <div className="glass-panel" style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(15, 23, 42, 0.6))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-optimal">
                <Sparkles size={12} />
                {isAr ? 'مدخل سريري وقائي آمن' : 'Safe Upstream Health Portal'}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {isAr ? 'استبيان استرشادي غير جراحي ومحمي الخصوصية' : 'Non-invasive, discreet 4-minute assessment'}
              </span>
            </div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF' }}>
              {isAr ? 'تقييم مؤشرات العافية والصحة الإنجابية للرجل' : 'Male Reproductive Vitality & Early Risk Identification'}
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '780px' }}>
              {isAr
                ? 'فحص استباقي مصمم وفق خصوصية الثقافة والتقاليد، للكشف المبكر عن العوامل المؤثرة على جودة السائل المنوي وتوازن الهرمونات قبل ظهور تأخر الإنجاب.'
                : 'A proactive, culturally respectful assessment to identify modifiable metabolic, thermal, endocrine, and anatomical risk signals long before late-stage infertility is diagnosed.'}
            </p>
          </div>

          {/* Quick Case Preset Selector */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.8)', 
            padding: '12px 16px', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            minWidth: '280px'
          }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--emerald-light)', fontWeight: 600, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} />
              {isAr ? 'تحميل حالة سريرية تجريبية:' : 'Load Evaluator Case Archetype:'}
            </div>
            <select 
              className="form-select" 
              style={{ width: '100%', fontSize: '0.85rem', padding: '6px 10px' }}
              onChange={(e) => handlePresetSelect(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>{isAr ? '-- اختر نموذج حالة سريرية --' : '-- Select Clinical Case Preset --'}</option>
              {SIMULATED_PATIENT_CASES.map(c => (
                <option key={c.id} value={c.id}>
                  {isAr ? `${c.nameAr} (${c.archetypeAr})` : `${c.name} (${c.archetype})`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="stepper-container">
        {steps.map((s) => {
          const StepIcon = s.icon;
          const isActive = currentStep === s.num;
          const isCompleted = currentStep > s.num;
          return (
            <div 
              key={s.num} 
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => setCurrentStep(s.num)}
            >
              <div className="step-circle">
                {isCompleted ? <CheckCircle2 size={16} /> : <StepIcon size={16} />}
              </div>
              <div className="step-label">
                {isAr ? s.titleAr : s.titleEn}
              </div>
            </div>
          );
        })}
      </div>

      {/* Form Steps Card */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        {/* STEP 1: Preconception & Goals */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
                {isAr ? 'المرحلة 1: الهدف الإنجابي والإطار الزمني' : 'Step 1: Family Planning & Life Stage'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {isAr ? 'نحرص على احترام كافة الخيارات الأسرية دون إطلاق أي أحكام مسبقة.' : 'We respect personal and family choices with confidentiality and zero judgment.'}
              </p>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">
                  <span>{isAr ? 'العمر' : 'Age'}</span>
                  <span style={{ color: 'var(--emerald-light)' }}>{inputs.age} {isAr ? 'سنة' : 'years'}</span>
                </label>
                <input 
                  type="range" 
                  min="18" 
                  max="65" 
                  value={inputs.age} 
                  className="custom-range"
                  onChange={(e) => setInputs({ ...inputs, age: parseInt(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{isAr ? 'الحالة الاجتماعية' : 'Marital / Life Context'}</label>
                <select 
                  className="form-select"
                  value={inputs.maritalStatus}
                  onChange={(e) => setInputs({ ...inputs, maritalStatus: e.target.value as any })}
                >
                  <option value="single">{isAr ? 'أعزب' : 'Single'}</option>
                  <option value="engaged">{isAr ? 'مقبل على الزواج (فحص ما قبل الزواج)' : 'Engaged (Pre-marital screening)'}</option>
                  <option value="married">{isAr ? 'متزوج' : 'Married'}</option>
                  <option value="prefer_not_to_say">{isAr ? 'أفضل عدم التحديد' : 'Prefer not to say'}</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{isAr ? 'الهدف الإنجابي الحالي' : 'Current Reproductive Goal'}</label>
              <div className="option-cards">
                {[
                  {
                    id: 'pre_marital',
                    titleEn: 'Pre-Marital Check',
                    titleAr: 'الفحص الطبي قبل الزواج',
                    descEn: 'Proactive baseline check prior to marriage',
                    descAr: 'اطمئنان استباقي على العافية قبل إتمام الزواج'
                  },
                  {
                    id: 'future_1_2_years',
                    titleEn: 'Future Planning (1-2 yrs)',
                    titleAr: 'تخطيط مستقبلي (1-2 سنة)',
                    descEn: 'Optimizing male vitality for upcoming family goals',
                    descAr: 'تحسين العافية تمهيداً لبناء الأسرة لاحقاً'
                  },
                  {
                    id: 'actively_trying',
                    titleEn: 'Actively Conceiving',
                    titleAr: 'محاولة الإنجاب حالياً',
                    descEn: 'Currently trying to conceive with partner',
                    descAr: 'محاولة الإنجاب والمشاركة في الفحص الوقائي'
                  },
                  {
                    id: 'general_wellness',
                    titleEn: 'Preventive Male Vitality',
                    titleAr: 'عافية ذكورية وقائية',
                    descEn: 'General energy, testosterone, and metabolic health',
                    descAr: 'متابعة الطاقة ومستوى الهرمونات والصحة العامة'
                  }
                ].map((opt) => (
                  <div
                    key={opt.id}
                    className={`option-card ${inputs.familyPlanningTimeline === opt.id ? 'selected' : ''}`}
                    onClick={() => setInputs({ ...inputs, familyPlanningTimeline: opt.id as any })}
                  >
                    <div className="option-title">{isAr ? opt.titleAr : opt.titleEn}</div>
                    <div className="option-desc">{isAr ? opt.descAr : opt.descEn}</div>
                  </div>
                ))}
              </div>
            </div>

            {inputs.familyPlanningTimeline === 'actively_trying' && (
              <div className="form-group" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
                <label className="form-label">
                  <span>{isAr ? 'مدة محاولة الإنجاب (بالأشهر)' : 'Months Actively Trying'}</span>
                  <span style={{ color: 'var(--emerald-light)' }}>{inputs.durationTryingMonths} {isAr ? 'شهر' : 'months'}</span>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="36" 
                  value={inputs.durationTryingMonths} 
                  className="custom-range"
                  onChange={(e) => setInputs({ ...inputs, durationTryingMonths: parseInt(e.target.value) })}
                />
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {isAr ? 'التقييم المبكر للرجل يمنع الفحوصات غير الضرورية والمكلفة للطرفين.' : 'Testing early in men prevents costly, invasive delays for both partners.'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Lifestyle, Heat & Ergonomics */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
                {isAr ? 'المرحلة 2: نمط الحياة والتعرض للحرارة الموضعية' : 'Step 2: Lifestyle, Thermal & Environmental Exposure'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {isAr ? 'الحيوانات المنوية حساسة للغاية لارتفاع درجات الحرارة والجلوس الطويل وعادات التدخين.' : 'Spermatogenesis is exquisitely sensitive to heat elevation, pelvic venous pooling, and tobacco particulates.'}
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">{isAr ? 'التعرض للحرارة المرتفعة أو الساونا أو بيئة العمل الساخنة' : 'Scrotal Heat / Saunas / Hot Environments'}</label>
              <div className="option-cards">
                {[
                  { id: 'none', labelEn: 'Rare / None', labelAr: 'نادر أو منعدم', descEn: 'No frequent hot tubs or saunas', descAr: 'لا يوجد تعرض متكرر للساونا أو المغاطس الساخنة' },
                  { id: 'occasional', labelEn: 'Occasional (1-2x/mo)', labelAr: 'عرضي (1-2 شهرياً)', descEn: 'Occasional sauna or warm baths', descAr: 'استخدام عرضي للساونا' },
                  { id: 'frequent', labelEn: 'Frequent (Weekly)', labelAr: 'متكرر (أسبوعياً)', descEn: 'Weekly saunas, hot tubs, or laptop on lap', descAr: 'ساونا أسبوعية أو وضع الحاسوب على الفخذين' },
                  { id: 'daily_occupational', labelEn: 'Daily / Occupational', labelAr: 'يومي أو بيئة عمل حارة', descEn: 'Prolonged outdoor extreme heat or industrial ovens', descAr: 'عمل ميداني في حرارة عالية أو أفران' }
                ].map(opt => (
                  <div 
                    key={opt.id}
                    className={`option-card ${inputs.heatExposure === opt.id ? 'selected' : ''}`}
                    onClick={() => setInputs({ ...inputs, heatExposure: opt.id as any })}
                  >
                    <div className="option-title">{isAr ? opt.labelAr : opt.labelEn}</div>
                    <div className="option-desc">{isAr ? opt.descAr : opt.descEn}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">
                  <span>{isAr ? 'ساعات الجلوس اليومية (العمل والقيادة)' : 'Daily Sitting Time (Desk/Driving)'}</span>
                  <span style={{ color: 'var(--emerald-light)' }}>{inputs.sedentaryHoursDaily} {isAr ? 'ساعات' : 'hours'}</span>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="16" 
                  value={inputs.sedentaryHoursDaily} 
                  className="custom-range"
                  onChange={(e) => setInputs({ ...inputs, sedentaryHoursDaily: parseInt(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{isAr ? 'عادة التدخين أو التبغ' : 'Tobacco & Smoking Habits'}</label>
                <select 
                  className="form-select"
                  value={inputs.smokingType}
                  onChange={(e) => setInputs({ ...inputs, smokingType: e.target.value as any })}
                >
                  <option value="none">{isAr ? 'غير مدخن إطلاقاً (حماية طبيعية)' : 'Non-smoker (Protective)'}</option>
                  <option value="dokha_midwakh">{isAr ? 'مدواخ / دوخة تقليدية (نسبة نيكوتين مركزة)' : 'Dokha / Midwakh (High-dose nicotine)'}</option>
                  <option value="shisha">{isAr ? 'شيشة / معسل' : 'Shisha / Waterpipe'}</option>
                  <option value="cigarettes">{isAr ? 'سجائر تقليدية' : 'Standard Cigarettes'}</option>
                  <option value="vape">{isAr ? 'سجائر إلكترونية / فيب' : 'Vaping / Electronic Nicotine'}</option>
                </select>
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">
                  <span>{isAr ? 'معدل ساعات النوم الليلي' : 'Nightly Sleep Duration'}</span>
                  <span style={{ color: 'var(--emerald-light)' }}>{inputs.sleepHours} {isAr ? 'ساعات' : 'hours'}</span>
                </label>
                <input 
                  type="range" 
                  min="4" 
                  max="10" 
                  value={inputs.sleepHours} 
                  className="custom-range"
                  onChange={(e) => setInputs({ ...inputs, sleepHours: parseInt(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{isAr ? 'مستوى التوتر وضغوط العمل' : 'Perceived Stress Level'}</label>
                <select 
                  className="form-select"
                  value={inputs.stressLevel}
                  onChange={(e) => setInputs({ ...inputs, stressLevel: e.target.value as any })}
                >
                  <option value="low">{isAr ? 'منخفض / متوازن' : 'Low / Well Managed'}</option>
                  <option value="moderate">{isAr ? 'متوسط' : 'Moderate'}</option>
                  <option value="high">{isAr ? 'مرتفع ومستمر' : 'High / Chronic Stress'}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Metabolic & Cardio-Health */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
                {isAr ? 'المرحلة 3: المؤشرات الأيضية وصحة القلب والأوعية' : 'Step 3: Metabolic & Cardiovascular Biomarkers'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {isAr ? 'صحة التمثيل الغذائي ترتبط مباشرة بكفاءة إنتاج الهرمونات وجودة الحيوانات المنوية.' : 'Male reproductive health mirrors cardiovascular and metabolic vitality.'}
              </p>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">
                  <span>{isAr ? 'مؤشر كتلة الجسم (BMI)' : 'Body Mass Index (BMI)'}</span>
                  <span style={{ color: inputs.bmi > 25 ? 'var(--warning-accent)' : 'var(--emerald-light)' }}>{inputs.bmi.toFixed(1)}</span>
                </label>
                <input 
                  type="range" 
                  min="18" 
                  max="42" 
                  step="0.5"
                  value={inputs.bmi} 
                  className="custom-range"
                  onChange={(e) => setInputs({ ...inputs, bmi: parseFloat(e.target.value) })}
                />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {inputs.bmi < 25 ? (isAr ? 'وزن مثالي' : 'Healthy baseline') : inputs.bmi < 30 ? (isAr ? 'زيادة وزن طفيفة' : 'Overweight') : (isAr ? 'سمنة قد تؤثر على هرمون الذكورة' : 'Adipose-driven aromatization risk')}
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">{isAr ? 'مستوى السكر التراكمي (HbA1c) إذا كان معلوماً' : 'HbA1c Glycemic Marker (If Known)'}</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="number" 
                    step="0.1"
                    min="4.5"
                    max="14.0"
                    placeholder="e.g. 5.6"
                    className="form-input"
                    style={{ flex: 1 }}
                    value={inputs.hba1cValue || ''}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setInputs({ 
                        ...inputs, 
                        hba1cKnown: !isNaN(val),
                        hba1cValue: isNaN(val) ? undefined : val 
                      });
                    }}
                  />
                  <button 
                    className="btn-secondary"
                    type="button"
                    onClick={() => setInputs({ ...inputs, hba1cKnown: false, hba1cValue: undefined })}
                    style={{ fontSize: '0.8rem', padding: '0 12px' }}
                  >
                    {isAr ? 'غير معلوم' : 'Unknown'}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{isAr ? 'حالات صحية مشخصة مسبقاً' : 'Pre-existing Diagnosed Conditions'}</label>
              <div className="option-cards">
                <div 
                  className={`option-card ${inputs.hasHypertension ? 'selected' : ''}`}
                  onClick={() => setInputs({ ...inputs, hasHypertension: !inputs.hasHypertension })}
                >
                  <div className="option-title">{isAr ? 'ارتفاع ضغط الدم' : 'Hypertension'}</div>
                  <div className="option-desc">{isAr ? 'عامل مؤثر على الدورة الدموية الدقيقة' : 'Microvascular indicator'}</div>
                </div>

                <div 
                  className={`option-card ${inputs.hasDyslipidemia ? 'selected' : ''}`}
                  onClick={() => setInputs({ ...inputs, hasDyslipidemia: !inputs.hasDyslipidemia })}
                >
                  <div className="option-title">{isAr ? 'ارتفاع الدهون والكوليسترول' : 'Dyslipidemia'}</div>
                  <div className="option-desc">{isAr ? 'مرتبط بالإجهاد التأكسدي' : 'Cellular membrane lipid balance'}</div>
                </div>

                <div 
                  className={`option-card ${inputs.hasFattyLiver ? 'selected' : ''}`}
                  onClick={() => setInputs({ ...inputs, hasFattyLiver: !inputs.hasFattyLiver })}
                >
                  <div className="option-title">{isAr ? 'الكبد الدهني' : 'Fatty Liver (NAFLD)'}</div>
                  <div className="option-desc">{isAr ? 'مرتبط بتمثيل الهرمونات في الكبد' : 'Hepatic SHBG clearance factor'}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Fitness & Supplements */}
        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
                {isAr ? 'المرحلة 4: الرياضة والمكملات الهرمونية ومحفزات الجيم' : 'Step 4: Fitness, Bodybuilding & Hormonal Supplements'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {isAr ? 'المنشطات الهرمونية الخارجية هي أحد أكثر الأسباب شيوعاً وقابلية للعلاج لانعدام الحيوانات المنوية المفاجئ لدى الشباب.' : 'Exogenous androgens and SARMs are leading modifiable causes of reversible severe male hypogonadism and azoospermia.'}
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">{isAr ? 'استخدام مكملات الصالات الرياضية ومحفزات التستوستيرون' : 'Gym Supplements & Performance Agents'}</label>
              <div className="option-cards">
                {[
                  {
                    id: 'clean',
                    titleEn: 'No Supplements / Clean',
                    titleAr: 'تغذية طبيعية فقط',
                    descEn: 'Natural diet, no performance pills',
                    descAr: 'لا مكملات رياضية'
                  },
                  {
                    id: 'protein_creatine',
                    titleEn: 'Standard Protein & Creatine',
                    titleAr: 'بروتين وكرياتين معتمد',
                    descEn: 'Reputable non-hormonal supplements',
                    descAr: 'مكملات غذائية غير هرمونية مرخصة'
                  },
                  {
                    id: 'testosterone_boosters',
                    titleEn: 'OTC Testosterone Boosters',
                    titleAr: 'محفزات هرمونية تجارية',
                    descEn: 'Herbal or online T-booster compounds',
                    descAr: 'مركبات زيادة التستوستيرون غير الموصوفة'
                  },
                  {
                    id: 'anabolic_steroids_sarms',
                    titleEn: 'Anabolic Steroids / SARMs / Injections',
                    titleAr: 'ستيرويدات بنائية / سارمس / حقن',
                    descEn: 'Testosterone cycles, orals, or injectable peptides',
                    descAr: 'كورسات بناء الأجسام أو الحقن الهرمونية'
                  }
                ].map(opt => (
                  <div
                    key={opt.id}
                    className={`option-card ${inputs.gymSupplements === opt.id ? 'selected' : ''}`}
                    onClick={() => setInputs({ ...inputs, gymSupplements: opt.id as any })}
                  >
                    <div className="option-title">{isAr ? opt.titleAr : opt.titleEn}</div>
                    <div className="option-desc">{isAr ? opt.descAr : opt.descEn}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{isAr ? 'هل تعاني من أي من العلامات التالية؟' : 'Associated Hormonal Signs'}</label>
              <div className="option-cards">
                <div 
                  className={`option-card ${inputs.hasGynecomastia ? 'selected' : ''}`}
                  onClick={() => setInputs({ ...inputs, hasGynecomastia: !inputs.hasGynecomastia })}
                >
                  <div className="option-title">{isAr ? 'تضخم أو حساسية في الثدي (التثدي)' : 'Gynecomastia / Breast Tenderness'}</div>
                  <div className="option-desc">{isAr ? 'مؤشر على ارتفاع نسبة الإستروجين للتستوستيرون' : 'Sign of estrogen/androgen imbalance'}</div>
                </div>

                <div 
                  className={`option-card ${inputs.hasLowLibidoOrFatigue ? 'selected' : ''}`}
                  onClick={() => setInputs({ ...inputs, hasLowLibidoOrFatigue: !inputs.hasLowLibidoOrFatigue })}
                >
                  <div className="option-title">{isAr ? 'خمول أو تراجع في النشاط الصباحي' : 'Unexplained Fatigue / Low Libido'}</div>
                  <div className="option-desc">{isAr ? 'مؤشر هرموني يستوجب فحص التستوستيرون' : 'Clinical marker for morning androgen check'}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Anatomical & Red Flags Safety Screen */}
        {currentStep === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-urgent">
                  <AlertTriangle size={12} />
                  {isAr ? 'فحص الأمان والإنذار السريري المبكر' : 'Critical Clinical Red Flag Screen'}
                </span>
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF', marginTop: '6px' }}>
                {isAr ? 'المرحلة 5: العوامل التشريحية وإشارات السلامة العاجلة' : 'Step 5: Anatomical Integrity & Immediate Red Flags'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {isAr ? 'نحرص على فرز أي إشارات عاجلة قد تحتاج استشارة طبيب مسالك بولية خلال 48 ساعة.' : 'Prioritizing patient safety: any red flag immediately fast-tracks to licensed urology care.'}
              </p>
            </div>

            {/* RED FLAGS BOX */}
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.08)', 
              border: '1px solid rgba(239, 68, 68, 0.3)', 
              borderRadius: 'var(--radius-md)', 
              padding: '16px' 
            }}>
              <div style={{ fontWeight: 600, color: '#F87171', fontSize: '0.9rem', marginBottom: '8px' }}>
                {isAr ? 'علامات الأمان العاجلة (تتطلب رعاية فورية)' : 'Urgent Safety Signals (Immediate Urology Assessment)'}
              </div>
              <div className="option-cards">
                <div 
                  className={`option-card ${inputs.hasPainlessTesticularLump ? 'selected' : ''}`}
                  style={{ borderColor: inputs.hasPainlessTesticularLump ? 'var(--danger-accent)' : undefined }}
                  onClick={() => setInputs({ ...inputs, hasPainlessTesticularLump: !inputs.hasPainlessTesticularLump })}
                >
                  <div className="option-title" style={{ color: inputs.hasPainlessTesticularLump ? '#F87171' : undefined }}>
                    {isAr ? '⚠️ كتلة صلبة غير مؤلمة في الخصية' : '⚠️ Painless Hard Testicular Lump'}
                  </div>
                  <div className="option-desc">{isAr ? 'فحص الموجات الصوتية عاجل خلال 48 ساعة' : 'Requires fast-track ultrasound to rule out neoplasm'}</div>
                </div>

                <div 
                  className={`option-card ${inputs.hasAcuteTesticularPain ? 'selected' : ''}`}
                  style={{ borderColor: inputs.hasAcuteTesticularPain ? 'var(--danger-accent)' : undefined }}
                  onClick={() => setInputs({ ...inputs, hasAcuteTesticularPain: !inputs.hasAcuteTesticularPain })}
                >
                  <div className="option-title" style={{ color: inputs.hasAcuteTesticularPain ? '#F87171' : undefined }}>
                    {isAr ? '⚠️ ألم حاد ومفاجئ في الخصية' : '⚠️ Sudden Acute Testicular Pain'}
                  </div>
                  <div className="option-desc">{isAr ? 'طوارئ لاستبعاد التواء الخصية' : 'Emergency rule-out for torsion or acute infection'}</div>
                </div>

                <div 
                  className={`option-card ${inputs.hasHematospermia ? 'selected' : ''}`}
                  onClick={() => setInputs({ ...inputs, hasHematospermia: !inputs.hasHematospermia })}
                >
                  <div className="option-title">{isAr ? 'دم في السائل المنوي' : 'Blood in Semen (Hematospermia)'}</div>
                  <div className="option-desc">{isAr ? 'مؤشر يستدعي فحص البروستاتا' : 'Warrants genitourinary evaluation'}</div>
                </div>
              </div>
            </div>

            {/* Anatomical History */}
            <div className="form-group">
              <label className="form-label">{isAr ? 'دوالي الخصية أو ثقل في كيس الصفن' : 'Varicocele or Scrotal Heaviness'}</label>
              <select 
                className="form-select"
                value={inputs.varicoceleKnown}
                onChange={(e) => setInputs({ ...inputs, varicoceleKnown: e.target.value as any })}
              >
                <option value="no">{isAr ? 'لا يوجد / فحص سليم' : 'None / Normal examination'}</option>
                <option value="suspected_heaviness">{isAr ? 'أشعر بثقل أو ألم خفيف بعد الوقوف الطويل' : 'Heaviness or dull ache after prolonged standing'}</option>
                <option value="diagnosed_grade1_2">{isAr ? 'مشخصة مسبقاً (درجة خفيفة 1 أو 2)' : 'Diagnosed Grade 1 or 2 Varicocele'}</option>
                <option value="diagnosed_grade3">{isAr ? 'مشخصة مسبقاً (درجة متقدمة 3 واضحة الملمس)' : 'Diagnosed Large Grade 3 Varicocele'}</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">{isAr ? 'تاريخ صحي في الطفولة أو جراحي' : 'Pediatric & Surgical History'}</label>
              <div className="option-cards">
                <div 
                  className={`option-card ${inputs.cryptorchidismHistory ? 'selected' : ''}`}
                  onClick={() => setInputs({ ...inputs, cryptorchidismHistory: !inputs.cryptorchidismHistory })}
                >
                  <div className="option-title">{isAr ? 'الخصية المعلقة في الطفولة' : 'Undescended Testis (Cryptorchidism)'}</div>
                  <div className="option-desc">{isAr ? 'حتى بعد إجراء العملية الجراحية في الصغر' : 'Even if surgically corrected in childhood'}</div>
                </div>

                <div 
                  className={`option-card ${inputs.inguinalHerniaHistory ? 'selected' : ''}`}
                  onClick={() => setInputs({ ...inputs, inguinalHerniaHistory: !inputs.inguinalHerniaHistory })}
                >
                  <div className="option-title">{isAr ? 'عملية فتق إربي سابق' : 'Inguinal Hernia Surgery'}</div>
                  <div className="option-desc">{isAr ? 'فحص سلامة الحبل المنوي' : 'Check vas deferens patency'}</div>
                </div>

                <div 
                  className={`option-card ${inputs.historyOfMumpsAfterPuberty ? 'selected' : ''}`}
                  onClick={() => setInputs({ ...inputs, historyOfMumpsAfterPuberty: !inputs.historyOfMumpsAfterPuberty })}
                >
                  <div className="option-title">{isAr ? 'إصابة بالنكاف بعد البلوغ' : 'Mumps Orchitis Post-Puberty'}</div>
                  <div className="option-desc">{isAr ? 'التهاب الغدة النكافية المصحوب بألم في الخصية' : 'Associated with post-viral germ cell injury'}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', paddingTop: '18px', borderTop: '1px solid var(--border-subtle)' }}>
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={handlePrev}
            disabled={currentStep === 1}
            style={{ opacity: currentStep === 1 ? 0.4 : 1, cursor: currentStep === 1 ? 'not-allowed' : 'pointer' }}
          >
            <ArrowLeft size={16} />
            <span>{isAr ? 'السابق' : 'Previous'}</span>
          </button>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {isAr ? `الخطوة ${currentStep} من 5` : `Step ${currentStep} of 5`}
          </div>

          <button 
            type="button" 
            className="btn-primary" 
            onClick={handleNext}
          >
            <span>{currentStep === 5 ? (isAr ? 'تحليل المؤشرات بالذكاء الاصطناعي' : 'Run Explainable Risk Analysis') : (isAr ? 'التالي' : 'Continue')}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
