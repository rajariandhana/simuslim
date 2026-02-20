import { Navbar, NavbarBrand } from "@heroui/react";
import Logo from "./Logo";
import { Link, useLocation } from "react-router";

const Nav = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-20 w-full">
      <Navbar isBordered>
        <NavbarBrand className="justify-center">
          <Logo logo/>
        </NavbarBrand>
      </Navbar>
    </header>
  );
};
export default Nav;
