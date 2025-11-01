'use client';

import { useState } from 'react';
import { items, pets, getLevelRecommendations } from '@/data/dataLoader';
import ItemTable from './ItemTable';
import PetTable from './PetTable';

export default function LevelRecommendations() {
  const [userLevel, setUserLevel] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getRecommendedContent = () => {
    const recommendations = getLevelRecommendations(userLevel);
    
    const recommendedItems = items.filter(item => 
      recommendations.recommendedItems.includes(item.Name)
    );
    
    const recommendedPets = pets.filter(pet => 
      recommendations.recommendedPets.includes(pet.Name)
    );

    return { 
      items: recommendedItems, 
      pets: recommendedPets, 
      info: recommendations 
    };
  };

  const { items: recommendedItems, pets: recommendedPets, info } = getRecommendedContent();

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
              max="100"
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
              Kategori: {info.category}
            </h3>
          </div>
          <p className="text-sm text-blue-700 mb-2">
            Level {info.minLevel}-{info.maxLevel}: {info.focus}
          </p>
          <div className="text-xs text-blue-600 bg-blue-100 rounded px-2 py-1 inline-block">
            Rekomendasi untuk Level {info.userLevel}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {(selectedCategory === 'all' || selectedCategory === 'items') && recommendedItems.length > 0 && (
          <ItemTable 
            items={recommendedItems} 
            title={`Recommended Items for Level ${info.userLevel}`}
          />
        )}
        
        {(selectedCategory === 'all' || selectedCategory === 'pets') && recommendedPets.length > 0 && (
          <PetTable 
            pets={recommendedPets} 
            title={`Recommended Pets for Level ${info.userLevel}`}
          />
        )}
        
        {recommendedItems.length === 0 && recommendedPets.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <p className="text-yellow-800">
              Tidak ada rekomendasi khusus untuk level {userLevel}.
              <br />
              <span className="text-sm">Coba jelajahi item dan pet dari kategori {info.category}!</span>
            </p>
          </div>
        )}
        
        {/* Level Progress Indicator */}
        {(recommendedItems.length > 0 || recommendedPets.length > 0) && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-green-900">Progress Level Anda</h4>
              <span className="text-sm font-bold text-green-700">{info.category}</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2 mb-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                style={{
                  width: `${Math.min(100, ((userLevel - info.minLevel) / (info.maxLevel - info.minLevel)) * 100)}%`
                }}
              ></div>
            </div>
            <p className="text-sm text-green-700">
              Level {userLevel} dari range {info.minLevel}-{info.maxLevel} • Focus: {info.focus}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}