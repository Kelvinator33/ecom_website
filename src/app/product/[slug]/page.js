"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../../../components";
import { useSt_Context } from "../../../../context/context";

const ProductDetails = () => {
  const { slug } = useParams(); // Get slug dynamically
  const decodedSlug = decodeURIComponent(slug); // Decode special characters like %20

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const { decqty, incqty, qty, add, setqty, setShowCart } = useSt_Context();
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const buynow = () => {
    add(product, qty);
    setShowCart(true);
  };

  useEffect(() => {
    setqty(1); // Reset quantity to 1 whenever the slug changes
  }, [slug, setqty]);

  useEffect(() => {
    if (!decodedSlug) return;

    // Fetch the specific product by slug
    fetch(`/api/products?name=${encodeURIComponent(decodedSlug)}`)
      .then((response) => {
        // Log the raw response for debugging
        console.log("Response from API:", response); //used for debugging because i run into an error
        return response.json();
      })
      .then((products) => {
        console.log(products); //used for debugging because i run into an error
        const foundProduct =
          products.find((p) => {
            console.log("Checking product name:", p.name); // check if product is being fetched
            return p.name === decodedSlug;
          }) || null;
        console.log(decodedSlug); //used for debugging because i run into an error

        setProduct(foundProduct);

        // Fetch all products and exclude the current product
        fetch("/api/products")
          .then((response) => response.json())
          .then((allProducts) => {
            setRelatedProducts(
              allProducts.filter((p) => p._id !== foundProduct?._id)
            );
          })
          .catch((error) =>
            console.error("Error fetching all products:", error)
          );
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [decodedSlug]);
  console.log(relatedProducts);
  if (!product) {
    return <div>Loading...</div>;
  }

  const toggleImageExpand = () => {
    setIsImageExpanded(!isImageExpanded);
  };
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="product-detail-image">
            <img src={product.picture} onClick={toggleImageExpand} />
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{product.name}</h1>
          <div className="reviews">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />

            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{product.description}</p>
          <p className="price">€{product.price}</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decqty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incqty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => add(product, qty)}
            >
              Add to cart
            </button>
            <button type="button" className="buy-now" onClick={buynow}>
              Buy now
            </button>
          </div>
        </div>
      </div>
      {isImageExpanded && (
        <div className="image-overlay" onClick={toggleImageExpand}>
          <div
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
          >
            <img src={product.picture} alt={product.name} />
          </div>
        </div>
      )}
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {relatedProducts.map((item) => (
              <Product key={item._id} product={item} uniformImageSize={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
