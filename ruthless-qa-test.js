#!/usr/bin/env node

/**
 * 🧪 RUTHLESS PRE-LAUNCH QA TEST SUITE
 * Gardian Real Estate - https://final-gre.vercel.app/
 * 
 * Goal: Ensure ZERO dummy content, bulletproof live data integration
 * Break it before users do. No assumptions. No guesswork.
 */

const https = require('https');
const fs = require('fs');

console.log('🧪 RUTHLESS PRE-LAUNCH QA TEST SUITE');
console.log('=' .repeat(60));
console.log('Target: https://final-gre.vercel.app/');
console.log('Objective: Break it before users do');
console.log('');

const BASE_URL = 'https://final-gre.vercel.app';
const results = {
  passes: 0,
  failures: 0,
  warnings: 0,
  criticalIssues: []
};

// Utility function to fetch page content
async function fetchPage(url, testName = '') {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'RuthlessQA/1.0 (Pre-Launch Test Suite)',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          statusCode: res.statusCode,
          content: data,
          headers: res.headers,
          testName
        });
      });
    }).on('error', reject);
  });
}

// Test 1: For Sale Pagination Ruthless Test
async function testForSalePagination() {
  console.log('🔥 TEST 1: FOR SALE PAGINATION RUTHLESS AUDIT');
  console.log('-'.repeat(50));
  
  const pages = [1, 2, 3];
  const pageResults = [];
  
  for (const page of pages) {
    const url = `${BASE_URL}/for-sale${page > 1 ? `?page=${page}` : ''}`;
    console.log(`📡 Testing: ${url}`);
    
    try {
      const result = await fetchPage(url, `ForSale-Page${page}`);
      
      // Extract property IDs
      const propertyMatches = result.content.match(/property\/(\d+)/g) || [];
      const propertyIds = [...new Set(propertyMatches.map(m => m.replace('property/', '')))];
      
      // Extract page indicator
      const pageMatch = result.content.match(/Page\s+(\d+)\s+of\s+(\d+)/);
      const currentPage = pageMatch ? pageMatch[1] : 'unknown';
      const totalPages = pageMatch ? pageMatch[2] : 'unknown';
      
      // Check for live data indicators
      const hasLiveData = propertyIds.length > 0;
      const hasPlaceholders = result.content.includes('placeholder') || 
                            result.content.includes('dummy') ||
                            result.content.includes('Lorem ipsum');
      
      pageResults.push({
        page,
        url,
        propertyIds: propertyIds.slice(0, 5),
        currentPage,
        totalPages,
        hasLiveData,
        hasPlaceholders,
        propertyCount: propertyIds.length,
        contentLength: result.content.length
      });
      
      console.log(`   ✅ Status: ${result.statusCode}`);
      console.log(`   📊 Properties: ${propertyIds.length}`);
      console.log(`   🏠 First 3 IDs: ${propertyIds.slice(0, 3).join(', ')}`);
      console.log(`   📄 Page: ${currentPage} of ${totalPages}`);
      console.log('');
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      results.failures++;
      results.criticalIssues.push(`For Sale Page ${page}: ${error.message}`);
    }
  }
  
  // Analyze pagination integrity
  console.log('🔍 PAGINATION INTEGRITY ANALYSIS:');
  
  const page1Ids = pageResults[0]?.propertyIds?.join(',') || '';
  const page2Ids = pageResults[1]?.propertyIds?.join(',') || '';
  const page3Ids = pageResults[2]?.propertyIds?.join(',') || '';
  
  const identical12 = page1Ids === page2Ids;
  const identical23 = page2Ids === page3Ids;
  const allIdentical = identical12 && identical23;
  
  if (allIdentical && page1Ids) {
    console.log('❌ CRITICAL FAILURE: All pages show identical content!');
    results.failures++;
    results.criticalIssues.push('For Sale pagination completely broken - identical content across pages');
  } else if (identical12 || identical23) {
    console.log('⚠️  WARNING: Some pages show identical content');
    results.warnings++;
  } else {
    console.log('✅ PASS: Each page shows different content');
    results.passes++;
  }
  
  // Check for placeholder content
  const hasAnyPlaceholders = pageResults.some(p => p.hasPlaceholders);
  if (hasAnyPlaceholders) {
    console.log('❌ CRITICAL: Placeholder content detected!');
    results.failures++;
    results.criticalIssues.push('For Sale pages contain placeholder or dummy content');
  } else {
    console.log('✅ PASS: No placeholder content detected');
    results.passes++;
  }
  
  console.log('');
}

