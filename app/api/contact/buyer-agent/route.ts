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
    
    // Validate required fields for buyer agent request
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'budgetRange', 'propertyType'];
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
      type: "Buyer Agent Request",
      sourceURL: request.url,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      comments: `Buyer's Agent Service Request\n\nBudget Range: ${body.budgetRange}\nProperty Type: ${body.propertyType}\nPreferred Areas: ${body.preferredAreas || 'Open to suggestions'}\nBedrooms: ${body.bedrooms || 'Flexible'}\nBathrooms: ${body.bathrooms || 'Flexible'}\nTimeline: ${body.timeline || 'Not specified'}\n\nSpecific Requirements:\n${body.specificRequirements || 'None specified'}\n\nAdditional Information:\n${body.additionalInfo || 'None provided'}`,
      additionalFields: [
        { field: "budgetRange", value: body.budgetRange },
        { field: "propertyType", value: body.propertyType },
        { field: "preferredAreas", value: body.preferredAreas || "" },
        { field: "bedrooms", value: body.bedrooms || "" },
        { field: "bathrooms", value: body.bathrooms || "" },
        { field: "timeline", value: body.timeline || "" },
        { field: "firstTimeBuyer", value: body.firstTimeBuyer || "false" }
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
    console.log('Buyer agent request submitted to ReNet API successfully:', apiResult);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your buyer\'s agent request! Our dedicated buyer\'s agent will contact you within 24 hours to discuss your requirements and begin your personalized property search.',
      timestamp: new Date().toISOString(),
      submissionId: apiResult.id || apiResult.submissionId
    });

  } catch (error) {
    console.error('Error processing buyer agent request:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
