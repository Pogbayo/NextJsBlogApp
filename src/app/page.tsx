import styles from "./home.module.css";
import Image from "next/image";
const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Declan Spag Agency.</h1>
        <p className={styles.desc}>
          Welcome to Creative Thoughts Agency, where creativity meets insight to
          inspire, engage, and change the world. Our blog offers fresh stories,
          articles, and inspiration for thinkers, creators, and innovators
          alike. Whether you're an aspiring writer, seasoned entrepreneur, or
          someone who loves exploring new perspectives, we provide content that
          sparks curiosity and fuels creativity. From thought-provoking pieces
          to practical advice on navigating the digital world, we cover diverse
          topics to empower you to think differently and act boldly. Join our
          community of like-minded individuals and stay inspired with Creative
          Thoughts Agency!
        </p>
        <div className={styles.buttons}>
          <button className={styles.button}>Learn More</button>
          <button className={styles.button}>Contact</button>
        </div>
        <div className={styles.brands}>
          <Image src="/brands.png" alt="" fill className={styles.brandImg} />
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/hero.gif" alt="" fill className={styles.heroImg} />
      </div>
    </div>
  );
};

export default Home;
