import { motion } from 'motion/react';
import { galleryScenarios } from '../data/scenarios';
import { Scenario } from '../types';
import { ArrowLeft, Search } from 'lucide-react';
import { useState } from 'react';

interface GalleryProps {
  onSelectScenario: (scenario: Scenario) => void;
  onBack: () => void;
}

export default function Gallery({ onSelectScenario, onBack }: GalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredScenarios = galleryScenarios.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-6xl mx-auto px-4 py-12"
    >
      <div className="flex items-center gap-4 mb-12">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-200">
          Scenario Gallery
        </h1>
      </div>

      <div className="mb-12 relative max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl leading-5 bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
          placeholder="Search by title, genre, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredScenarios.map((scenario, index) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="group relative rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-yellow-500/50 transition-all bg-gray-900 flex flex-col h-full"
            onClick={() => onSelectScenario(scenario)}
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={scenario.imageUrl} 
                alt={scenario.title} 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-500 mb-1">
                {scenario.genre}
              </span>
              <h3 className="text-xl font-bold mb-2">{scenario.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-4 flex-1">
                {scenario.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredScenarios.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          No scenarios found matching your search.
        </div>
      )}
    </motion.div>
  );
}
