import { NextResponse } from 'next/server';
import { RealEstateAPI } from '@/lib/api';

export async function GET() {
  try {
    const { data: agents } = await RealEstateAPI.getAgents({});
    return NextResponse.json(agents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}