import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Layout } from "../../components";
import { ContextProvider } from "../../context/context";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider>
          <Toaster />
          <Layout>{children}</Layout>
        </ContextProvider>
      </body>
    </html>
  );
}
