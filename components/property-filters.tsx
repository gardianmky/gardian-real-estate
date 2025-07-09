"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  ClipboardCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  PropertyCategory,
  CategoryGroups,
  getCategoriesForPropertyType,
} from "@/lib/categories";

interface PropertyFiltersProps {
  propertyType?: "buy" | "rent" | "commercial";
  selectedCategories?: PropertyCategory[];
  onCategoryChange?: (categories: PropertyCategory[]) => void;
  showGrouped?: boolean;
}

export default function PropertyFilters({
  propertyType = "buy",
  selectedCategories = [],
  onCategoryChange,
  showGrouped = true,
}: PropertyFiltersProps) {
  const [activeFilter, setActiveFilter] = useState<PropertyCategory | null>(
    null,
  );
  const [expandedGroups, setExpandedGroups] = useState<{
    [key: string]: boolean;
  }>({});

  // Get categories filtered by property type
  const availableCategories = getCategoriesForPropertyType(propertyType);

  const handleCategoryClick = (category: PropertyCategory) => {
    setActiveFilter(category);
    if (onCategoryChange) {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];
      onCategoryChange(newCategories);
    }
  };

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  const isCategorySelected = (category: PropertyCategory) => {
    return activeFilter === category || selectedCategories.includes(category);
  };

  const secondaryOptions = [
    {
      label: "Sold",
      href: "/sold",
      icon: <CheckCircle className="h-5 w-5 mr-2" />,
    },
    {
      label: "Leased",
      href: "/leased",
      icon: <ClipboardCheck className="h-5 w-5 mr-2" />,
    },
  ];

  // Render grouped categories
  const renderGroupedCategories = () => {
    return Object.entries(CategoryGroups).map(([groupKey, group]) => {
      // Filter categories by available categories for this property type
      const groupCategories = group.categories.filter((cat) =>
        availableCategories.includes(cat),
      );

      if (groupCategories.length === 0) return null;

      const isExpanded = expandedGroups[groupKey] !== false; // Default to expanded

      return (
        <div key={groupKey} className="mb-4">
          <button
            onClick={() => toggleGroup(groupKey)}
            className="flex items-center justify-between w-full text-left mb-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
          >
            <span className="flex items-center">
              <span className="mr-2">{group.icon}</span>
              {group.label}
            </span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {isExpanded && (
            <div className="flex flex-wrap gap-2 ml-6">
              {groupCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors duration-200 ${
                    isCategorySelected(category)
                      ? "bg-teal-500 text-white shadow-sm"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  // Render flat categories (fallback)
  const renderFlatCategories = () => {
    return (
      <div className="flex flex-wrap gap-2">
        {availableCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-md text-sm transition-colors duration-200 ${
              isCategorySelected(category)
                ? "bg-teal-500 text-white shadow-sm"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-teal-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
      <div className="flex flex-col space-y-4">
        {/* Property Category Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Property Categories
            {selectedCategories.length > 0 && (
              <span className="ml-2 text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                {selectedCategories.length} selected
              </span>
            )}
          </h3>

          {showGrouped && propertyType !== "commercial" ? (
            <div className="space-y-2">{renderGroupedCategories()}</div>
          ) : (
            renderFlatCategories()
          )}
        </div>

        {/* Clear Filters */}
        {selectedCategories.length > 0 && (
          <div>
            <button
              onClick={() => {
                setActiveFilter(null);
                if (onCategoryChange) {
                  onCategoryChange([]);
                }
              }}
              className="text-sm text-gray-500 hover:text-teal-600 transition-colors underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Secondary Options */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Other Options
          </h3>
          <div className="flex flex-wrap gap-2">
            {secondaryOptions.map((option) => (
              <Link
                key={option.label}
                href={option.href}
                className="flex items-center px-4 py-2 rounded-md text-sm bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                {option.icon}
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
