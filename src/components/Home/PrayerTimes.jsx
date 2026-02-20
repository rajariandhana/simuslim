import { TimeCard } from "./TimeCard";
import { LuMoonStar } from "react-icons/lu";

export function PrayerTimes({ timings }) {
  const ignoredTimes = [
    "Sunset",
    "Midnight",
    "Firstthird",
    "Lastthird",
    "Imsak",
  ];

  return (
    <section className="flex flex-col w-full gap-2">
      jam
      {Object.entries(timings).map(([key, value]) => {
        if (ignoredTimes.includes(key)) return;
        return <TimeCard key={key} icon={<LuMoonStar/>} label={key} time={value} />;
      })}
    </section>
  );
}
