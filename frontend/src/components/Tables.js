import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";

const Table = ({ searchTerm = "", selectedMonth = "Months", selectedDate = null }) => {
  const tableData = [
    { 
      id: "WORK001", 
      name: "John Doe", 
      date: new Date("2024-12-20"), 
      month: "December", 
      loginTime: "08:00 am", 
      logoutTime: "06:00 pm", 
      totalHrs: "9Hrs", 
      permission: "", 
      time: "", 
      reason: "", 
      state: "Present" 
    },
    { 
      id: "WORK002", 
      name: "Alban", 
      date: new Date("2024 -1-12"), 
      month: "January", 
      loginTime: "08:00 am", 
      logoutTime: "06:00 pm", 
      totalHrs: "9Hrs", 
      permission: "", 
      time: "", 
      reason: "", 
      state: "Absent" 
    },
    { 
      id: "WORK003", 
      name: "Ravi", 
      date: new Date("2025-2-25"), 
      month: "February", 
      loginTime: "08:00 am", 
      logoutTime: "04:00 pm", 
      totalHrs: "7Hrs", 
      permission: "2 Hour", 
      time: "4:00 to 6:00", 
      reason: "Sick", 
      state: "Permission" 
    },
    { 
      id: "WORK001", 
      name: "John Doe", 
      date: new Date("2024-12-20"), 
      month: "December", 
      loginTime: "08:00 am", 
      logoutTime: "06:00 pm", 
      totalHrs: "9Hrs", 
      permission: "", 
      time: "", 
      reason: "", 
      state: "Present" 
    },
    { 
      id: "WORK001", 
      name: "John Doe", 
      date: new Date("2024-12-20"), 
      month: "December", 
      loginTime: "08:00 am", 
      logoutTime: "06:00 pm", 
      totalHrs: "9Hrs", 
      permission: "", 
      time: "", 
      reason: "", 
      state: "Present" 
    },
    { 
      id: "WORK001", 
      name: "John Doe", 
      date: new Date("2024-12-20"), 
      month: "December", 
      loginTime: "08:00 am", 
      logoutTime: "06:00 pm", 
      totalHrs: "9Hrs", 
      permission: "", 
      time: "", 
      reason: "", 
      state: "Present" 
    },
    { 
      id: "WORK001", 
      name: "John Doe", 
      date: new Date("2024-12-20"), 
      month: "December", 
      loginTime: "08:00 am", 
      logoutTime: "06:00 pm", 
      totalHrs: "9Hrs", 
      permission: "", 
      time: "", 
      reason: "", 
      state: "Present" 
    },
    { 
      id: "WORK001", 
      name: "John Doe", 
      date: new Date("2024-12-20"), 
      month: "December", 
      loginTime: "08:00 am", 
      logoutTime: "06:00 pm", 
      totalHrs: "9Hrs", 
      permission: "", 
      time: "", 
      reason: "", 
      state: "Present" 
    },
   

  ];

  // Filter data based on search term, selected month, and selected date
  const filteredData = tableData.filter((row) => {
    const searchTermLower = searchTerm.toLowerCase();
    const rowName = row.name.toLowerCase();
    const rowId = row.id.toLowerCase();
    const rowMonth = row.month.toLowerCase();
    const selectedMonthLower = selectedMonth.toLowerCase();
    
    // Check if row matches search term (name or ID)
    const matchesSearch = rowName.includes(searchTermLower) || rowId.includes(searchTermLower);
    
    // Check if row matches selected month (or show all if "Months" is selected)
    const matchesMonth = selectedMonth === "Months" || rowMonth === selectedMonthLower;
    
    // Check if row matches selected date (if any date is selected)
    const matchesDate = !selectedDate || 
      row.date.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
    
    return matchesSearch && matchesMonth && matchesDate;
  });

  // Format date for display
  const formatDisplayDate = (date) => {
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Box sx={{ margin: "auto", mt: 2, borderRadius: 2 }}>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <MuiTable sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#950f95", borderRadius: 2 }}>
            <TableRow>
              <TableCell sx={{ color: "white", p: 2 }}>Name & ID</TableCell>
              <TableCell sx={{ color: "white", p: 2 }}>Date</TableCell>
              <TableCell sx={{ color: "white", p: 2 }}>Login Time</TableCell>
              <TableCell sx={{ color: "white", p: 2 }}>Logout Time</TableCell>
              <TableCell sx={{ color: "white", p: 2 }}>Total Hours</TableCell>
              <TableCell sx={{ color: "white", p: 2 }}>Permission</TableCell>
              <TableCell sx={{ color: "white", p: 2 }}>Reason</TableCell>
              <TableCell sx={{ color: "white", p: 2 }}>State</TableCell>
              <TableCell sx={{ color: "white", p: 2 }}>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <TableRow key={index} hover sx={{ backgroundColor: 'white' }}>
                  <TableCell sx={{ p: 1 }}>{row.name}<br /><Box component="span" sx={{ color: "text.secondary" }}>{row.id}</Box></TableCell>
                  <TableCell sx={{ p: 1 }}>{formatDisplayDate(row.date)}</TableCell>
                  <TableCell sx={{ p: 1 }}>{row.loginTime}</TableCell>
                  <TableCell sx={{ p: 1 }}>{row.logoutTime}</TableCell>
                  <TableCell sx={{ p: 1 }}>{row.totalHrs}</TableCell>
                  <TableCell sx={{ p: 1 }}>{row.permission}<br /><Box component="span" sx={{ color: "text.secondary" }}>{row.time}</Box></TableCell>
                  <TableCell sx={{ p: 1 }}>{row.reason}</TableCell>
                  <TableCell sx={{ p: 1 }}>
                    <Button
                      variant="contained"
                      sx={{
                        px: 2,
                        py: 1,
                        fontSize: '0.875rem',
                        borderRadius: 2,
                        minWidth: 90,
                        backgroundColor: 
                          row.state === "Permission" ? "#fbbf58" :
                          row.state === "Absent" ? "error.main" :
                          "#950f95",
                        color: row.state === "Permission" ? "text.primary" : "white",
                        '&:hover': {
                          backgroundColor: 
                            row.state === "Permission" ? "#b2893d" :
                            row.state === "Absent" ? "error.dark" :
                            "#6a0b6a"
                        }
                      }}
                    >
                      {row.state}
                    </Button>
                  </TableCell>
                  <TableCell sx={{ p: 1 }}>
                    <Button sx={{ backgroundColor: "#ffc107", p: 1, pl: 1.5, borderRadius: 1, minWidth: 40, '&:hover': { backgroundColor: "black" } }}>
                      <BiSolidRightArrow style={{ color: "white", fontSize: "1.25rem" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} sx={{ textAlign: "center", py: 4 }}>
                  No records found {
                    selectedMonth !== "Months" ? `for ${selectedMonth}` : 
                    selectedDate ? `on ${selectedDate.toLocaleDateString()}` : ""
                  }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Box>
  );
};

export default Table;