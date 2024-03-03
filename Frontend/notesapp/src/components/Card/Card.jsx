import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./Card.css";
import { CardActions } from "@mui/material";
import Popup from "../Popup/Popup";
import SharedPopover from "../Popup/SharedPopup";

export default function MediaCard(props) {
  return (
    <div className={props.className}>
      <Card sx={{}}>
        <CardContent className="text">
          <Typography variant="body2" color="text.secondary">
            {
              <div
                dangerouslySetInnerHTML={{ __html: props.data.description }}
              />
            }
          </Typography>
        </CardContent>
        <CardActions>
          <Popup data={props.data} />
          {localStorage.getItem("jwt-email")===props.data.email && <SharedPopover data={props.data}/>}
        </CardActions>
      </Card>
    </div>
  );
}
