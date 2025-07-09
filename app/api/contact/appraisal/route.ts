import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.renet.app";
const API_TOKEN = process.env.RENET_API_TOKEN || process.env.NEXT_PUBLIC_API_TOKEN || "MRhE2JztS7rewrkrttDgJOrCHa17vBarvKLVk5V2xBlBWiZCqGfamsXH";

const API_HEADERS = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields for appraisal request
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'propertyAddress'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Prepare ReNet API form submission payload
    const formPayload = {
      type: "Property Appraisal Request",
      sourceURL: request.url,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      comments: `Property Appraisal Request for ${body.propertyAddress}. Purpose: ${body.purpose || 'Not specified'}. ${body.additionalInfo || ''}`,
      address: {
        street: body.propertyAddress,
        suburb: body.suburb || "",
        state: body.state || "QLD",
        postcode: body.postcode || ""
      },
      additionalFields: [
        ...(body.propertyType ? [{ field: "propertyType", value: body.propertyType }] : []),
        ...(body.bedrooms ? [{ field: "bedrooms", value: body.bedrooms.toString() }] : []),
        ...(body.bathrooms ? [{ field: "bathrooms", value: body.bathrooms.toString() }] : []),
        ...(body.purpose ? [{ field: "purpose", value: body.purpose }] : []),
        ...(body.timeframe ? [{ field: "timeframe", value: body.timeframe }] : [])
      ]
    };

    // Submit to ReNet API - Forms endpoint expects an array
    const apiResponse = await fetch(`${API_BASE_URL}/Website/Forms`, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify([formPayload])
    });

    if (!apiResponse.ok) {
      console.error('ReNet API error:', apiResponse.status, await apiResponse.text());
      throw new Error(`API submission failed: ${apiResponse.status}`);
    }

    const apiResult = await apiResponse.json();
    console.log('Appraisal request submitted to ReNet API successfully:', apiResult);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your appraisal request! Our team will contact you within 24 hours to arrange a property inspection and provide your free valuation.',
      timestamp: new Date().toISOString(),
      submissionId: apiResult.id || apiResult.submissionId
    });

  } catch (error) {
    console.error('Error processing appraisal request:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
