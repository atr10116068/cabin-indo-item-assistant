import { Item, Pet, CraftingRecipe } from '@/data/gameData';

export const searchItems = (items: Item[], query: string): Item[] => {
  if (!query.trim()) return items;
  
  const searchTerm = query.toLowerCase();
  return items.filter(item => 
    item.name.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm) ||
    item.rarity.toLowerCase().includes(searchTerm) ||
    item.preferred.toLowerCase().includes(searchTerm)
  );
};

export const searchPets = (pets: Pet[], query: string): Pet[] => {
  if (!query.trim()) return pets;
  
  const searchTerm = query.toLowerCase();
  return pets.filter(pet => 
    pet.name.toLowerCase().includes(searchTerm) ||
    pet.description.toLowerCase().includes(searchTerm) ||
    pet.rarity.toLowerCase().includes(searchTerm) ||
    pet.preferred.toLowerCase().includes(searchTerm) ||
    (pet.exchangeRequired && pet.exchangeRequired.toLowerCase().includes(searchTerm))
  );
};

export const searchRecipes = (recipes: CraftingRecipe[], query: string): CraftingRecipe[] => {
  if (!query.trim()) return recipes;
  
  const searchTerm = query.toLowerCase();
  return recipes.filter(recipe => 
    recipe.output.toLowerCase().includes(searchTerm) ||
    recipe.rarity.toLowerCase().includes(searchTerm) ||
    recipe.requirements.some(req => req.name.toLowerCase().includes(searchTerm))
  );
};

export const formatPrice = (price: number): string => {
  if (price === 0) return 'Free';
  if (price >= 1000000000) return `${(price / 1000000000).toFixed(1)}B`;
  if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M`;
  if (price >= 1000) return `${(price / 1000).toFixed(1)}K`;
  return price.toLocaleString();
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};