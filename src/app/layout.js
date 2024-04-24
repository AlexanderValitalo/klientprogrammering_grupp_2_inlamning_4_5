import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";

const inter = Inter({ subsets: ["latin"] });

// Metadata for the application
export const metadata = {
  title: "My Cookbook",
  description: "Store your favorite recipes",
};

// Root layout component for the application
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
