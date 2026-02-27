import { Spinner } from "@heroui/react";
import { usePrayerTimes } from "../../hooks/prayerTimes";
import { PrayerTimesCard } from "./PrayerTimesCard";
import { Banner } from "./Banner";
import Location from "./Location";

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

  return (
    <>
      <Banner timings={pt.timings} />
      <Location date={pt.date} timezone={pt.meta.timezone} />
      <PrayerTimesCard timings={pt.timings} />
      {/* <section>{JSON.stringify(pt, null, 2)}</section> */}
    </>
  );
};
export default Home;
