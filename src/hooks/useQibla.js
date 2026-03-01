import { useMemo } from "react";
import { getQiblaDirection } from "../utils/qibla";

export default function useQibla(location, heading) {
  return useMemo(() => {
    if (!location || heading == null) return null;

    const qiblaDirection = getQiblaDirection(location.lat, location.lng);
    const rotation = qiblaDirection - heading;

    return {
      qiblaDirection,
      rotation,
      aligned: Math.abs(rotation) < 5,
    };
  }, [location, heading]);
}