import Image from "next/image";
import styles from "./page.module.css";

// Home page component
export default function Home() {
  return (
    <>
      <h1>My Cookbook</h1>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/logo.jpg"
          alt="My Cookbook Logo"
          width={384}
          height={384}
          priority
        />
      </div>

      <div className={styles.center}>
        <p className={styles.description}>
        Welcome to our Recipe Collection! Here, you can store all your favorite recipes with ease. Simply add the ingredients and cooking instructions, and you're all set! Use the search feature to quickly find any recipe you've saved. Happy cooking!
        </p>
      </div>
    </>
  );
}
