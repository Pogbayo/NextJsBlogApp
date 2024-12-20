import Image from "next/image";
import styles from "./about.module.css";
import { Metadata } from "next/types";
export const metadata: Metadata = {
  title: "About Page",
  description: "About desc",
};

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Agency</h2>
        <h1 className={styles.title}>
          We create digital ideas that are bigger, bolder, braver and better
        </h1>
        <p className={styles.desc}>
          We create digital ideas that are bigger, bolder, braver and better. We
          belive in good ideas flexibility and precission We are world`&apos;`s
          Our special team best conssulting & finance solution provider. Wide
          range of web and software development services
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10 K</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K</h1>
            <p>Year of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/about.png" alt="About image" fill className={styles.img} />
      </div>
    </div>
  );
};

export default AboutPage;
