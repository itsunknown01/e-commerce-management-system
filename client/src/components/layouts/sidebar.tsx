import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { SidebarLinks } from "../../lib/utils";
import { Button } from "../ui/button";

export default function Sidebar() {
  const [active, setActive] = useState("/");
  const location = useLocation();
  const params = useParams();

  const pathname = location.pathname;

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <div className="h-screen w-60 shadow-xl py-6 text-center flex flex-col gap-y-10 px-3">
      <div className="flex text-center w-full justify-center">
        <Link
          to={"/"}
          className="text-5xl font-bold border-2 border-solid w-36 border-black"
        >
          ECMS
        </Link>
      </div>
      <div className="flex flex-col items-center gap-y-4 h-full w-full">
        {SidebarLinks.map((link) => (
          <Button
            className={`w-full hover:bg-[#4880FF] hover:opacity-75 hover:text-zinc-50 hover:no-underline ${
              active === `/${params.storeId}${link.href}` && "bg-[#4880FF] text-zinc-50"
            }`}
            variant="link"
            key={link.title}
            asChild
          >
            <Link
              to={`/${params.storeId}${link.href}`}
              className="no-underline flex justify-start items-center gap-x-4 w-full"
            >
              <link.icon className="h-4 w-4" />
              <span className="text-base">{link.title}</span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
