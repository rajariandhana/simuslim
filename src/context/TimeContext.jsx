import { createContext, useEffect, useState } from "react";
import { getCurrentTimeHHMM } from "../utils/util";

export const MinuteContext = createContext();

export const MinuteProvider = ({ children }) => {
  const [time, setTime] = useState(getCurrentTimeHHMM());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTimeHHMM());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <MinuteContext.Provider value={{ time }}>
      {children}
    </MinuteContext.Provider>
  );
};