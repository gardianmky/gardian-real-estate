import { NextRequest, NextResponse } from 'next/server';

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

    // Prepare email content
    const emailContent = {
      to: 'info@gardianrealestate.com.au',
      cc: 'property@gardianrealestate.com.au',
      subject: `New Landlord Inquiry - ${body.firstName} ${body.lastName}`,
      html: `
        <h2>New Landlord Property Management Inquiry</h2>
        
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        
        <h3>Property Details</h3>
        <p><strong>Property Address:</strong> ${body.propertyAddress}</p>
        ${body.propertyType ? `<p><strong>Property Type:</strong> ${body.propertyType}</p>` : ''}
        ${body.bedrooms ? `<p><strong>Bedrooms:</strong> ${body.bedrooms}</p>` : ''}
        ${body.bathrooms ? `<p><strong>Bathrooms:</strong> ${body.bathrooms}</p>` : ''}
        ${body.expectedRent ? `<p><strong>Expected Weekly Rent:</strong> $${body.expectedRent}</p>` : ''}
        
        <h3>Management Preferences</h3>
        ${body.managementType ? `<p><strong>Management Type:</strong> ${body.managementType}</p>` : ''}
        ${body.availabilityDate ? `<p><strong>Available From:</strong> ${body.availabilityDate}</p>` : ''}
        
        ${body.additionalInfo ? `
        <h3>Additional Information</h3>
        <p>${body.additionalInfo.replace(/\n/g, '<br>')}</p>
        ` : ''}
        
        <hr>
        <p><small>Submitted: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' })}</small></p>
        <p><small>Source: Gardian Real Estate Website - Landlord Form</small></p>
      `,
      text: `
        New Landlord Property Management Inquiry
        
        Contact Information:
        Name: ${body.firstName} ${body.lastName}
        Email: ${body.email}
        Phone: ${body.phone}
        
        Property Details:
        Property Address: ${body.propertyAddress}
        ${body.propertyType ? `Property Type: ${body.propertyType}\n` : ''}
        ${body.bedrooms ? `Bedrooms: ${body.bedrooms}\n` : ''}
        ${body.bathrooms ? `Bathrooms: ${body.bathrooms}\n` : ''}
        ${body.expectedRent ? `Expected Weekly Rent: $${body.expectedRent}\n` : ''}
        
        Management Preferences:
        ${body.managementType ? `Management Type: ${body.managementType}\n` : ''}
        ${body.availabilityDate ? `Available From: ${body.availabilityDate}\n` : ''}
        
        ${body.additionalInfo ? `Additional Information:\n${body.additionalInfo}\n` : ''}
        
        Submitted: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' })}
        Source: Gardian Real Estate Website - Landlord Form
      `
    };

    // In a real implementation, you would send this email using a service like:
    // - SendGrid
    // - AWS SES
    // - Nodemailer with SMTP
    // - Resend
    
    // For now, we'll simulate the email sending and log the data
    console.log('Landlord inquiry received:', {
      contactInfo: {
        name: `${body.firstName} ${body.lastName}`,
        email: body.email,
        phone: body.phone
      },
      propertyDetails: {
        address: body.propertyAddress,
        type: body.propertyType,
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        expectedRent: body.expectedRent
      },
      preferences: {
        managementType: body.managementType,
        availabilityDate: body.availabilityDate
      },
      additionalInfo: body.additionalInfo,
      timestamp: new Date().toISOString()
    });

    // Simulate email sending success
    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry! Our property management team will contact you within 24 hours to discuss your requirements and arrange a free property appraisal.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing landlord inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
