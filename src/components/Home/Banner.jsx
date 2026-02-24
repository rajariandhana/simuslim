import { Card, CardFooter, CardHeader, Chip, Image } from "@heroui/react";
import { getCurrentTimeHHMM } from "../../utils/util";
import Clock from "./Clock";
import CountdownPrayerTime from "./CountdownPrayerTime";
import Current from "./Current";

const skyImages = {
  morning: "/sky/morning.png",
  afternoon: "/sky/afternoon.png",
  evening: "/sky/evening.png",
  night: "/sky/night.png",
};

function getSkyImage() {
  const currentHour = new Date().getHours();

  if (currentHour >= 6 && currentHour < 9) {
    return skyImages.morning;
  } else if (currentHour >= 9 && currentHour < 17) {
    return skyImages.afternoon;
  } else if (currentHour >= 17 && currentHour < 20) {
    return skyImages.evening;
  } else {
    return skyImages.night;
  }
}

function getCurrentPrayer(timings) {
  const currentTime = getCurrentTimeHHMM();
  // const currentTime = "12:11";

  let current_prayer = timings[timings.length - 1];
  let next_prayer = timings[0];

  for (let i = 0; i < timings.length; i++) {
    if (currentTime < timings[i].time) {
      next_prayer = timings[i];
      current_prayer = i === 0 ? timings[timings.length - 1] : timings[i - 1];
      break;
    }
  }
  // console.log(
  //   "current",
  //   current_prayer.prayer_name,
  //   "next",
  //   next_prayer.prayer_name,
  // );
  return { current_prayer, next_prayer };
}

export function Banner({ timezone, timings }) {
  const prayer = getCurrentPrayer(timings);
  return (
    <Card className="col-span-12 sm:col-span-4 w-full h-40">
      <CardHeader className="absolute z-20 top-0 flex justify-between text-white">
        <div className="flex items-center gap-2 text-xl">
          <span>{prayer.current_prayer.prayer_name}</span>
          <Current current={prayer.current_prayer} next={prayer.next_prayer} />
        </div>
        <Clock />
      </CardHeader>
      <CardFooter className="absolute z-20 bottom-0 flex justify-end text-white">
        <div className="flex items-center gap-2">
          <span>{prayer.next_prayer.prayer_name}</span>
          <span className="text-xs">
            in <CountdownPrayerTime target={prayer.next_prayer.time} />
          </span>
        </div>
      </CardFooter>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src={getSkyImage()}
      />
      <div className="absolute bg-black z-10 w-full h-full opacity-20"></div>
    </Card>
  );
}
