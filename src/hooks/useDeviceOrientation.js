import { useEffect, useState } from "react";

export default function useDeviceOrientation() {
  const [heading, setHeading] = useState(null);
  const [permissionRequired, setPermissionRequired] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        setPermissionRequired(true);
      } else {
        startListening();
      }
    };

    const startListening = () => {
      window.addEventListener("deviceorientation", handleOrientation, true);
    };

    const handleOrientation = (event) => {
      let compassHeading;

      // iOS Safari
      if (event.webkitCompassHeading) {
        compassHeading = event.webkitCompassHeading;
      } else if (event.alpha !== null) {
        compassHeading = 360 - event.alpha;
      }

      if (compassHeading !== undefined) {
        setHeading(compassHeading);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const requestIOSPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      const response = await DeviceOrientationEvent.requestPermission();
      if (response === "granted") {
        window.addEventListener("deviceorientation", handleOrientation, true);
      }
    }
  };

  const handleOrientation = (event) => {
    let compassHeading;

    if (event.webkitCompassHeading) {
      compassHeading = event.webkitCompassHeading;
    } else if (event.alpha !== null) {
      compassHeading = 360 - event.alpha;
    }

    if (compassHeading !== undefined) {
      setHeading(compassHeading);
    }
  };

  return { heading, permissionRequired, requestIOSPermission };
}