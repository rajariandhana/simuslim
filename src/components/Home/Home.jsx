import { Spinner } from "@heroui/react";
import { usePrayerTimes } from "../../hooks/prayerTimes";
import { PrayerTimesCard } from "./PrayerTimesCard";
import { Banner } from "./Banner";
import Location from "./Location";
import { getCurrentTimeHHMM } from "../../utils/util";

export const Home = () => {
  const { data: pt, isPending } = usePrayerTimes();

  if (isPending || !pt) {
    // TODO: add skeleton
    return (
      <>
        <section className="absolute top-0 flex w-full h-screen items-center justify-center">
          <Spinner size="lg" />
        </section>
      </>
    );
  }

  function getCurrentPrayer(timings) {
    const currentTime = getCurrentTimeHHMM();
    // const currentTime = "05:30";

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
  const prayer = getCurrentPrayer(pt.timings);

  return (
    <>
      <Banner
        current={prayer.current_prayer}
        next={prayer.next_prayer}
      />
      <Location date={pt.date} timezone={pt.meta.timezone} />
      <PrayerTimesCard
        timings={pt.timings}
        current={prayer.current_prayer}
        next={prayer.next_prayer}
      />
      {/* <section>{JSON.stringify(pt, null, 2)}</section> */}
    </>
  );
};
export default Home;
