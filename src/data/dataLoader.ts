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

// Dynamic level recommendations based on user level (1-100)
export const getLevelRecommendations = (userLevel: number) => {
  // Clamp user level between 1 and 100
  const clampedLevel = Math.max(1, Math.min(100, userLevel));
  
  // Define level ranges and their characteristics (1-100 only)
  const levelRanges = [
    { min: 1, max: 10, category: 'Newbie', focus: 'Common items dengan harga murah untuk pemula' },
    { min: 11, max: 25, category: 'Beginner', focus: 'Common items dan pet dasar' },
    { min: 26, max: 40, category: 'Intermediate', focus: 'Uncommon items dan pet yang lebih baik' },
    { min: 41, max: 60, category: 'Skilled', focus: 'Rare items dan pet menengah' },
    { min: 61, max: 80, category: 'Advanced', focus: 'Epic items dan pet tinggi' },
    { min: 81, max: 100, category: 'Expert', focus: 'Secret items, Mythical pets, dan end-game content' }
  ];

  // Find current level range
  const currentRange = levelRanges.find(range => clampedLevel >= range.min && clampedLevel <= range.max) || levelRanges[levelRanges.length - 1];

  // Get recommendations based on level (1-100)
  let recommendedItems: string[] = [];
  let recommendedPets: string[] = [];

  if (clampedLevel <= 10) {
    // Newbie (1-10): Cheapest common items
    recommendedItems = items
      .filter(item => item.Rarity === 'Common' && item.Price > 0 && item.Price <= 1000)
      .sort((a, b) => a.Price - b.Price)
      .slice(0, 3)
      .map(item => item.Name);
    
    recommendedPets = pets
      .filter(pet => pet.Rarity === 'Common' && pet.Price <= 100)
      .slice(0, 2)
      .map(pet => pet.Name);
  } else if (clampedLevel <= 25) {
    // Beginner (11-25): All common items
    recommendedItems = items
      .filter(item => item.Rarity === 'Common')
      .slice(0, 4)
      .map(item => item.Name);
    
    recommendedPets = pets
      .filter(pet => pet.Rarity === 'Common')
      .slice(0, 2)
      .map(pet => pet.Name);
  } else if (clampedLevel <= 40) {
    // Intermediate (26-40): Uncommon items
    recommendedItems = items
      .filter(item => ['Common', 'Uncommon'].includes(item.Rarity))
      .slice(0, 4)
      .map(item => item.Name);
    
    recommendedPets = pets
      .filter(pet => ['Common', 'Uncommon'].includes(pet.Rarity))
      .slice(0, 3)
      .map(pet => pet.Name);
  } else if (clampedLevel <= 60) {
    // Skilled (41-60): Rare items dan Secret items murah
    recommendedItems = items
      .filter(item => ['Uncommon', 'Rare', 'Secret'].includes(item.Rarity) && item.Price <= 500000000)
      .slice(0, 4)
      .map(item => item.Name);
    
    recommendedPets = pets
      .filter(pet => ['Uncommon', 'Rare'].includes(pet.Rarity))
      .slice(0, 3)
      .map(pet => pet.Name);
  } else if (clampedLevel <= 80) {
    // Advanced (61-80): Secret items dan pets
    recommendedItems = items
      .filter(item => ['Rare', 'Secret'].includes(item.Rarity))
      .slice(0, 4)
      .map(item => item.Name);
    
    recommendedPets = pets
      .filter(pet => ['Rare', 'Secret'].includes(pet.Rarity))
      .slice(0, 3)
      .map(pet => pet.Name);
  } else {
    // Expert (81-100): End-game content - Secret, Prestigious, Mythical
    recommendedItems = items
      .filter(item => ['Secret', 'Prestigious', 'Mythical'].includes(item.Rarity))
      .slice(0, 4)
      .map(item => item.Name);
    
    recommendedPets = pets
      .filter(pet => ['Secret', 'Mythical'].includes(pet.Rarity))
      .slice(0, 3)
      .map(pet => pet.Name);
  }

  return {
    userLevel: clampedLevel,
    minLevel: currentRange.min,
    maxLevel: currentRange.max,
    category: currentRange.category,
    focus: currentRange.focus,
    recommendedItems: [...new Set(recommendedItems)], // Remove duplicates
    recommendedPets: [...new Set(recommendedPets)] // Remove duplicates
  };
};

// Static level recommendations for backward compatibility
export const levelRecommendations = {
  beginner: { 
    minLevel: 1, 
    maxLevel: 15, 
    recommendedItems: ['Apple', 'Battery', 'Bottle Cap']
  },
  intermediate: { 
    minLevel: 16, 
    maxLevel: 50, 
    recommendedItems: ['Forsaken Sigil', 'Valkyrie Helm']
  },
  advanced: { 
    minLevel: 51, 
    maxLevel: 100, 
    recommendedItems: ['Awakened: Angel Engine', 'Awakened: Forsaken Sigil']
  },
  expert: { 
    minLevel: 101, 
    maxLevel: 999, 
    recommendedItems: ['Elder Skull', 'Glacius', 'Volcanic Beast', 'Wishing Star']
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