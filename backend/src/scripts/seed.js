const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Employee = require("../models/Employee");
const Company = require("../models/Company");
const Backend = require("../models/Backend");
require("dotenv").config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/velora"
    );
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Company.deleteMany({});
    await Backend.deleteMany({});
    console.log("Cleared existing data");

    // Create admin user
    const admin = new User({
      name: "Admin User",
      email: "admin@velora.com",
      password: "admin123", // Raw password - will be hashed by User model
      role: "admin",
    });
    await admin.save();
    console.log("Admin user created");

    // Create sample company
    const companyUser = new User({
      name: "TechCorp Inc",
      email: "contact@techcorp.com",
      password: "company123", // Raw password - will be hashed by User model
      role: "company",
    });
    await companyUser.save();

    const company = new Company({
      userId: companyUser._id,
      name: "TechCorp Inc",
      industry: "Technology",
      size: "Medium",
      location: "San Francisco, CA",
      description: "Leading technology company focused on innovation",
    });
    await company.save();
    console.log("Company created");

    // Create sample employees
    const employeeData = [
      {
        name: "John Doe",
        email: "john@techcorp.com",
        position: "Software Engineer",
        department: "Engineering",
        salary: 85000,
        productivity: 92,
      },
      {
        name: "Jane Smith",
        email: "jane@techcorp.com",
        position: "Product Manager",
        department: "Product",
        salary: 95000,
        productivity: 88,
      },
      {
        name: "Mike Johnson",
        email: "mike@techcorp.com",
        position: "UI/UX Designer",
        department: "Design",
        salary: 75000,
        productivity: 85,
      },
      {
        name: "Sarah Wilson",
        email: "sarah@techcorp.com",
        position: "Marketing Manager",
        department: "Marketing",
        salary: 70000,
        productivity: 90,
      },
      {
        name: "David Brown",
        email: "david@techcorp.com",
        position: "DevOps Engineer",
        department: "Engineering",
        salary: 90000,
        productivity: 87,
      },
    ];

    for (let i = 0; i < employeeData.length; i++) {
      const empData = employeeData[i];
      const employeeUser = new User({
        name: empData.name,
        email: empData.email,
        password: "employee123", // Raw password - will be hashed by User model
        role: "employee",
      });
      await employeeUser.save();

      const employee = new Employee({
        userId: employeeUser._id,
        companyId: company._id,
        employeeId: `EMP${(i + 1).toString().padStart(3, "0")}`, // Generate employee ID like EMP001, EMP002, etc.
        name: empData.name,
        email: empData.email,
        position: empData.position,
        department: empData.department,
        salary: empData.salary,
        productivity: empData.productivity,
        status: "active",
        hireDate: new Date(
          2023,
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        ),
        location: {
          latitude: 37.7749 + (Math.random() - 0.5) * 0.1,
          longitude: -122.4194 + (Math.random() - 0.5) * 0.1,
          address: `${Math.floor(Math.random() * 9999)} ${
            ["Main St", "Oak Ave", "Pine Rd", "Cedar Blvd"][
              Math.floor(Math.random() * 4)
            ]
          }, San Francisco, CA`,
        },
      });
      await employee.save();
    }
    console.log("Sample employees created");

    // Create backend monitoring data
    const backendData = new Backend({
      serviceName: "Velora API",
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
      status: "running",
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: Math.floor(Math.random() * 50) + 20,
      requestCount: Math.floor(Math.random() * 10000) + 5000,
      errorCount: Math.floor(Math.random() * 50) + 10,
      responseTime: Math.floor(Math.random() * 200) + 100,
    });
    await backendData.save();
    console.log("Backend monitoring data created");

    console.log("\n=== Database Seeded Successfully ===");
    console.log("Login Credentials:");
    console.log("👤 Admin: admin@velora.com / admin123");
    console.log("🏢 Company: contact@techcorp.com / company123");
    console.log("👥 Employee: john@techcorp.com / employee123");
    console.log("           jane@techcorp.com / employee123");
    console.log("           mike@techcorp.com / employee123");
    console.log("           sarah@techcorp.com / employee123");
    console.log("           david@techcorp.com / employee123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
