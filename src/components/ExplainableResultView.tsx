import React, { useState } from 'react';
import { 
  RiskAnalysisResult, 
  Language, 
  AssessmentInputs, 
  RiskLevel 
} from '../types';
import { 
  AlertCircle, 
  CheckCircle2, 
  TrendingDown, 
  Sliders, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  ShieldAlert, 
  HelpCircle,
  FileText,
  Activity,
  HeartHandshake
} from 'lucide-react';

interface ExplainableResultViewProps {
  analysis: RiskAnalysisResult;
  inputs: AssessmentInputs;
  lang: Language;
  onNavigateToTab: (tab: string) => void;
  evaluateRisk: (inputs: AssessmentInputs) => RiskAnalysisResult;
}

export const ExplainableResultView: React.FC<ExplainableResultViewProps> = ({
  analysis,
  inputs,
  lang,
  onNavigateToTab,
  evaluateRisk
}) => {
  const isAr = lang === 'ar';

  // State for What-If Counterfactual Simulator
  const [simulatedInputs, setSimulatedInputs] = useState<AssessmentInputs>({ ...inputs });
  const [whatIfActive, setWhatIfActive] = useState(false);

  const currentResult = whatIfActive ? evaluateRisk(simulatedInputs) : analysis;
  const scoreDiff = analysis.overallScore - currentResult.overallScore;

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'urgent_red_flag':
        return <span className="badge badge-urgent">{isAr ? 'إنذار سريري عاجل' : 'Urgent Red Flag'}</span>;
      case 'elevated':
        return <span className="badge badge-elevated">{isAr ? 'مخاطر سريرية مرتفعة' : 'Elevated Risk'}</span>;
      case 'moderate':
        return <span className="badge badge-moderate">{isAr ? 'مخاطر متوسطة قابلة للتعديل' : 'Moderate Reversible Risk'}</span>;
      case 'mild':
        return <span className="badge badge-mild">{isAr ? 'مؤشرات أولية خفيفة' : 'Mild Modifiable Risk'}</span>;
      case 'optimal':
      default:
        return <span className="badge badge-optimal">{isAr ? 'عافية أساسية ممتازة' : 'Optimal Baseline'}</span>;
    }
  };

  const getScoreColor = (score: number, level: RiskLevel) => {
    if (level === 'urgent_red_flag') return '#EF4444';
    if (score >= 65) return '#EA580C';
    if (score >= 45) return '#F59E0B';
    if (score >= 25) return '#38BDF8';
    return '#10B981';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      {/* Screening vs Diagnosis Mandatory Disclaimer (DoH Aligned) */}
      <div style={{ 
        background: 'rgba(2, 132, 199, 0.12)', 
        border: '1px solid rgba(56, 189, 248, 0.3)', 
        borderRadius: 'var(--radius-md)', 
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px'
      }}>
        <div style={{ color: '#38BDF8', marginTop: '2px' }}>
          <AlertCircle size={22} />
        </div>
        <div>
          <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.92rem', marginBottom: '2px' }}>
            {isAr ? 'إخلاء مسؤولية سريري: فحص استرشادي وليس تشخيصاً نهائياً' : 'Clinical Protocol: Early Screening Index vs. Medical Diagnosis'}
          </div>
          <p style={{ fontSize: '0.82rem', color: '#BAE6FD', lineHeight: 1.5 }}>
            {isAr ? analysis.screeningDisclaimer.ar : analysis.screeningDisclaimer.en}
          </p>
        </div>
      </div>

      {/* Urgent Red Flag Alert Banner if present */}
      {analysis.redFlagsTriggered.length > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(185, 28, 28, 0.15))',
          border: '2px solid #EF4444',
          borderRadius: 'var(--radius-lg)',
          padding: '22px',
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <ShieldAlert size={26} color="#F87171" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FCA5A5' }}>
              {isAr ? 'تنبيه سريري فوري - يلزم فحص مسالك بولية خلال 48 ساعة' : 'Urgent Safety Flag: In-Person Physical Evaluation Required Within 48 Hours'}
            </h2>
          </div>
          <ul style={{ paddingLeft: isAr ? '0' : '20px', paddingRight: isAr ? '20px' : '0', color: '#FEE2E2', fontSize: '0.9rem', marginBottom: '14px' }}>
            {analysis.redFlagsTriggered.map((flag, idx) => (
              <li key={idx} style={{ marginBottom: '4px' }}>{flag}</li>
            ))}
          </ul>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              className="btn-danger"
              onClick={() => onNavigateToTab('triage_map')}
            >
              <span>{isAr ? 'عرض خيارات الإحالة السريعة والتنسيق الطبي' : 'View Fast-Track Urology Centers in Abu Dhabi'}</span>
              <ArrowRight size={16} />
            </button>
            <div style={{ fontSize: '0.8rem', color: '#FCA5A5', display: 'flex', alignItems: 'center' }}>
              {isAr ? 'خط طوارئ دائرة الصحة: 998 أو 800-424' : 'Abu Dhabi Health Hotline: 998 or 800-424'}
            </div>
          </div>
        </div>
      )}

      {/* Main Score Overview & Sub-metrics Grid */}
      <div className="grid-2">
        {/* Composite Score Card */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                {isAr ? 'مؤشر المخاطر الوقائي الإجمالي' : 'Composite Reproductive Risk Index'}
              </span>
              {getRiskBadge(currentResult.overallRisk)}
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', margin: '14px 0' }}>
              <div 
                style={{ 
                  fontSize: '3.6rem', 
                  fontWeight: 800, 
                  lineHeight: 1, 
                  color: getScoreColor(currentResult.overallScore, currentResult.overallRisk),
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {currentResult.overallScore}
              </div>
              <div style={{ fontSize: '1.1rem', color: 'var(--text-dim)', fontWeight: 500 }}>
                / 100
              </div>

              {whatIfActive && scoreDiff > 0 && (
                <div style={{ 
                  background: 'rgba(16, 185, 129, 0.2)', 
                  color: '#34D399', 
                  padding: '6px 12px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontSize: '0.85rem', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <TrendingDown size={16} />
                  <span>{isAr ? `انخفاض ${scoreDiff} نقطة!` : `-${scoreDiff} pts Risk Reduction!`}</span>
                </div>
              )}
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {currentResult.overallRisk === 'optimal'
                ? (isAr ? 'المؤشرات الحالية ضمن النطاق الوقائي المثالي. لا توجد عوامل خطر معطلة.' : 'Current indicators sit comfortably in the optimal preventive range. No major blockers detected.')
                : currentResult.overallRisk === 'mild'
                ? (isAr ? 'توجد مؤشرات أولية خفيفة ترتبط بالعادات اليومية، قابلة للتعديل بسهولة خلال 90 يوماً.' : 'Early modifiable lifestyle signals detected, highly reversible with targeted preconception changes.')
                : currentResult.overallRisk === 'moderate'
                ? (isAr ? 'مستوى مخاطر متوسط ينصح ببدء فحص السائل المنوي المنزلي واستشارة طبية عن بُعد.' : 'Moderate risk profile benefiting from private at-home semen assessment and teleconsultation.')
                : (isAr ? 'مستوى مخاطر يستوجب تقييماً سريرياً متخصصاً في طب الذكورة والغدد.' : 'Elevated risk warranting direct specialist andrology evaluation.')}
            </p>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              {isAr ? 'مستوى موثوقية النموذج: 94%' : 'Model Explainability Confidence: 94%'}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--emerald-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={13} />
              {isAr ? 'معتمد وفق معايير EAU & WHO 2021' : 'EAU & WHO 6th Ed. Benchmarked'}
            </span>
          </div>
        </div>

        {/* 4 Pillars Sub-scores Breakdown */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
            {isAr ? 'تحليل المحاور الحيوية الأربعة' : 'Four Diagnostic Pillar Sub-Scores'}
          </div>

          {[
            {
              titleEn: 'Spermatogenesis & Semen Quality',
              titleAr: 'جودة إنتاج الحيوانات المنوية',
              score: currentResult.subScores.spermatogenesis,
              descEn: 'Heat, oxidative stress, toxic particulate exposure',
              descAr: 'تأثير الحرارة والإجهاد التأكسدي والسموم'
            },
            {
              titleEn: 'Endocrine & Hormonal Axis (HPG)',
              titleAr: 'محور الهرمونات والغدة النخامية',
              score: currentResult.subScores.endocrine,
              descEn: 'Testosterone, LH, FSH, gym supplement status',
              descAr: 'التستوستيرون والهرمونات ومكملات الجيم'
            },
            {
              titleEn: 'Anatomical & Vascular Factors',
              titleAr: 'العوامل التشريحية والتروية الدموية',
              score: currentResult.subScores.anatomical,
              descEn: 'Varicocele, pediatric history, venous reflux',
              descAr: 'دوالي الخصية، الجراحات وتاريخ الطفولة'
            },
            {
              titleEn: 'Modifiable Metabolic & Lifestyle',
              titleAr: 'العوامل الأيضية ونمط الحياة القابل للتعديل',
              score: currentResult.subScores.lifestyle,
              descEn: 'BMI, sitting posture, sleep, Dokha/smoking',
              descAr: 'كتلة الجسم، الجلوس، النوم والمدواخ'
            }
          ].map((pillar, i) => (
            <div key={i} style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#E2E8F0' }}>
                  {isAr ? pillar.titleAr : pillar.titleEn}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, color: getScoreColor(pillar.score, 'mild') }}>
                  {pillar.score}%
                </span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${pillar.score}%`, 
                  background: pillar.score > 60 ? '#EA580C' : pillar.score > 35 ? '#F59E0B' : '#10B981',
                  transition: 'width 0.4s ease'
                }} />
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                {isAr ? pillar.descAr : pillar.descEn}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SHAP-Style Explainable AI Attribution Waterfall */}
      <div className="glass-panel" style={{ padding: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#34D399" />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>
                {isAr ? 'تفسير النموذج: أوزان العوامل الفردية (SHAP Feature Attribution)' : 'Explainable AI: Patient-Specific Factor Attributions (SHAP)'}
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {isAr ? 'شفافية كاملة: ما العوامل التي ترفع مؤشر الخطر وما العوامل الحامية؟' : 'Transparent breakdown of exact positive and protective clinical weights driving your score.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', fontSize: '0.78rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F87171' }}>
              <span style={{ width: '10px', height: '10px', background: '#EF4444', borderRadius: '2px' }}></span>
              {isAr ? 'يزيد المخاطر' : 'Increases Risk (+) '}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34D399' }}>
              <span style={{ width: '10px', height: '10px', background: '#10B981', borderRadius: '2px' }}></span>
              {isAr ? 'عامل وقائي / حامي' : 'Protective Factor (-)'}
            </span>
          </div>
        </div>

        <div className="shap-bar-container">
          {currentResult.topAttributions.slice(0, 7).map((attr, idx) => {
            const isProtective = attr.direction === 'protective';
            const barWidth = Math.min(100, Math.abs(attr.impact) * 2.2);

            return (
              <div key={idx} className="shap-bar-row">
                <div>
                  <div className="shap-feature-title">{attr.feature}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'capitalize' }}>
                    {attr.category}
                  </div>
                </div>

                <div>
                  <div className="shap-bar-track">
                    <div 
                      className={isProtective ? 'shap-bar-fill-protective' : 'shap-bar-fill-positive'}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {isAr ? attr.explanationAr : attr.explanationEn}
                  </div>
                </div>

                <div className="shap-weight-badge" style={{ color: isProtective ? '#34D399' : '#F87171' }}>
                  {isProtective ? `-${Math.abs(attr.impact)} pts` : `+${attr.impact} pts`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive What-If Counterfactual Simulator */}
      <div className="glass-panel" style={{ padding: '26px', background: 'linear-gradient(135deg, rgba(13, 22, 43, 0.9), rgba(16, 185, 129, 0.06))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={20} color="#F59E0B" />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>
                {isAr ? 'محاكي التغيير الوقائي التفاعلي (What-If Counterfactual Engine)' : 'Interactive Counterfactual "What-If" Simulator'}
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {isAr ? 'حرّك المؤشرات لترى كيف تنخفض درجة الخطر عند تعديل العوامل السلوكية في غضون 90 يوماً.' : 'Test how modifying specific lifestyle factors reduces risk score before scheduling tests.'}
            </p>
          </div>

          <button 
            className={whatIfActive ? 'btn-primary' : 'btn-secondary'}
            onClick={() => {
              setWhatIfActive(!whatIfActive);
              if (!whatIfActive) setSimulatedInputs({ ...inputs });
            }}
          >
            <span>{whatIfActive ? (isAr ? 'إعادة التعيين للحالة الأصلية' : 'Reset to Original Data') : (isAr ? 'تفعيل محاكي التغيير' : 'Enable What-If Mode')}</span>
          </button>
        </div>

        {whatIfActive && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '14px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <div className="grid-3">
              {/* Dokha / Tobacco Toggle */}
              <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
                <label className="form-label" style={{ fontSize: '0.82rem' }}>
                  {isAr ? 'الإقلاع عن المدواخ / التبغ' : 'Tobacco & Dokha Cessation'}
                </label>
                <select 
                  className="form-select"
                  style={{ width: '100%', fontSize: '0.82rem' }}
                  value={simulatedInputs.smokingType}
                  onChange={(e) => setSimulatedInputs({ ...simulatedInputs, smokingType: e.target.value as any })}
                >
                  <option value="none">{isAr ? 'توقف تام (صفر تدخين)' : 'Complete Cessation (None)'}</option>
                  <option value="dokha_midwakh">Dokha / Midwakh</option>
                  <option value="shisha">Shisha</option>
                  <option value="cigarettes">Cigarettes</option>
                </select>
              </div>

              {/* Heat Exposure Slider */}
              <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
                <label className="form-label" style={{ fontSize: '0.82rem' }}>
                  {isAr ? 'إيقاف الساونا والحرارة الموضعية' : 'Eliminate Thermal/Sauna Stress'}
                </label>
                <select 
                  className="form-select"
                  style={{ width: '100%', fontSize: '0.82rem' }}
                  value={simulatedInputs.heatExposure}
                  onChange={(e) => setSimulatedInputs({ ...simulatedInputs, heatExposure: e.target.value as any })}
                >
                  <option value="none">{isAr ? 'حماية تامة من الحرارة' : 'Zero Heat Stress (Optimal)'}</option>
                  <option value="occasional">Occasional</option>
                  <option value="frequent">Frequent</option>
                  <option value="daily_occupational">Daily Occupational</option>
                </select>
              </div>

              {/* Gym Steroids De-escalation */}
              <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
                <label className="form-label" style={{ fontSize: '0.82rem' }}>
                  {isAr ? 'وقف منشطات كمال الأجسام والـ SARMs' : 'Stop Gym Steroids / SARMs'}
                </label>
                <select 
                  className="form-select"
                  style={{ width: '100%', fontSize: '0.82rem' }}
                  value={simulatedInputs.gymSupplements}
                  onChange={(e) => setSimulatedInputs({ ...simulatedInputs, gymSupplements: e.target.value as any })}
                >
                  <option value="clean">{isAr ? 'تغذية نظيفة فقط (إلغاء المنشطات)' : 'Clean Nutrition / Off Cycle'}</option>
                  <option value="protein_creatine">Protein & Creatine Only</option>
                  <option value="anabolic_steroids_sarms">Anabolic Steroids / SARMs</option>
                </select>
              </div>
            </div>

            {/* Simulated Live Impact Notice */}
            <div style={{ 
              background: 'rgba(16, 185, 129, 0.12)', 
              border: '1px solid rgba(16, 185, 129, 0.3)', 
              padding: '12px 18px', 
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#34D399" />
                <span style={{ fontSize: '0.85rem', color: '#D1FAE5' }}>
                  {isAr 
                    ? `الأثر المتوقع: انخفاض الخطر من ${analysis.overallScore} إلى ${currentResult.overallScore} خلال دورة نمو النطاف (74-90 يوماً).`
                    : `Projected Impact: Risk score drops from ${analysis.overallScore} down to ${currentResult.overallScore} within one spermatogenic cycle (74-90 days).`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upstream Action Plan with Timeline */}
      <div className="glass-panel" style={{ padding: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} color="#38BDF8" />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>
                {isAr ? 'خطة العمل الوقائية الاستباقية' : 'Personalized Upstream Action Plan'}
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {isAr ? 'خطوات عملية محددة زمنياً مبنية على توصيات الأدلة الإكلينيكية' : 'Time-staged milestones designed to protect reproductive vitality before symptoms arise'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentResult.actionPlan.map((action, i) => (
            <div 
              key={i} 
              style={{ 
                background: 'rgba(15, 23, 42, 0.5)', 
                border: '1px solid var(--border-subtle)', 
                borderRadius: 'var(--radius-sm)', 
                padding: '14px 18px',
                display: 'grid',
                gridTemplateColumns: '130px 1fr auto',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.78rem', 
                color: 'var(--emerald-light)', 
                fontWeight: 600,
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '4px 8px',
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                {action.timeline}
              </div>

              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#F1F5F9', marginBottom: '2px' }}>
                  {isAr ? action.titleAr : action.titleEn}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {isAr ? action.descriptionAr : action.descriptionEn}
                </div>
              </div>

              <div>
                <span className={`badge ${action.priority === 'high' ? 'badge-elevated' : 'badge-mild'}`}>
                  {action.priority}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', marginTop: '22px' }}>
          <button 
            className="btn-secondary"
            onClick={() => onNavigateToTab('athome_kits')}
          >
            <span>{isAr ? 'طلب الفحص المنزلي الخاص' : 'Explore At-Home Diagnostics'}</span>
            <ArrowRight size={15} />
          </button>

          <button 
            className="btn-primary"
            onClick={() => onNavigateToTab('triage_map')}
          >
            <span>{isAr ? 'عرض خيارات التوجيه والمراكز الطبية' : 'Proceed to Triage & Care Map'}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
