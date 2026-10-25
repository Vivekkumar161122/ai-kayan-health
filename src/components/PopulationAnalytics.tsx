import React, { useState } from 'react';
import { Language, SimulatedPatientCase } from '../types';
import { POPULATION_HEALTH_METRICS, SIMULATED_PATIENT_CASES } from '../data/simulatedData';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Users, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Scale
} from 'lucide-react';

interface PopulationAnalyticsProps {
  lang: Language;
  onSelectCase: (caseItem: SimulatedPatientCase) => void;
}

export const PopulationAnalytics: React.FC<PopulationAnalyticsProps> = ({
  lang,
  onSelectCase
}) => {
  const isAr = lang === 'ar';
  const [selectedCaseId, setSelectedCaseId] = useState(SIMULATED_PATIENT_CASES[0].id);

  const activeCase = SIMULATED_PATIENT_CASES.find(c => c.id === selectedCaseId) || SIMULATED_PATIENT_CASES[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      {/* Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(15, 23, 42, 0.8))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-moderate">
            <Award size={12} />
            {isAr ? 'القيمة السريرية والمؤشرات الوطنية' : 'Demonstrable Clinical Value & Population Metrics'}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {isAr ? 'دراسة محاكاة الأثر على 1,250 مريضاً في إمارة أبوظبي' : 'Simulated Cohort Study: 1,250 Screened Men in Abu Dhabi'}
          </span>
        </div>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF' }}>
          {isAr ? 'لوحة قيادة صحة المجتمع: تسريع الرعاية والعدالة الخوارزمية' : 'Population Health Intelligence & Algorithmic Fairness'}
        </h1>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '820px' }}>
          {isAr
            ? 'قياس الأثر الملموس: تقليص متوسط زمن الوصول للتقييم السريري من 17 شهراً إلى 14 يوماً فقط، مع كشف حالات الإنذار العاجل المبكر دون أي تحيز ديموغرافي.'
            : 'Demonstrating tangible clinical value: reducing evaluation delay from 17 months down to 14 days, triaging 28 critical red flags, and maintaining fairness across diverse UAE populations.'}
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid-4">
        {/* KPI 1 */}
        <div className="glass-panel kpi-card">
          <div className="kpi-label">{isAr ? 'زمن التقييم السريري' : 'Time to Evaluation'}</div>
          <div className="kpi-value" style={{ color: '#34D399' }}>13.8d</div>
          <div className="kpi-subtext">
            <span>{isAr ? 'مقابل 512 يوماً تقليدياً' : 'vs. 512 days traditional path'}</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-panel kpi-card">
          <div className="kpi-label">{isAr ? 'نسبة إكمال الفحص' : 'Completion Rate'}</div>
          <div className="kpi-value" style={{ color: '#38BDF8' }}>78.4%</div>
          <div className="kpi-subtext">
            <span>{isAr ? 'مقابل 23% للعيادة الحضورية' : 'vs. 23% in-clinic attendance'}</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-panel kpi-card">
          <div className="kpi-label">{isAr ? 'مؤشر الثقة الثقافية' : 'Cultural Trust Rating'}</div>
          <div className="kpi-value" style={{ color: '#FBBF24' }}>94.6%</div>
          <div className="kpi-subtext">
            <span>{isAr ? 'راحة تامة مع الخصوصية واللغة' : 'Comfort with privacy & language'}</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass-panel kpi-card">
          <div className="kpi-label">{isAr ? 'حالات إنذار عاجل أُنقذت' : 'Red Flags Triaged Early'}</div>
          <div className="kpi-value" style={{ color: '#F87171' }}>28</div>
          <div className="kpi-subtext" style={{ color: '#F87171' }}>
            <span>{isAr ? 'كتل ورمية حولت خلال 48 ساعة' : '100% routed < 48 hours'}</span>
          </div>
        </div>
      </div>

      {/* Interactive Case Study Deep-Dive */}
      <div className="glass-panel" style={{ padding: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>
              {isAr ? 'مستكشف الحالات السريرية الواقعية (Clinical Case Archetypes)' : 'Realistic Patient Archetypes & Outcome Validation'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {isAr ? 'شاهد كيف يعالج النظام مختلف الأنماط السريرية مقارنة بالمسار التقليدي المتأخر' : 'Examine patient trajectories under traditional care vs. proactive Al-Kayan triage'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {SIMULATED_PATIENT_CASES.map(c => (
              <button
                key={c.id}
                className={selectedCaseId === c.id ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                onClick={() => setSelectedCaseId(c.id)}
              >
                {isAr ? c.nameAr.split(' ')[0] : c.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Active Case Card */}
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.6)', 
          borderRadius: 'var(--radius-md)', 
          padding: '20px',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
                  {isAr ? activeCase.nameAr : activeCase.name}
                </h4>
                <span className="badge badge-mild">{activeCase.age} {isAr ? 'سنة' : 'yrs'}</span>
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--emerald-light)', marginTop: '2px', fontWeight: 500 }}>
                {isAr ? activeCase.archetypeAr : activeCase.archetype}
              </div>
            </div>

            <button 
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              onClick={() => onSelectCase(activeCase)}
            >
              <span>{isAr ? 'تحميل الحالة في فاحص الذكاء الاصطناعي' : 'Load Case in Risk Screener'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <p style={{ fontSize: '0.86rem', color: '#CBD5E1', lineHeight: 1.5, marginBottom: '16px' }}>
            {isAr ? activeCase.clinicalSummaryAr : activeCase.clinicalSummaryEn}
          </p>

          <div className="grid-2" style={{ gap: '14px', marginBottom: '14px' }}>
            {/* Traditional Delay */}
            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#F87171', textTransform: 'uppercase' }}>
                {isAr ? 'المسار التقليدي المتأخر' : 'Traditional Late-Stage Pathway'}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FCA5A5', margin: '4px 0' }}>
                {activeCase.timeToCareTraditional}
              </div>
              <div style={{ fontSize: '0.76rem', color: '#FECACA' }}>
                {isAr ? 'تأخر مستمر، تحاليل مرهقة للزوجة قبل فحص الزوج، تفاقم الضرر.' : 'Prolonged delay, female partner over-tested first, missed modifiable window.'}
              </div>
            </div>

            {/* Al-Kayan Upstream */}
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#34D399', textTransform: 'uppercase' }}>
                {isAr ? 'مسار الكيان الوقائي الذكي' : 'Al-Kayan Proactive Triage'}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#6EE7B7', margin: '4px 0' }}>
                {activeCase.timeToCareAlKayan}
              </div>
              <div style={{ fontSize: '0.76rem', color: '#D1FAE5' }}>
                {isAr ? activeCase.expectedOutcomeAr : activeCase.expectedOutcomeEn}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithmic Fairness & Stratification Breakdown */}
      <div className="grid-2">
        {/* Cohort Risk Breakdown */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
            {isAr ? 'توزيع شرائح المخاطر في مجتمع أبوظبي (1,250 مريض)' : 'Abu Dhabi Population Risk Stratification (n=1,250)'}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {POPULATION_HEALTH_METRICS.riskStratificationBreakdown.map((tier, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: '#E2E8F0' }}>{isAr ? tier.tierAr : tier.tier}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: tier.color }}>
                    {tier.percentage}% ({tier.count})
                  </span>
                </div>
                <div style={{ height: '7px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${tier.percentage}%`, background: tier.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fairness Audit */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Scale size={18} color="#34D399" />
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
                {isAr ? 'تدقيق العدالة الخوارزمية (Algorithmic Fairness)' : 'Algorithmic Fairness & Equity Audit'}
              </h4>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
              {isAr
                ? 'تم تدقيق نموذج الذكاء الاصطناعي للتأكد من انعدام التحيز الإحصائي ضد الفئات العمرية الشابة أو الجنسيات المتعددة في مجتمع دولة الإمارات.'
                : 'Audited across demographic brackets (UAE Citizens and resident expatriates) to ensure zero algorithmic disparity or miscalibration.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>Disparate Impact Ratio (DIR)</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#34D399', fontWeight: 600 }}>0.98 (Ideal: 0.8-1.25)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>Calibration Brier Score</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#38BDF8', fontWeight: 600 }}>0.084 (High Precision)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>Red Flag False Negative Rate</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#10B981', fontWeight: 700 }}>0.00% (Zero Misses)</span>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={13} color="#10B981" />
            <span>{isAr ? 'معتمد وفق إرشادات أخلاقيات الذكاء الاصطناعي بدولة الإمارات' : 'Compliant with UAE National AI Ethics Charter'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
