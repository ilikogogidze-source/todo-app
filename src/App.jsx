import { useState } from "react";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks([...tasks, { id: Date.now(), name: trimmed, completed: false }]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };


  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Left Column — Task List */}
          <div className="flex-1">
            <h2 className="text-sm font-medium text-gray-500 mb-3">Task List</h2>
            <div className="border border-gray-200 rounded-xl p-3 min-h-[200px] flex flex-col gap-2">
              {tasks.length === 0 ? (
                <p className="text-sm text-gray-400 text-center mt-6">
                  No tasks yet. Add one!
                </p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                  >
                    {}
                    <div className="flex items-center gap-3 flex-1 overflow-hidden">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                      />
                      <span 
                        className={`text-sm break-words cursor-pointer ${
                          task.completed ? "text-gray-400 line-through" : "text-gray-800"
                        }`}
                        onClick={() => toggleTask(task.id)} 
                      >
                        {task.name}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="ml-2 text-gray-300 hover:text-red-500 transition-colors duration-150 flex-shrink-0"
                      title="Delete task"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {}
          <div className="flex-1">
            <h2 className="text-sm font-medium text-gray-500 mb-3">Add new task</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter task name..."
                maxLength={120}
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
              />
              <button
                onClick={addTask}
                className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 active:scale-95 transition-all duration-150"
              >
                Add
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Press Enter or click Add</p>
          </div>

        </div> </div>
    </div>
  );
}
