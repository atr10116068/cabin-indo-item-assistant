'use client';

import { Item, rarityColors } from '@/data/gameData';

interface ItemTableProps {
  items: Item[];
  title?: string;
}

export default function ItemTable({ items, title = "Items" }: ItemTableProps) {
  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    if (price >= 1000000000) return `${(price / 1000000000).toFixed(1)}B`;
    if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `${(price / 1000).toFixed(1)}K`;
    return price.toString();
  };

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
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rarity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EXP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    {item.limited && (
                      <span className="ml-2 px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
                        LIMITED
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {formatPrice(item.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${rarityColors[item.rarity]}`}>
                    {item.rarity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.chance || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.preferred || 'None'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.expGain.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                  <div className="truncate" title={item.description}>
                    {item.description}
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