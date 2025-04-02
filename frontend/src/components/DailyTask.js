import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import manimg from "../assets/worker.png";
import Header from './Header';
import Nav from './Nav';
import './Popup.css';
import { calculateDaysRemaining } from '../utils/Dateutils';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [confirmState, setConfirmState] = useState(null);
  const [showAllTasks, setShowAllTasks] = useState(false);
  
  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://aizel-lyaq.onrender.com/tasks");
      if (response.status === 200) {
        setTasks(response.data);
      } else {
        console.error("❌ Error fetching tasks: Invalid response status");
      }
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const isOutdated = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  const updateTaskState = async (taskId, newState) => {
    try {
      const response = await axios.put(`https://aizel-lyaq.onrender.com/tasks/update/${taskId}`, { state: newState });
      if (response.status === 200) {
        console.log(`✅ Task updated to ${newState}`);
        fetchTasks(); // Refresh tasks
        setShowConfirmPopup(false); // Close confirmation
      }
    } catch (error) {
      console.error("❌ Error updating task state:", error);
    }
  };
  

  const handleClick = (task) => {
    setSelectedTask(task);
  };

  const closePopup = () => {
    setSelectedTask(null);
  };

  const handleStateUpdate = (task, state) => {
    setSelectedTask(task);
    setConfirmState(state);
    setShowConfirmPopup(true);
  };
  
  const confirmStateUpdate = async () => {
    if (!selectedTask) return;
    try {
      await axios.put(`https://aizel-lyaq.onrender.com/tasks/update/${selectedTask._id}`, { state: confirmState });
      console.log(`✅ Task state updated to ${confirmState}`);
      fetchTasks();
      setShowConfirmPopup(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('❌ Error updating task state:', error);
    }
  };
  


  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Header />
      </div>

      <div className="flex-grow overflow-y-auto mt-[56px] sm:mt-16 bg-white px-4 sm:px-16 pb-20 sm:pb-0">
        <div className="flex flex-col items-center sm:flex-row justify-between p-2 pb-0 sm:p-4 w-full">
          <div className="flex items-center space-x-4">
            <img src={manimg} className="w-16 h-16 rounded-full object-cover border" alt="Profile" />
            <div>
              <h2 className="text-lg font-bold">Welcome Back!</h2>
              <p className="text-gray-600">Jonathan Patterson</p>
            </div>
          </div>
          <button className="bg-[#800080] text-white px-5 py-2 rounded-full flex items-center text-sm font-semibold">
            VIEW PROFILE <FaUserCircle className="ml-2" />
          </button>
        </div>

        <div className="flex justify-between items-center text-gray-700 mt-4">
          <div className="flex items-center space-x-2">
            <MdLocationOn className="text-[#800080]" />
            <p>123 Anywhere Street, Any City, Live Location</p>
          </div>
          <p>Login: 9:30 PM</p>
        </div>

        <div className="flex items-center mt-4">
          <h3 className="text-xl font-bold">DAILY TASK</h3>
          <div className="flex-1 border-t-2 border-purple-700 ml-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <TaskSection
            title="New Task"
            tasks={tasks.filter(task => task.state === 'Pending')}
            color="bg-yellow-400"
            nextState="On Progress"
          />

          <TaskSection
            title="On Progress"
            tasks={tasks.filter(task => task.state === 'On Progress')}
            color="bg-blue-400"
            onTaskClick={setSelectedTask}
            nextState={(task) => isOutdated(task.deadlineDate) ? 'Failed' : 'Completed'}
          />

          

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-center mb-4">Updated State</h3>
            {(showAllTasks ? tasks : tasks.slice(0, 2)).filter(task => ['Completed', 'Failed', 'Outdated'].includes(task.state)).map(task => (
              <TaskCard
                key={task._id}
                task={task}
                label={task.state}
                color={task.state === 'Completed' ? 'bg-green-400' : task.state === 'Failed' ? 'bg-red-400' : 'bg-gray-400'}
              />
            ))}
            {!showAllTasks && (
              <button className="mt-4 w-full bg-yellow-400 text-black py-3 rounded-lg font-bold" onClick={() => setShowAllTasks(true)}>
                VIEW TASK HISTORY
              </button>
            )}
          </div>
          <Nav />
        </div>
      </div>

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
              <button className="bg-[#45a834] text-white px-3 py-2 rounded-lg w-1/2 mr-2 font-bold" onClick={() => handleStateUpdate(selectedTask, 'Completed')}>Completed</button>
              <button className="bg-[#e54d76] text-white px-3 py-2 rounded-lg w-1/2 font-bold" onClick={() => handleStateUpdate(selectedTask, 'Failed')}> Failed</button>
            </div>
          </div>
        </div>
      )}
      {showConfirmPopup && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
      <h3 className="text-xl font-semibold text-center">Are you sure this Task has been</h3>
      <p className="text-2xl font-bold text-center text-black">{confirmState}?</p>
      <div className="flex justify-around mt-6">
        <button
          onClick={confirmStateUpdate}
          className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold"
        >
          COMPLETED
        </button>
        <button
          onClick={() => setShowConfirmPopup(false)}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg font-bold"
        >
          CANCEL
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

// TaskSection Component
const TaskSection = ({ title, tasks, color, updateTaskState, nextState, onTaskClick }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-center mb-4">{title}</h3>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            label={title}
            color={color}
            onClick={() => {
              if (title === 'New Task') {
                updateTaskState(task._id, typeof nextState === 'function' ? nextState(task) : nextState);
              } else if (title === 'On Progress' && onTaskClick) {
                onTaskClick(task); // Open Popup for On Progress tasks
              }
            }}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks available</p>
      )}
    </div>
  );
  

// TaskCard Component
const TaskCard = ({ task, label, color, onClick }) => (
  <div className="bg-[#800080] text-white p-4 rounded-lg relative mb-4" onClick={onClick}>
    <p className="text-lg font-semibold">{task.subject}</p>
    <p>Days remaining: {calculateDaysRemaining(task.deadlineDate)}</p>
    <p>Date: {task.definedDate || 'N/A'} | Deadline: {task.deadlineDate || 'N/A'}</p>
    <button className={`${color} text-black px-4 py-1 rounded-full absolute top-2 right-2`}>{label}</button>
  </div>
);
