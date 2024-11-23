import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = async (updatedTask) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${editingTask._id}`,
        updatedTask
      );
      setTasks(
        tasks.map((task) =>
          task._id === editingTask._id ? response.data : task
        )
      );
      setEditingTask(null); // Clear editing state after update
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Task List
        </h2>
        {editingTask ? (
          <TaskForm
            initialTask={editingTask}
            buttonText="Update Task"
            onSubmit={handleEditTask}
          />
        ) : (
          <TaskForm onSubmit={handleAddTask} />
        )}
        <ul className="mt-8 space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-gray-50 shadow-sm p-4 rounded-lg flex flex-col gap-2"
            >
              <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setEditingTask(task)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:ring-yellow-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:ring-red-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
