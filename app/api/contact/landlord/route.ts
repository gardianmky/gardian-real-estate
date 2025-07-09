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
      type: "Property Management Inquiry",
      sourceURL: request.url,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      comments: `Property Management Inquiry for ${body.propertyAddress}. ${body.additionalInfo || ''}`,
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
        ...(body.expectedRent ? [{ field: "expectedRent", value: body.expectedRent.toString() }] : []),
        ...(body.managementType ? [{ field: "managementType", value: body.managementType }] : []),
        ...(body.availabilityDate ? [{ field: "availabilityDate", value: body.availabilityDate }] : [])
      ]
    };

    // Submit to ReNet API
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
    console.log('Form submitted to ReNet API successfully:', apiResult);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry! Our property management team will contact you within 24 hours to discuss your requirements and arrange a free property appraisal.',
      timestamp: new Date().toISOString(),
      submissionId: apiResult.id || apiResult.submissionId
    });

  } catch (error) {
    console.error('Error processing landlord inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
