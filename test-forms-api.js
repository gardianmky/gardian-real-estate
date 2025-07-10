#!/usr/bin/env node

/**
 * Test script for ReNet Forms API
 * Tests all form endpoints to ensure they comply with the API specification
 */

const API_BASE_URL = "http://localhost:3000/api/contact";

// Test data for different form types
const testForms = {
  general: {
    endpoint: "",
    data: {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      phone: "0412345678",
      subject: "Test Contact Form",
      message: "This is a test message from the forms API test script"
    }
  },
  agent: {
    endpoint: "/agent",
    data: {
      firstName: "Test",
      lastName: "Buyer",
      email: "buyer@example.com",
      phone: "0412345678",
      message: "I'm interested in this property",
      listingID: "123456",
      agentID: "10021353"
    }
  },
  appraisal: {
    endpoint: "/appraisal",
    data: {
      firstName: "Property",
      lastName: "Owner",
      email: "owner@example.com",
      phone: "0412345678",
      propertyAddress: "123 Test Street",
      suburb: "Brisbane",
      state: "QLD",
      postcode: "4000",
      propertyType: "House",
      bedrooms: 3,
      bathrooms: 2,
      purpose: "Selling",
      timeframe: "3-6 months",
      additionalInfo: "Looking for a market appraisal"
    }
  },
  appointment: {
    endpoint: "/appointment",
    data: {
      firstName: "Appointment",
      lastName: "Seeker",
      email: "appointment@example.com",
      phone: "0412345678",
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: "10:00 AM",
      appointmentType: "Property Viewing",
      propertyAddress: "456 Test Avenue",
      message: "Would like to view this property"
    }
  },
  buyerAgent: {
    endpoint: "/buyer-agent",
    data: {
      firstName: "Buyer",
      lastName: "Client",
      email: "buyer.agent@example.com",
      phone: "0412345678",
      propertyType: "House",
      priceRange: "$500,000 - $700,000",
      preferredSuburbs: "Brisbane, Toowong, St Lucia",
      bedrooms: "3+",
      additionalRequirements: "Looking for a family home near schools"
    }
  },
  careers: {
    endpoint: "/careers",
    data: {
      firstName: "Job",
      lastName: "Applicant",
      email: "careers@example.com",
      phone: "0412345678",
      position: "Real Estate Agent",
      experience: "5+ years",
      qualifications: "Real Estate Licence",
      message: "I am interested in joining your team"
    }
  },
  complaints: {
    endpoint: "/complaints",
    data: {
      firstName: "Complainant",
      lastName: "Name",
      email: "complaint@example.com",
      phone: "0412345678",
      complaintType: "Service Issue",
      complaintDate: new Date().toISOString().split('T')[0],
      propertyAddress: "789 Complaint Street",
      complaintDetails: "Details of the complaint"
    }
  },
  tenant: {
    endpoint: "/tenant",
    data: {
      firstName: "Tenant",
      lastName: "Applicant",
      email: "tenant@example.com",
      phone: "0412345678",
      dateOfBirth: "1990-01-01",
      currentAddress: "Current Address",
      employmentStatus: "Full-time",
      employer: "Test Company",
      monthlyIncome: "$5,000",
      propertyAddress: "123 Rental Street",
      preferredMoveIn: new Date().toISOString().split('T')[0],
      occupants: "2 Adults",
      pets: "No pets",
      references: "Available upon request"
    }
  },
  landlord: {
    endpoint: "/landlord",
    data: {
      firstName: "Land",
      lastName: "Lord",
      email: "landlord@example.com",
      phone: "0412345678",
      propertyAddress: "999 Investment Drive",
      suburb: "Brisbane",
      state: "QLD",
      postcode: "4000",
      propertyType: "House",
      currentlyRented: "No",
      managementServices: "Full Management",
      additionalInfo: "Looking for property management services"
    }
  }
};

// Test function
async function testForm(name, config) {
  console.log(`\n📝 Testing ${name} form...`);
  
  try {
    const response = await fetch(`${API_BASE_URL}${config.endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config.data)
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log(`✅ ${name} form: SUCCESS`);
      console.log(`   Submission ID: ${result.submissionId || 'N/A'}`);
      console.log(`   Message: ${result.message}`);
    } else {
      console.log(`❌ ${name} form: FAILED`);
      console.log(`   Status: ${response.status}`);
      console.log(`   Error: ${result.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.log(`❌ ${name} form: NETWORK ERROR`);
    console.log(`   Error: ${error.message}`);
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting ReNet Forms API Test Suite');
  console.log('=====================================');
  console.log(`Testing against: ${API_BASE_URL}`);
  console.log(`Time: ${new Date().toISOString()}`);

  for (const [name, config] of Object.entries(testForms)) {
    await testForm(name, config);
    // Add small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n✨ Test suite completed!');
}

// Check if running in Node.js environment
if (typeof window === 'undefined') {
  // Node.js environment - need to import fetch
  import('node-fetch').then(module => {
    global.fetch = module.default;
    runAllTests();
  }).catch(() => {
    console.log('⚠️  Please install node-fetch: npm install node-fetch');
    console.log('⚠️  Or run this test in the browser console');
  });
} else {
  // Browser environment
  runAllTests();
}