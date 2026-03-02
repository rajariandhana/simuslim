import Compass from "./Compass/Compass";
import QiblaCompass from "./Qibla/QiblaCompass";

export default function Temp() {

  return (
    <section className="flex flex-col items-center justify-center w-full h-screen">
      {/* <QiblaCompass/> */}
    <Compass/>
    </section>
  );
}