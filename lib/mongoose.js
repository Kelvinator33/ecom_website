// mongoose.js
import mongoose from "mongoose";

export async function initMongoose() {
  const uri =
    "mongodb+srv://kelvinamoah53:Germany1962@ecommerce.kkpfy.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ecommerce";

  const clientOptions = {
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
    },
  };

  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection.asPromise();
    }

    await mongoose.connect(uri, clientOptions);
    console.log("Successfully connected to MongoDB!");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Optional: Handle cleanup on process termination
process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("MongoDB connection closed through app termination");
  process.exit(0);
});
