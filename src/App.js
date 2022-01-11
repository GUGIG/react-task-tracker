import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchData();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/tasks");
    const data = await response.json();
    return data;
  }

  const [isAddTask, setIsAddTask] = useState(false);

  const addTask = (task) => {
    const latestId = tasks[tasks.length - 1].id;
    const newTask = {...task, id: latestId + 1};
    setTasks([...tasks, newTask]);
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8000/tasks/${id}`, {method: "DELETE"});
    setTasks(tasks.filter(task => task.id !== id));
  }

  const toggleReminder = (id) => {
   setTasks(tasks.map(task => 
      task.id === id? {...task, reminder: !task.reminder} : task
    ));
  }

  return (
    <div className="container">
      <Header
        title="Task Tracker"
        onAdd={() => setIsAddTask(!isAddTask) }
        isAddTask={isAddTask}
      />
      {isAddTask && <AddTask onAddTask={addTask} />}
      {
        tasks.length > 0?
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onToggleReminder={toggleReminder}
          />
        :
          "No tasks to show"
      }
    </div>
  );
}

export default App;
