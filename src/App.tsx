/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Game from './components/Game';
import { Scenario } from './types';

type Screen = 'home' | 'gallery' | 'game';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const handleSelectScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCurrentScreen('game');
  };

  const handleBrowseGallery = () => {
    setCurrentScreen('gallery');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedScenario(null);
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans selection:bg-yellow-500/30">
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <Home 
            key="home" 
            onSelectScenario={handleSelectScenario} 
            onBrowseGallery={handleBrowseGallery} 
          />
        )}
        
        {currentScreen === 'gallery' && (
          <Gallery 
            key="gallery" 
            onSelectScenario={handleSelectScenario} 
            onBack={handleBackToHome} 
          />
        )}
        
        {currentScreen === 'game' && selectedScenario && (
          <Game 
            key="game" 
            scenario={selectedScenario} 
            onExit={handleBackToHome} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

