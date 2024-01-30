import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.inner}>
        Beer List App &#169; 2023 (By Hesam Mahmoodi)
      </div>
    </footer>
  );
};

export default Footer;
