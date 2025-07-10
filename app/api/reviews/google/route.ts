import { NextRequest, NextResponse } from 'next/server';

// Types
interface GoogleReview {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GooglePlaceDetails {
  result: {
    reviews?: GoogleReview[];
    rating?: number;
    user_ratings_total?: number;
    name?: string;
    url?: string;
  };
  status: string;
  error_message?: string;
}

// Cache configuration
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
let cachedData: { reviews: GoogleReview[]; timestamp: number } | null = null;

// Get environment variables
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID || 'ChIJN1t_tDeuEmsRUsoyG83frY4'; // Fallback Place ID

export async function GET(request: NextRequest) {
  try {
    // Check if we have valid cached data
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      console.log('Returning cached Google reviews');
      return NextResponse.json({
        success: true,
        reviews: cachedData.reviews,
        cached: true,
        timestamp: cachedData.timestamp
      });
    }

    // Check for API key
    if (!GOOGLE_PLACES_API_KEY) {
      console.error('Google Places API key not configured');
      return NextResponse.json({
        success: false,
        error: 'Google Reviews not configured',
        reviews: []
      }, { status: 503 });
    }

    // Fetch from Google Places API
    const apiUrl = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    apiUrl.searchParams.append('place_id', GOOGLE_PLACE_ID);
    apiUrl.searchParams.append('fields', 'reviews,rating,user_ratings_total,name,url');
    apiUrl.searchParams.append('key', GOOGLE_PLACES_API_KEY);
    apiUrl.searchParams.append('language', 'en');

    console.log(`Fetching Google reviews for place ID: ${GOOGLE_PLACE_ID}`);

    const response = await fetch(apiUrl.toString(), {
      next: { revalidate: 3600 } // Next.js cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Google API responded with status: ${response.status}`);
    }

    const data: GooglePlaceDetails = await response.json();

    // Check API response status
    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.status, data.error_message);
      return NextResponse.json({
        success: false,
        error: `Google API error: ${data.status}`,
        reviews: cachedData?.reviews || []
      }, { status: 503 });
    }

    // Extract and filter reviews
    const allReviews = data.result.reviews || [];
    
    // Filter for 5-star reviews only
    const fiveStarReviews = allReviews
      .filter(review => review.rating === 5)
      .sort((a, b) => b.time - a.time); // Sort by newest first

    // Limit to most recent reviews
    const recentReviews = fiveStarReviews.slice(0, 10);

    // Update cache
    cachedData = {
      reviews: recentReviews,
      timestamp: Date.now()
    };

    console.log(`Fetched ${recentReviews.length} five-star reviews from Google`);

    // Return successful response
    return NextResponse.json({
      success: true,
      reviews: recentReviews,
      totalReviews: allReviews.length,
      fiveStarCount: fiveStarReviews.length,
      averageRating: data.result.rating,
      totalRatings: data.result.user_ratings_total,
      businessName: data.result.name,
      googleMapsUrl: data.result.url,
      cached: false,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Error fetching Google reviews:', error);

    // Return cached data if available
    if (cachedData) {
      return NextResponse.json({
        success: true,
        reviews: cachedData.reviews,
        cached: true,
        timestamp: cachedData.timestamp,
        error: 'Using cached data due to API error'
      });
    }

    // Return error response
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch reviews',
      reviews: []
    }, { status: 500 });
  }
}

// Optional: POST endpoint to force refresh
export async function POST(request: NextRequest) {
  try {
    // Clear cache
    cachedData = null;
    
    // Fetch fresh data
    return GET(request);
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to refresh reviews'
    }, { status: 500 });
  }
}