interface FooterProps {
  setActiveSection: (section: string) => void;
  setIsAuthenticated: (value: boolean) => void;
}

function Footer({ setActiveSection, setIsAuthenticated }: FooterProps) {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {new Date().getFullYear()} WorldWinds{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            // Bypass authentication by setting it to true.
            setIsAuthenticated(true);
            setActiveSection("Home");
          }}
        >
          Home
        </a>
      </p>
    </footer>
  );
}

export default Footer;
