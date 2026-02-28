import { Link, useLocation } from "react-router";

import { FaRegClock } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa6";

const Nav = () => {
  const location = useLocation();
  const links = [
    {
      to: "/",
      label: "Today",
      icon: <FaRegClock size={20} />,
    },
    {
      to: "/qibla",
      label: "Qibla",
      icon: <FaRegCompass size={20} />,
    },
  ];
  return (
    <header className="sticky bottom-0 z-20 w-full h-16 bg-white border border-neutral-300 px-6 flex items-center justify-around">
      {links.map((link) => {
        let active = location.pathname === link.to;
        return (
          <Link
            key={link.to}
            to={link.to}
            className={`flex gap-1 items-center ${active ? "text-primary" : ""}`}
          >
            {link.icon} {link.label}
          </Link>
        );
      })}
    </header>
  );
};
export default Nav;
