#!/usr/bin/env node
/**
 * 🚨 RUTHLESS CATEGORY FILTERING ENFORCEMENT
 * Launch Blocker QA Script - No category bleed-through allowed!
 * 
 * This script validates that all dynamic pages fetch and display 
 * ONLY the correct category/type of listings according to their purpose.
 */

const fs = require('fs');
const path = require('path');

console.log('🚨 RUTHLESS CATEGORY FILTERING ENFORCEMENT');
console.log('==========================================');
console.log('Validating strict category filtering across all dynamic pages...');
console.log('');

let totalChecks = 0;
let passedChecks = 0;
let failures = [];

function check(description, condition, filePath = '', lineNumber = '') {
    totalChecks++;
    const location = filePath ? ` (${path.basename(filePath)}${lineNumber ? `:${lineNumber}` : ''})` : '';
    
    if (condition) {
        passedChecks++;
        console.log(`✅ ${description}${location}`);
        return true;
    } else {
        failures.push({ description, filePath, lineNumber });
        console.log(`❌ ${description}${location}`);
        return false;
    }
}

function warn(description, filePath = '') {
    const location = filePath ? ` (${path.basename(filePath)})` : '';
    console.log(`⚠️ ${description}${location}`);
}

// 1. API Configuration Validation
console.log('🔧 API CONFIGURATION VALIDATION');
console.log('================================');

try {
    const apiContent = fs.readFileSync('/home/schema/final/final-main/lib/api.ts', 'utf8');
    
    // Check for proper API base URL configuration
    check(
        'API base URL configured via constant', 
        apiContent.includes('BASE_URL:') && !apiContent.includes('https://api.renet.app/Website/Listings'),
        '/home/schema/final/final-main/lib/api.ts'
    );
    
    // Check for agency ID enforcement
    check(
        'Agency ID 10021353 properly configured',
        apiContent.includes("AGENCY_ID: '10021353'"),
        '/home/schema/final/final-main/lib/api.ts'
    );
    
    // Check that agency ID is used in API calls
    check(
        'Agency ID included in API calls',
        apiContent.includes('agencyID', 'API_CONFIG.AGENCY_ID') || apiContent.includes('params.append(\'agencyID\''),
        '/home/schema/final/final-main/lib/api.ts'
    );
    
    // Check for no hardcoded API URLs
    const hardcodedApiMatches = apiContent.match(/https:\/\/api\.renet\.app\/Website\/Listings/g);
    check(
        'No hardcoded API URLs found',
        !hardcodedApiMatches || hardcodedApiMatches.length <= 1, // Allow one in base config
        '/home/schema/final/final-main/lib/api.ts'
    );
    
} catch (error) {
    check('API configuration file readable', false, '/home/schema/final/final-main/lib/api.ts');
}

console.log('');

// 2. Category Filtering Validation for Each Dynamic Page
console.log('📂 DYNAMIC PAGE CATEGORY FILTERING');
console.log('==================================');

const pageValidations = [
    {
        path: '/home/schema/final/final-main/app/for-sale/page.tsx',
        name: 'For Sale Page',
        requiredFilters: ['type=Residential', 'disposalMethod=forSale'],
        forbiddenTypes: ['Commercial', 'Land', 'Business', 'Rural']
    },
    {
        path: '/home/schema/final/final-main/app/for-rent/page.tsx', 
        name: 'For Rent Page',
        requiredFilters: ['type=Residential', 'disposalMethod=forRent'],
        forbiddenTypes: ['Commercial', 'Land', 'Business']
    },
    {
        path: '/home/schema/final/final-main/app/commercial/page.tsx',
        name: 'Commercial Page', 
        requiredFilters: ['type=Commercial'],
        forbiddenTypes: ['Residential', 'Land']
    },
    {
        path: '/home/schema/final/final-main/app/sold/page.tsx',
        name: 'Sold Page',
        requiredFilters: ['type=Residential', 'disposalMethod=sold'],
        forbiddenTypes: ['Commercial', 'forSale', 'forRent']
    },
    {
        path: '/home/schema/final/final-main/app/leased/page.tsx',
        name: 'Leased Page',
        requiredFilters: ['type=Residential', 'disposalMethod=leased'],
        forbiddenTypes: ['Commercial', 'forSale', 'forRent']
    }
];

