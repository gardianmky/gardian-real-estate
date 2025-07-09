import { NextResponse } from 'next/server'
import { fetchListingsIndex } from '@/lib/api'

export async function GET() {
  try {
    // Fetch featured commercial properties using the real API
    const { listings } = await fetchListingsIndex({
      type: "Commercial",
      disposalMethod: "forSale",
      resultsPerPage: 6,
      orderBy: "dateListed",
      orderDirection: "desc"
    });
    
    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching featured commercial listings:', error);
    return NextResponse.json([], { status: 500 });
  }
}