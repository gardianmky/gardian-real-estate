#!/usr/bin/env node

/**
 * 🔍 LIVE SITE PAGINATION TEST
 * Direct testing of the live production site to identify caching issues
 */

const https = require('https');

console.log('🔍 LIVE SITE PAGINATION TEST');
console.log('=' .repeat(50));
console.log('Testing: https://final-gre.vercel.app/for-sale');
console.log('');

async function fetchLivePage(pageNum) {
  return new Promise((resolve, reject) => {
    const url = `https://final-gre.vercel.app/for-sale${pageNum > 1 ? `?page=${pageNum}` : ''}`;
    
    console.log(`📡 Fetching: ${url}`);
    
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PaginationTest/1.0)',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        // Extract property IDs from the HTML
        const propertyIdMatches = data.match(/property\/(\d+)/g) || [];
        const uniquePropertyIds = [...new Set(propertyIdMatches.map(match => match.replace('property/', '')))];
        
        // Extract page number indicator
        const pageIndicatorMatch = data.match(/Page\s+(\d+)\s+of\s+(\d+)/);
        const currentPageFromHtml = pageIndicatorMatch ? pageIndicatorMatch[1] : 'unknown';
        const totalPagesFromHtml = pageIndicatorMatch ? pageIndicatorMatch[2] : 'unknown';
        
        // Extract property titles for comparison
        const titleMatches = data.match(/<h3[^>]*class="[^"]*text-lg[^"]*"[^>]*>([^<]+)</g) || [];
        const titles = titleMatches.map(match => 
          match.replace(/<h3[^>]*>/, '').replace(/<\/h3>/, '').trim()
        ).slice(0, 3);
        
        resolve({
          url,
          statusCode: res.statusCode,
          propertyIds: uniquePropertyIds.slice(0, 5), // First 5 unique property IDs
          currentPage: currentPageFromHtml,
          totalPages: totalPagesFromHtml,
          titles: titles,
          hasContent: data.includes('Properties For Sale'),
          contentLength: data.length
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function runLivePaginationTest() {
  try {
    console.log('🧪 TESTING LIVE SITE PAGINATION');
    console.log('');
    
    // Test pages 1, 2, and 3
    const page1 = await fetchLivePage(1);
    console.log(`✅ Page 1 fetched: ${page1.statusCode} (${page1.contentLength} bytes)`);
    console.log(`   Property IDs: ${page1.propertyIds.join(', ')}`);
    console.log(`   Page indicator: ${page1.currentPage} of ${page1.totalPages}`);
    console.log(`   First titles: ${page1.titles.slice(0, 2).join(', ')}`);
    console.log('');
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
    
    const page2 = await fetchLivePage(2);
    console.log(`✅ Page 2 fetched: ${page2.statusCode} (${page2.contentLength} bytes)`);
    console.log(`   Property IDs: ${page2.propertyIds.join(', ')}`);
    console.log(`   Page indicator: ${page2.currentPage} of ${page2.totalPages}`);
    console.log(`   First titles: ${page2.titles.slice(0, 2).join(', ')}`);
    console.log('');
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
    
    const page3 = await fetchLivePage(3);
    console.log(`✅ Page 3 fetched: ${page3.statusCode} (${page3.contentLength} bytes)`);
    console.log(`   Property IDs: ${page3.propertyIds.join(', ')}`);
    console.log(`   Page indicator: ${page3.currentPage} of ${page3.totalPages}`);
    console.log(`   First titles: ${page3.titles.slice(0, 2).join(', ')}`);
    console.log('');
    
    // Compare results
    console.log('🔍 PAGINATION ANALYSIS:');
    console.log('-'.repeat(30));
    
    const page1Ids = page1.propertyIds.join(',');
    const page2Ids = page2.propertyIds.join(',');
    const page3Ids = page3.propertyIds.join(',');
    
    const page1And2Same = page1Ids === page2Ids;
    const page2And3Same = page2Ids === page3Ids;
    const allSame = page1And2Same && page2And3Same;
    
    console.log(`Page 1 IDs: ${page1Ids}`);
    console.log(`Page 2 IDs: ${page2Ids}`);
    console.log(`Page 3 IDs: ${page3Ids}`);
    console.log('');
    
    console.log(`Pages 1&2 identical: ${page1And2Same ? '❌ YES (BUG!)' : '✅ NO'}`);
    console.log(`Pages 2&3 identical: ${page2And3Same ? '❌ YES (BUG!)' : '✅ NO'}`);
    console.log(`All pages identical: ${allSame ? '❌ YES (CRITICAL BUG!)' : '✅ NO'}`);
    console.log('');
    
    // Check page indicators
    console.log('📊 PAGE INDICATOR ANALYSIS:');
    console.log(`Page 1 shows: "Page ${page1.currentPage} of ${page1.totalPages}"`);
    console.log(`Page 2 shows: "Page ${page2.currentPage} of ${page2.totalPages}"`);
    console.log(`Page 3 shows: "Page ${page3.currentPage} of ${page3.totalPages}"`);
    
    const pageIndicatorsCorrect = 
      page1.currentPage === '1' && 
      page2.currentPage === '2' && 
      page3.currentPage === '3';
    
    console.log(`Page indicators correct: ${pageIndicatorsCorrect ? '✅ YES' : '❌ NO'}`);
    console.log('');
    
    // Final diagnosis
    console.log('🎯 FINAL DIAGNOSIS:');
    console.log('-'.repeat(20));
    
    if (allSame && !pageIndicatorsCorrect) {
      console.log('❌ CRITICAL: Complete pagination failure');
      console.log('   - Content is identical across all pages');
      console.log('   - Page indicators are wrong');
      console.log('   - Likely server-side pagination bug');
    } else if (allSame && pageIndicatorsCorrect) {
      console.log('⚠️  PARTIAL: Page indicators work but content is identical');
      console.log('   - Page parameter is being read correctly');
      console.log('   - But API calls or data fetching is cached/broken');
    } else if (!allSame && pageIndicatorsCorrect) {
      console.log('✅ SUCCESS: Pagination appears to be working correctly');
      console.log('   - Different content on each page');
      console.log('   - Correct page indicators');
      console.log('   - May have been a temporary caching issue');
    } else {
      console.log('🤔 MIXED RESULTS: Partial pagination functionality');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

runLivePaginationTest();
