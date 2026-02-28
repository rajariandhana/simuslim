import { useQuery } from "@tanstack/react-query";
import prayerInstance from "../libs/axios/prayerInstance";
import { formatToYMD, getDate } from "../utils/util";
import instance from "../libs/axios/instance";

function getLocation() {
  // console.log("getLocation");
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
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

function removeTimings(timings, ignoredTimes) {
  const filteredTimings = Object.entries(timings).filter(
    ([prayerName]) => !ignoredTimes.includes(prayerName),
  );

  const filteredTimingsObject = Object.fromEntries(filteredTimings);
  return filteredTimingsObject;
}
function reformatPrayerTimes(timings) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  const prayerTimesList = Object.entries(timings)
    .map(([prayer, time]) => {
      const [hours, minutes] = time.split(":").map(Number);
      const prayerTimeInMinutes = hours * 60 + minutes;
      return { prayer_name: prayer, time, prayerTimeInMinutes };
    })
    .sort((a, b) => a.prayerTimeInMinutes - b.prayerTimeInMinutes);

  let isActiveFound = false;

  const formattedPrayerTimes = prayerTimesList.map((prayer, index) => {
    let isActive = false;

    if (!isActiveFound) {
      const nextPrayer = prayerTimesList[index + 1];
      if (nextPrayer) {
        if (
          currentTimeInMinutes >= prayer.prayerTimeInMinutes &&
          currentTimeInMinutes < nextPrayer.prayerTimeInMinutes
        ) {
          isActive = true;
          isActiveFound = true;
        }
      } else {
        isActive = currentTimeInMinutes >= prayer.prayerTimeInMinutes;
        isActiveFound = true;
      }
    }

    const date = {
      year: currentTime.getFullYear(),
      month: currentTime.getMonth(),
      day: currentTime.getDate(),
    };
    const key = `${formatToYMD(date)}-${prayer.time}:00`;
    return {
      key,
      prayer_name: prayer.prayer_name,
      time: prayer.time,
      is_active: isActive,
    };
  });
  // console.log(formattedPrayerTimes);
  return formattedPrayerTimes;
}

async function fetchPrayerTimes() {
  try {
    const { latitude, longitude } = await getLocation();
    // const latitude = -27.49675753585311;
    // const longitude = 153.0114898822021;
    // console.log("latlon", latitude, longitude);
    const date = getDate();
    const tune = "0,10,0,0,0,0,0,0,0";

    const response = await prayerInstance.get(
      `/timings/${date}?latitude=${latitude}&longitude=${longitude}&tune=${tune}`,
    );
    // console.log(response);
    const data = response.data.data;
    const ignoredTimes = [
      "Sunset",
      "Midnight",
      "Firstthird",
      "Lastthird",
      "Imsak",
    ];
    const removedTimings = removeTimings(data.timings, ignoredTimes);
    const formattedTimes = reformatPrayerTimes(removedTimings);

    const result = {
      ...data,
      timings: formattedTimes,
    };
    instance.post("/prayer/location", {
      latitude,
      longitude,
      timezone: result.meta.timezone
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export function usePrayerTimes() {
  return useQuery({
    queryKey: ["prayerTimes"],
    queryFn: fetchPrayerTimes,
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
  });
}
