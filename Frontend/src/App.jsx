import TaskList from './Components/TaskList';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-8">
      <div className="max-w-4xl w-full  rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          To-Do List
        </h1>
        <TaskList />
      </div>
    </div>
  );
};

export default App;
