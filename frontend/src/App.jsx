import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import PlannerPage from './pages/PlannerPage';
import ResultsPage from './pages/ResultsPage';
import InstallBanner from './components/InstallBanner';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

export default function App() {
  const [planData,  setPlanData]  = useLocalStorage('ck_planData', null);
  const [farmData,  setFarmData]  = useLocalStorage('ck_farmData', null);
  const [farmImage, setFarmImage] = useLocalStorage('ck_farmImage', null);
  const [language,  setLanguage]  = useLocalStorage('ck_language', 'hindi');

  // If we have saved plan data, go straight to results
  const [page, setPage] = useState(() => {
    try {
      return window.localStorage.getItem('ck_planData') &&
             window.localStorage.getItem('ck_planData') !== 'null'
        ? 'results' : 'landing';
    } catch { return 'landing'; }
  });

  const goToPlanner = () => setPage('planner');
  const goToLanding = () => {
    setPlanData(null);
    setFarmData(null);
    setFarmImage(null);
    setPage('landing');
  };
  const goToResults = (plan, farm, image) => {
    setPlanData(plan);
    setFarmData(farm);
    // Convert blob URL to base64 data URL for localStorage persistence
    if (image && image.startsWith('blob:')) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxW = 800;
        const scale = Math.min(1, maxW / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        setFarmImage(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = image;
    } else {
      setFarmImage(image);
    }
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
          onBack={() => setPage('planner')}
          onReset={goToLanding}
        />
      )}
      <InstallBanner />
    </div>
  );
}
