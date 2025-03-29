import styles from "./AppLayout.module.css";
import PageNav from "../components/PageNav";
import Sidebar from "../components/sidebar";
import Map from "../components/Map";
import User from "../components/User";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
