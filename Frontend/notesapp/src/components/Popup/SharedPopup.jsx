import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Share from "@mui/icons-material/Share";
import { ButtonBase, TextField } from "@mui/material";
import axios from "axios";

export default function SharedPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEmailChange = (event) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(event.target.value);
    if (emailPattern.test(event.target.value)) {
        setIsValidEmail(true);
    }
    else{
        setIsValidEmail(false);
    }
  };

  const handleSubmit = async () => {
    if (email === localStorage.getItem("jwt-email")) {
      alert("You Can't share note to yourself");
    } else {
      const data = {
        id: props.data._id,
        sharedTo: email,
        sharedBy: localStorage.getItem("jwt-email"),
      };
      console.log(data);
      const response = await axios.post("http://localhost:3001/share",data);
      console.log(response.data);
    }
    setEmail("");
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
        <Share />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 4 }}>
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            value={email}
            onChange={handleEmailChange}
            error={!isValidEmail}
            helperText={!isValidEmail ? 'Invalid email format' : ''}
          />
        </Typography>
        <Button onClick={handleSubmit} disabled={!isValidEmail || email===''}>Submit</Button>
      </Popover>
    </div>
  );
}
