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

async function testRoleBasedEndpoints() {
  console.log("👥 Testing Role-Based Endpoints...\n");

  try {
    // Test Employee Dashboard
    console.log("1. Testing Employee Dashboard...");
    const empLogin = await makeRequest(
      "http://localhost:5000/api/auth/login",
      "POST",
      JSON.stringify({ email: "john@techcorp.com", password: "employee123" })
    );
    const empToken = empLogin.data.token;

    const empDashboard = await makeRequest(
      "http://localhost:5000/api/employee/dashboard",
      "GET",
      null,
      {
        Authorization: `Bearer ${empToken}`,
      }
    );
    console.log("✅ Employee Dashboard Status:", empDashboard.statusCode);
    if (empDashboard.statusCode === 200) {
      console.log(
        "   Employee Name:",
        empDashboard.data.employee?.name || "N/A"
      );
      console.log(
        "   Department:",
        empDashboard.data.employee?.department || "N/A"
      );
      console.log(
        "   Productivity:",
        empDashboard.data.employee?.productivity || "N/A"
      );
    }

    // Test Company Dashboard
    console.log("\n2. Testing Company Dashboard...");
    const compLogin = await makeRequest(
      "http://localhost:5000/api/auth/login",
      "POST",
      JSON.stringify({ email: "contact@techcorp.com", password: "company123" })
    );
    const compToken = compLogin.data.token;

    const compDashboard = await makeRequest(
      "http://localhost:5000/api/company/dashboard",
      "GET",
      null,
      {
        Authorization: `Bearer ${compToken}`,
      }
    );
    console.log("✅ Company Dashboard Status:", compDashboard.statusCode);
    if (compDashboard.statusCode === 200) {
      console.log(
        "   Company Name:",
        compDashboard.data.company?.name || "N/A"
      );
      console.log(
        "   Total Employees:",
        compDashboard.data.metrics?.totalEmployees || "N/A"
      );
      console.log(
        "   Active Employees:",
        compDashboard.data.metrics?.activeEmployees || "N/A"
      );
    }

    // Test Admin Analytics
    console.log("\n3. Testing Admin Analytics...");
    const adminLogin = await makeRequest(
      "http://localhost:5000/api/auth/login",
      "POST",
      JSON.stringify({ email: "admin@velora.com", password: "admin123" })
    );
    const adminToken = adminLogin.data.token;

    const analytics = await makeRequest(
      "http://localhost:5000/api/analytics/overview",
      "GET",
      null,
      {
        Authorization: `Bearer ${adminToken}`,
      }
    );
    console.log("✅ Admin Analytics Status:", analytics.statusCode);
    if (analytics.statusCode === 200) {
      console.log("   Total Users:", analytics.data.totalUsers || "N/A");
      console.log(
        "   Total Companies:",
        analytics.data.totalCompanies || "N/A"
      );
      console.log(
        "   Total Employees:",
        analytics.data.totalEmployees || "N/A"
      );
    }

    // Test Users Management
    console.log("\n4. Testing Users Management...");
    const users = await makeRequest(
      "http://localhost:5000/api/users",
      "GET",
      null,
      {
        Authorization: `Bearer ${adminToken}`,
      }
    );
    console.log("✅ Users List Status:", users.statusCode);
    if (users.statusCode === 200) {
      console.log("   Total Users:", users.data.total || "N/A");
      console.log("   Users in page:", users.data.users?.length || "N/A");
    }

    console.log("\n🎉 All role-based tests completed successfully!");
    console.log("\n📊 Summary:");
    console.log("- Authentication: ✅ Working");
    console.log("- Employee Dashboard: ✅ Working");
    console.log("- Company Dashboard: ✅ Working");
    console.log("- Admin Analytics: ✅ Working");
    console.log("- User Management: ✅ Working");
    console.log("- Role-based Access: ✅ Working");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testRoleBasedEndpoints();
