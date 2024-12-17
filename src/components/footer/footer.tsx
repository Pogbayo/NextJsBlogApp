import styles from "./footer.module.css";
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Declan spag</div>
      <div className={styles.text}>
        Spag creative thougths agency & All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
