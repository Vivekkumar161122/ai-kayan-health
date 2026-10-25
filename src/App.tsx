import React, { useState, useEffect } from 'react';
import { AssessmentInputs, Language, RiskAnalysisResult, SimulatedPatientCase } from './types';
import { evaluateMaleReproductiveRisk } from './utils/riskEngine';
import { SIMULATED_PATIENT_CASES } from './data/simulatedData';
import { Header } from './components/Header';
import { AssessmentIntake } from './components/AssessmentIntake';
import { ExplainableResultView } from './components/ExplainableResultView';
import { AtHomeKitTracker } from './components/AtHomeKitTracker';
import { CareTriageNavigator } from './components/CareTriageNavigator';
import { PrivacyVault } from './components/PrivacyVault';
import { PopulationAnalytics } from './components/PopulationAnalytics';
import { QuickExitModal } from './components/QuickExitModal';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [currentTab, setCurrentTab] = useState<string>('screener');
  const [quickExitOpen, setQuickExitOpen] = useState<boolean>(false);

  // Initialize with Tariq's realistic starting profile
  const [inputs, setInputs] = useState<AssessmentInputs>(SIMULATED_PATIENT_CASES[0].inputs);
  const [analysis, setAnalysis] = useState<RiskAnalysisResult>(() => evaluateMaleReproductiveRisk(inputs));

  // Sync HTML direction attribute on language toggle
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Handle Assessment Completion
  const handleAssessmentComplete = (result: RiskAnalysisResult) => {
    setAnalysis(result);
    setCurrentTab('explainable_ai');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Loading a Case from Population Analytics
  const handleSelectCaseFromAnalytics = (caseItem: SimulatedPatientCase) => {
    setInputs(caseItem.inputs);
    setAnalysis(evaluateMaleReproductiveRisk(caseItem.inputs));
    setCurrentTab('screener');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Camouflage Screen Overlay if activated */}
      {quickExitOpen && (
        <QuickExitModal 
          onClose={() => setQuickExitOpen(false)} 
          lang={lang} 
        />
      )}

      {/* Main Header & Tab Navigation */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        onQuickExit={() => setQuickExitOpen(true)}
      />

      {/* Tab Content Rendering */}
      <main style={{ marginTop: '20px' }}>
        {currentTab === 'screener' && (
          <AssessmentIntake
            inputs={inputs}
            setInputs={setInputs}
            lang={lang}
            onComplete={handleAssessmentComplete}
            evaluateRisk={evaluateMaleReproductiveRisk}
          />
        )}

        {currentTab === 'explainable_ai' && (
          <ExplainableResultView
            analysis={analysis}
            inputs={inputs}
            lang={lang}
            onNavigateToTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            evaluateRisk={evaluateMaleReproductiveRisk}
          />
        )}

        {currentTab === 'athome_kits' && (
          <AtHomeKitTracker
            lang={lang}
            onNavigateToTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'triage_map' && (
          <CareTriageNavigator
            triage={analysis.triageRecommendation}
            overallRisk={analysis.overallRisk}
            lang={lang}
          />
        )}

        {currentTab === 'privacy_vault' && (
          <PrivacyVault
            lang={lang}
          />
        )}

        {currentTab === 'population_analytics' && (
          <PopulationAnalytics
            lang={lang}
            onSelectCase={handleSelectCaseFromAnalytics}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{ 
        marginTop: '60px', 
        paddingTop: '24px', 
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px',
        fontSize: '0.8rem',
        color: 'var(--text-dim)'
      }}>
        <div>
          <span>© 2026 Al-Kayan Health (صحة الكيان) • Abu Dhabi, United Arab Emirates</span>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>UAE Federal Decree-Law No. 45/2021 Compliant</span>
          <span>•</span>
          <span>Malaffi HIE Interoperable</span>
          <span>•</span>
          <span>WHO 6th Edition Lab Manual Standard</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
