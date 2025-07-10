# Google My Business Reviews Integration

## Overview
This implementation fetches and displays 5-star reviews from Google My Business using the Google Places API.

## Prerequisites

### 1. Google Cloud Console Setup
1. Create a Google Cloud Project
2. Enable Google Places API (New)
3. Create API credentials (API Key)
4. Add API key restrictions:
   - Application restrictions: HTTP referrers
   - API restrictions: Google Places API

### 2. Required Environment Variables
```env
GOOGLE_PLACES_API_KEY=your_api_key_here
GOOGLE_PLACE_ID=your_place_id_here
```

### 3. Finding Your Place ID
- Use Google's Place ID Finder: https://developers.google.com/maps/documentation/places/web-service/place-id
- Search for "Gardian Real Estate Mackay"
- Copy the Place ID

## API Endpoints

### Google Places API Details
- **Endpoint**: `https://maps.googleapis.com/maps/api/place/details/json`
- **Parameters**:
  - `place_id`: Your business Place ID
  - `fields`: reviews,rating,user_ratings_total
  - `key`: Your API key

### Review Fields Available
- `author_name`: Reviewer's name
- `author_url`: Link to reviewer's Google profile
- `language`: Review language
- `profile_photo_url`: Reviewer's profile photo
- `rating`: Individual rating (1-5)
- `relative_time_description`: "a month ago"
- `text`: Review content
- `time`: Unix timestamp

## Implementation Features

### 1. Review Filtering
- ✅ Filter reviews with rating ≥ 5
- ✅ Sort by recency (newest first)
- ✅ Limit display to recent reviews

### 2. Caching Strategy
- Server-side caching: 1 hour
- Client-side caching: 15 minutes
- Manual refresh option
- Fallback to cached data on API failure

### 3. Display Options
- Homepage testimonials section
- Dedicated reviews page
- Widget for sidebar
- Floating review badge

### 4. Performance Optimization
- Lazy loading of reviews
- Progressive enhancement
- SEO-friendly static fallback

## Security Considerations

### API Key Protection
- Never expose API key in client-side code
- Use server-side API routes
- Implement rate limiting
- Monitor usage in Google Cloud Console

### Data Validation
- Sanitize review content
- Validate API responses
- Handle missing data gracefully

## Cost Management

### Google Places API Pricing
- **Place Details**: $17.00 per 1,000 requests
- **Basic Data**: Included in Place Details
- **Contact Data**: Included in Place Details
- **Atmosphere Data**: Additional $5.00 per 1,000 requests

### Cost Optimization
- Cache aggressively (1 hour minimum)
- Only request needed fields
- Implement request quotas
- Monitor usage regularly

## Compliance

### Google's Terms of Service
- ✅ Display attribution "Powered by Google"
- ✅ Link to Google Maps when showing reviews
- ✅ Don't modify review content
- ✅ Show reviewer names as provided
- ❌ Don't filter negative reviews (we only show 5-star by design)
- ❌ Don't incentivize reviews

### Privacy Considerations
- Reviews are public data
- Respect reviewer privacy
- Include privacy policy updates
- GDPR compliance for EU visitors

## Error Handling

### Common Issues
1. **API Key Invalid**: Check key and restrictions
2. **Quota Exceeded**: Implement better caching
3. **No Reviews Found**: Show fallback content
4. **Network Errors**: Use cached data

### Fallback Strategy
```typescript
// Priority order:
1. Fresh API data
2. Server cache (Redis/memory)
3. Client cache (localStorage)
4. Static testimonials
```

## Monitoring

### Key Metrics
- API request count
- Cache hit rate
- Error frequency
- Page load impact
- User engagement with reviews

### Alerts
- API quota warnings
- Error rate spikes
- Cache failures
- Performance degradation