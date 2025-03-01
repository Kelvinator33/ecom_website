import Link from "next/link";

export default function Product({
  product: { picture, name, price, description },
  uniformImageSize,
}) {
  return (
    <div className="product-card">
      <Link href={`/product/${name}`}>
        <img
          src={picture}
          width={uniformImageSize ? 300 : 250}
          height={uniformImageSize ? 300 : 250}
          className="product-image"
        />
        <p className="product-name">{name}</p>
        <p className="product-price">€{price}</p>
      </Link>
    </div>
  );
}
