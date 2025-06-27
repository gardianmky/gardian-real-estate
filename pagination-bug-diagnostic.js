#!/usr/bin/env node

/**
 * 🔍 DETAILED PAGINATION BUG INVESTIGATION
 * Testing API calls to understand why For Sale pagination shows identical content
 */

console.log('🔍 DETAILED PAGINATION BUG INVESTIGATION');
console.log('=' .repeat(60));
console.log('');

// API Configuration (copied from lib/api.ts)
const API_CONFIG = {
  BASE_URL: 'https://api.renet.app',
  HEADERS: {
    'Accept': 'application/json',
    'Authorization': 'Bearer MRhE2JztS7rewrkrttDgJOrCHa17vBarvKLVk5V2xBlBWiZCqGfamsXH',
    'User-Agent': 'RapidAPI/4.2.8 (Macintosh; OS X/15.3.0) GCDHTTPRequest',
    'Connection': 'close',
    'Content-Type': 'application/json'
  },
  AGENCY_ID: '10021353'
};

async function testPaginationAPI(page, resultsPerPage = 12) {
  console.log(`\n📊 Testing API Call for Page ${page}`);
  console.log('-'.repeat(40));
  
  // Build the exact same parameters as the fetchListingsIndex function
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('resultsPerPage', resultsPerPage.toString());
  params.append('disposalMethod', 'forSale');
  params.append('orderBy', 'dateListed');
  params.append('orderDirection', 'desc');
  params.append('agencyID', API_CONFIG.AGENCY_ID);
  params.append('type', 'Residential');

  const url = `${API_CONFIG.BASE_URL}/Website/Listings?${params.toString()}`;
  
  console.log(`📡 API URL: ${url}`);
  
  try {
    const response = await fetch(url, {
      headers: API_CONFIG.HEADERS,
      cache: 'no-store'
    });

    console.log(`📊 Response Status: ${response.status}`);
    
    // Extract pagination headers
    const headers = {
      totalResults: response.headers.get('x-totalResults') || response.headers.get('X-totalResults'),
      currentPage: response.headers.get('x-currentPage') || response.headers.get('X-currentPage'),
      totalPages: response.headers.get('x-totalPages') || response.headers.get('X-totalPages'),
      resultsPerPage: response.headers.get('x-resultsPerPage') || response.headers.get('X-resultsPerPage'),
      nextPage: response.headers.get('x-NextPage') || response.headers.get('X-NextPage')
    };
    
    console.log('📋 Pagination Headers:');
    Object.entries(headers).forEach(([key, value]) => {
      console.log(`   ${key}: ${value || 'null'}`);
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const listings = Array.isArray(data) ? data : [];
    
    console.log(`📦 Listings Returned: ${listings.length}`);
    
    if (listings.length > 0) {
      console.log('🏠 First 3 Property IDs:');
      listings.slice(0, 3).forEach((listing, index) => {
        const id = listing.listingID || listing.id;
        const title = listing.heading || listing.address?.displayAddress || 'No title';
        console.log(`   ${index + 1}. ID: ${id} - ${title.substring(0, 50)}...`);
      });
    } else {
      console.log('❌ No listings returned');
    }
    
    return {
      url,
      status: response.status,
      headers,
      listingCount: listings.length,
      firstThreeIds: listings.slice(0, 3).map(l => l.listingID || l.id),
      listings: listings
    };
    
  } catch (error) {
    console.error(`❌ API Error:`, error.message);
    return {
      url,
      error: error.message,
      listingCount: 0,
      firstThreeIds: []
    };
  }
}

async function runPaginationTest() {
  console.log('🧪 TESTING PAGINATION API CALLS');
  console.log('');
  
  // Test first 3 pages
  const page1 = await testPaginationAPI(1);
  const page2 = await testPaginationAPI(2);
  const page3 = await testPaginationAPI(3);
  
  console.log('\n🔍 COMPARISON ANALYSIS');
  console.log('=' .repeat(50));
  
  // Compare if pages return identical content
  const page1Ids = page1.firstThreeIds || [];
  const page2Ids = page2.firstThreeIds || [];
  const page3Ids = page3.firstThreeIds || [];
  
  console.log('\n📋 Property ID Comparison:');
  console.log(`Page 1 first 3 IDs: ${page1Ids.join(', ')}`);
  console.log(`Page 2 first 3 IDs: ${page2Ids.join(', ')}`);
  console.log(`Page 3 first 3 IDs: ${page3Ids.join(', ')}`);
  
  // Check for identical content
  const page1And2Identical = JSON.stringify(page1Ids) === JSON.stringify(page2Ids);
  const page2And3Identical = JSON.stringify(page2Ids) === JSON.stringify(page3Ids);
  const allIdentical = page1And2Identical && page2And3Identical;
  
  console.log('\n🚨 PAGINATION BUG ANALYSIS:');
  console.log(`Page 1 & 2 identical: ${page1And2Identical ? '❌ YES (BUG!)' : '✅ NO'}`);
  console.log(`Page 2 & 3 identical: ${page2And3Identical ? '❌ YES (BUG!)' : '✅ NO'}`);
  console.log(`All pages identical: ${allIdentical ? '❌ YES (MAJOR BUG!)' : '✅ NO'}`);
  
  // Analyze headers
  console.log('\n📊 HEADER ANALYSIS:');
  if (page1.headers && page2.headers) {
    console.log(`Page 1 currentPage header: ${page1.headers.currentPage}`);
    console.log(`Page 2 currentPage header: ${page2.headers.currentPage}`);
    
    if (page1.headers.currentPage === page2.headers.currentPage) {
      console.log('❌ PROBLEM: API is not respecting page parameter!');
    } else {
      console.log('✅ API is correctly updating currentPage header');
    }
  }
  
  // Test with different parameters to isolate the issue
  console.log('\n🧪 TESTING DIFFERENT PARAMETER COMBINATIONS:');
  
  // Test without agencyID filter
  console.log('\n🔬 Test 1: Without agencyID filter');
  const testWithoutAgency = await testAPIWithoutAgency(1);
  
  // Test with different resultsPerPage
  console.log('\n🔬 Test 2: Different resultsPerPage');
  const testDifferentPageSize = await testPaginationAPI(1, 6);
  
  console.log('\n📝 DIAGNOSIS:');
  if (allIdentical) {
    console.log('❌ CONFIRMED: Pagination is completely broken');
    console.log('   - API is returning identical results for all pages');
    console.log('   - This is a critical server-side pagination issue');
  } else if (page1And2Identical) {
    console.log('⚠️  PARTIAL ISSUE: Some pagination problems detected');
  } else {
    console.log('✅ Pagination appears to be working at API level');
    console.log('   - Bug may be in client-side handling or caching');
  }
}

async function testAPIWithoutAgency(page) {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('resultsPerPage', '12');
  params.append('disposalMethod', 'forSale');
  params.append('orderBy', 'dateListed');
  params.append('orderDirection', 'desc');
  params.append('type', 'Residential');
  // Note: No agencyID filter

  const url = `${API_CONFIG.BASE_URL}/Website/Listings?${params.toString()}`;
  
  try {
    const response = await fetch(url, { headers: API_CONFIG.HEADERS });
    const data = await response.json();
    const listings = Array.isArray(data) ? data : [];
    
    console.log(`   Results without agencyID: ${listings.length} listings`);
    return { listingCount: listings.length };
  } catch (error) {
    console.log(`   Error: ${error.message}`);
    return { error: error.message };
  }
}

// Run the test
runPaginationTest().catch(console.error);
