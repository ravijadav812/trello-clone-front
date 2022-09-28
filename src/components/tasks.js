import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

const TaskCard = ({ title, onDragEnd, onDragStart }) => {
  return (
    <Card
      elevation={1}
      sx={{ marginBottom: "10px" }}
      draggable
      onDragStart={(e) => onDragStart(e)}
      onDragEnd={(e) => onDragEnd(e)}
    >
      <CardHeader
        title={title}
        titleTypographyProps={{ sx: { fontSize: "14px" } }}
        sx={{ padding: "5px" }}
      />
    </Card>
  );
};

export default TaskCard;
