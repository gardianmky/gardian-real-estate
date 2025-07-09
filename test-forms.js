// Test script to verify forms are working
const http = require('http');

// Test form endpoints
const testEndpoints = [
  '/api/contact',
  '/api/contact/agent', 
  '/api/contact/appointment',
  '/api/contact/appraisal',
  '/api/contact/buyer-agent',
  '/api/contact/careers',
  '/api/contact/complaints',
  '/api/contact/landlord',
  '/api/contact/tenant'
];

async function testForm(endpoint, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: endpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: JSON.parse(data)
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Test data for each form
const testData = {
  '/api/contact': {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    subject: 'Test Contact',
    message: 'This is a test message'
  },
  '/api/contact/agent': {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    message: 'Test agent contact'
  },
  '/api/contact/appointment': {
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob@example.com',
    phone: '0412345678',
    appointmentType: 'buying',
    preferredDate: '2024-01-15'
  },
  '/api/contact/appraisal': {
    firstName: 'Alice',
    lastName: 'Brown',
    email: 'alice@example.com',
    phone: '0412345678',
    propertyAddress: '123 Test Street'
  },
  '/api/contact/buyer-agent': {
    firstName: 'Mike',
    lastName: 'Wilson',
    email: 'mike@example.com',
    phone: '0412345678',
    budgetRange: '400000-500000',
    propertyType: 'house'
  }
};

async function runTests() {
  console.log('Testing form endpoints...\n');
  
  for (const endpoint of Object.keys(testData)) {
    try {
      console.log(`Testing ${endpoint}...`);
      const result = await testForm(endpoint, testData[endpoint]);
      console.log(`✅ ${endpoint}: Status ${result.status}`);
      if (result.data.success) {
        console.log(`   Message: ${result.data.message}`);
      } else {
        console.log(`   Error: ${result.data.error}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint}: ${error.message}`);
    }
    console.log('');
  }
}

runTests();