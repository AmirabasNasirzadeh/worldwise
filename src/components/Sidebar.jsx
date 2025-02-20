import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./PageNav";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of Cities.</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()}; Created by Amirabas
          Nasirzadeh.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
