// Define the type for the props
interface NavProps {
  setActiveSection: (section: string) => void; // Function that takes a string and returns nothing
}

function Nav({ setActiveSection }: NavProps) {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <button
            className="nav__button"
            onClick={() => setActiveSection("Home")}
          >
            Home
          </button>
        </li>
        <li className="nav__item">
          <button
            className="nav__button"
            onClick={() => setActiveSection("bucketList")}
          >
            Bucket List
          </button>
        </li>
        <li className="nav__item">
          <button
            className="nav__button"
            onClick={() => setActiveSection("Login")}
          >
            Login
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
