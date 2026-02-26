import { Chip } from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import { timeToMinutes } from "../../utils/util";
import { MinuteContext } from "../../context/timeContext";

export default function Current({ current, next }) {
  const {time} = useContext(MinuteContext);

  const [color, setColor] = useState("primary");
  const [status, setStatus] = useState("Now");

  useEffect(() => {
    const nowMinutes = timeToMinutes(time);
    const currentMinutes = timeToMinutes(current.time);
    const nextMinutes = timeToMinutes(next.time);

    const diffFromCurrent = nowMinutes - currentMinutes;
    const diffToNext = nextMinutes - nowMinutes;

    if (diffFromCurrent >= 0 && diffFromCurrent <= 10) {
      setStatus("Just Now");
      setColor("primary");
    } else if (diffToNext > 0 && diffToNext <= 20) {
      setStatus("Almost Over");
      setColor("danger");
    } else {
      setStatus("Now");
      setColor("primary");
    }
  }, [time, current.time, next.time]);

  return (
    <>
      <Chip size="sm" color={`${color}`}>
        {status}
      </Chip>
    </>
  );
}
