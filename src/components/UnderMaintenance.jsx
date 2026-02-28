import { Alert, Button } from "@heroui/react";
import { Link } from "react-router";

export default function UnderMaintenance() {
  const description = () => {
    return (
      <p>
        Oops, this page is under maintenance, please come back later... or maybe
        never since I'm too <s>lazy</s> busy to finish it.
      </p>
    );
  };
  return (
    <div className="flex flex-col items-end justify-center gap-4">
      <Alert
        color="warning"
        description={description()}
        title="Under Maintenance"
      />
    </div>
  );
}