// Test 2: Agent Profile Integration Test
async function testAgentProfiles() {
  console.log('🔥 TEST 2: AGENT PROFILE INTEGRATION AUDIT');
  console.log('-'.repeat(50));
  
  // First get agent list
  try {
    const agentsPage = await fetchPage(`${BASE_URL}/agents`, 'AgentsList');
    console.log(`📡 Testing agents list: ${agentsPage.statusCode}`);
    
    // Extract agent profile links
    const agentLinks = agentsPage.content.match(/\/agents\/(\d+)/g) || [];
    const agentIds = [...new Set(agentLinks.map(link => link.replace('/agents/', '')))];
    
    console.log(`📊 Found ${agentIds.length} agent profile links`);
    
    if (agentIds.length === 0) {
      console.log('❌ CRITICAL: No agent profile links found!');
      results.failures++;
      results.criticalIssues.push('Agent directory has no profile links');
      return;
    }
    
    // Test first 3 agent profiles
    for (let i = 0; i < Math.min(3, agentIds.length); i++) {
      const agentId = agentIds[i];
      const agentUrl = `${BASE_URL}/agents/${agentId}`;
      
      console.log(`📡 Testing agent profile: ${agentUrl}`);
      
      const agentProfile = await fetchPage(agentUrl, `Agent-${agentId}`);
      
      const isUnavailable = agentProfile.content.includes('Agent Profile Unavailable') ||
                           agentProfile.content.includes('Agent Not Found');
      
      const hasLiveData = agentProfile.content.includes('@gardian.com.au') ||
                         agentProfile.content.includes('07 4957 7424') ||
                         agentProfile.content.includes('Sales Agent');
      
      if (isUnavailable) {
        console.log(`   ❌ Agent ${agentId}: Profile unavailable`);
        results.failures++;
        if (i === 0) { // Only mark as critical if first agent fails
          results.criticalIssues.push(`Agent profiles are not accessible (tested ${agentId})`);
        }
      } else if (hasLiveData) {
        console.log(`   ✅ Agent ${agentId}: Live profile data detected`);
        results.passes++;
      } else {
        console.log(`   ⚠️  Agent ${agentId}: Profile loads but data unclear`);
        results.warnings++;
      }
    }
    
  } catch (error) {
    console.log(`❌ Error testing agents: ${error.message}`);
    results.failures++;
    results.criticalIssues.push(`Agent testing failed: ${error.message}`);
  }
  
  console.log('');
}

// Test 3: Search Functionality Test
async function testSearchFunctionality() {
  console.log('🔥 TEST 3: SEARCH FUNCTIONALITY AUDIT');
  console.log('-'.repeat(50));
  
  const searchTests = [
    { url: `${BASE_URL}/search`, name: 'Basic Search Page' },
    { url: `${BASE_URL}/search?q=Mackay`, name: 'Keyword Search' },
    { url: `${BASE_URL}/search?bedrooms=3&minPrice=500000`, name: 'Filter Search' }
  ];
  
  for (const test of searchTests) {
    try {
      console.log(`📡 Testing: ${test.name} - ${test.url}`);
      
      const result = await fetchPage(test.url, test.name);
      
      const isLoading = result.content.includes('Searching properties...') ||
                       result.content.includes('Loading...');
      
      const hasResults = result.content.includes('property/') &&
                        result.content.match(/property\/\d+/g)?.length > 0;
      
      const hasEmptyState = result.content.includes('No properties found') ||
                           result.content.includes('0 properties');
      
      const hasPlaceholders = result.content.includes('placeholder') ||
                             result.content.includes('dummy');
      
      if (hasPlaceholders) {
        console.log(`   ❌ ${test.name}: Contains placeholder content`);
        results.failures++;
        results.criticalIssues.push(`Search contains placeholder content: ${test.name}`);
      } else if (isLoading && !hasResults && !hasEmptyState) {
        console.log(`   ⚠️  ${test.name}: Stuck in loading state`);
        results.warnings++;
      } else if (hasResults) {
        console.log(`   ✅ ${test.name}: Live search results detected`);
        results.passes++;
      } else if (hasEmptyState) {
        console.log(`   ✅ ${test.name}: Proper empty state handling`);
        results.passes++;
      } else {
        console.log(`   ⚠️  ${test.name}: Unclear search state`);
        results.warnings++;
      }
      
    } catch (error) {
      console.log(`   ❌ ${test.name}: ${error.message}`);
      results.failures++;
    }
  }
  
  console.log('');
}