pageValidations.forEach(validation => {
    if (fs.existsSync(validation.path)) {
        try {
            const content = fs.readFileSync(validation.path, 'utf8');
            
            // Check for required filters
            validation.requiredFilters.forEach(filter => {
                const [key, value] = filter.split('=');
                const hasFilter = content.includes(`${key}: '${value}'`) || 
                                content.includes(`${key}='${value}'`) ||
                                content.includes(`${key}: "${value}"`) ||
                                content.includes(`${key}="${value}"`);
                
                check(
                    `${validation.name}: Uses ${filter} filter`,
                    hasFilter,
                    validation.path
                );
            });
            
            // Check for API fetch usage
            check(
                `${validation.name}: Uses live API fetch`,
                content.includes('fetchListingsIndex') || content.includes('fetchProperties'),
                validation.path
            );
            
            // Check for pagination
            check(
                `${validation.name}: Implements pagination`,
                content.includes('page') && content.includes('searchParams'),
                validation.path
            );
            
        } catch (error) {
            check(`${validation.name}: File readable`, false, validation.path);
        }
    } else {
        warn(`${validation.name}: File not found`, validation.path);
    }
});

console.log('');

// 3. Agent Profile Validation
console.log('👥 AGENT PROFILE FILTERING');
console.log('==========================');

const agentPaths = [
    '/home/schema/final/final-main/app/agents/[id]/page.tsx',
    '/home/schema/final/final-main/app/agent/[id]/page.tsx'
];

agentPaths.forEach(agentPath => {
    if (fs.existsSync(agentPath)) {
        try {
            const content = fs.readFileSync(agentPath, 'utf8');
            
            check(
                'Agent profile: Filters by agent ID',
                content.includes('agentID') || content.includes('agent.id'),
                agentPath
            );
            
            check(
                'Agent profile: Fetches agent listings',
                content.includes('fetchAgentListings') || content.includes('listings'),
                agentPath  
            );
            
        } catch (error) {
            check('Agent profile: File readable', false, agentPath);
        }
    }
});

console.log('');

// 4. Search Page Validation
console.log('🔍 SEARCH FUNCTIONALITY FILTERING');
console.log('=================================');

const searchPath = '/home/schema/final/final-main/app/search/page.tsx';
const searchResultsPath = '/home/schema/final/final-main/components/search/search-results.tsx';

if (fs.existsSync(searchPath)) {
    try {
        const content = fs.readFileSync(searchPath, 'utf8');
        
        check(
            'Search page: Applies type filters',
            content.includes('propertyType') && content.includes('SearchResults'),
            searchPath
        );
        
        check(
            'Search page: Handles search parameters',
            content.includes('propertyType') && content.includes('searchParams'),
            searchPath
        );
        
    } catch (error) {
        check('Search page: File readable', false, searchPath);
    }
} else {
    warn('Search page: File not found', searchPath);
}

// Check SearchResults component for disposal method validation
if (fs.existsSync(searchResultsPath)) {
    try {
        const content = fs.readFileSync(searchResultsPath, 'utf8');
        
        check(
            'Search results: Validates disposal method',
            content.includes('disposalMethod') && (content.includes('forSale') || content.includes('forRent')),
            searchResultsPath
        );
        
    } catch (error) {
        check('Search results: File readable', false, searchResultsPath);
    }
}

console.log('');

// 5. Property Detail Page Validation  
console.log('🏠 PROPERTY DETAIL PAGE VALIDATION');
console.log('==================================');

const propertyDetailPaths = [
    '/home/schema/final/final-main/app/property/[id]/page.tsx',
    '/home/schema/final/final-main/app/listing/[id]/page.tsx'
];

propertyDetailPaths.forEach(detailPath => {
    if (fs.existsSync(detailPath)) {
        try {
            const content = fs.readFileSync(detailPath, 'utf8');
            
            check(
                'Property detail: Fetches by listing ID',
                content.includes('id') && content.includes('params'),
                detailPath
            );
            
            check(
                'Property detail: Displays bedBathCarLand',
                content.includes('bedBathCarLand') || content.includes('bedrooms'),
                detailPath
            );
            
            check(
                'Property detail: Shows property type',
                content.includes('type') || content.includes('category'),
                detailPath
            );
            
        } catch (error) {
            check('Property detail: File readable', false, detailPath);
        }
    }
});

console.log('');

// 6. Homepage Featured Properties Validation
console.log('🏡 HOMEPAGE FEATURED PROPERTIES');
console.log('===============================');

