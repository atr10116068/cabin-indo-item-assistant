'use client';

import { CraftingRecipe, rarityColors } from '@/data/dataLoader';

interface CraftingTableProps {
  recipes: CraftingRecipe[];
  title?: string;
}

export default function CraftingTable({ recipes, title = "Crafting Recipes" }: CraftingTableProps) {
  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    if (price >= 1000000000) return `${(price / 1000000000).toFixed(1)}B`;
    if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `${(price / 1000).toFixed(1)}K`;
    return price.toString();
  };

  if (recipes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No crafting recipes found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{recipes.length} recipes found</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Output</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rarity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirements</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recipes.map((recipe, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{recipe.output}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {formatPrice(recipe.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${rarityColors[recipe.rarity]}`}>
                    {recipe.rarity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {recipe.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-center justify-between text-xs bg-gray-100 rounded px-2 py-1">
                        <span className="text-gray-700">{req.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">x{req.amount}</span>
                          <span className={`px-1 py-0.5 rounded text-xs ${
                            req.category === 'Item' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {req.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}