import { loadStripe } from "@stripe/stripe-js";
let stripepromise;

import React from "react";

const getstripe = () => {
  if (!stripepromise) {
    stripepromise = loadStripe(process.env.STRIPE_PUBLISH_KEY);
  }
  return stripepromise;
};

export default getstripe;
