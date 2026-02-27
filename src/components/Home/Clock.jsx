import { useContext } from "react";
import { MinuteContext } from "../../context/TimeContext.jsx";

function Clock() {
  const {time} = useContext(MinuteContext);

  return <h4 className=" font-medium text-4xl">{time}</h4>;
}

export default Clock;
