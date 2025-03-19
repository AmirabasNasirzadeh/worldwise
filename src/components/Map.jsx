import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchLocation, setSearchLocation] = useSearchParams();
  const lat = searchLocation.get("lat");
  const lng = searchLocation.get("lng");

  const navigate = useNavigate();

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>
        Position: {lat}, {lng}
      </h1>
    </div>
  );
}

export default Map;
