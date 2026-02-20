import { Card, CardBody } from "@heroui/react";

export function TimeCard({ icon, label, time }) {
  return (
    <Card shadow="sm">
      <CardBody className="flex-row items-center gap-2">
        {icon ?? null}
        <div className="flex w-full justify-between items-center">
          <span>{label}</span>
          <span>{time}</span>
        </div>
      </CardBody>
    </Card>
  );
}
