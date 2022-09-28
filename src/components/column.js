import React, { Fragment, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TaskCard from "./tasks";
import TextField from "@mui/material/TextField";

const StageColumn = ({
  title,
  tasks = [],
  onDragLeave,
  onDragEnter,
  onDragEnd,
  onDragOver,
  onDrop,
}) => {
  const [allTasks, setAllTasks] = useState(tasks);
  const [add, setAdd] = useState(false);

  const onDragStart = (evt) => {
    let element = evt.currentTarget;
    console.log(evt);
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };

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
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, false, title)}
    >
      <CardHeader title={title} />
      <CardContent>
        {allTasks.map((t, i) => {
          return (
            <TaskCard
              title={t}
              key={i}
              onDragEnd={onDragEnd}
              onDragStart={onDragStart}
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
          />
        ) : (
          <Button variant="text" onClick={() => setAdd(true)}>
            + add a card
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default StageColumn;

const NewTask = ({ setAllTasks, allTasks, setAdd }) => {
  const [title, setTitle] = useState("");
  return (
    <Fragment>
      <TextField value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button
        variant="contained"
        onClick={() => {
          if (title !== "") {
            setAllTasks([...allTasks, title]);
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
