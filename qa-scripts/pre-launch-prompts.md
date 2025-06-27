# Pre-Launch QA Testing Prompts for Mackay's Best Real Estate

## 🚨 RUTHLESS QA TESTING PROMPT FOR AI ASSISTANTS

Copy and paste this prompt to any AI assistant (Claude, ChatGPT, etc.) for comprehensive testing:

---

**RUTHLESS PRE-LAUNCH QA FOR REAL ESTATE WEBSITE**

I need you to perform ruthless, comprehensive testing on "Mackay's Best Real Estate" Next.js website. Test EVERYTHING. Be extremely critical and thorough.

**CRITICAL REQUIREMENTS:**
1. **NO STATIC CONTENT** - Every listing, agent, and property MUST come from live API
2. **PAGINATION MUST WORK** - Server-side pagination, not client-side slicing
3. **VISUAL POLISH** - Professional, modern, responsive design
4. **bedBathCarLand FORMAT** - Display as "3 bed, 2 bath, 2 car, 500m²" (human-readable)
5. **LIVE DATA EVERYWHERE** - No dummy/placeholder content visible to users

**TEST THESE ROUTES EXHAUSTIVELY:**
- `/` (homepage - 4 featured properties, never paginated)
- `/for-sale` `/for-sale?page=2` `/for-sale?page=3`
- `/for-rent` `/for-rent?page=2` 
- `/commercial` `/commercial?page=2`
- `/buy` `/sold` `/open-homes` `/leased`
- `/agents` `/agents/[id]` (agent profiles)
- `/search?q=mackay` `/search?category=residential`
- `/property/[id]` (property details)

**SPECIFIC CHECKS:**
1. **API Integration**: All content from api.domain.com.au/v1, filtered by agencyID=22446
2. **Pagination**: Click page 2,3+ - should show different properties, not repeat
3. **bedBathCarLand**: Never show raw "bathrooms: 2" - always "2 bath"
4. **Images**: All property images load, fallback for missing images
5. **Responsive**: Test mobile, tablet, desktop breakpoints
6. **Performance**: Page loads under 3 seconds
7. **SEO**: Meta tags generated from live listing data
8. **Errors**: No console errors, no 404s, graceful error handling

**EDGE CASES TO TEST:**
- Empty search results
- Properties with missing bedBathCarLand data
- Very long property descriptions
- Agent profiles without photos
- Network timeouts/API failures
- Invalid page numbers (page=999)
- XSS/injection attempts in search

**VISUAL REQUIREMENTS:**
- Modern gradient backgrounds
- Consistent spacing and typography
- Hover effects on property cards
- Loading states for all dynamic content
- Professional color scheme (blues/grays)
- Mobile-first responsive design

**FAILURE CONDITIONS:**
❌ Any hardcoded "Sample Property" or "Lorem ipsum"
❌ Pagination that doesn't change content
❌ bedBathCarLand showing as raw JSON fields
❌ 500/404 errors on valid routes
❌ Console errors in browser
❌ Non-responsive layout on mobile
❌ Slow loading (>5 seconds)
❌ Agent profiles showing "unavailable"

**SUCCESS CRITERIA:**
✅ All content is live API data
✅ Pagination works flawlessly
✅ bedBathCarLand formatted correctly
✅ Fast, responsive, professional appearance
✅ No errors or broken functionality
✅ SEO optimized with live data

**REPORT FORMAT:**
List every issue found with:
1. Severity (Critical/Major/Minor)
2. Location (exact URL/component)
3. Expected vs Actual behavior
4. Steps to reproduce
5. Suggested fix

**BE RUTHLESS** - This site is going live to real customers. Find every flaw.

---

## 🔧 TECHNICAL TESTING COMMANDS

Run these in the terminal for automated checks:

```bash
# Build check
npm run build

# Type checking
npm run type-check

# Lint check
npm run lint

# Automated QA script
node ruthless-pre-launch-qa.js

# Live pagination test
node live-pagination-test.js

# API integration test
node qa-test-results.js
```

## 📱 MANUAL MOBILE TESTING CHECKLIST

**iPhone/Android Testing:**
- [ ] Homepage hero section responsive
- [ ] Property cards stack correctly
- [ ] Navigation menu works on mobile
- [ ] Search filters collapse appropriately
- [ ] Pagination controls are touch-friendly
- [ ] Images load and resize correctly
- [ ] Text remains readable at all sizes
- [ ] No horizontal scrolling
- [ ] Touch targets are adequate (44px min)
- [ ] Forms work with mobile keyboards

**Tablet Testing:**
- [ ] Layout adapts between mobile and desktop
- [ ] Property grid shows 2-3 columns appropriately
- [ ] Navigation remains accessible
- [ ] Touch scrolling works smoothly

## 🎯 SPECIFIC bedBathCarLand VALIDATION

**CORRECT FORMAT:**
```
✅ "3 bed, 2 bath, 2 car, 650m²"
✅ "2 bed, 1 bath"
✅ "4 bed, 3 bath, 2 car"
✅ "Studio" (for 0 bed properties)
```

**INCORRECT FORMAT:**
```
❌ "bedrooms: 3, bathrooms: 2"
❌ "3 Bedrooms, 2 Bathrooms"
❌ "beds: 3"
❌ Raw API fields displayed
❌ Missing commas or inconsistent formatting
```

**VALIDATION STEPS:**
1. Check property cards on listing pages
2. Check property detail pages
3. Check search results
4. Verify conditional rendering (hide if 0 or null)
5. Check mobile display (text wrapping)

## 🚀 DEPLOYMENT READINESS CHECKLIST

**Pre-Launch Requirements:**
- [ ] All QA scripts pass with 90%+ success rate
- [ ] No critical or major bugs found
- [ ] Performance score >85 on PageSpeed Insights
- [ ] Mobile responsiveness validated
- [ ] SEO meta tags properly generated
- [ ] All API endpoints returning live data
- [ ] Error boundaries handle failures gracefully
- [ ] Agent profiles working correctly
- [ ] Search functionality fully operational
- [ ] No console errors in production build

**Launch Day Monitoring:**
- [ ] Monitor API response times
- [ ] Watch for 500/404 errors
- [ ] Check mobile traffic performance
- [ ] Verify pagination works under load
- [ ] Monitor search query performance
- [ ] Track user engagement metrics

## 📞 ESCALATION PROCEDURES

**If Critical Issues Found:**
1. Document with screenshots/videos
2. Classify severity level
3. Estimate fix timeline
4. Determine if launch should be delayed
5. Assign developer for immediate fix
6. Re-test after resolution

**Contact Information:**
- Development Team: [Contact details]
- QA Lead: [Contact details]
- Project Manager: [Contact details]
- Client Stakeholder: [Contact details]

---

*Last Updated: December 2024*
*Generated by: Automated QA System*
