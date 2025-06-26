import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.renet.app/Website";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || "MRhE2JztS7rewrkrttDgJOrCHa17vBarvKLVk5V2xBlBWiZCqGfamsXH";

const API_HEADERS = {
  Authorization: `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json',
  'User-Agent': 'Next.js Serverless Function',
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Missing listing ID' }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/Listings/${id}`, {
      headers: API_HEADERS,
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`API responded with status: ${response.status} for listing ID ${id}`);
      if (response.status === 404) {
        return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
      }
      return NextResponse.json(
        { error: 'Failed to fetch listing from external API' },
        { status: response.status }
      );
    }

    const listingData = await response.json();
    return NextResponse.json(listingData);
  } catch (error) {
    console.error(`Error fetching listing ID ${id}:`, error);
    return NextResponse.json(
      { error: 'Internal server error fetching listing' },
      { status: 500 }
    );
  }
} 