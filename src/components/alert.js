import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

export default function AlertDialog({
  handleClickOpen,
  open,
  handleClose,
  yes,
  no,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          you want to delete it?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={no}>No</Button>
        <Button onClick={yes} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
