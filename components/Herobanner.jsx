import Link from "next/link";
import React from "react";

const Herobanner = ({ name, price, description, picture, category }) => {
  return (
    <div className=" hero-banner-container ">
      <div>
        <p className="beats-solo">{name}</p>

        <h3>Summer Sale</h3>
        <h1>grab yours now</h1>
        <img src={picture} alt="headphones" className=" hero-banner-image" />
        <div>
          <Link href={`/product/${name}`}>
            <button type="button">Get it now</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herobanner;
