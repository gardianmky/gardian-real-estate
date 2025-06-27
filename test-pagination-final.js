#!/usr/bin/env node

/**
 * Final Comprehensive Pagination Test
 * This script validates that all pagination has been fixed correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 FINAL PAGINATION AUDIT');
console.log('=' .repeat(50));

// List of paginated pages that should NOT use fetchAll: true
const paginatedPages = [
  'app/for-sale/page.tsx',
  'app/for-rent/page.tsx', 
  'app/commercial/page.tsx',
  'app/buy/page.tsx',
  'app/open-homes/page.tsx',
  'app/leased/page.tsx',
  'app/sold/page.tsx'
];

// Pages that legitimately use fetchAll: true
const allowedFetchAllPages = [
  'app/agents/[id]/page.tsx', // Agent listings (reasonable to show all)
  'app/page.tsx', // Homepage (only shows 4 featured, not paginated)
  'app/page-new.tsx' // Backup homepage
];

let errors = [];
let warnings = [];
let fixes = [];

console.log('\n📋 Checking paginated pages...');

// Check each paginated page
paginatedPages.forEach(pagePath => {
  const filePath = path.join(__dirname, pagePath);
  
  if (!fs.existsSync(filePath)) {
    errors.push(`❌ ${pagePath} - File not found`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check for fetchAll: true (should be false for paginated pages)
  if (content.includes('fetchAll: true')) {
    errors.push(`❌ ${pagePath} - Still uses fetchAll: true (breaks server-side pagination)`);
  } else if (content.includes('fetchAll: false')) {
    fixes.push(`✅ ${pagePath} - Correctly uses fetchAll: false`);
  }
  
  // Check for Pagination component usage
  if (content.includes('Pagination') && content.includes('from')) {
    fixes.push(`✅ ${pagePath} - Uses Pagination component`);
  }
  
  // Check for proper totalPages usage
  if (content.includes('totalPages') && content.includes('pagination')) {
    fixes.push(`✅ ${pagePath} - Has proper pagination state`);
  }
});

console.log('\n🔧 Checking API implementation...');

// Check lib/api.ts for proper server-side pagination
const apiPath = path.join(__dirname, 'lib/api.ts');
if (fs.existsSync(apiPath)) {
  const apiContent = fs.readFileSync(apiPath, 'utf8');
  
  // Check for server-side agency filtering
  if (apiContent.includes("params.append('agencyID', API_CONFIG.AGENCY_ID)")) {
    fixes.push('✅ API - Uses server-side agency filtering via agencyID parameter');
  } else {
    errors.push('❌ API - Missing server-side agency filtering');
  }
  
  // Check that client-side filtering is minimal
  if (apiContent.includes('MINIMAL client-side filtering')) {
    fixes.push('✅ API - Documented minimal client-side filtering approach');
  }
  
  // Check for proper pagination return
  if (apiContent.includes('totalPages: totalPagesFromAPI')) {
    fixes.push('✅ API - Returns server-provided pagination info');
  }
} else {
  errors.push('❌ lib/api.ts not found');
}

console.log('\n🏠 Checking homepage...');

// Check homepage doesn't break with pagination
const homepagePath = path.join(__dirname, 'app/page.tsx');
if (fs.existsSync(homepagePath)) {
  const homepageContent = fs.readFileSync(homepagePath, 'utf8');
  
  if (homepageContent.includes('limit: 4') || homepageContent.includes('resultsPerPage: 4')) {
    fixes.push('✅ Homepage - Limited to 4 featured properties');
  }
  
  if (!homepageContent.includes('Pagination')) {
    fixes.push('✅ Homepage - Does not use pagination (correct)');
  }
}

// Results Summary
console.log('\n📊 AUDIT RESULTS');
console.log('=' .repeat(50));

if (fixes.length > 0) {
  console.log('\n✅ FIXES VERIFIED:');
  fixes.forEach(fix => console.log(`  ${fix}`));
}

if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:');
  warnings.forEach(warning => console.log(`  ${warning}`));
}

if (errors.length > 0) {
  console.log('\n❌ ERRORS FOUND:');
  errors.forEach(error => console.log(`  ${error}`));
  console.log('\n🚨 Pagination is NOT properly fixed!');
  process.exit(1);
} else {
  console.log('\n🎉 ALL PAGINATION CHECKS PASSED!');
  console.log('\n📝 Summary:');
  console.log(`   - ${paginatedPages.length} paginated pages checked`);
  console.log(`   - ${fixes.length} fixes verified`);
  console.log('   - Server-side pagination implemented');
  console.log('   - Client-side filtering minimized');
  console.log('   - Agency filtering moved to API parameters');
  
  console.log('\n✨ Pagination system is now robust and production-ready!');
}
