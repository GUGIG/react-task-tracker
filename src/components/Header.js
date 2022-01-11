import PropTypes from "prop-types";
import Button from "./Button"

const Header = ({ title, onAdd, isAddTask }) => {
    return (
        <header className="header">
            <h1>{ title }</h1>
            <Button
                color={isAddTask? "red" : "green"}
                text={isAddTask? "Close" : "Add"}
                onClick={onAdd}
            />
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
