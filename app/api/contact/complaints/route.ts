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
    
    // Validate required fields for complaints
    const requiredFields = ['firstName', 'lastName', 'email', 'complainantType', 'complaintDetails'];
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
      type: "Complaint Submission",
      sourceURL: request.url,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || "",
      comments: `COMPLAINT SUBMISSION\n\nComplainant Type: ${body.complainantType}\nProperty/Agent Involved: ${body.propertyAgent || 'Not specified'}\n\nComplaint Details:\n${body.complaintDetails}\n\nDesired Resolution:\n${body.desiredResolution || 'Not specified'}`,
      additionalFields: [
        { field: "complainantType", value: body.complainantType },
        { field: "propertyAgent", value: body.propertyAgent || "" },
        { field: "incidentDate", value: body.incidentDate || "" },
        { field: "attemptedResolution", value: body.attemptedResolution || "No" },
        { field: "urgency", value: body.urgency || "Normal" }
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
    console.log('Complaint submitted to ReNet API successfully:', apiResult);

    return NextResponse.json({
      success: true,
      message: 'Thank you for submitting your complaint. We take all concerns seriously and will investigate this matter thoroughly. Our complaints officer will contact you within 2 business days with an acknowledgment and initial response.',
      timestamp: new Date().toISOString(),
      submissionId: apiResult.id || apiResult.submissionId
    });

  } catch (error) {
    console.error('Error processing complaint:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
