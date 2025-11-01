'use client';

import { useState, useMemo } from 'react';
import SearchBar from '@/components/SearchBar';
import ItemTable from '@/components/ItemTable';
import PetTable from '@/components/PetTable';
import CraftingTable from '@/components/CraftingTable';
import LevelRecommendations from '@/components/LevelRecommendations';
import { items, pets, craftingRecipes } from '@/data/gameData';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'items' | 'pets' | 'crafting' | 'recommendations'>('recommendations');

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.rarity.toLowerCase().includes(query) ||
      item.preferred.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const filteredPets = useMemo(() => {
    if (!searchQuery.trim()) return pets;
    const query = searchQuery.toLowerCase();
    return pets.filter(pet => 
      pet.name.toLowerCase().includes(query) ||
      pet.description.toLowerCase().includes(query) ||
      pet.rarity.toLowerCase().includes(query) ||
      pet.preferred.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const filteredRecipes = useMemo(() => {
    if (!searchQuery.trim()) return craftingRecipes;
    const query = searchQuery.toLowerCase();
    return craftingRecipes.filter(recipe => 
      recipe.output.toLowerCase().includes(query) ||
      recipe.rarity.toLowerCase().includes(query) ||
      recipe.requirements.some(req => req.name.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const tabs = [
    { id: 'recommendations' as const, label: 'Rekomendasi Level', count: null },
    { id: 'items' as const, label: 'Items', count: filteredItems.length },
    { id: 'pets' as const, label: 'Pets', count: filteredPets.length },
    { id: 'crafting' as const, label: 'Crafting', count: filteredRecipes.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏠 Cabin Indo Item Assistant</h1>
          <p className="text-lg text-gray-600">Asisten manajemen item, pet, dan crafting untuk game Indonesia</p>
          <p className="text-sm text-gray-500 mt-2">🚀 Deployed on GitHub Pages</p>
        </div>

        {/* Search Bar */}
        {activeTab !== 'recommendations' && (
          <div className="space-y-4">
            <SearchBar onSearch={setSearchQuery} />
            
            {/* View Toggle for mobile */}
            <div className="flex justify-center sm:hidden">
              <div className="bg-white rounded-lg shadow-sm p-1 flex">
                <button
                  onClick={() => {/* Toggle view */}}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-blue-100 rounded-md transition-colors"
                >
                  Card View
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg transform -translate-y-0.5'
                  : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md hover:shadow-lg'
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-blue-500' : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'recommendations' && <LevelRecommendations />}
          {activeTab === 'items' && <ItemTable items={filteredItems} />}
          {activeTab === 'pets' && <PetTable pets={filteredPets} />}
          {activeTab === 'crafting' && <CraftingTable recipes={filteredRecipes} />}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; 2025 Cabin Indo Item Assistant. Built with Next.js and Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
}
