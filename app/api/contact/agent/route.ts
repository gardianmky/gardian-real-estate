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
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'message'];
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
      type: body.listingID ? "Property Enquiry" : "Agent Contact Request",
      sourceURL: request.url,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || "",
      comments: body.message,
      additionalFields: [
        ...(body.agentID ? [{ field: "agentID", value: body.agentID }] : []),
        ...(body.listingID ? [{ field: "listingID", value: body.listingID }] : []),
        ...(body.propertyAddress ? [{ field: "propertyAddress", value: body.propertyAddress }] : [])
      ]
    };

    // Submit to ReNet API Forms endpoint - expects an array
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
    console.log('Enquiry submitted to ReNet API successfully:', apiResult);

    return NextResponse.json({
      success: true,
      message: body.listingID 
        ? 'Thank you for your enquiry! The agent will contact you within 24 hours regarding this property.'
        : 'Thank you for your enquiry! Our team will contact you within 24 hours.',
      timestamp: new Date().toISOString(),
      submissionId: apiResult.id || apiResult.submissionId
    });

  } catch (error) {
    console.error('Error processing agent enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}