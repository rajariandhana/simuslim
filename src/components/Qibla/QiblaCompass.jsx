import useGeolocation from "../../hooks/useGeolocation";
import useDeviceOrientation from "../../hooks/useDeviceOrientation";
import useQibla from "../../hooks/useQibla";
import { Button } from "@heroui/react";

export default function QiblaCompass() {
  const { location, error } = useGeolocation();
  const { heading, permissionRequired, requestIOSPermission } =
    useDeviceOrientation();
  const qibla = useQibla(location, heading);

  if (error) return <p>{error}</p>;
  if (!location) return <p>Getting location...</p>;

  if (permissionRequired) {
    return (
      <Button onPress={requestIOSPermission}>
        Enable Compass
      </Button>
    );
  }

  if (!qibla) return <p>Calibrating...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "5px solid #333",
          margin: "auto",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${qibla.rotation}deg)`,
            fontSize: "40px",
            transition: "transform 0.2s linear",
          }}
        >
          🕋
        </div>
      </div>

      <p style={{ marginTop: "20px" }}>
        {qibla.aligned ? "✅ You are facing Qibla" : "Turn your device"}
      </p>
    </div>
  );
}