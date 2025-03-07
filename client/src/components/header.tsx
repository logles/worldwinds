import Nav from "./nav";
import logo from "../assets/logo.png";

interface HeaderProps {
  setActiveSection: (section: string) => void;
}

function Header({ setActiveSection }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header__title">
        <img src={logo} alt="Logo" className="header__logo" /> WorldWinds
      </h1>
      <Nav setActiveSection={setActiveSection} />
    </header>
  );
}

export default Header;
