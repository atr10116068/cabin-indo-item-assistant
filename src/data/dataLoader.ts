// JSON data loaders for external config files
import itemConfig from './item_config.json';
import petConfig from './pet_config.json';
import craftingConfig from './crafting_config.json';

// Type definitions based on JSON structure - flexible types
export interface Item {
  Name: string;
  Price: number;
  Limited: boolean;
  Chance: string;
  Rarity: string;
  Description: string;
  Preferred: string;
  ExpGain: number;
}

export interface Pet {
  Name: string;
  Price: number;
  Rarity: string;
  Chance: string;
  Description: string;
  Preferred: string;
  ExpGain: number;
  ExchangeRequired?: string | null;
  ExchangeAmount?: number;
}

export interface CraftingRequirement {
  name: string;
  amount: number;
  category: string;
}

export interface CraftingRecipe {
  output: string;
  price: number;
  rarity: string;
  requirements: CraftingRequirement[];
}

// Load and transform data from JSON files with proper type casting
export const items: Item[] = (itemConfig.items as Item[]) || [];
export const pets: Pet[] = (petConfig.pets as Pet[]) || [];
export const craftingRecipes: CraftingRecipe[] = (craftingConfig.recipes as CraftingRecipe[]) || [];

// Rarity color mapping
export const rarityColors: Record<string, string> = {
  Common: 'text-gray-600 bg-gray-100',
  Uncommon: 'text-green-600 bg-green-100',
  Rare: 'text-blue-600 bg-blue-100',
  Epic: 'text-purple-600 bg-purple-100',
  Legendary: 'text-yellow-600 bg-yellow-100',
  Secret: 'text-red-600 bg-red-100',
  Mythical: 'text-indigo-600 bg-indigo-100',
  Prestigious: 'text-pink-600 bg-pink-100',
  Limited: 'text-orange-600 bg-orange-100'
};

// Level recommendations based on item/pet analysis
export const levelRecommendations = {
  beginner: { 
    minLevel: 1, 
    maxLevel: 10, 
    recommendedItems: items
      .filter(item => item.Rarity === 'Common' && item.Price <= 1000)
      .slice(0, 5)
      .map(item => item.Name)
  },
  intermediate: { 
    minLevel: 11, 
    maxLevel: 50, 
    recommendedItems: items
      .filter(item => ['Uncommon', 'Rare'].includes(item.Rarity) && item.Price > 1000 && item.Price <= 10000000)
      .slice(0, 5)
      .map(item => item.Name)
  },
  advanced: { 
    minLevel: 51, 
    maxLevel: 100, 
    recommendedItems: items
      .filter(item => ['Epic', 'Legendary'].includes(item.Rarity) && item.Price > 10000000)
      .slice(0, 5)
      .map(item => item.Name)
  },
  expert: { 
    minLevel: 101, 
    maxLevel: 999, 
    recommendedItems: [
      ...items.filter(item => ['Secret', 'Mythical', 'Prestigious'].includes(item.Rarity)).slice(0, 3).map(item => item.Name),
      ...pets.filter(pet => pet.Rarity === 'Secret').slice(0, 2).map(pet => pet.Name)
    ]
  }
};

// Utility functions for data analysis
export const getItemsByRarity = (rarity: string): Item[] => {
  return items.filter(item => item.Rarity === rarity);
};

export const getPetsByRarity = (rarity: string): Pet[] => {
  return pets.filter(pet => pet.Rarity === rarity);
};

export const getItemsByTerrain = (terrain: string): Item[] => {
  return items.filter(item => item.Preferred === terrain);
};

export const getPetsByTerrain = (terrain: string): Pet[] => {
  return pets.filter(pet => pet.Preferred === terrain);
};

export const getRecipeByOutput = (output: string): CraftingRecipe | undefined => {
  return craftingRecipes.find(recipe => recipe.output === output);
};

// Statistics from loaded data
export const dataStats = {
  totalItems: items.length,
  totalPets: pets.length,
  totalRecipes: craftingRecipes.length,
  rarityDistribution: {
    items: items.reduce((acc, item) => {
      acc[item.Rarity] = (acc[item.Rarity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    pets: pets.reduce((acc, pet) => {
      acc[pet.Rarity] = (acc[pet.Rarity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  },
  terrainDistribution: {
    items: items.reduce((acc, item) => {
      if (item.Preferred) {
        acc[item.Preferred] = (acc[item.Preferred] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>),
    pets: pets.reduce((acc, pet) => {
      if (pet.Preferred) {
        acc[pet.Preferred] = (acc[pet.Preferred] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>)
  }
};

// Export metadata from config files
export const configMetadata = {
  items: itemConfig.metadata,
  pets: petConfig.metadata,
  crafting: craftingConfig.metadata
};