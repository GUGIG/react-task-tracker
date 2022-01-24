import AddTask from "../components/AddTask"
import Tasks from "../components/Tasks"

const Home = ({ props }) => {
    return (
        <>
            {props.isAddTask && <AddTask onAddTask={props.addTask} />}
            {
                props.tasks.length > 0 ?
                    <Tasks
                        tasks={props.tasks}
                        onDelete={props.deleteTask}
                        onToggleReminder={props.toggleReminder}
                    />
                    :
                    "No tasks to show"
            }
        </>
    )
}

export default Home
