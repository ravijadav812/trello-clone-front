import React, { Fragment, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { BASE_URL } from "../constants";
import StageColumn from "../components/column";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const MainComponent = () => {
  const [tasks, setTasks] = useState([]);
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

  const onDrop = async (evt, value, status) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = JSON.parse(evt.dataTransfer.getData("text/plain"));
    console.log("data", value, data.title, status);
    try {
      const updateTask = await axios.put(BASE_URL + `tasks/${data._id}`, {
        title: data.title,
        stageId: status._id,
      });
      if (updateTask.status === 200) {
        fetchStages();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDragEnd = (evt) => {
    evt.currentTarget.classList.remove("dragged");
  };

  useEffect(() => {
    fetchStages();
  }, []);

  const fetchStages = async () => {
    try {
      const all = await axios.get(BASE_URL + "stage");
      if (all.status === 200) {
        setTasks(all.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStage = async (id) => {
    try {
      const deleteStage = await axios.delete(BASE_URL + `stage/${id}`);
      if (deleteStage.status === 200) {
        setTasks(tasks.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container sx={{ width: "100%", minHeight: "500px", padding: 10 }}>
      <Grid container spacing={3} display="row" rowSpacing={1}>
        {tasks.map((m, i) => {
          return (
            <Grid item xs={3}>
              <StageColumn
                data={m}
                title={m.title}
                tasks={m.tasks}
                key={`stage${i}`}
                onDragLeave={onDragLeave}
                onDragEnter={onDragEnter}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                onDrop={onDrop}
                deleteStage={deleteStage}
              />
            </Grid>
          );
        })}
        <Grid item xs={3}>
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

  const createNew = async () => {
    try {
      const newStage = await axios.post(BASE_URL + "stage", { title: title });
      if (newStage.status === 201) {
        addNewFun([...tasks, newStage.data]);
      }
    } catch (error) {}
  };

  return (
    <Fragment>
      <TextField value={title} onChange={(e) => setTitle(e.target.value)} />
      <Container>
        <Button
          variant="contained"
          onClick={() => {
            if (title !== "") {
              createNew();
              setAdd(false);
              setTitle("");
            }
          }}
        >
          Add
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            setAdd(false);
          }}
        >
          X
        </Button>
      </Container>
    </Fragment>
  );
};
