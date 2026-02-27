import { Card, CardFooter, CardHeader, Image } from "@heroui/react";
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

export function Banner({ timings }) {
  const prayer = getCurrentPrayer(timings);
  return (
    <Card className="h-1/2 w-full rounded-b-4xl" radius="none">
      <CardHeader className="absolute z-30 top-0 flex justify-end text-white p-6">
        <Clock />
      </CardHeader>
      <CardFooter className="absolute z-30 bottom-0 flex justify-between text-white py-6 px-8">
        <div className="flex items-center gap-2 text-4xl">
          {prayer.current_prayer === "Sunrise" ? null : (
            <>
              <span>{prayer.current_prayer.prayer_name}</span>
              <Current
                current={prayer.current_prayer}
                next={prayer.next_prayer}
              />
            </>
          )}
        </div>
      </CardFooter>
      <Image
        removeWrapper
        alt="Card background"
        className="z-20 w-full h-full object-cover -inset-x-12 inset-y-8 scale-125"
        src={"/mosque.png"}
        radius="none"
      />
      <img
        src={"/cloud_1.png"}
        className="absolute z-10 opacity-90 bottom-16 left-10 scale-200"
      />
        <img
          src={"/cloud_1.png"}
          className="absolute z-10 opacity-60 bottom-32 left-4 scale-150"
        />
      <img
        src={"/cloud_2.png"}
        className="absolute z-10 opacity-80 bottom-8 scale-125 right-12"
      />
      <img
        src={"/cloud_2.png"}
        className="absolute z-10 opacity-50 bottom-16 scale-110 right-8"
      />
      <div className="absolute z-0 w-full aspect-video scale-110 bg-gradient-to-bl from-rose-100 to-rose-300"></div>
      <div className="absolute bg-black z-10 w-full h-full opacity-20"></div>
    </Card>
  );
}
