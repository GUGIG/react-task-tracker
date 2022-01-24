import { useContext } from "react"
import { FaTimes } from "react-icons/fa"
import { UserContext } from "../Contexts/Contexts";

const Task = ({ task, onDelete, onToggleReminder }) => {
    const { user: { name }, toggleUser } = useContext(UserContext);
    
    return (
        <div
            className={`
                task
                ${task.reminder? "reminder" : ""}
            `}
        >
            <h3
                onDoubleClick={() => {onToggleReminder(name, task.id)}}
            >
                {task.text} - {name}'s task
                <FaTimes
                    style={{color: "red", cursor: "pointer"}}
                    onClick={() => onDelete(name, task.id)}
                />
            </h3>
            <p onClick={toggleUser}>{task.day}</p>
        </div>
    )
}

export default Task