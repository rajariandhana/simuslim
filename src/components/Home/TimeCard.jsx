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
  Fajr: BsMoonStars,
  Sunrise: BsSunrise,
  Dhuhr: BsSun,
  Asr: BsCloudSun,
  Maghrib: BsSunset,
  Isha: BsMoon,
};

export function TimeCard({ label, time, is_active = false }) {
  const icon_size = 24;
  const Icon = icon_prayer[label];
  return (
    <Card
      shadow="sm"
      // className={`border-2 border-primary text-primary ${is_active ? "bg-primary !text-white" : ""}`}
    >
      <CardBody className="flex-row items-center gap-2">
        {Icon ? <Icon size={icon_size} /> : null}
        <div className="flex w-full justify-between items-center">
          <span className="text-lg">{label}</span>
          <span className="text-lg">{time}</span>
        </div>
      </CardBody>
    </Card>
  );
}
