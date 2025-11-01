export interface Item {
  name: string;
  price: number;
  limited: boolean;
  chance: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Secret' | 'Prestigious' | 'Limited';
  description: string;
  preferred: string;
  expGain: number;
}

export interface Pet {
  name: string;
  price: number;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Secret';
  chance: string;
  description: string;
  preferred: string;
  expGain: number;
  exchangeRequired?: string;
  exchangeAmount?: number;
}

export interface CraftingRecipe {
  output: string;
  price: number;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Secret' | 'Prestigious';
  requirements: Array<{
    name: string;
    amount: number;
    category: 'Item' | 'Pet';
  }>;
}

export const items: Item[] = [
  {
    name: 'Apple',
    price: 500,
    limited: false,
    chance: '1/20',
    rarity: 'Common',
    description: 'Juicy roadside find from small orchards. worth 500; prefers Grass.',
    preferred: 'Grass',
    expGain: 50
  },
  {
    name: 'Battery',
    price: 1000,
    limited: false,
    chance: '1/20',
    rarity: 'Common',
    description: 'A leftover spark from old rigs. worth 1000; prefers Rock.',
    preferred: 'Rock',
    expGain: 100
  },
  {
    name: 'Bottle Cap',
    price: 250,
    limited: false,
    chance: '1/20',
    rarity: 'Common',
    description: 'Tin tokens of travelers. worth 250; prefers LeafyGrass.',
    preferred: 'LeafyGrass',
    expGain: 40
  },
  {
    name: 'Awakened: Angel Engine',
    price: 0,
    limited: false,
    chance: '0',
    rarity: 'Prestigious',
    description: 'The hymn became motion—worth 0; no preferred ground.',
    preferred: '',
    expGain: 0
  },
  {
    name: 'Awakened: Galaxy',
    price: 0,
    limited: false,
    chance: '0',
    rarity: 'Prestigious',
    description: 'Stars learned to dance—worth 0; no preferred ground.',
    preferred: '',
    expGain: 0
  },
  {
    name: 'Awakened: Gear Of Time',
    price: 0,
    limited: false,
    chance: '0',
    rarity: 'Prestigious',
    description: 'Hours unfurl like wings—worth 0; no preferred ground.',
    preferred: '',
    expGain: 0
  },
  {
    name: 'COIN I',
    price: 0,
    limited: true,
    chance: '0',
    rarity: 'Limited',
    description: 'Independent Limited Item',
    preferred: '',
    expGain: 0
  },
  {
    name: 'COIN H',
    price: 0,
    limited: true,
    chance: '0',
    rarity: 'Limited',
    description: 'Independent Limited Item',
    preferred: '',
    expGain: 0
  },
  {
    name: 'COIN 0',
    price: 0,
    limited: true,
    chance: '0',
    rarity: 'Limited',
    description: 'Independent Limited Item',
    preferred: '',
    expGain: 0
  },
  {
    name: 'BROKEN COIN P',
    price: 0,
    limited: true,
    chance: '0',
    rarity: 'Limited',
    description: 'Independent Limited Item',
    preferred: '',
    expGain: 0
  }
];

export const pets: Pet[] = [
  {
    name: 'Poop',
    price: 25,
    rarity: 'Common',
    chance: '1/5',
    description: 'Joke-that-got-loose with surprising charm. worth 25; prefers Anywhere.',
    preferred: 'Anywhere',
    expGain: 50
  },
  {
    name: 'Pumpkin',
    price: 100,
    rarity: 'Uncommon',
    chance: '1/5',
    description: 'Lantern-hearted friend that loves autumn. worth 100; prefers Cave.',
    preferred: 'Cave',
    expGain: 50
  },
  {
    name: 'Volcanic Beast',
    price: 100000000,
    rarity: 'Secret',
    chance: '1/25000',
    description: 'Magma-backed guardian that purrs lava. worth 651000000; prefers Cave.',
    preferred: 'Cave',
    expGain: 1000000,
    exchangeRequired: 'Corrupted Relic',
    exchangeAmount: 2
  },
  {
    name: 'Wishing Star',
    price: 100000000,
    rarity: 'Secret',
    chance: '1/25000',
    description: 'Pocket comet that keeps promises. worth 651100000; prefers MainWater.',
    preferred: 'MainWater',
    expGain: 1000000,
    exchangeRequired: 'Heavenly Relic',
    exchangeAmount: 2
  }
];

export const craftingRecipes: CraftingRecipe[] = [
  {
    output: 'Awakened: Angel Engine',
    price: 29999999999,
    rarity: 'Prestigious',
    requirements: [
      { name: 'Angel Engine', amount: 10, category: 'Item' },
      { name: 'Seraphim Wing', amount: 44, category: 'Item' },
      { name: 'Celestial Gem', amount: 99, category: 'Item' },
      { name: 'Angel Statue', amount: 111, category: 'Item' },
      { name: 'Diamond', amount: 444, category: 'Item' },
      { name: 'Sunflower', amount: 999, category: 'Item' },
      { name: 'Painting Board', amount: 444, category: 'Item' },
      { name: 'Sapphire', amount: 444, category: 'Item' },
      { name: 'Feather', amount: 4444, category: 'Item' },
      { name: 'Fallen Angel', amount: 444, category: 'Pet' },
      { name: 'Snow Angel', amount: 444, category: 'Pet' },
      { name: 'Ghost Bride', amount: 11, category: 'Pet' }
    ]
  },
  {
    output: 'Awakened: Galaxy',
    price: 7500000000,
    rarity: 'Prestigious',
    requirements: [
      { name: 'Galaxy', amount: 10, category: 'Item' },
      { name: 'Satelite', amount: 25, category: 'Item' },
      { name: 'Crewmate', amount: 25, category: 'Item' },
      { name: 'Chrono Relic', amount: 25, category: 'Item' },
      { name: 'Timeworn Crown', amount: 250, category: 'Item' },
      { name: 'Ruby', amount: 250, category: 'Item' },
      { name: 'Rose', amount: 999, category: 'Item' },
      { name: 'Apple', amount: 999, category: 'Item' },
      { name: 'Red Martian', amount: 49, category: 'Pet' },
      { name: 'Crimson Devil', amount: 9, category: 'Pet' },
      { name: 'Eclipse Dragon', amount: 49, category: 'Pet' }
    ]
  }
];

export const rarityColors: Record<string, string> = {
  Common: 'text-gray-600 bg-gray-100',
  Uncommon: 'text-green-600 bg-green-100',
  Rare: 'text-blue-600 bg-blue-100',
  Epic: 'text-purple-600 bg-purple-100',
  Legendary: 'text-yellow-600 bg-yellow-100',
  Secret: 'text-red-600 bg-red-100',
  Prestigious: 'text-pink-600 bg-pink-100',
  Limited: 'text-orange-600 bg-orange-100'
};

export const levelRecommendations = {
  beginner: { minLevel: 1, maxLevel: 10, recommendedItems: ['Apple', 'Bottle Cap', 'Poop'] },
  intermediate: { minLevel: 11, maxLevel: 50, recommendedItems: ['Battery', 'Pumpkin'] },
  advanced: { minLevel: 51, maxLevel: 100, recommendedItems: ['Awakened: Angel Engine', 'Awakened: Galaxy'] },
  expert: { minLevel: 101, maxLevel: 999, recommendedItems: ['Volcanic Beast', 'Wishing Star'] }
};