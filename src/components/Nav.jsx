import { Navbar, NavbarBrand } from "@heroui/react";
import Logo from "./Logo";

const Nav = () => {
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
