'use client';

import { Item, rarityColors } from '@/data/gameData';
import { formatPrice } from '@/utils/helpers';

interface ItemCardProps {
  items: Item[];
  title?: string;
}

export default function ItemCard({ items, title = "Items" }: ItemCardProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No items found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{items.length} items found</p>
      </div>
      
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
              {item.limited && (
                <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
                  LIMITED
                </span>
              )}
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Price:</span>
                <span className="font-medium">{formatPrice(item.price)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Rarity:</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${rarityColors[item.rarity]}`}>
                  {item.rarity}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Chance:</span>
                <span>{item.chance || 'N/A'}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Preferred:</span>
                <span>{item.preferred || 'None'}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">EXP:</span>
                <span>{item.expGain.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-600 line-clamp-3" title={item.description}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}