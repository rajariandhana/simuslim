import { LuMoonStar } from "react-icons/lu";

const Logo = ({ logo = false }) => {
  return (
    <span className="flex gap-2 items-center text-primary font-semibold">
      {logo && <LuMoonStar size={24} />}
      SIMUS
    </span>
  );
};

export default Logo;
