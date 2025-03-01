"use client";
import Image from "next/image";
import {
  Herobanner,
  Cart,
  Foot_banner,
  Footer,
  Layout,
  Navbar,
  Product,
} from "../../components";
import { useEffect, useState } from "react";

export default function Home() {
  const [productsinfo, setproductsinfo] = useState([]);
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((json) => setproductsinfo(json));
  }, []);
  const categories = [...new Set(productsinfo.map((p) => p.category))];
  const herobanner = productsinfo[4];
  const footerbanner = productsinfo[6];
  // console.log(herobanner);

  return (
    <>
      <Herobanner
        name={herobanner?.name}
        description={herobanner?.description}
        price={herobanner?.price}
        picture={herobanner?.picture}
        category={herobanner?.category}
      />

      <div>
        <h2 className="text-4xl font-bold text-center">
          Best selling products
        </h2>
      </div>
      {categories.map((categoryname) => (
        <div className="products-heading" key={categoryname}>
          <p>{categoryname} of many variations</p>
          <div className="products-container">
            {productsinfo
              .filter((p) => p.category === categoryname)
              .map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </div>
      ))}
      <Foot_banner
        name={footerbanner?.name}
        description={footerbanner?.description}
        price={footerbanner?.price}
        picture={footerbanner?.picture}
        category={footerbanner?.category}
      />
    </>
  );
}
