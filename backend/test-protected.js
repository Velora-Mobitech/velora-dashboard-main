const http = require("http");

function makeRequest(url, method, data, headers = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
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

async function testProtectedEndpoints() {
  console.log("🔐 Testing Protected Endpoints...\n");

  try {
    // First, get a token
    console.log("1. Getting authentication token...");
    const loginData = JSON.stringify({
      email: "admin@velora.com",
      password: "admin123",
    });

    const loginResponse = await makeRequest(
      "http://localhost:5000/api/auth/login",
      "POST",
      loginData
    );
    const token = loginResponse.data.token;
    console.log("✅ Token obtained:", token ? "Yes" : "No");

    // Test protected endpoints
    console.log("\n2. Testing Employee Dashboard...");
    const empDashboard = await makeRequest(
      "http://localhost:5000/api/employee/dashboard",
      "GET",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("Status:", empDashboard.statusCode);
    console.log("Response:", empDashboard.data);

    console.log("\n3. Testing Company Dashboard...");
    const compDashboard = await makeRequest(
      "http://localhost:5000/api/company/dashboard",
      "GET",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("Status:", compDashboard.statusCode);
    console.log("Response:", compDashboard.data);

    console.log("\n4. Testing Backend Health (Admin)...");
    const health = await makeRequest(
      "http://localhost:5000/api/backend/health",
      "GET",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("Status:", health.statusCode);
    console.log("Response:", health.data);

    console.log("\n🎉 All tests completed!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testProtectedEndpoints();
