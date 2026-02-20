import { Spinner } from "@heroui/react";
import { usePrayerTimes } from "../../hooks/prayerTimes";

export const Home = () => {
  const { data: pt } = usePrayerTimes();

  return (
    <>
      <section className="w-full p-4 bg-white border border-gray-200 rounded-md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        necessitatibus! Amet esse cupiditate saepe tenetur possimus qui ab?
        Mollitia, aut.
      </section>
      <section className="flex flex-col">
        {pt && pt.timings ? (
          <>
            {Object.entries(pt.timings).map(([key, value]) => (
              <span key={key}>
                {key}-{value}
              </span>
            ))}
          </>
        ) : (
          <Spinner />
        )}
      </section>
    </>
  );
};
export default Home;