// Test 4: bedBathCarLand Display Test
async function testBedBathCarLandDisplay() {
  console.log('🔥 TEST 4: BED/BATH/CAR/LAND DISPLAY AUDIT');
  console.log('-'.repeat(50));
  
  const pagesToTest = [
    `${BASE_URL}/for-sale`,
    `${BASE_URL}/for-rent`,
    `${BASE_URL}/commercial`,
    `${BASE_URL}/`
  ];
  
  for (const pageUrl of pagesToTest) {
    try {
      console.log(`📡 Testing bedBathCarLand on: ${pageUrl}`);
      
      const result = await fetchPage(pageUrl, 'BedBathCar-Test');
      
      // Look for bed/bath/car patterns
      const bedPatterns = result.content.match(/(\d+)\s+(bed|bedroom)/gi) || [];
      const bathPatterns = result.content.match(/(\d+)\s+(bath|bathroom)/gi) || [];
      const carPatterns = result.content.match(/(\d+)\s+(car|garage|parking)/gi) || [];
      const landPatterns = result.content.match(/(\d+)\s*(m²|sqm|square)/gi) || [];
      
      // Check for hardcoded values
      const hasHardcoded = result.content.includes('3 bed') && 
                          result.content.includes('2 bath') &&
                          result.content.includes('1 car') &&
                          !result.content.includes('4 bed'); // Simple heuristic
      
      const totalFeatures = bedPatterns.length + bathPatterns.length + carPatterns.length + landPatterns.length;
      
      console.log(`   📊 Feature displays found: ${totalFeatures}`);
      console.log(`   🛏️  Bed patterns: ${bedPatterns.length}`);
      console.log(`   🚿 Bath patterns: ${bathPatterns.length}`);
      console.log(`   🚗 Car patterns: ${carPatterns.length}`);
      console.log(`   📏 Land patterns: ${landPatterns.length}`);
      
      if (hasHardcoded) {
        console.log(`   ⚠️  WARNING: Possible hardcoded bed/bath/car values`);
        results.warnings++;
      } else if (totalFeatures > 0) {
        console.log(`   ✅ PASS: Dynamic bed/bath/car/land data detected`);
        results.passes++;
      } else {
        console.log(`   ❌ FAIL: No bed/bath/car/land data found`);
        results.failures++;
      }
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      results.failures++;
    }
  }
  
  console.log('');
}

// Test 5: Schema.org and SEO Test
async function testSchemaAndSEO() {
  console.log('🔥 TEST 5: SCHEMA.ORG & SEO METADATA AUDIT');
  console.log('-'.repeat(50));
  
  // Test property detail page for schema
  const propertyUrls = [
    `${BASE_URL}/property/20063454`,
    `${BASE_URL}/property/21123400`
  ];
  
  for (const url of propertyUrls) {
    try {
      console.log(`📡 Testing schema/SEO: ${url}`);
      
      const result = await fetchPage(url, 'Schema-Test');
      
      // Check for Schema.org structured data
      const hasSchema = result.content.includes('@context') && 
                       result.content.includes('schema.org');
      
      const hasPropertySchema = result.content.includes('SingleFamilyResidence') ||
                               result.content.includes('RealEstateListing');
      
      // Check for Open Graph tags
      const hasOGTitle = result.content.includes('og:title');
      const hasOGDescription = result.content.includes('og:description');
      const hasOGImage = result.content.includes('og:image');
      
      // Check for dynamic title
      const hasDynamicTitle = !result.content.includes('<title>Gardian Real Estate</title>') &&
                             result.content.includes('<title>');
      
      console.log(`   📋 Schema.org: ${hasSchema ? '✅' : '❌'}`);
      console.log(`   🏠 Property Schema: ${hasPropertySchema ? '✅' : '❌'}`);
      console.log(`   🏷️  Open Graph Title: ${hasOGTitle ? '✅' : '❌'}`);
      console.log(`   📝 Open Graph Description: ${hasOGDescription ? '✅' : '❌'}`);
      console.log(`   🖼️  Open Graph Image: ${hasOGImage ? '✅' : '❌'}`);
      console.log(`   🔤 Dynamic Title: ${hasDynamicTitle ? '✅' : '❌'}`);
      
      const seoScore = [hasSchema, hasOGTitle, hasOGDescription, hasOGImage, hasDynamicTitle]
        .filter(Boolean).length;
      
      if (seoScore >= 4) {
        console.log(`   ✅ PASS: Strong SEO implementation (${seoScore}/5)`);
        results.passes++;
      } else if (seoScore >= 2) {
        console.log(`   ⚠️  PARTIAL: Basic SEO present (${seoScore}/5)`);
        results.warnings++;
      } else {
        console.log(`   ❌ FAIL: Poor SEO implementation (${seoScore}/5)`);
        results.failures++;
        results.criticalIssues.push(`Property pages have poor SEO metadata: ${url}`);
      }
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      results.failures++;
    }
  }
  
  console.log('');
}

