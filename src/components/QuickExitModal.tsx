import React from 'react';
import { Eye, ArrowRight, TrendingUp, Trophy } from 'lucide-react';
import { Language } from '../types';

interface QuickExitModalProps {
  onClose: () => void;
  lang: Language;
}

export const QuickExitModal: React.FC<QuickExitModalProps> = ({ onClose, lang }) => {
  const isAr = lang === 'ar';

  return (
    <div className="camouflage-screen">
      {/* Top discreet bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
            <Trophy size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1.1rem' }}>
              {isAr ? 'أخبار رياضة الإمارات والخليج' : 'UAE National Sports & Business Wire'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              {isAr ? 'تحديثات الدوري الإماراتي للمحترفين وبطولات الجوجيتسو' : 'Live updates: UAE Pro League, Jiu-Jitsu Championship & Markets'}
            </div>
          </div>
        </div>

        <button 
          className="btn-secondary"
          onClick={onClose}
          style={{ fontSize: '0.8rem', padding: '6px 14px', background: '#1E293B' }}
        >
          <Eye size={14} />
          <span>{isAr ? 'العودة للبوابة الخاصة' : 'Resume Private Portal'}</span>
        </button>
      </div>

      {/* Camouflage News Articles */}
      <div className="grid-3" style={{ marginTop: '20px' }}>
        <div style={{ background: '#1E293B', padding: '20px', borderRadius: '12px' }}>
          <span style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 600 }}>UAE PRO LEAGUE</span>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#FFF', margin: '6px 0' }}>
            {isAr ? 'نادي العين يحقق فوزاً ثميناً في استاد هزاع بن زايد' : 'Al Ain FC Secures Victory in Thrilling AFC Match at Hazza Bin Zayed'}
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
            {isAr ? 'حضور جماهيري لافت وأداء فني رفيع في الجولة الحاسمة.' : 'Spectacular crowd attendance and defensive discipline in the final quarter.'}
          </p>
        </div>

        <div style={{ background: '#1E293B', padding: '20px', borderRadius: '12px' }}>
          <span style={{ fontSize: '0.75rem', color: '#34D399', fontWeight: 600 }}>ABU DHABI MARKETS</span>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#FFF', margin: '6px 0' }}>
            {isAr ? 'سوق أبوظبي للأوراق المالية يغلق على مكاسب قياسية' : 'ADX Index Closes Higher Amid Strong Technology & Energy Inflows'}
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
            {isAr ? 'سيولة تجاوزت 1.8 مليار درهم وسط تفاؤل المستثمرين.' : 'Liquidity exceeds AED 1.8 billion driven by regional institutional investors.'}
          </p>
        </div>

        <div style={{ background: '#1E293B', padding: '20px', borderRadius: '12px' }}>
          <span style={{ fontSize: '0.75rem', color: '#FBBF24', fontWeight: 600 }}>JIU-JITSU CHAMPIONSHIP</span>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#FFF', margin: '6px 0' }}>
            {isAr ? 'أبوظبي تستضيف بطولة العالم لمحترفي الجوجيتسو بمشاركة دولية' : 'Abu Dhabi World Professional Jiu-Jitsu Championship Opens'}
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
            {isAr ? 'أكثر من 5,000 لاعب ولاعبة يتنافسون في مبادلة أرينا.' : 'Over 5,000 athletes from 120 nations compete at Mubadala Arena.'}
          </p>
        </div>
      </div>
    </div>
  );
};
