import { useEffect, useState } from "react";

/**
 * Custom hook to handle geolocation functionality
 * Manages device location tracking, permissions, and error states
 */
function useGeolocation() {
  // Track the user's current position
  const [position, setPosition] = useState(null);
  // Track permission state: 'prompt', 'granted', or 'denied'
  const [permission, setPermission] = useState("prompt");
  // Track any errors that occur during geolocation
  const [error, setError] = useState(null);
  // Store the ID returned by watchPosition to cleanup later
  const [watchId, setWatchId] = useState(null);

  // Cleanup: Remove the position watcher when component unmounts
  // or when watchId changes
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  /**
   * Request permission to access user's location and start tracking
   * This function handles both the initial permission request and
   * continuous location tracking
   */
  const requestPermission = async () => {
    // Check if browser supports geolocation
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    try {
      // First, get initial position - this triggers the permission prompt
      await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          // Success callback
          (position) => {
            setPermission("granted");
            setPosition(position);
            setError(null);
            resolve();
          },
          // Error callback - handle various error scenarios
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setPermission("denied");
                setError("Location permission denied");
                break;
              case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable");
                break;
              case error.TIMEOUT:
                setError("Location request timed out");
                break;
              default:
                setError("An unknown error occurred");
            }
            reject(error);
          },
          // Options for getting position
          {
            enableHighAccuracy: true, // Use GPS if available
            timeout: 5000, // Time to wait for position
            maximumAge: 0, // Don't use cached position
          },
        );
      });

      // After permission granted, start watching position continuously
      const id = navigator.geolocation.watchPosition(
        // Success callback - update position when it changes
        (position) => {
          setPosition(position);
          setError(null);
        },
        // Error callback - handle errors during watching
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setPermission("denied");
              setError("Location permission denied");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable");
              break;
            case error.TIMEOUT:
              setError("Location request timed out");
              break;
            default:
              setError("An unknown error occurred");
          }
          setPosition(null);
        },
        // Same options as above
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        },
      );

      // Store the watch ID for cleanup
      setWatchId(id);
    } catch (err) {
      setError("Error requesting location permission");
      console.error("Error:", err);
    }
  };

  // Return current state and request function
  return {
    position, // Current position data
    permission, // Current permission status
    error, // Any error messages
    requestPermission, // Function to request permissions
  };
}
export { useGeolocation };
