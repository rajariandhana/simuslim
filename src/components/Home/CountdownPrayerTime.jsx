import { useEffect, useState } from "react";

export default function CountdownPrayerTime({ target }) {
  const calculateTimeLeft = () => {
    const now = new Date();

    const [targetHours, targetMinutes] = target.split(":").map(Number);

    const targetDate = new Date();
    targetDate.setHours(targetHours, targetMinutes, 0, 0);

    if (targetDate <= now) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const difference = targetDate - now;

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <>
      {timeLeft.hours ? <>{timeLeft.hours} hour </> : null} {timeLeft.minutes}{" "}
      minutes
      {/* {String(timeLeft.hours).padStart(2, "0")}: */}
      {/* {String(timeLeft.minutes).padStart(2, "0")} */}
    </>
  );
}
