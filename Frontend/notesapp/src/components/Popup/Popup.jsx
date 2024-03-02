import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Editor from "../Editor/Editor";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Popup(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {!props.new && <OpenInNewIcon color='primary' className='position' onClick={handleClickOpen}/>}
      {props.new && <Button onClick={handleClickOpen}>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Button>}
      <Dialog open={open} onClose={handleClose}>
        <Editor description={props.data.description} id={props.data._id} email={props.data.email} />
      </Dialog>
    </React.Fragment>
  );
}
