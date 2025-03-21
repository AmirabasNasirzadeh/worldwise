import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchLocation, setSearchLocation] = useSearchParams();
  const lng = searchLocation.get("lng");
  const lat = searchLocation.get("lat");

  return [lat, lng];
}
