import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

const Footer = () => {
    const { pathname } = useLocation();
    const [link, setLink] = useState("/about");
    const [linkText, setLinkText] = useState("About")

    useEffect(() => {
        if (pathname === "/") {
            setLink("/about");
            setLinkText("About")
        } else if (pathname === "/about") {
            setLink("/")
            setLinkText("Home");
        } else {
            console.log("pathname >> ", pathname)
        }
    }, [pathname]);

    return (
        <footer>
            <p>Copyright &copy; 2022</p>
            <Link to={link}>{linkText}</Link>
        </footer>
    )
}

export default Footer
