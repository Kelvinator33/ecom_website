"use client";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useSt_Context } from "../context/context";

export default function Navbar() {
  const { showcart, setShowCart, totalquant } = useSt_Context();
  return (
    <div className="navbar-container">
      <p className="logo ">
        <Link href="/">Kelvinator Industries</Link>
      </p>
      <button
        type="button"
        className="cart-icon relative"
        onClick={() => setShowCart(true)}
      >
        {" "}
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalquant}</span>
      </button>
      {showcart && <Cart />}
    </div>
  );
}
