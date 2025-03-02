import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;

if (!process.env.MONGODB_URI) {
  throw new Error("please add your uri to .env");
}

let client;
let clientPromise;
export async function initMongoose() {
  if (!clientPromise) {
    try {
      client = new MongoClient(uri); // Removed deprecated options
      clientPromise = client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }
  return clientPromise;
}

export async function getDb() {
  const client = await initMongoose();
  const db = client.db("ecommerce"); // Use the database specified in the URI
  return db;
}