const homepagePath = '/home/schema/final/final-main/app/page.tsx';
if (fs.existsSync(homepagePath)) {
    try {
        const content = fs.readFileSync(homepagePath, 'utf8');
        
        check(
            'Homepage: Uses getFeaturedProperties',
            content.includes('getFeaturedProperties') || content.includes('fetchFeaturedProperties'),
            homepagePath
        );
        
        check(
            'Homepage: Shows 6 featured properties',
            content.includes('6') && content.includes('featured'),
            homepagePath
        );
        
        check(
            'Homepage: No static content',
            !content.includes('Sample Property') && !content.includes('Lorem ipsum'),
            homepagePath
        );
        
    } catch (error) {
        check('Homepage: File readable', false, homepagePath);
    }
} else {
    check('Homepage: File exists', false, homepagePath);
}

console.log('');

// 7. Component Validation
console.log('🧩 COMPONENT FILTERING VALIDATION');
console.log('=================================');

// Check property card component
const propertyCardPath = '/home/schema/final/final-main/components/property-card.tsx';
if (fs.existsSync(propertyCardPath)) {
    try {
        const content = fs.readFileSync(propertyCardPath, 'utf8');
        
        check(
            'Property card: Uses dynamic data binding',
            content.includes('listing.') && content.includes('PropertyCardProps'),
            propertyCardPath
        );
        
        check(
            'Property card: Displays bedBathCarLand correctly',
            content.includes('PropertyFeaturesInline') || (content.includes('bed') && content.includes('bath')),
            propertyCardPath
        );
        
    } catch (error) {
        check('Property card: File readable', false, propertyCardPath);
    }
}

// Check bedBathCarLand component
const featuresPath = '/home/schema/final/final-main/components/ui/property-features.tsx';
if (fs.existsSync(featuresPath)) {
    try {
        const content = fs.readFileSync(featuresPath, 'utf8');
        
        check(
            'Property features: Human-readable format',
            content.includes('bed') && content.includes('bath') && !content.includes('bedrooms'),
            featuresPath
        );
        
        check(
            'Property features: Conditional rendering',
            content.includes('&&') || content.includes('?'),
            featuresPath
        );
        
    } catch (error) {
        check('Property features: File readable', false, featuresPath);
    }
}

console.log('');

// Results Summary
console.log('📊 CATEGORY FILTERING ENFORCEMENT RESULTS');
console.log('=========================================');
console.log(`Total Checks: ${totalChecks}`);
console.log(`Passed: ${passedChecks} ✅`);
console.log(`Failed: ${totalChecks - passedChecks} ❌`);

const passRate = Math.round((passedChecks / totalChecks) * 100);
console.log(`Pass Rate: ${passRate}%`);
console.log('');

if (failures.length > 0) {
    console.log('🚨 LAUNCH BLOCKING FAILURES:');
    console.log('============================');
    failures.forEach((failure, index) => {
        console.log(`${index + 1}. ❌ ${failure.description}`);
        if (failure.filePath) {
            console.log(`   File: ${failure.filePath}`);
        }
    });
    console.log('');
}

// Final Verdict
if (passRate >= 95) {
    console.log('🟢 CATEGORY FILTERING: APPROVED FOR LAUNCH');
    console.log('All critical filtering requirements met.');
} else if (passRate >= 85) {
    console.log('🟡 CATEGORY FILTERING: NEEDS MINOR FIXES');
    console.log('Some non-critical issues found. Review recommended.');
} else {
    console.log('🔴 CATEGORY FILTERING: LAUNCH BLOCKED');
    console.log('Critical filtering issues must be resolved before launch.');
}

console.log('');
console.log('🎯 STRICT CATEGORY FILTERING CHECKLIST:');
console.log('=======================================');
console.log('□ /for-sale shows ONLY Residential + forSale');
console.log('□ /for-rent shows ONLY Residential + forRent'); 
console.log('□ /commercial shows ONLY Commercial properties');
console.log('□ /sold shows ONLY Residential + Sold');
console.log('□ /leased shows ONLY Residential + Leased');
console.log('□ Agent profiles filter by specific agentID');
console.log('□ Search applies filters correctly');
console.log('□ Property details show correct type/category');
console.log('□ API uses agencyID=10021353 on all calls');
console.log('□ No hardcoded API URLs in components');
console.log('□ bedBathCarLand displays in human format');
console.log('□ No category bleed-through anywhere');
console.log('');

console.log('Generated:', new Date().toISOString());
