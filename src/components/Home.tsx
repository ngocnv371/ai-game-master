import { motion } from 'motion/react';
import { featuredScenarios } from '../data/scenarios';
import { Scenario } from '../types';
import { Compass, Sparkles } from 'lucide-react';

interface HomeProps {
  onSelectScenario: (scenario: Scenario) => void;
  onBrowseGallery: () => void;
}

export default function Home({ onSelectScenario, onBrowseGallery }: HomeProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto px-4 py-12"
    >
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-200">
          AI Game Master
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Embark on personalized text-based RPG adventures powered by Gemini. 
          Choose your destiny, shape the narrative, and face the consequences of your actions.
        </p>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold flex items-center gap-3">
            <Sparkles className="text-yellow-500" /> Featured Adventures
          </h2>
          <button 
            onClick={onBrowseGallery}
            className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors font-medium"
          >
            <Compass size={20} /> Browse Gallery
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredScenarios.map((scenario, index) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-gray-800 hover:border-yellow-500/50 transition-all bg-gray-900"
              onClick={() => onSelectScenario(scenario)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={scenario.imageUrl} 
                  alt={scenario.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-500 mb-2">
                  {scenario.genre}
                </span>
                <h3 className="text-2xl font-bold mb-2">{scenario.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {scenario.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
