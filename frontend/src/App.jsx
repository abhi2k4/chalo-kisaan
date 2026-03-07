import React, { lazy, Suspense, useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import InstallBanner from './components/InstallBanner';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

const PlannerPage = lazy(() => import('./pages/PlannerPage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));

function LoadingSpinner() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'60vh' }}>
      <div className="spinner spinner--dark" style={{ width:28, height:28 }} />
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useLocalStorage('ck_language', 'hindi');

  // In-memory state passed from planner → results (same session)
  const [sessionReport, setSessionReport] = useState(null);

  const navigate = useNavigate();

  const handlePlanComplete = useCallback((reportId, planData, farmData, farmImageUrl) => {
    setSessionReport({ reportId, planData, farmData, farmImageUrl });
    navigate('/' + reportId);
  }, [navigate]);

  const handleReset = useCallback(() => {
    setSessionReport(null);
    navigate('/');
  }, [navigate]);

  return (
    <div className="app">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={
            <LandingPage onStart={() => navigate('/plan')} language={language} />
          } />
          <Route path="/plan" element={
            <PlannerPage
              onBack={() => navigate('/')}
              onComplete={handlePlanComplete}
              onLanguageChange={setLanguage}
              language={language}
            />
          } />
          <Route path="/:reportId" element={
            <ResultsPage
              sessionReport={sessionReport}
              language={language}
              onBack={() => navigate('/plan')}
              onReset={handleReset}
            />
          } />
        </Routes>
      </Suspense>
      <InstallBanner />
    </div>
  );
}
