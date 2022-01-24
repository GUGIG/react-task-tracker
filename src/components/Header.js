import { useContext } from "react";
import PropTypes from "prop-types";
import Button from "./Button"
import { UserContext } from "../Contexts/Contexts";

const Header = ({ title, onAdd, isAddTask }) => {
    const { toggleUser } = useContext(UserContext)
    return (
        <header className="header">
            <h1>{ title }</h1>
            <div className="btns">
                <Button
                    color="cornflowerblue"
                    text="toggle user"
                    onClick={toggleUser}
                />
                <Button
                    color={isAddTask? "red" : "green"}
                    text={isAddTask? "Close" : "Add"}
                    onClick={onAdd}
                />
            </div>
        </header>
    );
};

Header.defaultProps = {
    title: "Task Tracker"
};

Header.propTypes = {
    title: PropTypes.string.isRequired
};

// usage => <.. style={ inlineStyle } />
// const inlineStyle = {
//     color: "white",
//     backgroundColor: "teal",
// };

export default Header;
