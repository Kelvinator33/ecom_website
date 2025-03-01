import Link from "next/link";

export default function Foot_banner({ name, price, description, picture }) {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc ">
        <div className="left">
          <p> 40% off</p>
          <h3>LIMITED </h3>
          <h3>GET YOURS</h3>
          <p>15 March to 8 Apr</p>
        </div>
        <div className="right">
          <p>{name}</p>
          <h3>SUMMER SALE</h3>
          <p>for ultra smooth crisp photos this is the best</p>
          <Link href={`/product/${name}`}>
            <button type="button">Shop now</button>
          </Link>
        </div>
        <img src={picture} className="footer-banner-image" />
      </div>
    </div>
  );
}
