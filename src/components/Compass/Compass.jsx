import { Button } from "@heroui/react";
import { useCompass } from "../../hooks/useCompass";
import { useGeolocation } from "../../hooks/useGeolocation";
import { getCardinalDirection } from "../../utils/util";

export default function Compass() {
  const { position, requestPermission: requestGeolocationPermission } =
    useGeolocation();
  const {
    permission: compassPermission,
    direction,
    setDirection,
    hasSupport: hasDeviceOrientationSupport,
    requestPermission: requestCompassPermission,
    magneticDeclination,
    offsetRef,
  } = useCompass({ userPosition: position });
 
  async function onRequestPermission() {
    await requestCompassPermission();
    await requestGeolocationPermission();
  }
 
  // handling manual heading input
  // i.e. on desktop devices you can click on the heading degrees and manually input your heading
  function handleManualHeadingInput(e) {
    const newDirection = e.currentTarget.value;
 
    if (isNaN(parseFloat(newDirection))) return;
 
    if (parseFloat(newDirection) < 0 || parseFloat(newDirection) > 360) return;
 
    setDirection({
      degrees: parseFloat(newDirection),
      cardinal: getCardinalDirection(parseFloat(newDirection)),
    });
  }
 
  function getNorthTransformValue() {
    // Define the radius of the compass circle in pixels
    // This determines how far the north indicator will move from the center
    const maxRadius = 140;
    const scaledRadius = maxRadius;
 
    // Convert compass degrees to radians and negate for correct rotation direction
    // We negate because CSS rotation goes clockwise, while compass degrees go counter-clockwise
    const angleInRadians = -(direction?.degrees || 0) * (Math.PI / 180);
 
    // Calculate the x and y coordinates for the north indicator
    // Using trigonometry to position the indicator along the circle's circumference
    const x = scaledRadius * Math.sin(angleInRadians);
    const y = -scaledRadius * Math.cos(angleInRadians); // Negative because Y-axis is inverted in CSS
 
    // Return CSS transform string that:
    // 1. Translates (moves) the indicator to the calculated position
    // 2. Rotates the indicator to maintain its orientation towards the center
    return `translate(${x}px, ${y}px) rotate(${angleInRadians * (180 / Math.PI)}deg)`;
  }
 
  // Function to recalibrate the north indicator
  // set the current direction as north
  function onRecalibrateNorth() {
    // If we're at 90°, we need -90° offset to get back to 0° (north)
    const offset = -(direction?.degrees || 0) + offsetRef.current;
    offsetRef.current = offset;
  }
 
  return (
    <div className="max-w-screen-sm mx-auto space-y-4">
      {/* Display a message if the device does not support the orientation API */}
      {!hasDeviceOrientationSupport && (
        <div className="font-mono w-full p-4 border-2 border-black">
          <p className="text-red-500">
            <b>Your device does not support the orientation API.</b>
            <br />
            You can manually input your heading by clicking on the heading
            indicator in the centre of the compass.
          </p>
        </div>
      )}
      {compassPermission !== "granted" ? (
        // Request permission to use compass and location
        <Button onClick={onRequestPermission} className="w-full">
          Enable Compass and Location
        </Button>
      ) : (
        <div className="p-4 w-full space-y-4 bg-black">
          <div className="w-full flex flex-col items-center mt-4">
            <div className="h-auto my-16 w-[280px] aspect-square relative text-white bg-white/10 flex items-center justify-center rounded-full">
              <div className="flex flex-col items-center justify-center">
                <p className="uppercase text-xs leading-tight mb-2">
                  Your heading and location
                </p>
                {/* Show the user's current heading */}
                <div className="flex items-center">
                  <input
                    readOnly={hasDeviceOrientationSupport}
                    className="text-center text-5xl inline"
                    value={direction?.degrees || 0}
                    // this is the input that the user can manually input their heading
                    // it's read only if the device supports the orientation API
                    // i.e. on desktop devices you can manually input your heading
                    onChange={(e) => handleManualHeadingInput(e)}
                    style={{
                      width: `${String(direction?.degrees || 0).length}ch`,
                    }}
                  />
                  <p className="text-5xl text-center">
                    °&nbsp;{direction?.cardinal}
                  </p>
                </div>
                {/* Show the user's current latitude and longitude */}
                {position && (
                  <div className="flex gap-2">
                    <div className="w-full flex flex-row gap-2">
                      <span className="text-gray-400 uppercase">Lat</span>
                      <span>{position.coords.latitude.toFixed(2)}°</span>
                    </div>
                    <div className="w-full flex flex-row gap-2">
                      <span className="text-gray-400 uppercase">Lon</span>
                      <span>{position.coords.longitude.toFixed(2)}°</span>
                    </div>
                  </div>
                )}
                {/* Display the magnetic declination returned from NOAA API */}
                {typeof magneticDeclination === "number" && (
                  <div className="flex justify-center">
                    <div className="w-full flex flex-row gap-2">
                      <span className="text-gray-400 uppercase">
                        Declination
                      </span>
                      <span>{magneticDeclination.toFixed(2)}°</span>
                    </div>
                  </div>
                )}
                {/* Recalibrate Button - clicking this sets the current direction the user is facing as north */}
                <button
                  onClick={onRecalibrateNorth}
                  className="px-6 mt-3 w-full rounded-md cursor-pointer flex items-center justify-center gap-2 text-blue-400 leading-none text-center"
                >
                  Recalibrate
                </button>
              </div>
              {/* North Indicator */}
              <div
                className="absolute inline-flex flex-col items-center justify-center border-t-4 border-red-500 w-4"
                style={{
                  transform: getNorthTransformValue(),
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}