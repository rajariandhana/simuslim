import { TimeCard } from "./TimeCard";
import { LuMoonStar } from "react-icons/lu";

export function PrayerTimesCard({ timings }) {
  return (
    <section className="flex flex-col w-full gap-3 px-6">
      {timings.map((timing) => (
        <TimeCard
          key={timing.prayer_name}
          label={timing.prayer_name}
          time={timing.time}
          is_active={timing.is_active}
        />
      ))}
    </section>
  );
}
