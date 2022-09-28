import React, { Fragment, useState } from "react";
import Container from "@mui/material/Container";
import { data } from "../constants";
import StageColumn from "../components/column";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const MainComponent = () => {
  const [tasks, setTasks] = useState(data);
  const [add, setAdd] = useState(false);
  const onDragEnter = (evt) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };

  const onDragLeave = (evt) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };

  const onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };

  const onDrop = (evt, value, status) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let task = tasks;
    console.log("data", value);
    const updated = task.map((task) => {
      if (task.stage === status) {
        task.tasks = [...task.tasks, data];
      }
      return task;
    });
    console.log(updated);
    setTasks(updated);
  };

  const onDragEnd = (evt) => {
    evt.currentTarget.classList.remove("dragged");
  };

  return (
    <Container sx={{ width: "100%", minHeight: "500px", padding: 10 }}>
      <Grid container spacing={3} display="row" rowSpacing={1}>
        {tasks.map((m, i) => {
          return (
            <Grid item xs={2}>
              <StageColumn
                title={m.stage}
                tasks={m.tasks}
                key={i}
                onDragLeave={onDragLeave}
                onDragEnter={onDragEnter}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                onDrop={onDrop}
              />
            </Grid>
          );
        })}
        <Grid item xs={2}>
          {add ? (
            <AddNew addNewFun={setTasks} tasks={tasks} setAdd={setAdd} />
          ) : (
            <Button
              variant="text"
              onClick={() => {
                setAdd(true);
              }}
            >
              + Add new List
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainComponent;

const AddNew = ({ addNewFun, tasks, setAdd }) => {
  const [title, setTitle] = useState("");
  return (
    <Fragment>
      <TextField value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button
        variant="contained"
        onClick={() => {
          if (title !== "") {
            addNewFun([...tasks, { stage: title, tasks: [] }]);
            setAdd(false);
            setTitle("");
          }
        }}
      >
        Add
      </Button>
    </Fragment>
  );
};
