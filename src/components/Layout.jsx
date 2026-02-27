import Nav from "./Nav";
import { Outlet } from "react-router";

const Layout = ({ nav }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-100">
      {/* {nav ?? <Nav />} */}
      <main className="flex flex-1 flex-col items-center w-full max-w-4xl gap-6">
        <Outlet />
      </main>
      {/* {footer ?? <Footer />} */}
    </div>
  );
};

export default Layout;
