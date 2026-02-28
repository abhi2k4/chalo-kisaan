import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import PlannerPage from './pages/PlannerPage';
import ResultsPage from './pages/ResultsPage';
import InstallBanner from './components/InstallBanner';
import './App.css';

export default function App() {
  const [page,      setPage]      = useState('landing');
  const [planData,  setPlanData]  = useState(null);
  const [farmData,  setFarmData]  = useState(null);
  const [farmImage, setFarmImage] = useState(null);
  const [language,  setLanguage]  = useState('hindi');

  const goToPlanner = () => setPage('planner');
  const goToLanding = () => setPage('landing');
  const goToResults = (plan, farm, image) => {
    setPlanData(plan);
    setFarmData(farm);
    setFarmImage(image);
    // carry the language the planner detected/used into results
    if (farm?.language) setLanguage(farm.language);
    setPage('results');
  };

  return (
    <div className="app">
      {page === 'landing' && (
        <LandingPage onStart={goToPlanner} language={language} />
      )}
      {page === 'planner' && (
        <PlannerPage
          onBack={goToLanding}
          onComplete={goToResults}
          onLanguageChange={setLanguage}
        />
      )}
      {page === 'results' && (
        <ResultsPage
          planData={planData}
          farmData={farmData}
          farmImage={farmImage}
          language={language}
          onBack={goToPlanner}
          onReset={goToLanding}
        />
      )}
      <InstallBanner />
    </div>
  );
}
