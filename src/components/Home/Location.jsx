import { Button } from "@heroui/react";
import {
  parseGregorianDate,
  parseHijriDate,
  parseTimezone,
} from "../../utils/util";
import { FaLocationDot } from "react-icons/fa6";

export default function Location({ date, timezone }) {
  const gregorian = parseGregorianDate(date);
  const hijri = parseHijriDate(date);

  const handleLocation = () => {
    console.log("TODO: handleLocation");
  };
  return (
    <section className="flex flex-col w-full text-center justify-center items-center">
      <Button
        variant="light"
        className="text-md font-semibold"
        startContent={<FaLocationDot />}
        onPress={handleLocation}
      >
        {parseTimezone(timezone)}
      </Button>
      <span className="text-tiny">
        {gregorian} | {hijri}
      </span>
    </section>
  );
}
