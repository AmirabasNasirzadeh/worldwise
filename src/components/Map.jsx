/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const [mapLat, mapLng] = useUrlPosition();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingGeolocationPosition,
    position: geolocationPosition,
    getPosition: getGeolocationPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (mapLat != null && mapLng != null) setMapPosition([mapLat, mapLng]); // Validate coordinates
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type={"position"} onClick={getGeolocationPosition}>
          {isLoadingGeolocationPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          const isValid =
            !isNaN(Number(city.position?.mapLat)) &&
            !isNaN(Number(city.position?.mapLng)); // Validate if lat/lng can be converted to numbers

          if (!isValid) {
            console.warn("Invalid city position:", city);
            return null;
          }

          return (
            <Marker
              position={[
                Number(city.position.mapLat), // Convert string to number
                Number(city.position.mapLng), // Convert string to number
              ]}
              key={city.id}
            >
              <Popup>
                <span>
                  {city.emoji} {city.cityName}
                </span>
              </Popup>
            </Marker>
          );
        })}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      const { lat, lng } = e.latlng;
      if (lat != null && lng != null) {
        // Validate click coordinates
        navigate(`form?lat=${lat}&lng=${lng}`);
      } else {
        console.error("Invalid click event coordinates:", e.latlng);
      }
    },
  });
}

export default Map;
