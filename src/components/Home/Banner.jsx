import { Card, CardFooter, CardHeader, Image } from "@heroui/react";
import { getCurrentTimeHHMM } from "../../utils/util";
import Clock from "./Clock";
import Current from "./Current";

const PRAYER_COLOR_GRADIENT = {
  Fajr: "from-violet-400 to-violet-600",
  Sunrise: "from-amber-100 to-amber-300",
  Dhuhr: "from-sky-200 to-sky-400",
  Asr: "from-sky-300 to-sky-500",
  Maghrib: "from-rose-100 to-rose-300",
  Isha: "from-indigo-800 to-indigo-950",
};

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
  // console.log(current_prayer, next_prayer)
  return { current_prayer, next_prayer };
}

export function Banner({ timings }) {
  const prayer = getCurrentPrayer(timings);
  return (
    <Card className="h-1/2 w-full rounded-b-4xl" radius="none">
      <CardHeader className="absolute z-30 top-0 flex justify-end text-white p-6">
        <Clock />
      </CardHeader>
      {prayer.current_prayer === "Sunrise" ? null : (
        <CardFooter className="absolute z-30 bottom-0 flex text-white py-6 px-8 items-center gap-2 text-4xl">
          <span>{prayer.current_prayer.prayer_name}</span>
          <Current current={prayer.current_prayer} next={prayer.next_prayer} />
        </CardFooter>
      )}
      <Image
        removeWrapper
        alt="Mosque"
        className="z-20 w-full h-full object-cover -inset-x-12 inset-y-6 scale-125"
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
      <div
        className={`absolute z-0 w-full aspect-video scale-125 bg-linear-to-bl ${PRAYER_COLOR_GRADIENT[prayer.current_prayer.prayer_name]}`}
      ></div>
      <div className="absolute bg-black z-10 w-full h-full opacity-10"></div>
    </Card>
  );
}
