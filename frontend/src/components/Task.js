import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";
import { Container, Grid } from "@mui/material";
import Header from "./Navbarmain";

const Task = () => {
  const [editTask, setEditTask] = useState(null);

  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        disableGutters
        sx={{ width: '100%', marginTop: '20px' }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={2} alignItems="flex-start">
            {/* Pass editTask and setEditTask to both components */}
            <Grid item xs={12} md={4}>
              <TaskForm fetchTasks={() => {}} editTask={editTask} setEditTask={setEditTask} />
            </Grid>

            <Grid item xs={12} md={7.5}>
              <TaskTable fetchTasks={() => {}} onEdit={setEditTask} />
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default Task;
