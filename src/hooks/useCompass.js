import { useEffect, useRef, useState } from "react";
import { getCardinalDirection, getMagneticDeclination } from "../utils/util";

/**
 * Custom hook to handle compass/device orientation functionality
 * Manages device orientation tracking, permissions, and magnetic declination
 * @param {Object} props - Hook properties
 * @param {GeolocationPosition} props.userPosition - User's current position for magnetic declination calculation
 */
function useCompass({ userPosition }) {
  // Track permission state for device orientation API
  const [permission, setPermission] = useState("unknown");
  // Store current direction (degrees and cardinal direction)
  const [direction, setDirection] = useState(null);
  // Track whether device supports orientation API
  const [hasSupport, setHasSupport] = useState(true);
  // Store magnetic declination value (difference between true and magnetic north)
  const magneticDeclinationRef = useRef(0);
  // Store manual calibration offset
  const offsetRef = useRef(0);

  /**
   * Checks if the device supports orientation events
   * Sets hasSupport state and default direction if not supported
   */
  const checkSupport = () => {
    if (typeof window === "undefined") return false;

    if (!window.DeviceOrientationEvent) {
      alert("Your device does not support compass functionality.");
      setHasSupport(false);
      setDirection({ degrees: 0, cardinal: "N" });
      return false;
    }
    return true;
  };

  /**
   * Handles device orientation events
   * Calculates heading based on device type (iOS vs Android)
   * Applies magnetic declination and manual offset corrections
   */
  const handleOrientation = (event) => {
    let heading = 0;

    // For iOS devices - uses native compass heading
    if (event?.webkitCompassHeading) {
      heading = event.webkitCompassHeading;
    }
    // For Android devices - uses alpha value and screen orientation
    else if (event.alpha !== null) {
      const screenOrientation = window.screen.orientation?.angle || 0;
      heading = (360 - event.alpha + screenOrientation) % 360;
    } else {
      setHasSupport(false);
      setDirection({ degrees: 0, cardinal: "N" });
    }

    if (heading !== undefined) {
      // Apply magnetic declination and manual offset corrections
      const adjustedHeading =
        (heading + magneticDeclinationRef.current + 360 + offsetRef.current) %
        360;

      let cardinalDirection = getCardinalDirection(adjustedHeading);

      setDirection({
        degrees: Math.round(adjustedHeading),
        cardinal: cardinalDirection,
      });
    }
  };

  /**
   * Requests permission to use device orientation
   * Handles different permission models for iOS and other devices
   */
  const requestPermission = async () => {
    if (!checkSupport()) return;

    // iOS requires explicit permission request
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      // @ts-expect-error requestPermission is supported in iOS
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        // @ts-expect-error requestPermission is supported in iOS
        const response = await DeviceOrientationEvent.requestPermission();
        setPermission(response);

        if (response === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
        }
      } catch (error) {
        console.error("Error requesting orientation permission:", error);
        setPermission("error");
      }
    } else {
      // Non-iOS devices - add listener directly
      window.addEventListener("deviceorientation", handleOrientation);
      setPermission("granted");
    }
  };

  // Fetch magnetic declination when user position changes
  useEffect(() => {
    if (!userPosition || magneticDeclinationRef.current !== 0) return;

    getMagneticDeclination(
      userPosition.coords.latitude,
      userPosition.coords.longitude,
    ).then((declination) => {
      magneticDeclinationRef.current = declination;
    });
  }, [userPosition]);

  // Cleanup orientation event listener
  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return {
    permission, // Current permission status
    direction, // Current direction data
    setDirection, // Function to manually set direction
    requestPermission, // Function to request permissions
    hasSupport, // Whether device supports orientation
    magneticDeclination: magneticDeclinationRef.current, // Current magnetic declination
    offsetRef, // Reference to manual calibration offset
  };
}

export { useCompass };
