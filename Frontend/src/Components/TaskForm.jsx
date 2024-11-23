import { useState } from 'react';
import PropTypes from 'prop-types';

const TaskForm = ({ onSubmit, initialTask, buttonText }) => {
  const [task, setTask] = useState({
    title: initialTask.title || '',
    description: initialTask.description || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title) {
      alert('Task title is required');
      return;
    }
    onSubmit(task);
    setTask({ title: '', description: '' }); // Reset form after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
        {buttonText === 'Add Task' ? 'Create New Task' : 'Edit Task'}
      </h2>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Task Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Enter Task Title"
          value={task.title}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Task Description
        </label>
        <textarea
          name="description"
          placeholder="Enter Task Description"
          value={task.description}
          onChange={handleChange}
          rows="4"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
        ></textarea>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialTask: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  buttonText: PropTypes.string,
};

TaskForm.defaultProps = {
  initialTask: { title: '', description: '' },
  buttonText: 'Add Task',
};

export default TaskForm;
