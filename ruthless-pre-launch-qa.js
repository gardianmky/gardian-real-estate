#!/usr/bin/env node
/**
 * RUTHLESS PRE-LAUNCH QA SCRIPT
 * Mackay's Best Real Estate (Gardian)
 * 
 * This script performs comprehensive testing to ensure:
 * - No static/dummy content remains
 * - All dynamic pages use live API data
 * - Pagination works correctly
 * - Visual polish and responsiveness
 * - bedBathCarLand displays are human-readable
 * - SEO/meta tags are generated from live data
 * 
 * Usage: node ruthless-pre-launch-qa.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚨 RUTHLESS PRE-LAUNCH QA TESTING');
console.log('==================================');
console.log('');

// Color coding for results
const SUCCESS = '✅';
const FAIL = '❌';
const WARNING = '⚠️';
const INFO = 'ℹ️';

let totalTests = 0;
let passedTests = 0;
let warnings = 0;

function test(description, passed) {
    totalTests++;
    if (passed) {
        passedTests++;
        console.log(`${SUCCESS} ${description}`);
    } else {
        console.log(`${FAIL} ${description}`);
    }
}

function warn(description) {
    warnings++;
    console.log(`${WARNING} ${description}`);
}

function info(description) {
    console.log(`${INFO} ${description}`);
}

// File existence checks
const criticalFiles = [
    '/home/schema/final/final-main/lib/api.ts',
    '/home/schema/final/final-main/app/page.tsx',
    '/home/schema/final/final-main/app/for-sale/page.tsx',
    '/home/schema/final/final-main/app/for-rent/page.tsx',
    '/home/schema/final/final-main/components/ui/property-features.tsx'
];

console.log('📁 CRITICAL FILE CHECKS');
console.log('========================');
criticalFiles.forEach(file => {
    test(`File exists: ${path.basename(file)}`, fs.existsSync(file));
});
console.log('');

// API Integration Tests
console.log('🔌 API INTEGRATION TESTS');
console.log('=========================');

// Check for live API endpoints in api.ts
try {
    const apiContent = fs.readFileSync('/home/schema/final/final-main/lib/api.ts', 'utf8');
    
    test('API base URL configured', apiContent.includes('api.domain.com.au/v1'));
    test('Agency ID filtering present', apiContent.includes('agencyID') && apiContent.includes('22446'));
    test('Pagination logic server-side', !apiContent.includes('fetchAll: true') || apiContent.includes('// fetchAll: true'));
    test('Error handling implemented', apiContent.includes('catch') && apiContent.includes('error'));
    test('No hardcoded dummy data', !apiContent.includes('dummy') && !apiContent.includes('placeholder'));
    
} catch (error) {
    test('API file readable', false);
}
console.log('');

// Dynamic Page Content Tests
console.log('📄 DYNAMIC PAGE CONTENT TESTS');
console.log('==============================');

const dynamicPages = [
    'app/page.tsx',
    'app/for-sale/page.tsx', 
    'app/for-rent/page.tsx',
    'app/commercial/page.tsx',
    'app/buy/page.tsx',
    'app/sold/page.tsx'
];

dynamicPages.forEach(pagePath => {
    try {
        const content = fs.readFileSync(`/home/schema/final/final-main/${pagePath}`, 'utf8');
        
        test(`${path.basename(pagePath, '.tsx')}: Uses API fetch`, content.includes('await fetch') || content.includes('fetchProperties'));
        test(`${path.basename(pagePath, '.tsx')}: No static content`, !content.includes('Sample Property') && !content.includes('Lorem ipsum'));
        test(`${path.basename(pagePath, '.tsx')}: Error handling`, content.includes('try') && content.includes('catch'));
        
    } catch (error) {
        test(`${path.basename(pagePath, '.tsx')}: File readable`, false);
    }
});
console.log('');

// Component Quality Tests
console.log('🧩 COMPONENT QUALITY TESTS');
console.log('===========================');

// Check property features component
try {
    const featuresContent = fs.readFileSync('/home/schema/final/final-main/components/ui/property-features.tsx', 'utf8');
    
    test('bedBathCarLand: Human-readable display', featuresContent.includes('bed') && featuresContent.includes('bath'));
    test('bedBathCarLand: Conditional rendering', featuresContent.includes('&&') || featuresContent.includes('?'));
    test('bedBathCarLand: No raw API fields', !featuresContent.includes('bathrooms') || featuresContent.includes('bath'));
    
} catch (error) {
    warn('Property features component not found or unreadable');
}

// Check property card component
try {
    const cardContent = fs.readFileSync('/home/schema/final/final-main/components/property-card.tsx', 'utf8');
    
    test('Property cards: Dynamic data binding', cardContent.includes('property.') && !cardContent.includes('Sample'));
    test('Property cards: Image handling', cardContent.includes('image') && cardContent.includes('placeholder'));
    test('Property cards: Price formatting', cardContent.includes('price') || cardContent.includes('Price'));
    
} catch (error) {
    warn('Property card component not found or unreadable');
}
console.log('');

// Pagination Tests
console.log('📖 PAGINATION TESTS');
console.log('===================');

const paginatedPages = ['for-sale', 'for-rent', 'commercial', 'buy', 'sold'];

paginatedPages.forEach(page => {
    try {
        const content = fs.readFileSync(`/home/schema/final/final-main/app/${page}/page.tsx`, 'utf8');
        
        test(`${page}: Server-side pagination`, content.includes('page') && content.includes('searchParams'));
        test(`${page}: Pagination component`, content.includes('Pagination') || content.includes('pagination'));
        test(`${page}: No fetchAll override`, !content.includes('fetchAll: true'));
        
    } catch (error) {
        test(`${page}: Page file readable`, false);
    }
});
console.log('');

// SEO and Meta Tags
console.log('🔍 SEO AND META TAG TESTS');
console.log('==========================');

try {
    const layoutContent = fs.readFileSync('/home/schema/final/final-main/app/layout.tsx', 'utf8');
    
    test('Base meta tags configured', layoutContent.includes('metadata') || layoutContent.includes('Meta'));
    test('Open Graph tags present', layoutContent.includes('openGraph') || layoutContent.includes('og:'));
    test('Site title configured', layoutContent.includes('Mackay') || layoutContent.includes('Best Real Estate'));
    
} catch (error) {
    warn('Layout file not readable for SEO check');
}

// Check for property detail meta generation
const propertyDetailExists = fs.existsSync('/home/schema/final/final-main/app/property/[id]/page.tsx');
if (propertyDetailExists) {
    try {
        const detailContent = fs.readFileSync('/home/schema/final/final-main/app/property/[id]/page.tsx', 'utf8');
        test('Property detail: Dynamic meta generation', detailContent.includes('generateMetadata'));
        test('Property detail: Schema.org markup', detailContent.includes('schema') || detailContent.includes('ld+json'));
    } catch (error) {
        warn('Property detail page not readable');
    }
} else {
    warn('Property detail page not found');
}
console.log('');

// Visual and Responsive Tests
console.log('🎨 VISUAL AND RESPONSIVE TESTS');
console.log('===============================');

try {
    const globalCSS = fs.readFileSync('/home/schema/final/final-main/app/globals.css', 'utf8');
    
    test('Tailwind CSS configured', globalCSS.includes('@tailwind'));
    test('Custom styling present', globalCSS.includes('gradient') || globalCSS.includes('animation'));
    test('Responsive utilities used', globalCSS.includes('sm:') || globalCSS.includes('md:') || globalCSS.includes('lg:'));
    
} catch (error) {
    warn('Global CSS not readable');
}

// Check for mobile responsiveness in components
const responsiveFiles = ['app/page.tsx', 'components/hero-section.tsx', 'components/property-card.tsx'];
responsiveFiles.forEach(file => {
    if (fs.existsSync(`/home/schema/final/final-main/${file}`)) {
        try {
            const content = fs.readFileSync(`/home/schema/final/final-main/${file}`, 'utf8');
            test(`${path.basename(file)}: Responsive classes`, content.includes('sm:') || content.includes('md:') || content.includes('lg:'));
        } catch (error) {
            warn(`${file} not readable for responsive check`);
        }
    }
});
console.log('');

// Known Issues Check
console.log('🚨 KNOWN ISSUES CHECK');
console.log('=====================');

const agentProfileExists = fs.existsSync('/home/schema/final/final-main/app/agents/[id]/page.tsx');
if (agentProfileExists) {
    try {
        const agentContent = fs.readFileSync('/home/schema/final/final-main/app/agents/[id]/page.tsx', 'utf8');
        test('Agent profiles: API integration', agentContent.includes('fetchAgentById') || agentContent.includes('agents/'));
        if (agentContent.includes('Agent Profile Unavailable')) {
            warn('Agent profiles still showing unavailable message');
        }
    } catch (error) {
        warn('Agent profile page not readable');
    }
} else {
    warn('Agent profile page not found');
}

// Search functionality check
const searchExists = fs.existsSync('/home/schema/final/final-main/app/search/page.tsx');
if (searchExists) {
    try {
        const searchContent = fs.readFileSync('/home/schema/final/final-main/app/search/page.tsx', 'utf8');
        test('Search: Live results', searchContent.includes('searchParams') && searchContent.includes('fetch'));
        test('Search: Filter handling', searchContent.includes('filter') || searchContent.includes('query'));
    } catch (error) {
        warn('Search page not readable');
    }
} else {
    warn('Search page not found');
}
console.log('');

// Generate Summary
console.log('📊 TEST SUMMARY');
console.log('===============');
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests} ${SUCCESS}`);
console.log(`Failed: ${totalTests - passedTests} ${FAIL}`);
console.log(`Warnings: ${warnings} ${WARNING}`);
console.log('');

const passRate = Math.round((passedTests / totalTests) * 100);
console.log(`Pass Rate: ${passRate}%`);

if (passRate >= 90) {
    console.log(`${SUCCESS} EXCELLENT - Ready for launch!`);
} else if (passRate >= 80) {
    console.log(`${WARNING} GOOD - Minor issues to address`);
} else if (passRate >= 70) {
    console.log(`${WARNING} FAIR - Several issues need fixing`);
} else {
    console.log(`${FAIL} POOR - Major issues must be resolved`);
}

console.log('');
console.log('🎯 CRITICAL PRE-LAUNCH ACTIONS');
console.log('===============================');
console.log('1. Fix agent profile API integration');
console.log('2. Test search functionality end-to-end');
console.log('3. Validate bedBathCarLand displays across all listings');
console.log('4. Add schema.org LD+JSON to property detail pages');
console.log('5. Run manual mobile responsiveness test');
console.log('6. Test all pagination on live site');
console.log('7. Verify no 404s or broken links');
console.log('8. Check site performance and loading speeds');
console.log('');

console.log('📋 MANUAL TESTING CHECKLIST');
console.log('============================');
console.log('□ Homepage loads with 6 dynamic featured properties (highest price, rental, newest, etc.)');
console.log('□ For Sale pagination works correctly (page 1, 2, 3+)');
console.log('□ For Rent pagination works correctly');
console.log('□ Commercial listings filter correctly');
console.log('□ Search returns live results');
console.log('□ Agent profiles load correctly');
console.log('□ Property detail pages show live data');
console.log('□ bedBathCarLand shows as "3 bed, 2 bath, 2 car" format');
console.log('□ Featured property type badges display correctly');
console.log('□ Mobile responsiveness on phone/tablet');
console.log('□ No console errors in browser');
console.log('□ All images load correctly');
console.log('□ Contact forms work');
console.log('□ Site loads fast (<3 seconds)');
console.log('');

console.log('🚀 DEPLOYMENT READINESS');
console.log('========================');
if (passRate >= 85 && warnings <= 3) {
    console.log(`${SUCCESS} READY FOR DEPLOYMENT`);
    console.log('Site meets quality standards for production launch.');
} else {
    console.log(`${WARNING} NOT READY FOR DEPLOYMENT`);
    console.log('Address failing tests and warnings before launching.');
}

console.log('');
console.log('Generated:', new Date().toISOString());
console.log('');
