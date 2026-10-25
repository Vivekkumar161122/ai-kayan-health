import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Package, 
  MapPin, 
  Lock, 
  BarChart3, 
  EyeOff, 
  Globe 
} from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onQuickExit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  onQuickExit
}) => {
  const isAr = lang === 'ar';

  const navItems = [
    {
      id: 'screener',
      labelEn: 'Smart Risk Assessment',
      labelAr: 'التقييم الذكي للمخاطر',
      icon: Activity
    },
    {
      id: 'explainable_ai',
      labelEn: 'Explainable AI & What-If',
      labelAr: 'الذكاء التفسيري ومحاكي التغيير',
      icon: Sparkles
    },
    {
      id: 'athome_kits',
      labelEn: 'At-Home Diagnostics',
      labelAr: 'الفحص المنزلي الخاص',
      icon: Package
    },
    {
      id: 'triage_map',
      labelEn: 'Triage & Care Navigation',
      labelAr: 'التوجيه وشبكة المراكز الطبية',
      icon: MapPin
    },
    {
      id: 'privacy_vault',
      labelEn: 'Privacy & Malaffi Vault',
      labelAr: 'الخصوصية وسيادة البيانات',
      icon: Lock
    },
    {
      id: 'population_analytics',
      labelEn: 'Clinical Impact & Cases',
      labelAr: 'الأثر السريري والحالات الواقعية',
      icon: BarChart3
    }
  ];

  return (
    <header>
      {/* Top discreet bar */}
      <div className="discreet-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
          <span>{isAr ? 'بيانات مشفرة محلياً داخل دولة الإمارات (معايير دائرة الصحة - أبوظبي)' : 'Encrypted Locally in UAE • DoH Abu Dhabi & Malaffi Aligned'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={onQuickExit}
            className="btn-danger"
            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            title={isAr ? 'الخروج السريع للتمويه الفوري' : 'Instant discreet camouflage screen'}
          >
            <EyeOff size={14} />
            {isAr ? 'خروج سريع / خصوصية' : 'Quick Exit / Camouflage'}
          </button>
        </div>
      </div>

      {/* Main Brand & Actions Header */}
      <div className="top-header">
        <div className="brand-wrapper">
          <div className="brand-icon">
            <ShieldCheck size={26} />
          </div>
          <div>
            <div className="brand-title">
              {isAr ? 'صحة الكيان' : 'Al-Kayan Health'}
            </div>
            <div className="brand-subtitle">
              {isAr ? 'الذكاء الاصطناعي الوقائي لصحة الرجل والعافية الإنجابية' : 'Proactive Male Reproductive Health & Explainable AI'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Language Switcher */}
          <button 
            className="btn-secondary"
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          >
            <Globe size={16} />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          {/* SafeID Badge */}
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.1)', 
            border: '1px solid rgba(16, 185, 129, 0.25)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            color: '#34D399',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Lock size={12} />
            <span>SafeID: #KYN-8492-UAE</span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="nav-tabs">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-tab-item ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentTab(item.id)}
            >
              <Icon size={16} />
              <span>{isAr ? item.labelAr : item.labelEn}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
