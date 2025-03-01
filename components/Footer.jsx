import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlineMail,
} from "react-icons/ai";

export default function Footer() {
  return (
    <div className="footer-container">
      <p> 2022 Kelvin Industries All rights reserved</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineGithub />
        <AiOutlineMail />
        <AiOutlineTwitter />
      </p>
    </div>
  );
}
