/**
 * Enhanced API Logic: Category Filtering
 *
 * Strict validation system for property categories with approved enum values
 * Implements case-insensitive matching, UI grouping, and fallback handling
 */

// ===== APPROVED PROPERTY CATEGORIES =====
export enum PropertyCategory {
  // Residential Houses
  LAND = "Land",
  HOUSE = "House",
  TOWNHOUSE = "Townhouse",
  UNIT = "Unit",
  VILLA = "Villa",
  APARTMENT = "Apartment",
  PENTHOUSE = "Penthouse",
  ACERAGE = "Acerage",
  STUDIO = "Studio",
  HOUSE_AND_LAND = "House and Land",
  DUPLEX = "Duplex",
  TERRACE = "Terrace",
  SERVICED_APARTMENT = "Serviced Apartment",
  MOBILE_HOME = "Mobile Home",

  // Commercial
  COMMERCIAL = "Commercial",
  BUSINESS = "Business",
  INDUSTRIAL = "Industrial",

  // Rural/Land
  RURAL = "Rural",
  SEMI_RURAL = "Semi Rural",
  ACERAGE_SEMI_RURAL = "Acerage Semi Rural",
}

// ===== CATEGORY GROUPINGS FOR UI =====
export const CategoryGroups = {
  RESIDENTIAL_HOUSES: {
    label: "Residential Houses",
    icon: "🏠",
    categories: [
      PropertyCategory.HOUSE,
      PropertyCategory.TOWNHOUSE,
      PropertyCategory.VILLA,
      PropertyCategory.DUPLEX,
      PropertyCategory.TERRACE,
    ],
  },
  RESIDENTIAL_UNITS: {
    label: "Residential Units",
    icon: "🏢",
    categories: [
      PropertyCategory.UNIT,
      PropertyCategory.APARTMENT,
      PropertyCategory.PENTHOUSE,
      PropertyCategory.STUDIO,
      PropertyCategory.SERVICED_APARTMENT,
    ],
  },
  RESIDENTIAL_SPECIALTY: {
    label: "Residential Specialty",
    icon: "🏡",
    categories: [PropertyCategory.HOUSE_AND_LAND, PropertyCategory.MOBILE_HOME],
  },
  COMMERCIAL: {
    label: "Commercial",
    icon: "🏬",
    categories: [PropertyCategory.COMMERCIAL, PropertyCategory.BUSINESS, PropertyCategory.INDUSTRIAL],
  },
  LAND_RURAL: {
    label: "Land & Rural",
    icon: "🌿",
    categories: [
      PropertyCategory.LAND,
      PropertyCategory.ACERAGE,
      PropertyCategory.RURAL,
      PropertyCategory.SEMI_RURAL,
      PropertyCategory.ACERAGE_SEMI_RURAL,
    ],
  },
} as const;

// ===== VALIDATION UTILITIES =====

/**
 * Get all valid category values as array
 */
export const getAllValidCategories = (): string[] => {
  return Object.values(PropertyCategory);
};

/**
 * Validate if a category string is in approved list
 */
export const isValidCategory = (category: string): boolean => {
  return getAllValidCategories().includes(category);
};

/**
 * Case-insensitive category validation and normalization
 */
export const validateAndNormalizeCategory = (
  category: string,
): string | null => {
  if (!category || typeof category !== "string") {
    return null;
  }

  // Direct match (case-sensitive)
  if (isValidCategory(category)) {
    return category;
  }

  // Case-insensitive match
  const normalizedInput = category.trim();
  const validCategories = getAllValidCategories();

  const match = validCategories.find(
    (validCategory) =>
      validCategory.toLowerCase() === normalizedInput.toLowerCase(),
  );

  return match || null;
};

/**
 * Validate and normalize multiple categories
 */
export const validateAndNormalizeCategories = (
  categories: string[],
): string[] => {
  if (!Array.isArray(categories)) {
    return [];
  }

  return categories
    .map(validateAndNormalizeCategory)
    .filter((category): category is string => category !== null);
};

/**
 * Sanitize category input for API calls
 */
