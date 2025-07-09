import { NextRequest, NextResponse } from 'next/server';
import { handleApiResponse, createValidationError, handleGenericError } from '@/lib/api-error-handler';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.renet.app";
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
    const validationError = createValidationError('Missing listing ID');
    return NextResponse.json(
      { error: validationError.userMessage, code: validationError.code, timestamp: new Date().toISOString() },
      { status: validationError.statusCode }
    );
  }

  try {
    const response = await fetch(`${API_BASE_URL}/Website/Listings/${id}`, {
      headers: API_HEADERS,
      cache: 'no-store',
    });

    const listingData = await handleApiResponse(response, `Listing fetch for ID ${id}`);
    return NextResponse.json(listingData);
  } catch (error) {
    return handleGenericError(error, `Listing fetch for ID ${id}`);
  }
} 