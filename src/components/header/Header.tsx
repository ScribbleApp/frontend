import { Link } from "react-router-dom";
import { Search, PenBox, UserCircle2 } from "lucide-react";

import { SearchBar } from "./SearchBar";
import { NavLink } from "../ui/NavLink";
import { Dropdown } from "../ui/Dropdown";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const isLogged = false;

  return (
    <header className="border-b border-neutral-500">
      <div className="flex h-16 items-center justify-between px-5">
        <div className="flex items-center space-x-10">
          <Link to={"/"} className="text-xl font-extrabold">
            scribble
          </Link>
          <SearchBar
            placeholder="search"
            icon={<Search size={20} className="text-neutral-500" />}
          />
        </div>
        {!isLogged ? (
          <nav className="flex items-center space-x-10">
            <NavLink to={"/"} intent={"secondary"} padding={"none"}>
              sign in
            </NavLink>
            <NavLink to={"/"}>sign up</NavLink>
          </nav>
        ) : (
          <nav className="flex items-center space-x-10">
            <NavLink
              to={"/"}
              intent={"secondary"}
              padding={"none"}
              className="flex items-center space-x-2"
            >
              <PenBox size={16} />
              <span>write</span>
            </NavLink>
            <Dropdown icon={<UserCircle2 size={32} />} />
          </nav>
        )}
      </div>
    </header>
  );
};