export const sanitizeCategoryForAPI = (category: string): string | null => {
  if (!category || typeof category !== "string") {
    return null;
  }

  // Remove potential injection characters and normalize
  const sanitized = category
    .trim()
    .replace(/[<>\"';&|`]/g, "") // Remove potential injection chars
    .substring(0, 100); // Limit length

  return validateAndNormalizeCategory(sanitized);
};

/**
 * Get category group for a given category
 */
export const getCategoryGroup = (
  category: string,
): keyof typeof CategoryGroups | null => {
  const validCategory = validateAndNormalizeCategory(category);
  if (!validCategory) return null;

  for (const [groupKey, group] of Object.entries(CategoryGroups)) {
    if (group.categories.includes(validCategory as PropertyCategory)) {
      return groupKey as keyof typeof CategoryGroups;
    }
  }

  return null;
};

/**
 * Get all categories for a specific group
 */
export const getCategoriesForGroup = (
  groupKey: keyof typeof CategoryGroups,
): string[] => {
  return CategoryGroups[groupKey]?.categories || [];
};

/**
 * Get categories filtered by property type context
 */
export const getCategoriesForPropertyType = (
  propertyType: "buy" | "rent" | "commercial",
): string[] => {
  switch (propertyType) {
    case "commercial":
      return getCategoriesForGroup("COMMERCIAL");
    case "buy":
    case "rent":
      // Return all non-commercial categories
      return [
        ...getCategoriesForGroup("RESIDENTIAL_HOUSES"),
        ...getCategoriesForGroup("RESIDENTIAL_UNITS"),
        ...getCategoriesForGroup("RESIDENTIAL_SPECIALTY"),
        ...getCategoriesForGroup("LAND_RURAL"),
      ];
    default:
      return getAllValidCategories();
  }
};

// ===== FALLBACK HANDLING =====

/**
 * Fallback category mapping for common variations/typos
 */
export const CategoryFallbacks: Record<string, string> = {
  // Common typos and variations
  penthouse: PropertyCategory.PENTHOUSE,
  "pent house": PropertyCategory.PENTHOUSE,
  "Pent house": PropertyCategory.PENTHOUSE,
  apt: PropertyCategory.APARTMENT,
  apartments: PropertyCategory.APARTMENT,
  units: PropertyCategory.UNIT,
  houses: PropertyCategory.HOUSE,
  townhouses: PropertyCategory.TOWNHOUSE,
  villas: PropertyCategory.VILLA,
  "studio apartment": PropertyCategory.STUDIO,
  acrage: PropertyCategory.ACERAGE,
  acre: PropertyCategory.ACERAGE,
  "commercial property": PropertyCategory.COMMERCIAL,
  "commercial building": PropertyCategory.COMMERCIAL,
  residential: PropertyCategory.HOUSE, // Default residential fallback
  property: PropertyCategory.HOUSE, // Generic fallback

  // Legacy mappings
  home: PropertyCategory.HOUSE,
  "residential house": PropertyCategory.HOUSE,
  flat: PropertyCategory.UNIT,
  condo: PropertyCategory.APARTMENT,
  condominium: PropertyCategory.APARTMENT,
};

/**
 * Apply fallback mapping for invalid categories
 */
export const applyFallbackCategory = (category: string): string | null => {
  const normalized = validateAndNormalizeCategory(category);
  if (normalized) return normalized;

  // Check fallback mappings
  const fallback = CategoryFallbacks[category.toLowerCase().trim()];
  if (fallback) {
    return fallback;
  }

  return null;
};

// ===== ERROR HANDLING =====

/**
 * Category validation error types
 */
export enum CategoryValidationError {
  INVALID_CATEGORY = "INVALID_CATEGORY",
  EMPTY_CATEGORY = "EMPTY_CATEGORY",
  MALFORMED_INPUT = "MALFORMED_INPUT",
  UNSUPPORTED_TYPE = "UNSUPPORTED_TYPE",
}

/**
 * Category validation result
 */
export interface CategoryValidationResult {
  success: boolean;
  category?: string;
  error?: CategoryValidationError;
  message?: string;
}

/**
 * Comprehensive category validation with detailed error reporting
 */
export const validateCategoryWithErrors = (
  category: string,
): CategoryValidationResult => {
  // Check for empty/null input
  if (!category || typeof category !== "string") {
    return {
      success: false,
      error: CategoryValidationError.EMPTY_CATEGORY,
      message: "Category cannot be empty or null",
    };
  }

  // Check for malformed input
  if (category.trim().length === 0) {
    return {
      success: false,
      error: CategoryValidationError.MALFORMED_INPUT,
      message: "Category cannot be empty string",
    };
  }

  // Try direct validation
  const validCategory = validateAndNormalizeCategory(category);
  if (validCategory) {
    return {
      success: true,
      category: validCategory,
    };
  }

  // Try fallback
  const fallbackCategory = applyFallbackCategory(category);
  if (fallbackCategory) {
    return {
      success: true,
      category: fallbackCategory,
    };
  }

  // Category not found
  return {
    success: false,
    error: CategoryValidationError.INVALID_CATEGORY,
    message: `Category "${category}" is not supported. Valid categories are: ${getAllValidCategories().join(", ")}`,
  };
};

// ===== UTILITY EXPORTS =====

/**
 * Quick validation for components
 */
export const isValidCategoryArray = (categories: string[]): boolean => {
  return Array.isArray(categories) && categories.every(isValidCategory);
};

/**
 * Get formatted category list for UI display
 */
export const getFormattedCategories = (
  groupKey?: keyof typeof CategoryGroups,
): { label: string; value: string }[] => {
  const categories = groupKey
    ? getCategoriesForGroup(groupKey)
    : getAllValidCategories();

  return categories.map((category) => ({
    label: category,
    value: category,
  }));
};

/**
 * Debug utility - get validation info
 */
export const getValidationInfo = () => {
  return {
    totalCategories: getAllValidCategories().length,
    groups: Object.keys(CategoryGroups).length,
    fallbacks: Object.keys(CategoryFallbacks).length,
    validCategories: getAllValidCategories(),
  };
};
