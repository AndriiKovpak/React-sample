import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

export const NavbarItem: FC<{ title: string; path: string }> = ({ title, path }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <li
      className={currentPath == path ? "mx-4 cursor-pointer text-white" : "mx-4 cursor-pointer text-[#9099A3]"}
      onClick={() => router.push(path)}
    >
      {title}
    </li>
  );
};

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 grid min-h-[70px] w-full grid-cols-3 grid-rows-1 bg-[#0B0C10] ">
      <div className="flex items-center justify-start px-12">
        <Link href="/" passHref className="flex items-center">
          <img src="/LOGO.png" alt="Lobbymatic Logo" className="mr-2 h-8 w-auto" />
        </Link>
      </div>
      <ul className=" mx-auto flex list-none flex-row items-center">
        <NavbarItem title="Home" path="/" />
        <NavbarItem title="About Us" path="/about" />
        <NavbarItem title="Resources" path="/resources" />
        <NavbarItem title="Contact" path="/contact" />
      </ul>
      <ul className="mr-6 flex list-none flex-row items-center justify-end text-white">
        <NavbarItem title="Login" path="/auth/login" />
        <button className="h-32 w-32 rounded-full bg-[#a7acf266]">Start Now</button>
      </ul>
    </nav>
  );
};
