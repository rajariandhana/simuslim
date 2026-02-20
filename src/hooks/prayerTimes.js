import { useQuery } from "@tanstack/react-query";
import prayerInstance from "../libs/axios/prayerInstance";
import { getDate } from "../utils/util";

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
}

async function fetchPrayerTimes() {
  try {
    const { latitude, longitude } = await getLocation();
    const date = getDate();

    const response = await prayerInstance.get(
      `/timings/${date}?latitude=${latitude}&longitude=${longitude}`,
    );
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export function usePrayerTimes() {
  return useQuery({
    queryKey: ["prayerTimes"],
    queryFn: fetchPrayerTimes,
  });
}
