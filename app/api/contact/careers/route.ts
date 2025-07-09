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
    
    // Validate required fields for careers application
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'position', 'resume'];
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
      type: "Career Application",
      sourceURL: request.url,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      comments: `Career Application for: ${body.position}. ${body.coverLetter || ''}\n\nExperience: ${body.experience || 'Not specified'}\nAvailability: ${body.availability || 'Not specified'}`,
      additionalFields: [
        { field: "position", value: body.position },
        { field: "experience", value: body.experience || "" },
        { field: "availability", value: body.availability || "" },
        { field: "resume", value: body.resume || "Resume attached" },
        ...(body.portfolio ? [{ field: "portfolio", value: body.portfolio }] : [])
      ]
    };

    // Submit to ReNet API
    const apiResponse = await fetch(`${API_BASE_URL}/Website/Forms`, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(formPayload)
    });

    if (!apiResponse.ok) {
      console.error('ReNet API error:', apiResponse.status, await apiResponse.text());
      throw new Error(`API submission failed: ${apiResponse.status}`);
    }

    const apiResult = await apiResponse.json();
    console.log('Career application submitted to ReNet API successfully:', apiResult);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your application! Our HR team will review your submission and contact you within 1-2 business days if your qualifications match our current openings.',
      timestamp: new Date().toISOString(),
      submissionId: apiResult.id || apiResult.submissionId
    });

  } catch (error) {
    console.error('Error processing career application:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
