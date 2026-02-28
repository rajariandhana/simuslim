import { Alert, Button } from "@heroui/react";
import UnderMaintenance from "../UnderMaintenance";

export default function Qibla() {
  return (
    <section className="w-full h-screen flex flex-col gap-6 items-center justify-center p-6">
      <s>
        Ya elah masa gatau kiblat rumah sendiri sih, lu pernah sholat apa kagak dah
      </s>
      <UnderMaintenance/>
    </section>
  );
}
