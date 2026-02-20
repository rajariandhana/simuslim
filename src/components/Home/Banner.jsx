import { Card, CardFooter, CardHeader, Chip, Image } from "@heroui/react";
import { parseGregorianDate, parseHijriDate } from "../../utils/util";

const skyImages = {
  morning: "https://heroui.com/images/card-example-1.jpeg",
  afternoon: "https://heroui.com/images/card-example-2.jpeg",
  evening: "https://heroui.com/images/card-example-3.jpeg",
  night: "https://heroui.com/images/card-example-4.jpeg",
};

// Get the current hour and return the appropriate sky image
function getSkyImage() {
  const currentHour = new Date().getHours(); // Get current hour (0-23)

  if (currentHour >= 6 && currentHour < 9) {
    return skyImages.morning; // Morning image
  } else if (currentHour >= 9 && currentHour < 17) {
    return skyImages.afternoon; // Afternoon image
  } else if (currentHour >= 17 && currentHour < 20) {
    return skyImages.evening; // Evening image
  } else {
    return skyImages.night; // Night image
  }
}

export function Banner({ date, timezone }) {
  const gregorian = parseGregorianDate(date);
  const hijri = parseHijriDate(date);
  function parseTimezone(timezone) {
    const splitted = timezone.split("/");
    return `${splitted[1]}, ${splitted[0]}`;
  }
  return (
    <Card className="col-span-12 sm:col-span-4 w-full h-40">
      <CardHeader className="absolute z-20 top-0 right-0 flex justify-between text-white">
        <div className="flex items-center gap-1">
          <span>Isya</span>
          <Chip size="sm" color="primary">
            Now
          </Chip>
        </div>
        <h4 className=" font-medium text-large">XX:XX</h4>
      </CardHeader>
      <CardFooter className="absolute z-20 bottom-0 flex-col items-start!">
        <p className="text-tiny text-white/80 uppercase font-bold">
          {gregorian} | {hijri}
        </p>
        <h4 className="text-white font-medium text-large">
          {parseTimezone(timezone)}
        </h4>
      </CardFooter>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src={getSkyImage()}
      />
      <div className="absolute bg-black z-10 w-full h-full opacity-20"></div>
    </Card>
  );
}
