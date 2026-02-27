import { Chip } from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import { timeToMinutes } from "../../utils/util";
import { MinuteContext } from "../../context/TimeContext.jsx";

export default function Current({ current, next }) {
  const { time } = useContext(MinuteContext);

  const [color, setColor] = useState("success");
  const [status, setStatus] = useState("Now");

  useEffect(() => {
    const nowMinutes = timeToMinutes(time);
    const currentMinutes = timeToMinutes(current.time);
    const nextMinutes = timeToMinutes(next.time);

    const diffFromCurrent = nowMinutes - currentMinutes;
    const diffToNext = nextMinutes - nowMinutes;

    if (diffFromCurrent >= 0 && diffFromCurrent <= 10) {
      setStatus("Just Now");
      setColor("success");
    } else if (diffToNext > 0 && diffToNext <= 20) {
      setStatus("Almost Over");
      setColor("danger");
    } else {
      setStatus("Now");
      setColor("success");
    }
  }, [time, current.time, next.time]);
  
  // TODO: maybe just move it into the TimeCard
  return (
    <>
      {status !== "Now" ? (
        <Chip size="md" color={`${color}`} variant="solid">
          {status}
        </Chip>
      ) : null}
    </>
  );
}
