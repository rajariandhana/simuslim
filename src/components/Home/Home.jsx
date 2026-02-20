import { Spinner } from "@heroui/react";
import { usePrayerTimes } from "../../hooks/prayerTimes";
import { parseGregorianDate, parseHijriDate } from "../../utils/util";
import { PrayerTimes } from "./PrayerTimes";

export const Home = () => {
  const { data: pt } = usePrayerTimes();

  if (!pt) {
    // TODO: add skeleton
    return <Spinner />;
  }

  return (
    <>
      <section className="w-full p-4 bg-white border border-gray-200 rounded-md flex flex-col">
        <span>{parseHijriDate(pt.date)}</span>
        <span>{parseGregorianDate(pt.date)}</span>
        <span>{pt.meta.timezone}</span>
      </section>
      <PrayerTimes timings={pt.timings}/>
      {/* <section>{JSON.stringify(pt, null, 2)}</section> */}
    </>
  );
};
export default Home;
