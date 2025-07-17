const https = require("https");
const http = require("http");

// Simple HTTP request function
function makeRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data ? Buffer.byteLength(data) : 0,
      },
    };

    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          resolve({
            statusCode: res.statusCode,
            data: JSON.parse(body),
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            data: body,
          });
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    if (data) {
      req.write(data);
    }
    req.end();
  });
}

async function testDetailedAPI() {
  console.log("🔍 Detailed API Testing...\n");

  try {
    // Test 1: Check if we can fetch a user directly from database
    console.log("1. Testing Simple Login with detailed response...");
    const loginData = JSON.stringify({
      email: "admin@velora.com",
      password: "admin123",
    });

    const loginResponse = await makeRequest(
      "http://localhost:5000/api/auth/login",
      "POST",
      loginData
    );
    console.log("Status Code:", loginResponse.statusCode);
    console.log("Response:", loginResponse.data);

    // Test 2: Try with different credentials
    console.log("\n2. Testing with employee credentials...");
    const empLoginData = JSON.stringify({
      email: "john@techcorp.com",
      password: "employee123",
    });

    const empResponse = await makeRequest(
      "http://localhost:5000/api/auth/login",
      "POST",
      empLoginData
    );
    console.log("Status Code:", empResponse.statusCode);
    console.log("Response:", empResponse.data);

    // Test 3: Check if we can register a new user
    console.log("\n3. Testing user registration...");
    const regData = JSON.stringify({
      name: "Test User",
      email: "test@example.com",
      password: "test123",
      role: "employee",
    });

    const regResponse = await makeRequest(
      "http://localhost:5000/api/auth/register",
      "POST",
      regData
    );
    console.log("Status Code:", regResponse.statusCode);
    console.log("Response:", regResponse.data);
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testDetailedAPI();
