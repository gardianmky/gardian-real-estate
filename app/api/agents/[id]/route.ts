import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.renet.app";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || "MRhE2JztS7rewrkrttDgJOrCHa17vBarvKLVk5V2xBlBWiZCqGfamsXH";

const API_HEADERS = {
  Authorization: `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json',
  'User-Agent': 'Next.js Serverless Function',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '9');
  const offset = (page - 1) * limit;

  if (!id) {
    return NextResponse.json({ error: 'Missing agent ID' }, { status: 400 });
  }

  try {
    // Fetch agent details
    const agentResponse = await fetch(`${API_BASE_URL}/Website/Agents/${id}`, {
      headers: API_HEADERS,
      cache: 'no-store',
    });

    if (!agentResponse.ok) {
      console.error(`API responded with status: ${agentResponse.status} for agent ID ${id}`);
      if (agentResponse.status === 404) {
        return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
      }
      return NextResponse.json(
        { error: 'Failed to fetch agent from external API' },
        { status: agentResponse.status }
      );
    }

    const agent = await agentResponse.json();

    // Fetch agent's listings with pagination
    const listingsResponse = await fetch(
      `${API_BASE_URL}/Website/Listings?agentID=${id}&offset=${offset}&limit=${limit}`,
      {
        headers: API_HEADERS,
        cache: 'no-store',
      }
    );

    // Fetch total count of listings
    const totalListingsResponse = await fetch(
      `${API_BASE_URL}/Website/Listings?agentID=${id}&count=true`,
      {
        headers: API_HEADERS,
        cache: 'no-store',
      }
    );

    let listings = [];
    let totalListings = 0;

    if (listingsResponse.ok) {
      listings = await listingsResponse.json();
    }

    if (totalListingsResponse.ok) {
      const countData = await totalListingsResponse.json();
      totalListings = countData.total || listings.length;
    }

    // Combine agent data with their listings
    const agentData = {
      ...agent,
      listings,
      totalListings,
      specialties: [
        'Residential Sales',
        'Property Management',
        'Commercial Properties',
        'Investment Properties',
      ],
      bio: agent.bio || `${agent.name} is a dedicated real estate professional with extensive experience in the Mackay region. Specializing in residential and commercial properties, ${agent.name} is committed to providing exceptional service to all clients.`,
    };

    return NextResponse.json(agentData);
  } catch (error) {
    console.error(`Error fetching agent ID ${id}:`, error);
    return NextResponse.json(
      { error: 'Internal server error fetching agent' },
      { status: 500 }
    );
  }
}