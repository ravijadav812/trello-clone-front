/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TaskCard from "./tasks";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialog from "./alert";
import axios from "axios";
import { BASE_URL } from "../constants";

const StageColumn = ({
  title,
  tasks = [],
  onDragLeave,
  onDragEnter,
  onDragEnd,
  onDragOver,
  onDrop,
  deleteStage,
  data,
}) => {
  const [allTasks, setAllTasks] = useState([]);
  const [add, setAdd] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDragStart = (evt, t) => {
    let element = evt.currentTarget;
    console.log(evt);
    console.log(element.textContent);
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", JSON.stringify(t));
    evt.dataTransfer.effectAllowed = "move";
  };

  const deleteThis = () => {
    deleteStage(data._id);
  };

  const loadTasks = async () => {
    try {
      const loadTasks = await axios.get(BASE_URL + `tasks/${data._id}`);
      console.log(loadTasks);
      if (loadTasks.status === 200) {
        setAllTasks(loadTasks.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Card
      elevation={1}
      sx={{
        width: "200px",
        minHeight: "fit-content",
        backgroundColor: "white",
      }}
      onDragLeave={(e) => onDragLeave(e)}
      onDragEnter={(e) => onDragEnter(e)}
      onDragEnd={(e) => onDragEnd(e)}
      onDragOver={(e) => {
        onDragOver(e);
        loadTasks();
      }}
      onDrop={(e) => {
        onDrop(e, false, data);
        loadTasks();
      }}
    >
      <CardHeader
        title={title}
        action={
          <IconButton
            aria-label="settings"
            color="error"
            onClick={() => setOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
        }
      />
      <CardContent>
        {allTasks.map((t, i) => {
          return (
            <TaskCard
              title={t.title}
              key={i}
              onDragEnd={onDragEnd}
              onDragStart={(e) => onDragStart(e, t)}
            />
          );
        })}
      </CardContent>
      <CardActions disableSpacing>
        {add ? (
          <NewTask
            setAllTasks={setAllTasks}
            allTasks={allTasks}
            setAdd={setAdd}
            stageId={data._id}
          />
        ) : (
          <Button variant="text" onClick={() => setAdd(true)}>
            + add a card
          </Button>
        )}
      </CardActions>
      <AlertDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        yes={deleteThis}
        no={handleClose}
      />
    </Card>
  );
};

export default StageColumn;

const NewTask = ({ setAllTasks, allTasks, setAdd, stageId }) => {
  const [title, setTitle] = useState("");

  const createNew = async () => {
    try {
      const newTask = await axios.post(BASE_URL + "tasks", {
        title: title,
        stageId: stageId,
      });
      if (newTask.status === 201) {
        setAllTasks([...allTasks, newTask.data]);
      }
    } catch (error) {}
  };
  return (
    <Fragment>
      <TextField value={title} onChange={(e) => setTitle(e.target.value)} />
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
    </Fragment>
  );
};
