import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Head>
        <title> JS Mastery store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children} </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
