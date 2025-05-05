import { Link } from "react-router";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

export default function Header() {
  return (
    <header className="bg-gray-800 py-5">
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="w-64">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>
        <NavMenu />
      </div>
    </header>
  );
}
