import { useEffect, useState } from "react";
import { getCurrentTimeHHMM } from "../../utils/util";

function Clock() {
  const [time, setTime] = useState(getCurrentTimeHHMM());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTimeHHMM());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <h4 className=" font-medium text-3xl">{time}</h4>;
}

export default Clock;
