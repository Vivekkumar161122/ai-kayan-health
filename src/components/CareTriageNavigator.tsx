import React, { useState } from 'react';
import { Language, TriageTier, RiskLevel } from '../types';
import { ABU_DHABI_CLINICAL_FACILITIES } from '../utils/riskEngine';
import { 
  MapPin, 
  PhoneCall, 
  Video, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  Building,
  UserCheck
} from 'lucide-react';

interface CareTriageNavigatorProps {
  triage: TriageTier;
  overallRisk: RiskLevel;
  lang: Language;
}

export const CareTriageNavigator: React.FC<CareTriageNavigatorProps> = ({
  triage,
  overallRisk,
  lang
}) => {
  const isAr = lang === 'ar';
  const [selectedFacility, setSelectedFacility] = useState(0);
  const [bookedTelehealth, setBookedTelehealth] = useState(false);

  const getUrgencyBadge = (urgency: TriageTier['urgency']) => {
    switch (urgency) {
      case 'urgent_48_hours':
        return <span className="badge badge-urgent">{isAr ? 'عاجل: خلال 48 ساعة' : 'Urgent: Within 48 Hours'}</span>;
      case 'recommended_2_weeks':
        return <span className="badge badge-elevated">{isAr ? 'موصى به: خلال أسبوعين' : 'Recommended: Within 2 Weeks'}</span>;
      case 'recommended_4_weeks':
        return <span className="badge badge-moderate">{isAr ? 'موصى به: خلال 4 أسابيع' : 'Recommended: Within 4 Weeks'}</span>;
      default:
        return <span className="badge badge-optimal">{isAr ? 'روتين وقائي دوري' : 'Routine Preventive'}</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(15, 23, 42, 0.8))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-optimal">
            <UserCheck size={12} />
            {isAr ? 'إشراف طبي بشري معتمد' : 'Mandatory Human Clinical Oversight'}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {isAr ? 'شبكة مراكز الرعاية الصحية المعتمدة بأبوظبي' : 'Abu Dhabi Accredited Provider Network'}
          </span>
        </div>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF' }}>
          {isAr ? 'مسار التوجيه الآمن وشبكة طب الذكورة المعتمدة' : 'Safe Clinical Triage & Accredited Referral Pathways'}
        </h1>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '820px' }}>
          {isAr 
            ? 'توجيه آمن ومدروس يحفظ كرامة المريض ويوصله بالطبيب المناسب في الوقت المناسب دون تكرار الفحوصات أو التردد بين عيادات غير مختصة.'
            : 'Connecting patients safely to the right tier of care: self-care guidance, primary lifestyle medicine, tele-andrology, or urgent microsurgical and fertility centers.'}
        </p>
      </div>

      {/* Recommended Care Tier Box */}
      <div className="glass-panel" style={{ padding: '24px', borderLeft: isAr ? 'none' : '4px solid #10B981', borderRight: isAr ? '4px solid #10B981' : 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              {isAr ? 'مستوى التوجيه السريري المستهدف' : 'Target Care Stratification Tier'}
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>
              {isAr ? triage.titleAr : triage.titleEn}
            </h2>
          </div>
          {getUrgencyBadge(triage.urgency)}
        </div>

        <p style={{ fontSize: '0.9rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '16px' }}>
          {isAr ? triage.descriptionAr : triage.descriptionEn}
        </p>

        <div style={{ 
          background: 'rgba(15, 23, 42, 0.5)', 
          padding: '16px', 
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#38BDF8', marginBottom: '8px' }}>
            {isAr ? 'الإجراءات الطبية الموصى بها:' : 'Recommended Clinical Protocols:'}
          </div>
          <div className="grid-2">
            {triage.recommendedActions.map((action, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8rem', color: '#E2E8F0' }}>
                <CheckCircle2 size={14} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          {!bookedTelehealth ? (
            <button 
              className="btn-primary"
              onClick={() => setBookedTelehealth(true)}
            >
              <Video size={16} />
              <span>{isAr ? 'حجز استشارة خاصة عن بُعد (عبر تطبيق صحة)' : 'Book Private Video Teleconsultation'}</span>
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-optimal">
                <CheckCircle2 size={14} />
                {isAr ? 'تم تأكيد موعد الاستشارة عن بُعد (#TK-392)' : 'Telehealth Confirmed (#TK-392)'}
              </span>
            </div>
          )}

          <a 
            href="tel:800424" 
            className="btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <PhoneCall size={16} />
            <span>{isAr ? 'خط استفسارات الرعاية الصحية: 800-424' : 'DoH Health Support Line: 800-424'}</span>
          </a>
        </div>
      </div>

      {/* Accredited Abu Dhabi Health Facilities Navigator */}
      <div className="glass-panel" style={{ padding: '26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Building size={20} color="#34D399" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>
            {isAr ? 'المراكز والمستشفيات المتخصصة في إمارة أبوظبي' : 'Accredited Abu Dhabi Centers & Hospital Endpoints'}
          </h3>
        </div>

        <div className="grid-2">
          {ABU_DHABI_CLINICAL_FACILITIES.map((fac, idx) => (
            <div 
              key={idx}
              className={`glass-panel ${selectedFacility === idx ? 'active-glow' : ''}`}
              style={{ padding: '16px', cursor: 'pointer', background: 'rgba(15, 23, 42, 0.6)' }}
              onClick={() => setSelectedFacility(idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <span className="badge badge-mild" style={{ fontSize: '0.7rem' }}>
                  {fac.type}
                </span>
                <MapPin size={15} color="#38BDF8" />
              </div>
              <h4 style={{ fontSize: '0.96rem', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
                {isAr ? fac.nameAr : fac.nameEn}
              </h4>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {fac.location}
              </div>

              <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--emerald-light)' }}>
                  {isAr ? 'ربط مباشر مع منصة ملفي' : 'Direct Malaffi HIE Interop'}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{isAr ? 'تفاصيل المركز' : 'Center Info'}</span>
                  <ExternalLink size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
