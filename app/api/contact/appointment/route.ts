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
    
    // Validate required fields for appointment booking
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'appointmentType', 'preferredDate'];
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
      type: "Appointment Booking",
      sourceURL: request.url,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      comments: `Appointment Booking Request\n\nType: ${body.appointmentType}\nPreferred Date: ${body.preferredDate}\nPreferred Time: ${body.preferredTime || 'Flexible'}\nLocation: ${body.preferredLocation || 'Office'}\n\nAdditional Information:\n${body.additionalInfo || 'None provided'}`,
      additionalFields: [
        { field: "appointmentType", value: body.appointmentType },
        { field: "preferredDate", value: body.preferredDate },
        { field: "preferredTime", value: body.preferredTime || "" },
        { field: "preferredLocation", value: body.preferredLocation || "office" }
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
    console.log('Appointment booking submitted to ReNet API successfully:', apiResult);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your appointment request! Our team will contact you within 24 hours to confirm your preferred time and location. We look forward to meeting with you.',
      timestamp: new Date().toISOString(),
      submissionId: apiResult.id || apiResult.submissionId
    });

  } catch (error) {
    console.error('Error processing appointment booking:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
