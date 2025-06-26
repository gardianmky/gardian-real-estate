import { NextRequest, NextResponse } from 'next/server';

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

    // Prepare email content
    const emailContent = {
      to: 'property@gardianrealestate.com.au',
      cc: 'info@gardianrealestate.com.au',
      subject: `New Tenant Application - ${body.firstName} ${body.lastName}`,
      html: `
        <h2>New Tenant Rental Application</h2>
        
        <h3>Applicant Information</h3>
        <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        ${body.dateOfBirth ? `<p><strong>Date of Birth:</strong> ${body.dateOfBirth}</p>` : ''}
        
        <h3>Current Living Situation</h3>
        ${body.currentAddress ? `<p><strong>Current Address:</strong> ${body.currentAddress}</p>` : ''}
        ${body.currentRent ? `<p><strong>Current Weekly Rent:</strong> $${body.currentRent}</p>` : ''}
        ${body.moveOutDate ? `<p><strong>Move Out Date:</strong> ${body.moveOutDate}</p>` : ''}
        ${body.reasonForMoving ? `<p><strong>Reason for Moving:</strong> ${body.reasonForMoving}</p>` : ''}
        
        <h3>Employment Information</h3>
        ${body.employer ? `<p><strong>Employer:</strong> ${body.employer}</p>` : ''}
        ${body.position ? `<p><strong>Position:</strong> ${body.position}</p>` : ''}
        ${body.annualIncome ? `<p><strong>Annual Income:</strong> $${body.annualIncome}</p>` : ''}
        ${body.employmentType ? `<p><strong>Employment Type:</strong> ${body.employmentType}</p>` : ''}
        
        <h3>Rental Preferences</h3>
        ${body.preferredArea ? `<p><strong>Preferred Area:</strong> ${body.preferredArea}</p>` : ''}
        ${body.maxWeeklyRent ? `<p><strong>Maximum Weekly Rent:</strong> $${body.maxWeeklyRent}</p>` : ''}
        ${body.moveInDate ? `<p><strong>Preferred Move-in Date:</strong> ${body.moveInDate}</p>` : ''}
        ${body.householdSize ? `<p><strong>Household Size:</strong> ${body.householdSize} people</p>` : ''}
        ${body.pets ? `<p><strong>Pets:</strong> ${body.petsDetails || 'Yes'}</p>` : '<p><strong>Pets:</strong> No</p>'}
        
        <h3>References</h3>
        ${body.previousLandlord ? `<p><strong>Previous Landlord:</strong> ${body.previousLandlord}</p>` : ''}
        ${body.previousLandlordPhone ? `<p><strong>Previous Landlord Phone:</strong> ${body.previousLandlordPhone}</p>` : ''}
        ${body.employerReference ? `<p><strong>Employer Reference:</strong> ${body.employerReference}</p>` : ''}
        ${body.personalReference ? `<p><strong>Personal Reference:</strong> ${body.personalReference}</p>` : ''}
        
        ${body.additionalInfo ? `
        <h3>Additional Information</h3>
        <p>${body.additionalInfo.replace(/\n/g, '<br>')}</p>
        ` : ''}
        
        <hr>
        <p><small>Submitted: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' })}</small></p>
        <p><small>Source: Gardian Real Estate Website - Tenant Application</small></p>
      `,
      text: `
        New Tenant Rental Application
        
        Applicant Information:
        Name: ${body.firstName} ${body.lastName}
        Email: ${body.email}
        Phone: ${body.phone}
        ${body.dateOfBirth ? `Date of Birth: ${body.dateOfBirth}\n` : ''}
        
        Current Living Situation:
        ${body.currentAddress ? `Current Address: ${body.currentAddress}\n` : ''}
        ${body.currentRent ? `Current Weekly Rent: $${body.currentRent}\n` : ''}
        ${body.moveOutDate ? `Move Out Date: ${body.moveOutDate}\n` : ''}
        ${body.reasonForMoving ? `Reason for Moving: ${body.reasonForMoving}\n` : ''}
        
        Employment Information:
        ${body.employer ? `Employer: ${body.employer}\n` : ''}
        ${body.position ? `Position: ${body.position}\n` : ''}
        ${body.annualIncome ? `Annual Income: $${body.annualIncome}\n` : ''}
        ${body.employmentType ? `Employment Type: ${body.employmentType}\n` : ''}
        
        Rental Preferences:
        ${body.preferredArea ? `Preferred Area: ${body.preferredArea}\n` : ''}
        ${body.maxWeeklyRent ? `Maximum Weekly Rent: $${body.maxWeeklyRent}\n` : ''}
        ${body.moveInDate ? `Preferred Move-in Date: ${body.moveInDate}\n` : ''}
        ${body.householdSize ? `Household Size: ${body.householdSize} people\n` : ''}
        ${body.pets ? `Pets: ${body.petsDetails || 'Yes'}\n` : 'Pets: No\n'}
        
        References:
        ${body.previousLandlord ? `Previous Landlord: ${body.previousLandlord}\n` : ''}
        ${body.previousLandlordPhone ? `Previous Landlord Phone: ${body.previousLandlordPhone}\n` : ''}
        ${body.employerReference ? `Employer Reference: ${body.employerReference}\n` : ''}
        ${body.personalReference ? `Personal Reference: ${body.personalReference}\n` : ''}
        
        ${body.additionalInfo ? `Additional Information:\n${body.additionalInfo}\n` : ''}
        
        Submitted: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' })}
        Source: Gardian Real Estate Website - Tenant Application
      `
    };

    // Log the tenant application data
    console.log('Tenant application received:', {
      applicantInfo: {
        name: `${body.firstName} ${body.lastName}`,
        email: body.email,
        phone: body.phone,
        dateOfBirth: body.dateOfBirth
      },
      currentSituation: {
        address: body.currentAddress,
        rent: body.currentRent,
        moveOutDate: body.moveOutDate,
        reasonForMoving: body.reasonForMoving
      },
      employment: {
        employer: body.employer,
        position: body.position,
        annualIncome: body.annualIncome,
        employmentType: body.employmentType
      },
      preferences: {
        preferredArea: body.preferredArea,
        maxWeeklyRent: body.maxWeeklyRent,
        moveInDate: body.moveInDate,
        householdSize: body.householdSize,
        pets: body.pets,
        petsDetails: body.petsDetails
      },
      references: {
        previousLandlord: body.previousLandlord,
        previousLandlordPhone: body.previousLandlordPhone,
        employerReference: body.employerReference,
        personalReference: body.personalReference
      },
      additionalInfo: body.additionalInfo,
      timestamp: new Date().toISOString()
    });

    // Simulate email sending success
    return NextResponse.json({
      success: true,
      message: 'Thank you for your rental application! Our leasing team will review your application and contact you within 24-48 hours. Please ensure you have your supporting documents ready.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing tenant application:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
