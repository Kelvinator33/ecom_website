import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlineMail,
  AiOutlineLinkedin,
} from "react-icons/ai";

export default function Footer() {
  return (
    <div className="footer-container">
      <p> 2022 Kelvin Industries All rights reserved</p>
      <p className="icons">
        <a
          href="https://instagram.com/kel77642"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillInstagram />
        </a>
        <a
          href="https://github.com/Kelvinator33"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineGithub />
        </a>
        <a href="mailto:kelvinamoah53@email.com">
          <AiOutlineMail />
        </a>
        <a
          href="https://www.linkedin.com/in/kelvin-amoah-0a2221198"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineLinkedin />
        </a>
      </p>
    </div>
  );
}
