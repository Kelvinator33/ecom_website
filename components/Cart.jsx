"use client";
import { useRef } from "react";
import { useSt_Context } from "../context/context";
import {
  AiOutlineDelete,
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShop,
  AiOutlineShopping,
} from "react-icons/ai";
import Link from "next/link";
import getstripe from "../lib/getstripe";
import toast from "react-hot-toast";

export default function Cart() {
  const handle_checkout = async () => {
    try {
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: cartitems }),
        redirect: "manual",
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      const responseText = await response.text(); // Read response as text first
      console.log("Raw response body:", responseText); // Log raw response

      let data;
      try {
        data = JSON.parse(responseText); // Attempt to parse JSON
      } catch (error) {
        console.error("Error parsing response body:", error);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        let errorMessage = "Failed to create checkout session";
        try {
          const errorData = JSON.parse(rawBody);
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          console.error("Error parsing response body:", parseError);
        }
        throw new Error(errorMessage);
      }

      if (data.url) {
        toast.success("Redirecting to Stripe Checkout...");
        window.location.href = data.url;
      } else {
        throw new Error("Redirect URL not found in response.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.message);
    }
  };

  const cartref = useRef();
  const {
    totalprice,
    totalquant,
    cartitems,
    setShowCart,
    qty,
    decqty,
    incqty,
    togglequant,
    onRemove,
  } = useSt_Context();

  return (
    <div className="cart-wrapper" ref={cartref}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalquant} items)</span>
        </button>
        {cartitems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3> Your cart is empty</h3>
            <Link href={"/"}>
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartitems.length >= 1 &&
            cartitems.map((item) => (
              <div className="product" key={item._id}>
                <img src={item?.picture} className="cart-product-image" />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                  </div>
                  <div>
                    <h4>€{item.price}</h4>
                  </div>

                  <div className=" flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => togglequant(item._id, "dec")}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() => togglequant(item._id, "inc")}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartitems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>€{totalprice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handle_checkout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
