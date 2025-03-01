import { initMongoose } from "../../../../lib/mongoose";
import Product from "../../../../models/product";

export async function GET() {
  await initMongoose();
  const products = await Product.find().exec();
  return Response.json(products);
}