// Test 6: Live Data Verification
async function testLiveDataVerification() {
  console.log('🔥 TEST 6: LIVE DATA VERIFICATION AUDIT');
  console.log('-'.repeat(50));
  
  // Test homepage for live data
  try {
    const homepage = await fetchPage(`${BASE_URL}/`, 'Homepage-LiveData');
    
    // Check for static/dummy content
    const staticIndicators = [
      'Lorem ipsum',
      'placeholder',
      'dummy',
      'example.com',
      'test@test.com',
      '555-555-5555',
      'Sample Property',
      'Default Agent'
    ];
    
    const foundStatic = staticIndicators.filter(indicator => 
      homepage.content.toLowerCase().includes(indicator.toLowerCase())
    );
    
    // Check for live data indicators
    const liveIndicators = [
      'gardian.com.au',
      '07 4957 7424',
      'property/',
      'Best of Both Worlds',
      'Adjoining City',
      '@gardian.com.au'
    ];
    
    const foundLive = liveIndicators.filter(indicator =>
      homepage.content.includes(indicator)
    );
    
    console.log(`📊 Static content indicators found: ${foundStatic.length}`);
    if (foundStatic.length > 0) {
      console.log(`   ❌ STATIC CONTENT: ${foundStatic.join(', ')}`);
      results.failures++;
      results.criticalIssues.push(`Homepage contains static/placeholder content: ${foundStatic.join(', ')}`);
    }
    
    console.log(`📊 Live data indicators found: ${foundLive.length}`);
    if (foundLive.length >= 3) {
      console.log(`   ✅ PASS: Strong live data presence`);
      results.passes++;
    } else {
      console.log(`   ⚠️  WARNING: Limited live data indicators`);
      results.warnings++;
    }
    
  } catch (error) {
    console.log(`❌ Error testing live data: ${error.message}`);
    results.failures++;
  }
  
  console.log('');
}

// Run all tests
async function runRuthlessQA() {
  console.log('🚀 STARTING RUTHLESS QA TEST EXECUTION');
  console.log('');
  
  await testForSalePagination();
  await testAgentProfiles();
  await testSearchFunctionality();
  await testBedBathCarLandDisplay();
  await testSchemaAndSEO();
  await testLiveDataVerification();
  
  // Final Results
  console.log('📊 RUTHLESS QA TEST RESULTS');
  console.log('=' .repeat(60));
  console.log(`✅ PASSES: ${results.passes}`);
  console.log(`❌ FAILURES: ${results.failures}`);
  console.log(`⚠️  WARNINGS: ${results.warnings}`);
  console.log('');
  
  if (results.criticalIssues.length > 0) {
    console.log('🚨 CRITICAL ISSUES BLOCKING LAUNCH:');
    results.criticalIssues.forEach((issue, index) => {
      console.log(`${index + 1}. ❌ ${issue}`);
    });
    console.log('');
  }
  
  const totalTests = results.passes + results.failures + results.warnings;
  const successRate = Math.round((results.passes / totalTests) * 100);
  
  console.log(`🎯 SUCCESS RATE: ${successRate}%`);
  
  if (results.failures === 0 && results.criticalIssues.length === 0) {
    console.log('🎉 RUTHLESS QA VERDICT: APPROVED FOR LAUNCH!');
    console.log('   All critical functionality verified with live data');
  } else if (results.failures <= 2 && results.criticalIssues.length === 0) {
    console.log('⚠️  RUTHLESS QA VERDICT: CONDITIONAL APPROVAL');
    console.log('   Minor issues present but no launch blockers');
  } else {
    console.log('❌ RUTHLESS QA VERDICT: NOT APPROVED FOR LAUNCH');
    console.log('   Critical issues must be resolved before go-live');
  }
  
  // Save results to file
  const reportData = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    results: results,
    successRate: successRate
  };
  
  fs.writeFileSync('ruthless-qa-report.json', JSON.stringify(reportData, null, 2));
  console.log('');
  console.log('📄 Full report saved to: ruthless-qa-report.json');
}

// Execute the ruthless QA
runRuthlessQA().catch(console.error);
