'use client';

import { Pet, rarityColors } from '@/data/gameData';

interface PetTableProps {
  pets: Pet[];
  title?: string;
}

export default function PetTable({ pets, title = "Pets" }: PetTableProps) {
  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    if (price >= 1000000000) return `${(price / 1000000000).toFixed(1)}B`;
    if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `${(price / 1000).toFixed(1)}K`;
    return price.toString();
  };

  if (pets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No pets found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{pets.length} pets found</p>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exchange</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pets.map((pet, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{pet.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {formatPrice(pet.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${rarityColors[pet.rarity]}`}>
                    {pet.rarity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {pet.chance || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {pet.preferred || 'None'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {pet.expGain.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {pet.exchangeRequired ? (
                    <div className="text-xs">
                      <div>{pet.exchangeRequired}</div>
                      <div className="text-gray-500">x{pet.exchangeAmount}</div>
                    </div>
                  ) : (
                    'None'
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                  <div className="truncate" title={pet.description}>
                    {pet.description}
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