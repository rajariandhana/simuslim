// src/utils/qibla.js

export const KAABA_LAT = 21.4225;
export const KAABA_LNG = 39.8262;

const toRadians = (deg) => (deg * Math.PI) / 180;
const toDegrees = (rad) => (rad * 180) / Math.PI;

export function getQiblaDirection(lat, lng) {
  const φ1 = toRadians(lat);
  const φ2 = toRadians(KAABA_LAT);
  const Δλ = toRadians(KAABA_LNG - lng);

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  let θ = Math.atan2(y, x);
  θ = toDegrees(θ);

  return (θ + 360) % 360;
}