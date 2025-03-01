"use client";
import React, { useEffect, useState } from "react";
import { useSt_Context } from "../../../context/context";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { stars } from "../../../lib/utils";

const Success = () => {
  const { setcartitems, settotalprice, settotalquant } = useSt_Context();
  useEffect(() => {
    localStorage.clear();
    setcartitems([]);
    settotalprice(0);
    settotalquant(0);
    stars();
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email for the receipt</p>
        <p className="description">
          if you have any questions, please email
          <a className="email" href="mailto:kelvinamoah53@gmail.com">
            kelvinamoah53@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
