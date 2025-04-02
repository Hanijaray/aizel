import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import "@fontsource/bricolage-grotesque"; // Regular
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import '@fontsource/caladea';
import '@fontsource/bricolage-grotesque'; // Defaults to 400 weight



const TaskForm = ({ fetchTasks, editTask, setEditTask }) => {
  const [taskData, setTaskData] = useState({
    employeeName: "",
    employeeID: "",
    definedDate: "",
    deadlineDate: "",
    category: "",
    subject: "",
    details: "",
    task: "Report Subject",
    state: "Pending",
  });

  // Load data for editing
  useEffect(() => {
    if (editTask) {
      setTaskData(editTask);
    } else {
      resetForm();
    }
  }, [editTask]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setTaskData({
      employeeName: "",
      employeeID: "",
      definedDate: "",
      deadlineDate: "",
      category: "",
      subject: "",
      details: "",
      task: "Report Subject",
      state: "Pending",
    });
    setEditTask(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskData.employeeName || !taskData.employeeID || !taskData.category || !taskData.subject) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    try {
      if (editTask) {
        await axios.put(`https://aizel-lyaq.onrender.com/tasks/update/${editTask._id}`, taskData);
        alert("✅ Task Updated Successfully!");
      } else {
        await axios.post("https://aizel-lyaq.onrender.com/tasks/add", taskData);
        alert("✅ Task Added Successfully!");
      }
      fetchTasks();
      resetForm();
    } catch (error) {
      console.error("❌ Error submitting task:", error.response?.data || error.message);
      alert("❌ Error submitting task. Please try again.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, border: "2px solid purple", borderRadius: 3, maxWidth: 300, mx: "auto", textAlign: "center", height: "90%" }}>
  <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "purple", fontFamily: '"Bricolage Grotesque", sans-serif' }}>
    {editTask ? "Edit Task" : "Add New Task"}
  </Typography>

  {/* Employee Name and ID */}
  <TextField
    fullWidth
    size="small"
    label="Employee Name"
    name="employeeName"
    value={taskData.employeeName}
    onChange={handleChange}
    sx={{ mb: 2, fontFamily: '"Bricolage Grotesque", sans-serif' }}
    required
  />
  
  <TextField
    fullWidth
    size="small"
    label="Employee ID"
    name="employeeID"
    value={taskData.employeeID}
    onChange={handleChange}
    sx={{ mb: 2, fontFamily: '"Bricolage Grotesque", sans-serif' }}
    required
  />

  {/* Date and Deadline Date */}
  <TextField
    fullWidth
    size="small"
    type="date"
    label="Enter Date"
    name="definedDate"
    value={taskData.definedDate}
    onChange={handleChange}
    sx={{ mb: 2, fontFamily: '"Bricolage Grotesque", sans-serif' }}
    InputLabelProps={{ shrink: true }}
  />

  <TextField
    fullWidth
    size="small"
    type="date"
    label="Enter Deadline Date"
    name="deadlineDate"
    value={taskData.deadlineDate}
    onChange={handleChange}
    sx={{ mb: 2, fontFamily: '"Bricolage Grotesque", sans-serif' }}
    InputLabelProps={{ shrink: true }}
  />

  {/* Category and Subject */}
  <TextField
    fullWidth
    size="small"
    label="Category"
    name="category"
    value={taskData.category}
    onChange={handleChange}
    sx={{ mb: 2, fontFamily: '"Bricolage Grotesque", sans-serif' }}
    required
  />

  <TextField
    fullWidth
    size="small"
    label="Subject"
    name="subject"
    value={taskData.subject}
    onChange={handleChange}
    sx={{ mb: 2, fontFamily: '"Bricolage Grotesque", sans-serif' }}
    required
  />

  {/* Details with 3 Rows */}
  <TextField
    fullWidth
    size="small"
    label="Details"
    name="details"
    value={taskData.details}
    onChange={handleChange}
    multiline
    rows={3}
    sx={{ mb: 2, fontFamily: '"Bricolage Grotesque", sans-serif' }}
  />

  {/* Add or Update Button */}
  <Box sx={{ display: 'flex', justifyContent: editTask ? 'space-between' : 'center', alignItems: 'center', gap: editTask ? 2 : 0 }}>
  <Button 
    type="submit" 
    variant="contained" 
    sx={{ 
      backgroundColor: "#eb06e8",
      color: "white",
      fontSize: '18px',
      fontWeight: 'bold',
      fontFamily: 'Caladea, serif',
      padding: '8px 36px',
      borderRadius: '8px'
    }}
  >
    <AddIcon sx={{ fontSize: "24px", mr: 1 }} />
    {editTask ? "Update" : "Add Task"}
  </Button>

  {editTask && (
    <Button 
      onClick={resetForm} 
      variant="contained" 
      sx={{ 
        backgroundColor: "#eb06e8",
        color: "white",
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily: 'Caladea, serif',
        padding: '8px 36px',
        borderRadius: '8px'
      }}
    >
      <CancelOutlinedIcon sx={{ fontSize: "24px", mr: 1 }} />
      Close
    </Button>
  )}
</Box>

    </Box>
  );
};

export default TaskForm;