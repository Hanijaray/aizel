import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Print, Search, CalendarMonth, Share, Edit } from "@mui/icons-material";
import axios from "axios";
import moment from "moment";
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const TaskTable = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const dateInputRef = useRef(null);
  const [editTask, setEditTask] = useState(null);

  const handleEdit = (task) => {
    setEditTask(task); // Pass data to form for editing
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
    }
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = search === "" || task.employeeName.toLowerCase().includes(search.toLowerCase()) || task.employeeID.toString().includes(search);
    const matchesMonth = month === "" || moment(task.definedDate).format("MM") === month;
    const matchesDate = selectedDate === null || moment(task.definedDate).isSame(moment(selectedDate), 'day');

    return matchesSearch && matchesMonth && matchesDate;
  });

  const handleDateButtonClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
  };

  const handleViewHistory = () => {
    fetchTasks(); // Fetch all tasks without filters
    setSearch("");
    setMonth("");
    setSelectedDate(null);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Updates every second
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", maxWidth: "24000px" }}>
        <Typography variant="h6" sx={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>Assigned Task</Typography>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Typography 
            sx={{ fontSize: "14px", fontFamily: "'Bricolage Grotesque', sans-serif", color: "black" }}
          >
            {currentTime.toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false
            })}
          </Typography>
          <IconButton size="small" sx={{ backgroundColor: "purple", color: "white", borderRadius: "5px", padding: "5px 8px" }}>
            <Share fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ backgroundColor: "purple", color: "white", borderRadius: "5px", padding: "5px 8px" }}>
            <Print fontSize="small" />
          </IconButton>
        </div>
      </div>
      <Paper sx={{ padding: 1, mt: 2, width: "100%", margin: "auto", borderRadius: "8px", border: "2px solid purple" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px", fontFamily: "Caladea, serif" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ position: "relative" }}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                variant="outlined"
                placeholder="Search by Name or ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
                sx={{ width: "200px", background: "white", borderRadius: "10px", "& fieldset": { borderRadius: "10px" } }}
              />
              </Grid>
              <Grid item xs={1} sm={0} md={0}>
              <IconButton size="small" sx={{ backgroundColor: "black", color: "white", borderRadius: "10px", padding: "5px", position: "absolute", right: "-30px", top: "50%", transform: "translateY(-50%)" }}>
                <Search fontSize="small" />
              </IconButton>
              </Grid>
            </div>
          </div>
          <Button variant="contained" onClick={handleViewHistory} sx={{ backgroundColor: "purple", fontSize: "16px", padding: "8px 28px", borderRadius: "5px", fontWeight: "bold", fontFamily: "Caladea, serif", border: "1px solid black" }}>
            VIEW HISTORY
          </Button>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              displayEmpty
              size="small"
              sx={{ backgroundColor: "#FFC107", fontSize: "18px", padding: "2px 22px", borderRadius: "10px", fontWeight: "bold", fontFamily: "Caladea, serif", border: "1px solid black" }}
            >
              <MenuItem value="">Month</MenuItem>
              {[...Array(12)].map((_, index) => (
                <MenuItem key={index} value={String(index + 1).padStart(2, '0')}>
                  {moment().month(index).format("MMMM")}
                </MenuItem>
              ))}
            </Select>
            <Button
                          variant="outlined"
                          size="small"
                          style={{ borderRadius: "9px", backgroundColor: "orange",padding: "4px 22px", color: "black", fontSize: 20, fontWeight: "bold", textTransform: "capitalize", border: "1px solid", fontFamily: "caladea" }}
                          endIcon={<CalendarMonthIcon style={{ fontSize: "30px" }} />}
                          fullWidth
                          onClick={handleDateButtonClick}
                        >
                          Date
                          <input
                            type="date"
                            ref={dateInputRef}
                            style={{ display: "flex", width: "0px", height: "0px", backgroundColor: "orange", border: "none" }}
                            onChange={handleDateChange}
                          />
                        </Button>
          </div>
        </div>
        <TableContainer component={Paper} sx={{ mt: 1, maxHeight: "80vh", overflowY: "auto", borderRadius: "5px" }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: "purple" }}>
              <TableRow>
                {[
                  "Name & ID",
                  "Date & Time",
                  "Date",
                  "Deadline",
                  "Category",
                  "Subject",
                  "Task",
                  "State",
                  "Edit",
                ].map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "13px",
                      color: "white",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task, index) => (
                <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
                  <TableCell sx={{ fontSize: "12px", textAlign: "center" }}>
                    <Typography sx={{ fontWeight: "bold", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {task.employeeName}
                    </Typography>
                    <Typography sx={{ fontSize: "10px", color: "gray", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {task.employeeID}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", textAlign: "center", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {new Date(task.definedDate).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", textAlign: "center", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {task.definedDate}
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", textAlign: "center", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {task.deadlineDate}
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", textAlign: "center", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {task.category}
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", textAlign: "center", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {task.subject}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "12px", textAlign: "center", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {task.details}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                  <Typography
  sx={{
    backgroundColor: (() => {
      switch (task.state) {
        case "Completed":
          return "Purple";
        case "Failed":
          return "red";
        case "On Progress":
          return "#FF9A9A";
        case "Outdated":
          return "gray";
        case "Pending":
          return "orange";
        default:
          return "black";
      }
    })(),
    color: "white",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "10px",
    fontWeight: "bold",
  }}
>
  {task.state}
</Typography>

                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                  <IconButton
      size="small"
      onClick={() => onEdit(task)}
      sx={{
        backgroundColor: "#FFC107", // Yellow color
        color: "white",
        borderRadius: '8px',
        '&:hover': {
          backgroundColor: "#333333", // Black color on hover
        }
      }}
    >
      <SendIcon fontSize="small" />
    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default TaskTable;
