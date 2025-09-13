const mongoose = require("mongoose");
require("dotenv").config();

// ধরুন আপনার একটা User মডেল আছে
const User = require("../models/userModel");

async function seedDB() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log(error));

  await User.create({
    name: "admin",
    email: "admin@gmail.com",
    phone: "01785698574",
    password: "12345678",
    role: "admin",
  });

  console.log("✅ Database seeded successfully");
  process.exit(0);
}

seedDB().catch((err) => {
  console.error("❌ Error seeding DB:", err);
  process.exit(1);
});
