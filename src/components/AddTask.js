import { useContext, useState } from "react";
import { UserContext } from "../Contexts/Contexts";

const AddTask = ({ onAddTask }) => {
    const [text, setText] = useState("");
    const [day, setDay] = useState("");
    const [reminder, setReminder] = useState(false);
    const { user: { name } } = useContext(UserContext);

    const onSubmit = (e) => {
        e.preventDefault();

        if(!text) {
            alert("please write a task before submitting");
            return;
        }

        onAddTask(name, { text, day, reminder, });

        setText("");
        setDay("");
        setReminder(false);
    }

    return (
        <div className="add-task-form-container">
            <div>let's add {name}'s task</div>
            <form
                className={`add-form`}
                onSubmit={onSubmit}
            >
                <div className={`form-control`}>
                    <label>Task</label>
                    <input
                        type="text"
                        placeholder="Add Task"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className={`form-control`}>
                    <label>Day & Time</label>
                    <input
                        type="text"
                        placeholder="Add Task"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                    />
                </div>
                <div className={`form-control form-control-check`}>
                    <label>Set Reminder</label>
                    <input
                        type="checkbox"
                        value={reminder}
                        onChange={(e) => setReminder(e.currentTarget.checked)}
                    />
                </div>

                <input
                    type="submit"
                    value="Save Task"
                    className={`btn btn-block`}
                />
            </form>
        </div>
    )
}

export default AddTask
