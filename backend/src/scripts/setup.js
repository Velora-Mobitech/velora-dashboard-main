#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 Welcome to Velora Dashboard Backend Setup");
console.log("============================================\n");

// Check if .env file exists
const envPath = path.join(__dirname, "..", ".env");
const envExamplePath = path.join(__dirname, "..", ".env.example");

if (!fs.existsSync(envPath)) {
  console.log("📋 Creating .env file from template...");
  fs.copyFileSync(envExamplePath, envPath);
  console.log(
    "✅ .env file created! Please edit it with your configurations.\n"
  );
} else {
  console.log("✅ .env file already exists.\n");
}

// Check Node.js version
const nodeVersion = process.version;
console.log(`📍 Node.js version: ${nodeVersion}`);

// Install dependencies
console.log("📦 Installing dependencies...");
try {
  execSync("npm install", { stdio: "inherit" });
  console.log("✅ Dependencies installed successfully!\n");
} catch (error) {
  console.error("❌ Error installing dependencies:", error.message);
  process.exit(1);
}

// Instructions
console.log("🎯 Next Steps:");
console.log("==============");
console.log("1. Edit the .env file with your MongoDB connection string");
console.log("2. Make sure MongoDB is running (locally or Atlas)");
console.log('3. Run "npm run seed" to populate the database with sample data');
console.log('4. Run "npm run dev" to start the development server');
console.log("5. Test the API at http://localhost:5000\n");

console.log("📚 Database Setup Options:");
console.log("==========================");
console.log("Local MongoDB:");
console.log("  MONGODB_URI=mongodb://localhost:27017/velora");
console.log("");
console.log("MongoDB Atlas (Cloud):");
console.log(
  "  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/velora"
);
console.log("");

console.log("🔐 Default Login Credentials (after seeding):");
console.log("==============================================");
console.log("Admin:     admin@velora.com / admin123");
console.log("Company:   contact@techcorp.com / company123");
console.log("Employee:  john@techcorp.com / employee123");
console.log("");

console.log("🎉 Setup complete! Happy coding!");
