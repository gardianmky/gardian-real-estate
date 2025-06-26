"use client";

import { useState } from 'react';
import { useSearchContext } from 'context/search-context';

interface PropertyFiltersProps {
  propertyType: string;
}

const PropertyFilters = ({ propertyType }: PropertyFiltersProps) => {
  const { setPropertyType } = useSearchContext();
  const [selectedType, setSelectedType] = useState(propertyType);

  const handleTypeChange = (type: string) => {
    setPropertyType(type);
    setSelectedType(type);
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        className={`px-4 py-2 rounded-md ${selectedType === 'rent' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } transition-colors duration-200`}
        onClick={() => handleTypeChange('rent')}
      >
        For Rent
      </button>
      <button
        className={`px-4 py-2 rounded-md ${selectedType === 'buy' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } transition-colors duration-200`}
        onClick={() => handleTypeChange('buy')}
      >
        For Sale
      </button>
      <button
        className={`px-4 py-2 rounded-md ${selectedType === 'commercial' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } transition-colors duration-200`}
        onClick={() => handleTypeChange('commercial')}
      >
        Commercial
      </button>
    </div>
  );
};

export default PropertyFilters;
