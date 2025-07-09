import { NextRequest, NextResponse } from 'next/server';
import { handleApiResponse, createValidationError, handleGenericError } from '@/lib/api-error-handler';

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
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      const validationError = createValidationError(`Missing required fields: ${missingFields.join(', ')}`);
      return NextResponse.json(
        { error: validationError.userMessage, code: validationError.code, timestamp: new Date().toISOString() },
        { status: validationError.statusCode }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      const validationError = createValidationError('Invalid email address format');
      return NextResponse.json(
        { error: validationError.userMessage, code: validationError.code, timestamp: new Date().toISOString() },
        { status: validationError.statusCode }
      );
    }

    // Prepare ReNet API form submission payload
    const formPayload = {
      type: "General Contact Inquiry",
      sourceURL: request.url,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || "",
      comments: `${body.subject}\n\n${body.message}`,
      subject: body.subject,
      message: body.message
    };

    // Submit to ReNet API - Forms endpoint expects an array
    const apiResponse = await fetch(`${API_BASE_URL}/Website/Forms`, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify([formPayload])
    });

    const apiResult = await handleApiResponse(apiResponse, 'Contact form submission');
    console.log('Contact form submitted to ReNet API successfully:', apiResult);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you as soon as possible.',
      timestamp: new Date().toISOString(),
      submissionId: apiResult.id || apiResult.submissionId
    });

  } catch (error) {
    return handleGenericError(error, 'Contact form processing');
  }
}
