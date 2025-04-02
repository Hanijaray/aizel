import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';
import './Popup.css';

const TaskManagement = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [showThirdPopup, setShowThirdPopup] = useState(false);
  const [showFourthPopup, setShowFourthPopup] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://aizel-lyaq.onrender.com/tasks");
      const today = new Date().toISOString().split('T')[0];
      const filteredTasks = response.data.filter(task => 
        (task.state === 'Pending' || task.state === 'New') && 
        task.definedDate.split('T')[0] === today
      );
      setTasks(filteredTasks);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
    }
  };

  const updateTaskState = async (taskId, state) => {
    try {
      await axios.put(`https://aizel-lyaq.onrender.com/tasks/${taskId}`, { state });
      fetchTasks();
      setShowSecondPopup(false);
      setShowThirdPopup(false);
      setShowFourthPopup(false);
    } catch (error) {
      console.error("❌ Error updating task state:", error);
    }
  };

  const calculateDaysRemaining = (deadlineDate) => {
    const today = new Date();
    const deadline = new Date(deadlineDate);
    const difference = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return difference > 0 ? difference : 0;
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="p-4 rounded-lg w-full bg-[#950f95]">
          <div className="flex justify-between items-center flex-wrap">
            <span className="text-sm font-semibold text-white">{task.subject}</span>
            <button
              className="bg-yellow-400 rounded-xl text-xs px-3 py-1 text-black"
              onClick={() => { setShowPopup(true); setSelectedTask(task); }}>
              New Task
            </button>
          </div>
          <p className="text-xs mt-1 text-white flex justify-between w-full">
            <span>Days remaining: {calculateDaysRemaining(task.deadlineDate)}</span>
            <span className="text-xs text-white">Date: {task.definedDate} | Deadline: {task.deadlineDate}</span>
          </p>
        </div>
      ))}

      {showPopup && selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-white p-3 rounded-lg shadow-lg w-85 max-w-full mx-4">
            <p className="text-black text-sm font-semibold flex mb-1">Category: {selectedTask.category}
              <RxCross2 className="ms-60" onClick={() => setShowPopup(false)} />
            </p>
            <hr className="text-gray-200" />
            <p className="text-black text-xs">{selectedTask.details}</p>
            <button
              className="mt-4 bg-[#ffb200] text-black px-3 py-2 rounded-lg w-full font-bold"
              onClick={() => {
                setShowPopup(false);
                setShowSecondPopup(true);
              }}>
              Update State
            </button>
          </div>
        </div>
      )}

      {showSecondPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-white p-4 rounded-lg shadow-lg w-88 max-w-full mx-4">
            <p className="text-black text-sm font-semibold mb-1 flex">Category: {selectedTask.category}
              <RxCross2 className="ms-60" onClick={() => setShowSecondPopup(false)} />
            </p>
            <hr className="text-gray-200" />
            <p className="text-black text-xs mt-3">{selectedTask.details}</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-[#ffb200] text-black px-3 py-2 rounded-lg w-1/2 mr-2 font-bold"
                onClick={() => {
                  updateTaskState(selectedTask._id, 'Completed');
                  setShowThirdPopup(true);
                }}>
                Completed
              </button>
              <button
                className="bg-[#e54d76] text-white px-3 py-2 rounded-lg w-1/2 font-bold"
                onClick={() => {
                  updateTaskState(selectedTask._id, 'Failed');
                  setShowFourthPopup(true);
                }}>
                Failed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;