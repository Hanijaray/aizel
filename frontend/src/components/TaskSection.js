import React, { useState } from 'react';
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';
import './Popup.css';

const TaskSection = ({ title, tasks, color, updateTaskState, nextState }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleClick = (task) => {
    setSelectedTask(task);
  };

  const closePopup = () => {
    setSelectedTask(null);
  };

  const handleStateUpdate = async (task, state) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${task._id}`, { state });
      updateTaskState();
      closePopup();
    } catch (error) {
      console.error('Error updating task state:', error);
    }
  };

  return (
    <div className="p-4 rounded-lg w-full" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center flex-wrap">
        <span className="text-sm font-semibold text-white">{title}</span>
      </div>
      {tasks.map((task) => (
        <div key={task._id} className="bg-white p-3 rounded-lg my-2" onClick={() => handleClick(task)}>
          <p className="text-black font-semibold">{task.subject}</p>
          <p className="text-xs">Days remaining: {task.daysRemaining}</p>
        </div>
      ))}

      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-white p-4 rounded-lg shadow-lg w-85 max-w-full mx-4">
            <div className="flex justify-between">
              <p className="text-black font-semibold">Category: {selectedTask.category}</p>
              <RxCross2 className="cursor-pointer" onClick={closePopup} />
            </div>
            <hr className="text-gray-200" />
            <p className="text-black text-xs mt-3">{selectedTask.details}</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-[#45a834] text-white px-3 py-2 rounded-lg w-1/2 mr-2 font-bold"
                onClick={() => handleStateUpdate(selectedTask, 'Completed')}
              >
                Mark as Completed
              </button>
              <button
                className="bg-[#e54d76] text-white px-3 py-2 rounded-lg w-1/2 font-bold"
                onClick={() => handleStateUpdate(selectedTask, 'Failed')}
              >
                Mark as Failed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSection;
