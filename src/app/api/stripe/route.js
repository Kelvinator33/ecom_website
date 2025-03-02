import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    // Parse the request body to get the cart items
    const body = await request.json();

    const cartItems = Array.isArray(body) ? body : body.cartItems;

    // Log the cart items
    console.log("Cart Items:", cartItems);

    // Validate cart items
    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const invalidItems = cartItems
      .filter((item) => {
        const price = Number(item.price);
        const quantity = Number(item.quantity);
        return (
          isNaN(price) ||
          price <= 0 || // Invalid price
          isNaN(quantity) ||
          quantity < 1 // Invalid quantity
        );
      })
      .map((item) => item.name);
    if (invalidItems.length > 0) {
      return NextResponse.json(
        {
          error: `Invalid price or quantity for the following products: ${invalidItems.join(
            ", "
          )}.`,
        },
        { status: 400 }
      );
    }

    // Map cart items to Stripe line_items
    // const line_items = cartItems.map((item) => {
    //   if (!item.priceId) {
    //     throw new Error(`Price ID missing for product: ${item.name}`);
    //   }
    //   return {
    //     price: item.priceId,
    //     quantity: item.quantity,
    //   };
    // });

    // Get the origin from headers
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Define the parameters for the Stripe Checkout session
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        { shipping_rate: "shr_1QxXfvCFLYqx4127j6lhdz24" },
        { shipping_rate: "shr_1QxXhUCFLYqx4127TYJTymMk" },
      ],
      line_items: cartItems.map((item) => {
        const img = item.picture;
        console.log(img);

        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
              //images: [img],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${origin}/success`,
      cancel_url: `${origin}/`,
      automatic_tax: { enabled: false },
    };

    // Create the Checkout Session
    const session = await stripe.checkout.sessions.create(params);

    if (!session.url) {
      throw new Error("Stripe Checkout session URL is missing");
    }

    // Redirect to the Stripe Checkout page
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("Error creating Stripe Checkout session:", {
      message: err.message,
      type: err.type,
      status: err.status,
      code: err.code,
      stack: err.stack,
    });

    // Map Stripe error statuses to HTTP status codes
    let status = 500;
    let errorMessage =
      err.message ||
      "An error occurred while creating the Stripe Checkout session";

    if (err.type === "StripeInvalidRequestError") {
      status = 400; // Bad request (e.g., invalid parameters)
      if (err.message.includes("No such price")) {
        errorMessage =
          "One or more product Price IDs are invalid. Please contact support.";
      }
    } else if (err.type === "StripeAuthenticationError") {
      status = 401; // Unauthorized (e.g., invalid API key)
    } else if (err.type === "StripeRateLimitError") {
      status = 429; // Too many requests
    } else if (err.status) {
      status = err.status; // Use Stripe's status if available
    }

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
