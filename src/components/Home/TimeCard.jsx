import { Card, CardBody } from "@heroui/react";

import {
  BsSunrise,
  BsSun,
  BsSunset,
  BsMoon,
  BsMoonStars,
  BsCloudSun,
} from "react-icons/bs";

const icon_prayer = {
  Fajr: BsMoon,
  Sunrise: BsSunrise,
  Dhuhr: BsSun,
  Asr: BsCloudSun,
  Maghrib: BsSunset,
  Isha: BsMoonStars,
};

export function TimeCard({ label, time, tag }) {
  const icon_size = 18;
  const Icon = icon_prayer[label];
  return (
    <Card
      shadow="sm"
      className="border border-white"
    >
      <CardBody className="flex-row items-center gap-3 justify-between">
        <div className="flex items-center gap-2">
          {Icon ? <Icon size={icon_size} /> : null}
          <span className="font-semibold">{label}</span>
          {tag ?? null}
        </div>
        <span className="text-neutral-500">{time}</span>
      </CardBody>
    </Card>
  );
}
