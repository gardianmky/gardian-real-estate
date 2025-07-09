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
    
    // Validate required fields for tenant application
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
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
      type: "Rental Application",
      sourceURL: request.url,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      comments: `Rental Application. ${body.additionalInfo || ''}`,
      address: {
        street: body.currentAddress || "",
        suburb: body.preferredArea || "",
        state: "QLD",
        postcode: ""
      },
      additionalFields: [
        ...(body.dateOfBirth ? [{ field: "dateOfBirth", value: body.dateOfBirth }] : []),
        ...(body.currentAddress ? [{ field: "currentAddress", value: body.currentAddress }] : []),
        ...(body.currentRent ? [{ field: "currentRent", value: body.currentRent.toString() }] : []),
        ...(body.moveOutDate ? [{ field: "moveOutDate", value: body.moveOutDate }] : []),
        ...(body.reasonForMoving ? [{ field: "reasonForMoving", value: body.reasonForMoving }] : []),
        ...(body.employer ? [{ field: "employer", value: body.employer }] : []),
        ...(body.position ? [{ field: "position", value: body.position }] : []),
        ...(body.annualIncome ? [{ field: "annualIncome", value: body.annualIncome.toString() }] : []),
        ...(body.employmentType ? [{ field: "employmentType", value: body.employmentType }] : []),
        ...(body.preferredArea ? [{ field: "preferredArea", value: body.preferredArea }] : []),
        ...(body.maxWeeklyRent ? [{ field: "maxWeeklyRent", value: body.maxWeeklyRent.toString() }] : []),
        ...(body.moveInDate ? [{ field: "moveInDate", value: body.moveInDate }] : []),
        ...(body.householdSize ? [{ field: "householdSize", value: body.householdSize.toString() }] : []),
        ...(body.pets ? [{ field: "pets", value: body.petsDetails || 'Yes' }] : [{ field: "pets", value: 'No' }]),
        ...(body.previousLandlord ? [{ field: "previousLandlord", value: body.previousLandlord }] : []),
        ...(body.previousLandlordPhone ? [{ field: "previousLandlordPhone", value: body.previousLandlordPhone }] : []),
        ...(body.employerReference ? [{ field: "employerReference", value: body.employerReference }] : []),
        ...(body.personalReference ? [{ field: "personalReference", value: body.personalReference }] : [])
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
    console.log('Tenant application submitted to ReNet API successfully:', apiResult);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your rental application! Our leasing team will review your application and contact you within 24-48 hours. Please ensure you have your supporting documents ready.',
      timestamp: new Date().toISOString(),
      submissionId: apiResult.id || apiResult.submissionId
    });

  } catch (error) {
    console.error('Error processing tenant application:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
