import Image from "next/image";
import styles from "./page.module.css";

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
        <p className={styles.description}>An innovative and customizable training planning application</p>
      </div>

    </>
  );
}
