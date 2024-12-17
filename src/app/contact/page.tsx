// "use client";
import { Metadata } from "next/types";
import styles from "./contact.module.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact page ",
  description: "Contact desc",
};

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number (Optional" />
          <textarea
            name=""
            id=""
            cols={38}
            rows={10}
            placeholder="Message"
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
