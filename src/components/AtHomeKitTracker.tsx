import React, { useState } from 'react';
import { Language, AtHomeDiagnosticKit } from '../types';
import { AVAILABLE_AT_HOME_KITS } from '../data/simulatedData';
import { 
  Package, 
  Truck, 
  Thermometer, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  FileCheck, 
  MapPin,
  Lock,
  ArrowRight
} from 'lucide-react';

interface AtHomeKitTrackerProps {
  lang: Language;
  onNavigateToTab: (tab: string) => void;
}

export const AtHomeKitTracker: React.FC<AtHomeKitTrackerProps> = ({
  lang,
  onNavigateToTab
}) => {
  const isAr = lang === 'ar';
  const [selectedKitId, setSelectedKitId] = useState<string>('kit_semen_microfluidic');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [courierStep, setCourierStep] = useState(2); // In transit simulation

  const activeKit = AVAILABLE_AT_HOME_KITS.find(k => k.id === selectedKitId) || AVAILABLE_AT_HOME_KITS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      {/* Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(15, 23, 42, 0.7))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-mild">
            <ShieldCheck size={12} />
            {isAr ? 'خصوصية تامة وحاجز حرج منخفض' : 'Zero-Stigma Private Assessment'}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {isAr ? 'نقل مبرد معتمد - معايير منظمة الصحة العالمية 2021' : 'WHO 6th Edition Standardized Logistics'}
          </span>
        </div>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF' }}>
          {isAr ? 'منظومة الفحص المنزلي الخاص والنقل المبرد الذكي' : 'At-Home Diagnostics & Discreet Temperature-Controlled Courier'}
        </h1>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '820px' }}>
          {isAr 
            ? 'تجاوز حرج زيارة المستشفى والمختبر التقليدي. احصل على حقيبة جمع العينات في مغلف غير معلم تماماً، مع ناقل خاص مبرد يحافظ على حيوية العينة حتى وصولها لمختبرات أبوظبي المرجعية.'
            : 'Removes the single biggest barrier to male engagement: awkward clinic collection rooms. Order discreetly packaged kits with thermal stabilization delivered and collected at your Abu Dhabi doorstep.'}
        </p>
      </div>

      {/* Kit Catalog Grid */}
      <div className="grid-3">
        {AVAILABLE_AT_HOME_KITS.map(kit => {
          const isSelected = kit.id === selectedKitId;
          return (
            <div 
              key={kit.id}
              className={`glass-panel ${isSelected ? 'active-glow' : ''}`}
              style={{ padding: '20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => setSelectedKitId(kit.id)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <Package size={22} color={isSelected ? '#34D399' : '#38BDF8'} />
                  <span className="badge badge-optimal" style={{ fontSize: '0.72rem' }}>
                    {kit.turnaroundHours}h {isAr ? 'النتيجة خلال' : 'turnaround'}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '6px' }}>
                  {isAr ? kit.nameAr : kit.nameEn}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '14px' }}>
                  {isAr ? kit.descriptionAr : kit.descriptionEn}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {kit.includes.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.76rem', color: '#CBD5E1' }}>
                      <CheckCircle size={13} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                  {kit.whoStandard}
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: isSelected ? '#34D399' : 'var(--text-muted)' }}>
                  {isSelected ? (isAr ? '✓ محدد حالياً' : '✓ Selected') : (isAr ? 'اختيار' : 'Select')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Discreet Logistics Tracker & Chain of Custody */}
      <div className="glass-panel" style={{ padding: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={20} color="#38BDF8" />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>
                {isAr ? 'مسار النقل المبرد المشفر (أبوظبي والعين والظفرة)' : 'Live Temperature-Monitored Chain of Custody'}
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {isAr ? 'مغلف محايد تماماً دون أي إشارة لمحتوى الفحص لحماية خصوصيتك' : '100% plain, unbranded discrete packaging. Specimen maintained at ISO-verified 36-37°C.'}
            </p>
          </div>

          {!orderPlaced ? (
            <button 
              className="btn-primary"
              onClick={() => setOrderPlaced(true)}
            >
              <Package size={16} />
              <span>{isAr ? 'طلب التوصيل المنزلي الآمن' : 'Dispatch Discreet Courier Kit'}</span>
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-optimal">
                <CheckCircle size={13} />
                {isAr ? 'الطلب نشط ومؤمن' : 'Order Dispatched (#AD-7731)'}
              </span>
            </div>
          )}
        </div>

        {/* Courier Stepper */}
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.6)', 
          borderRadius: 'var(--radius-md)', 
          padding: '20px',
          border: '1px solid var(--border-subtle)'
        }}>
          <div className="grid-4">
            {[
              {
                step: 1,
                titleEn: 'Discreet Dispatch',
                titleAr: 'تجهيز الحقيبة المحايدة',
                descEn: 'Sterile thermal container prepared with tamper-evident seal',
                descAr: 'حاوية حرارية معقمة بختم أمان يمنع التلاعب',
                done: true
              },
              {
                step: 2,
                titleEn: 'Doorstep Handover',
                titleAr: 'تسليم آمن للباب',
                descEn: 'Contactless or scheduled courier arrival in Abu Dhabi',
                descAr: 'تسليم مباشر وسري دون أي تفاصيل محرجة',
                done: courierStep >= 2
              },
              {
                step: 3,
                titleEn: 'Cold-Chain Transport',
                titleAr: 'نقل سريع ومضبوط الحرارة',
                descEn: 'Real-time telemetry logging (36.8°C preserved for motility)',
                descAr: 'متابعة لحظية للحرارة للحفاظ على حيوية النطاف',
                done: courierStep >= 3
              },
              {
                step: 4,
                titleEn: 'Reference Lab Analysis',
                titleAr: 'التحليل في المختبر المرجعي',
                descEn: 'Automated CASA scan & board andrologist verification',
                descAr: 'فحص ميكروسكوبي معتمد ومصادقة استشاري الذكورة',
                done: courierStep >= 4
              }
            ].map(s => (
              <div 
                key={s.step} 
                style={{ 
                  borderLeft: isAr ? 'none' : s.done ? '3px solid #10B981' : '3px solid #334155',
                  borderRight: isAr ? s.done ? '3px solid #10B981' : '3px solid #334155' : 'none',
                  paddingLeft: isAr ? '0' : '14px',
                  paddingRight: isAr ? '14px' : '0'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: s.done ? '#34D399' : 'var(--text-dim)', fontWeight: 600 }}>
                  {isAr ? `المرحلة ${s.step}` : `Phase ${s.step}`}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
                  {isAr ? s.titleAr : s.titleEn}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {isAr ? s.descAr : s.descEn}
                </div>
              </div>
            ))}
          </div>

          {/* Telemetry info bar */}
          <div style={{ 
            marginTop: '20px', 
            paddingTop: '16px', 
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.8rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8' }}>
              <Thermometer size={16} />
              <span>{isAr ? 'الحرارة الحالية للحاوية: 36.8°C (ضمن النطاق المثالي للحيوانات المنوية)' : 'Container Sensor Live: 36.8°C (Optimal Viability Window)'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
              <Lock size={14} />
              <span>{isAr ? 'المختبر المرجعي: كليفلاند كلينك أبوظبي / دانة الإمارات' : 'Partner Reference Lab: CCAD / Danat Al Emarat'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
