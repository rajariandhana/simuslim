import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import prayerInstance from "../../libs/axios/prayerInstance";

export const Home = () => {
  const [location, setLocation] = useState(null);
  const [times, setTimes] = useState(null);
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }

  const fetchPrayerTimes = async () => {
    try {
      const today = new Date();

      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = today.getFullYear();

      const formattedDate = `${day}-${month}-${year}`;

      const response = await prayerInstance.get(`/timings/${formattedDate}?latitude=${location.latitude}&longitude=${location.longitude}`);
      console.log(response.data.data.timings);
      setTimes(response.data.data.timings);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getLocation();
  },[]);

  useEffect(()=>{
    if(!location || !location.latitude || !location.longitude) return;
    fetchPrayerTimes();
  }, [location]);
  return (
    <>
      {/* <Hero /> */}
      <section className="w-full p-4 bg-white border border-gray-200 rounded-md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        necessitatibus! Amet esse cupiditate saepe tenetur possimus qui ab?
        Mollitia, aut.
      </section>
      <section className="flex flex-col">
        <Button onPress={getLocation}>getLocation</Button>
        {location && location.latitude && location.longitude && (
          <>
            {location.latitude} - {location.longitude}
          </>
        )}
        <Button onPress={fetchPrayerTimes}>fetchtime</Button>
        {times ? 
        <>
          {Object.entries(times).map(([key,value]) => (
            <span key={key}>{key}-{value}</span>
          ))}
        </>:<></>}
      </section>
      {/* <BestProjects /> */}
      {/* <BestPhotos /> */}
    </>
  );
};
export default Home;
