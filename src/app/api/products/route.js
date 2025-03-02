// src/app/api/products/route.js
import { initMongoose, getDb } from "../../../../lib/mongodb";

export async function GET() {
  try {
    await initMongoose();
    const db = await getDb();
    const products = await db.collection("products").find({}).toArray();
    console.log("Products fetched:", products.length);
    return Response.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
