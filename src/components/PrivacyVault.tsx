import React, { useState } from 'react';
import { Language } from '../types';
import { 
  Lock, 
  ShieldCheck, 
  Key, 
  Eye, 
  Trash2, 
  Check, 
  Database, 
  FileCheck, 
  Share2,
  Server
} from 'lucide-react';

interface PrivacyVaultProps {
  lang: Language;
}

export const PrivacyVault: React.FC<PrivacyVaultProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [shareWithMalaffi, setShareWithMalaffi] = useState(false);
  const [shareWithAssignedDoctorOnly, setShareWithAssignedDoctorOnly] = useState(true);
  const [allowDeidentifiedResearch, setAllowDeidentifiedResearch] = useState(true);
  const [retentionPeriodDays, setRetentionPeriodDays] = useState(90);
  const [dataPurged, setDataPurged] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      {/* Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(15, 23, 42, 0.8))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-optimal">
            <Lock size={12} />
            {isAr ? 'الخصوصية بالتصميم وسيادة البيانات' : 'Privacy-by-Design & Local Data Sovereignty'}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {isAr ? 'متوافق مع المرسوم بقانون اتحادي رقم 45 لسنة 2021 ومعايير دائرة الصحة' : 'UAE Federal Decree-Law No. 45/2021 Compliant'}
          </span>
        </div>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF' }}>
          {isAr ? 'خزنة الخصوصية والتحكم في مشاركة البيانات الصحية' : 'Patient Privacy Vault & Granular Data Consent'}
        </h1>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '820px' }}>
          {isAr
            ? 'صحتك الإنجابية بيانات فائقة الحساسية. تضمن منصة الكيان عدم ربط هويتك الرسمية (رقم الهوية الإماراتية) إلا بموافقتك الصريحة عند تأكيد موعد سريري، مع تشفير محلي كامل داخل إمارة أبوظبي.'
            : 'Male reproductive indicators are among the most private personal health data. Al-Kayan decouples your identity using a zero-knowledge SafeID. You dictate exactly who sees your markers and when data auto-expires.'}
        </p>
      </div>

      {/* SafeID Zero-Knowledge Architecture Card */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
              <Key size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {isAr ? 'المعرّف الآمن المشفر (الصفر معرفة)' : 'Pseudo-Anonymous SafeID'}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34D399', fontFamily: 'var(--font-mono)' }}>
                #KYN-8492-UAE-ZKP
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-optimal">
              <Server size={12} />
              {isAr ? 'استضافة محلية: أبوظبي (G42 Cloud)' : 'In-Country Data Center: Abu Dhabi'}
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {isAr
            ? 'خلال مرحلة الفحص المبدئي، لا يتم طلب اسمك أو رقم هاتفك أو هويتك. يتم توليد هذا الرمز المشفر لربط نتائج الفحص دون تخزين معلومات شخصية قابلة للتعرف.'
            : 'During initial screening, your Emirates ID, real name, and phone number are NEVER linked to your assessment scores. Only a cryptographically salted token is generated.'}
        </p>
      </div>

      {/* Granular Consent Toggles */}
      <div className="glass-panel" style={{ padding: '26px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '16px' }}>
          {isAr ? 'خيارات الموافقة الصريحة والتحكم بالمشاركة' : 'Granular Consent & Access Controls'}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Toggle 1: Assigned Doctor Only */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.5)', 
            padding: '16px', 
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '14px'
          }}>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FFFFFF' }}>
                {isAr ? 'حصر الاطلاع على طبيب الذكورة المعالج فقط' : 'Strict Restrict to Assigned Specialist Only'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {isAr ? 'لن يتمكن أي موظف إداري أو أطراف أخرى من رؤية إجاباتك أو نتائج الفحص.' : 'Ensures non-clinical staff cannot view sensitive lifestyle or semen parameters.'}
              </div>
            </div>
            <button 
              className={shareWithAssignedDoctorOnly ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
              onClick={() => setShareWithAssignedDoctorOnly(!shareWithAssignedDoctorOnly)}
            >
              {shareWithAssignedDoctorOnly ? (isAr ? 'مفعل ✓' : 'Active ✓') : (isAr ? 'تعطيل' : 'Disabled')}
            </button>
          </div>

          {/* Toggle 2: Malaffi Synchronization */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.5)', 
            padding: '16px', 
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '14px'
          }}>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FFFFFF' }}>
                {isAr ? 'المزامنة مع منصة "ملفي" للتبادل الصحي' : 'Synchronize with Abu Dhabi Malaffi Health Exchange'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {isAr ? 'إتاحة التقرير لطبيبك في المستشفيات الحكومية والخاصة لتفادي تكرار التحاليل.' : 'Allows seamless continuity of care across Cleveland Clinic, SSMC, and SEHA networks.'}
              </div>
            </div>
            <button 
              className={shareWithMalaffi ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
              onClick={() => setShareWithMalaffi(!shareWithMalaffi)}
            >
              {shareWithMalaffi ? (isAr ? 'مفعل ✓' : 'Enabled ✓') : (isAr ? 'غير مفعل' : 'Opted Out')}
            </button>
          </div>

          {/* Toggle 3: De-identified Research */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.5)', 
            padding: '16px', 
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '14px'
          }}>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FFFFFF' }}>
                {isAr ? 'المساهمة في أبحاث صحة الرجل الوطنية (مجهولة الهوية تماماً)' : 'Opt-in to De-identified Abu Dhabi Population Health Analytics'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {isAr ? 'تجريد البيانات من أي صفة شخصية للمساعدة في تطوير نماذج الذكاء الاصطناعي الوطنية.' : 'Stripped of all identifiers to advance national male reproductive research.'}
              </div>
            </div>
            <button 
              className={allowDeidentifiedResearch ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
              onClick={() => setAllowDeidentifiedResearch(!allowDeidentifiedResearch)}
            >
              {allowDeidentifiedResearch ? (isAr ? 'مشارك ✓' : 'Consented ✓') : (isAr ? 'غير مشارك' : 'Declined')}
            </button>
          </div>
        </div>

        {/* Right to be Forgotten / Purge */}
        <div style={{ 
          marginTop: '22px', 
          paddingTop: '18px', 
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#F87171' }}>
              {isAr ? 'حق الحذف التام (Right to Erasure)' : 'Right to Erasure & Immediate Data Purge'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {isAr ? 'يمكنك بضغطة واحدة مسح كافة إجاباتك وسجلات التقييم نهائياً من خوادمنا.' : 'Permanently wipe your answers and screening results across all caching tiers.'}
            </div>
          </div>

          {!dataPurged ? (
            <button 
              className="btn-danger"
              onClick={() => setDataPurged(true)}
            >
              <Trash2 size={15} />
              <span>{isAr ? 'مسح بياناتي الآن نهائياً' : 'Purge All My Screening Data'}</span>
            </button>
          ) : (
            <span className="badge badge-optimal">
              <Check size={12} />
              {isAr ? 'تم مسح البيانات نهائياً' : 'Data Completely Purged'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
