import { Spinner } from "@heroui/react";
import { usePrayerTimes } from "../../hooks/prayerTimes";
import { PrayerTimes } from "./PrayerTimes";
import { Banner } from "./Banner";
import { parseGregorianDate, parseHijriDate, parseTimezone } from "../../utils/util";

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

  const gregorian = parseGregorianDate(pt.date);
  const hijri = parseHijriDate(pt.date);

  return (
    <>
      <div className="flex flex-col w-full -mb-4">
        <p className="text-tiny">
          {gregorian} | {hijri}
        </p>
        <h4 className="">
          {parseTimezone(pt.meta.timezone)}
        </h4>
      </div>
      <Banner date={pt.date} timezone={pt.meta.timezone} timings={pt.timings} />
      <PrayerTimes timings={pt.timings} />
      {/* <section>{JSON.stringify(pt, null, 2)}</section> */}
    </>
  );
};
export default Home;
