require("dotenv").config();
const mongoose = require("mongoose");

async function resetDB() {
  await mongoose.connect(process.env.MONGO_URI);

  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }

  console.log("✅ Database reset successfully");
  process.exit(0);
}

resetDB().catch((err) => {
  console.error("❌ Error resetting DB:", err);
  process.exit(1);
});
