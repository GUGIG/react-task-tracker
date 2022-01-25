import Header from "./components/Header";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import About from "./Pages/About";
import Version from "./Pages/Version";
import Author from "./Pages/Author";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserContext } from "./Contexts/Contexts";
import Test from "./components/Test";

function App() {
  const [tasks, setTasks] = useState([]);
  const JSON_URL = useRef("http://localhost:8000");

  const fetchTasks = async (username) => {
    const response = await fetch(`${JSON_URL.current}/${username}`);
    const tasks = await response.json();
    return tasks;
  };
  const fetchTask = async (username, taskId) => {
    const response = await fetch(`${JSON_URL.current}/${username}/${taskId}`);
    const task = await response.json();
    return task;
  };
  const addTask = async (username, task) => {
    const response = await fetch(`${JSON_URL.current}/${username}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();
    setTasks([...tasks, data]);
  };
  const deleteTask = async (username, taskId) => {
    await fetch(`${JSON_URL.current}/${username}/${taskId}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  const toggleReminder = async (username, taskId) => {
    const taskToToggle = await fetchTask(username, taskId);
    const toggledTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder,
    };

    const response = await fetch(`${JSON_URL.current}/${username}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(toggledTask),
    });

    const resultTask = await response.json();

    setTasks(
      tasks.map((task) => (task.id === resultTask.id ? resultTask : task))
    );
  };

  const [isAddTask, setIsAddTask] = useState(false);

  const [userGlobalState, setUserGlobalState] = useState({
    name: "jaehun",
  });
  const toggleUserName = () => {
    if (userGlobalState.name === "jaehun") {
      setUserGlobalState({ ...userGlobalState, name: "cheolsu" });
    } else {
      setUserGlobalState({ ...userGlobalState, name: "jaehun" });
    }
  };
  const userContextValue = {
    user: userGlobalState,
    toggleUser: toggleUserName,
  };

  useEffect(() => {
    (async () => {
      const t = await fetchTasks(userGlobalState.name);
      setTasks(t);
    })();
  }, [userGlobalState]);

  const homeProps = {
    isAddTask: isAddTask,
    addTask: addTask,
    tasks: tasks,
    deleteTask: deleteTask,
    toggleReminder: toggleReminder,
  };

  return (
    <BrowserRouter>
      <div className="container">
        <UserContext.Provider value={userContextValue}>
          <Header
            title="Task Tracker"
            onAdd={() => setIsAddTask(!isAddTask)}
            isAddTask={isAddTask}
          />
          <Routes>
            <Route path="/" element={<Home props={homeProps} />} />
            <Route path="/about" element={<About />}>
              <Route path="version" element={<Version />} />
              <Route path="author" element={<Author />} />
            </Route>
            <Route path="*" element={<><h1>404 Page Not Found</h1></>} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
