'use client';

import { useState } from 'react';
import { items, pets, levelRecommendations } from '@/data/gameData';
import ItemTable from './ItemTable';
import PetTable from './PetTable';

export default function LevelRecommendations() {
  const [userLevel, setUserLevel] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCurrentLevelCategory = () => {
    if (userLevel >= 1 && userLevel <= 10) return 'beginner';
    if (userLevel >= 11 && userLevel <= 50) return 'intermediate';
    if (userLevel >= 51 && userLevel <= 100) return 'advanced';
    return 'expert';
  };

  const getRecommendedItems = () => {
    const category = getCurrentLevelCategory();
    const recommended = levelRecommendations[category as keyof typeof levelRecommendations];
    
    const recommendedItems = items.filter(item => 
      recommended.recommendedItems.includes(item.name)
    );
    
    const recommendedPets = pets.filter(pet => 
      recommended.recommendedItems.includes(pet.name)
    );

    return { items: recommendedItems, pets: recommendedPets, category: recommended };
  };

  const { items: recommendedItems, pets: recommendedPets, category } = getRecommendedItems();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Rekomendasi Berdasarkan Level</h2>
      
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-3">
            <label htmlFor="userLevel" className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Level Anda:
            </label>
            <input
              id="userLevel"
              type="number"
              min="1"
              max="999"
              value={userLevel}
              onChange={(e) => setUserLevel(parseInt(e.target.value) || 1)}
              className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <label htmlFor="category" className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Tampilkan:
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">Semua Rekomendasi</option>
              <option value="items">Item Saja</option>
              <option value="pets">Pet Saja</option>
            </select>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <h3 className="font-medium text-blue-900">
              {getCurrentLevelCategory().charAt(0).toUpperCase() + getCurrentLevelCategory().slice(1)} Level Range
            </h3>
          </div>
          <p className="text-sm text-blue-700">
            Level {category.minLevel}-{category.maxLevel}: Perfect for your current progress!
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {(selectedCategory === 'all' || selectedCategory === 'items') && recommendedItems.length > 0 && (
          <ItemTable 
            items={recommendedItems} 
            title={`Recommended Items for Level ${userLevel}`}
          />
        )}
        
        {(selectedCategory === 'all' || selectedCategory === 'pets') && recommendedPets.length > 0 && (
          <PetTable 
            pets={recommendedPets} 
            title={`Recommended Pets for Level ${userLevel}`}
          />
        )}
        
        {recommendedItems.length === 0 && recommendedPets.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <p className="text-yellow-800">
              No specific recommendations available for level {userLevel}.
              <br />
              <span className="text-sm">Try exploring items and pets from different categories!</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}