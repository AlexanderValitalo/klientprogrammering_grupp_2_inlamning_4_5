import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";
import styles from "./layout.module.css";

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
      <body className={`${inter.className} ${styles.body}`}> 
        <header className={styles.header}>
          <Navigation />
        </header>

        <main className={styles.main}>
          {children}
        </main>

        <footer className={styles.footer}>
          <p>&copy; 2024 My Cookbook</p>  
        </footer> 
      </body>
    </html>
  );
}
