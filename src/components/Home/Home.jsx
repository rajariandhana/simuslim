import { Spinner } from "@heroui/react";
import { usePrayerTimes } from "../../hooks/prayerTimes";
import { PrayerTimes } from "./PrayerTimes";
import { Banner } from "./Banner";

export const Home = () => {
  const { data: pt, isPending } = usePrayerTimes();

  if (isPending) {
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
      <Banner date={pt.date} timezone={pt.meta.timezone} />
      <PrayerTimes timings={pt.timings} />
      {/* <section>{JSON.stringify(pt, null, 2)}</section> */}
    </>
  );
};
export default Home;
