'use client';

import { useState, useEffect } from 'react';
import { Star, RefreshCw, ExternalLink, Quote, User } from 'lucide-react';
import Link from 'next/link';

interface GoogleReview {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface ReviewsResponse {
  success: boolean;
  reviews: GoogleReview[];
  totalReviews?: number;
  fiveStarCount?: number;
  averageRating?: number;
  totalRatings?: number;
  businessName?: string;
  googleMapsUrl?: string;
  cached?: boolean;
  error?: string;
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<Partial<ReviewsResponse>>({});
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Fetch reviews from API
  const fetchReviews = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = '/api/reviews/google';
      const response = await fetch(endpoint, {
        method: forceRefresh ? 'POST' : 'GET',
        cache: forceRefresh ? 'no-cache' : 'default'
      });

      const data: ReviewsResponse = await response.json();

      if (data.success && data.reviews) {
        setReviews(data.reviews);
        setMetadata({
          totalRatings: data.totalRatings,
          averageRating: data.averageRating,
          businessName: data.businessName,
          googleMapsUrl: data.googleMapsUrl,
          cached: data.cached
        });
        setLastRefresh(new Date());
        
        // Store in localStorage for offline access
        if (typeof window !== 'undefined') {
          localStorage.setItem('googleReviews', JSON.stringify({
            reviews: data.reviews,
            metadata: data,
            timestamp: Date.now()
          }));
        }
      } else {
        throw new Error(data.error || 'Failed to fetch reviews');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
      
      // Try to load from localStorage
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('googleReviews');
        if (cached) {
          const { reviews: cachedReviews, metadata: cachedMeta } = JSON.parse(cached);
          setReviews(cachedReviews || []);
          setMetadata(cachedMeta || {});
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchReviews();
  }, []);

  // Auto-refresh every 15 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchReviews();
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, []);

  // Manual refresh handler
  const handleRefresh = () => {
    fetchReviews(true);
  };

  // Loading state
  if (loading && reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && reviews.length === 0) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 mb-4">Unable to load reviews at this time</p>
        <button
          onClick={handleRefresh}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Google Reviews
          </h2>
          {metadata.averageRating && metadata.totalRatings && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(metadata.averageRating!)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {metadata.averageRating.toFixed(1)} ({metadata.totalRatings} reviews)
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-600 hover:text-teal-600 transition-colors"
            title="Refresh reviews"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          {metadata.googleMapsUrl && (
            <a
              href={metadata.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
            >
              View on Google
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div
            key={`${review.author_name}-${review.time}`}
            className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
          >
            <div className="flex items-start space-x-4">
              {/* Author Photo */}
              {review.profile_photo_url ? (
                <img
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
              )}

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <a
                      href={review.author_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-gray-900 hover:text-teal-600 transition-colors"
                    >
                      {review.author_name}
                    </a>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">
                        {review.relative_time_description}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <div className="relative">
                  <Quote className="absolute -top-1 -left-2 w-6 h-6 text-gray-200" />
                  <p className="text-gray-700 leading-relaxed pl-4">
                    {review.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {metadata.cached ? 'Cached' : 'Live'} data
            {lastRefresh && (
              <span className="ml-2">
                • Last updated: {lastRefresh.toLocaleTimeString()}
              </span>
            )}
          </p>
          <div className="flex items-center space-x-2">
            <img
              src="https://www.gstatic.com/images/branding/product/1x/googleg_16dp.png"
              alt="Google"
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-500">Powered by Google</span>
          </div>
        </div>
      </div>
    </div>
  );
}