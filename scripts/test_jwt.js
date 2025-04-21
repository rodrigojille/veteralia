// Usage: node test_jwt.js <JWT>
// Example: node test_jwt.js eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
const https = require('https');
const http = require('http');

const jwt = process.argv[2] || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjN2QwODVjMC0zMzkwLTRkZjUtOTEyMy1hOWQ2NGRiZjZlNTIiLCJyb2xlIjoidmV0ZXJpbmFyaWFuIiwiaWF0IjoxNzQ1MTkzMTg4LCJleHAiOjE3NDU3OTc5ODh9.c2nIsUkk8pRNemJY0YXkXdN5xn2lFvz0PJjQzwVs9Qw";

if (!jwt) {
  console.error('Usage: node test_jwt.js <JWT>');
  process.exit(1);
}

const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/vet-profile/me',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  },
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error('Problem with request:', e.message);
});

req.end();
