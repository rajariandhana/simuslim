import { useContext } from "react";
import { MinuteContext } from "../../context/timeContext";

function Clock() {
  const {time} = useContext(MinuteContext);

  return <h4 className=" font-medium text-3xl">{time}</h4>;
}

export default Clock;
