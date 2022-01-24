import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Home from "./Pages/Home";
import Footer from "./components/Footer"
import About from "./Pages/About";
import Version from "./Pages/Version";
import Author from "./Pages/Author";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  const [tasks, setTasks] = useState([]);
  const JSON_URL = useRef("http://localhost:8000");

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(`${JSON_URL.current}/tasks`);
    const data = await response.json();
    return data;
  }

  const fetchTask = async (id) => {
    const response = await fetch(`${JSON_URL.current}/tasks/${id}`);
    const data = await response.json();
    return data;
  }

  const [isAddTask, setIsAddTask] = useState(false);

  const addTask = async (task) => {
    const response = await fetch(`${JSON_URL.current}/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    });

    const data = await response.json();
    setTasks([...tasks, data]);
  }

  const deleteTask = async (id) => {
    await fetch(`${JSON_URL.current}/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter(task => task.id !== id));
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const toggledTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const response = await fetch(`${JSON_URL.current}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(toggledTask),
    });

    const resultTask = await response.json();

    setTasks(tasks.map((task) => task.id === resultTask.id ? resultTask : task));
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Header
          title="Task Tracker"
          onAdd={() => setIsAddTask(!isAddTask)}
          isAddTask={isAddTask}
        />
        <Routes>
          <Route path="/" element={
            <>
              {isAddTask && <AddTask onAddTask={addTask} />}
              {
                tasks.length > 0 ?
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggleReminder={toggleReminder}
                  />
                  :
                  "No tasks to show"
              }
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<><h1>404 Page Not Found</h1></>} />
        </Routes>
        <Footer />
          <Routes>
            <Route path="/" element={<Home props={homeProps} />} />
            <Route path="/about" element={<About />}>
              <Route path="version" element={<Version />} />
              <Route path="author" element={<Author />} />
            </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
