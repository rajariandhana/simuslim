import { FaMosque } from "react-icons/fa";

import { Image, Link } from "@heroui/react";

export default function Logo({ logo = false }) {
  return (
    <Link href={"/"} className="flex items-center ml-3 gap-2">
      {/* <Image src="/logo.png" alt="Logo" width={20} height={20} /> */}
      {logo && <FaMosque size={28} />}
      <h1 className={`font-semibold text-emerald-500 text-2xl`}>SIMUSLIM</h1>
    </Link>
  );
}
