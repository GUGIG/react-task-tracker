import { Link, Outlet } from "react-router-dom";

const About = () => {
    return (
        <div className="about">
            <div className="nav">
                <Link to="version">version</Link>
                <Link to="author">author</Link>
            </div>
            <Outlet />
        </div>
    )
}

export default About
