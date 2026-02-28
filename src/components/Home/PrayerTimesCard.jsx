import { Chip } from "@heroui/react";
import { TimeCard } from "./TimeCard";
import { timeToMinutes } from "../../utils/util";
import { useContext, useMemo } from "react";
import { MinuteContext } from "../../context/TimeContext";

export function PrayerTimesCard({ timings, current, next }) {
  const { time } = useContext(MinuteContext);

  const timeData = useMemo(() => {
    const nowMinutes = timeToMinutes(time);
    // const nowMinutes = 722;
    const currentMinutes = timeToMinutes(current.time);
    const nextMinutes = timeToMinutes(next.time);
    // console.log(nowMinutes, currentMinutes, nextMinutes);

    return {
      nowMinutes,
      currentMinutes,
      nextMinutes,
      diffFromCurrent: nowMinutes - currentMinutes,
      diffToNext: nextMinutes - nowMinutes,
    };
  }, [time, current.time, next.time]);

  function getTag(prayer) {
    if (prayer.prayer_name === "Sunrise") return null;
    const {
      diffFromCurrent,
      diffToNext,
    } = timeData;

    let status = null;
    let color = null;

    if (prayer.prayer_name === current.prayer_name) {
      if (diffFromCurrent >= 0 && diffFromCurrent <= 10) {
        status = "Just Now";
        color = "success";
      } else {
        status = "Now";
        color = "success";
      }

      if (diffToNext > 0 && diffToNext <= 20) {
        status = "Almost Over";
        color = "danger";
      }
    }

    if (prayer.prayer_name === next.prayer_name) {
      if (diffToNext > 0 && diffToNext <= 20) {
        status = "Soon";
        color = "warning";
      }
    }

    if (!status) return null;

    return (
      <Chip size="sm" variant="flat" color={color}>
        {status}
      </Chip>
    );
  }

  return (
    <section className="flex flex-col w-full gap-3 px-6">
      {timings.map((timing) => (
        <TimeCard
          key={timing.prayer_name}
          label={timing.prayer_name}
          time={timing.time}
          tag={getTag(timing)}
        />
      ))}
    </section>
  );
}