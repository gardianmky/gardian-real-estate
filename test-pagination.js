#!/usr/bin/env node

// Comprehensive Pagination Test Script
const fs = require('fs');
const path = require('path');

console.log('🔍 RUTHLESS PAGINATION TESTING\n');

// Test 1: Check all pages use fetchAll: false for pagination
console.log('📄 Test 1: Checking fetchAll usage in paginated pages...');

const paginatedPages = [
  'app/for-sale/page.tsx',
  'app/for-rent/page.tsx', 
  'app/commercial/page.tsx',
  'app/buy/page.tsx',
  'app/open-homes/page.tsx',
  'app/leased/page.tsx'
];

let fetchAllErrors = [];

paginatedPages.forEach(pagePath => {
  try {
    const content = fs.readFileSync(path.join(__dirname, pagePath), 'utf8');
    
    // Check if it has pagination
    if (content.includes('Pagination') || content.includes('totalPages')) {
      // Check if it uses fetchAll: true (BAD for pagination)
      if (content.includes('fetchAll: true')) {
        fetchAllErrors.push(`❌ ${pagePath} - Uses fetchAll: true (breaks pagination)`);
      } else if (content.includes('fetchAll: false')) {
        console.log(`✅ ${pagePath} - Correctly uses fetchAll: false`);
      } else {
        console.log(`⚠️  ${pagePath} - No fetchAll specified (defaults to false)`);
      }
    }
  } catch (error) {
    console.log(`❌ ${pagePath} - File not found or error reading`);
  }
});

if (fetchAllErrors.length > 0) {
  console.log('\n🚨 PAGINATION ERRORS FOUND:');
  fetchAllErrors.forEach(error => console.log(error));
} else {
  console.log('\n✅ All paginated pages correctly use fetchAll: false');
}

// Test 2: Check Pagination component usage
console.log('\n📄 Test 2: Checking Pagination component implementation...');

paginatedPages.forEach(pagePath => {
  try {
    const content = fs.readFileSync(path.join(__dirname, pagePath), 'utf8');
    
    if (content.includes('Pagination')) {
      // Check for required props
      const hasCurrentPage = content.includes('currentPage');
      const hasTotalPages = content.includes('totalPages');
      const hasBasePath = content.includes('basePath');
      
      if (hasCurrentPage && hasTotalPages && hasBasePath) {
        console.log(`✅ ${pagePath} - Pagination component correctly implemented`);
      } else {
        console.log(`❌ ${pagePath} - Missing pagination props:`, {
          currentPage: hasCurrentPage,
          totalPages: hasTotalPages, 
          basePath: hasBasePath
        });
      }
    }
  } catch (error) {
    // Skip if file doesn't exist
  }
});

// Test 3: Check API pagination logic
console.log('\n📄 Test 3: Checking API pagination logic...');

try {
  const apiContent = fs.readFileSync(path.join(__dirname, 'lib/api.ts'), 'utf8');
  
  // Check for proper pagination handling
  const hasFetchAllLogic = apiContent.includes('if (!fetchAll)');
  const hasPageBreak = apiContent.includes('hasMorePages = false');
  const hasPaginationReturn = apiContent.includes('pagination: finalPagination');
  
  if (hasFetchAllLogic && hasPageBreak && hasPaginationReturn) {
    console.log('✅ API pagination logic correctly implemented');
  } else {
    console.log('❌ API pagination logic issues:', {
      fetchAllLogic: hasFetchAllLogic,
      pageBreak: hasPageBreak,
      paginationReturn: hasPaginationReturn
    });
  }
} catch (error) {
  console.log('❌ Could not read API file');
}

// Test 4: Check for URL parameter handling
console.log('\n📄 Test 4: Checking URL parameter handling...');

paginatedPages.forEach(pagePath => {
  try {
    const content = fs.readFileSync(path.join(__dirname, pagePath), 'utf8');
    
    if (content.includes('searchParams')) {
      const hasPageParam = content.includes('params?.page') || content.includes('page:');
      const hasPageParsing = content.includes('Number(') || content.includes('parseInt(');
      
      if (hasPageParam && hasPageParsing) {
        console.log(`✅ ${pagePath} - URL parameter handling correctly implemented`);
      } else {
        console.log(`❌ ${pagePath} - URL parameter issues:`, {
          pageParam: hasPageParam,
          pageParsing: hasPageParsing
        });
      }
    }
  } catch (error) {
    // Skip if file doesn't exist
  }
});

// Test 5: Check pagination UI components
console.log('\n📄 Test 5: Checking pagination UI components...');

try {
  const paginationContent = fs.readFileSync(path.join(__dirname, 'components/ui/pagination.tsx'), 'utf8');
  
  const hasPrevNext = paginationContent.includes('Previous') && paginationContent.includes('Next');
  const hasPageNumbers = paginationContent.includes('pageNumbers');
  const hasDisabledStates = paginationContent.includes('cursor-not-allowed');
  const hasURLGeneration = paginationContent.includes('generatePageUrl');
  
  if (hasPrevNext && hasPageNumbers && hasDisabledStates && hasURLGeneration) {
    console.log('✅ Pagination UI component fully implemented');
  } else {
    console.log('❌ Pagination UI component issues:', {
      prevNext: hasPrevNext,
      pageNumbers: hasPageNumbers,
      disabledStates: hasDisabledStates,
      urlGeneration: hasURLGeneration
    });
  }
} catch (error) {
  console.log('❌ Could not read pagination component');
}

// Test 6: Homepage should NOT have pagination
console.log('\n📄 Test 6: Checking homepage does NOT use pagination...');

try {
  const homepageContent = fs.readFileSync(path.join(__dirname, 'app/page.tsx'), 'utf8');
  
  if (homepageContent.includes('Pagination')) {
    console.log('❌ Homepage incorrectly uses pagination (should only show 4 featured properties)');
  } else {
    console.log('✅ Homepage correctly does NOT use pagination');
  }
  
  // Check if it limits to 4 properties
  if (homepageContent.includes('resultsPerPage: 4')) {
    console.log('✅ Homepage correctly limits to 4 featured properties');
  } else {
    console.log('❌ Homepage does not properly limit featured properties');
  }
} catch (error) {
  console.log('❌ Could not read homepage');
}

console.log('\n🏁 PAGINATION TESTING COMPLETE\n');
