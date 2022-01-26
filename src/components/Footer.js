import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const pathnameData = {
  "/": {
    link: "/about",
    linkText: "About",
  },
  "/about": {
    link: "",
    linkText: "Home",
  },
};

const Footer = () => {
  const { pathname } = useLocation();

  const link = useMemo(() => pathnameData[pathname].link, [pathname]);
  const linkText = useMemo(() => pathnameData[pathname].linkText, [pathname]);

  return (
    <footer>
      <p>Copyright &copy; 2022</p>
      <Link to={link}>{linkText}</Link>
    </footer>
  );
};

export default Footer;
