import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./Card.css";
import { CardActions } from "@mui/material";
import Popup from "../Popup/Popup";

export default function MediaCard(props) {

  return (
    <div className={props.className}>
      <Card sx={{}}>
        <CardContent className="text">
          <Typography gutterBottom variant="a" color={"black"} component="div">
            {props.data.name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
          {props.data.description.length > 100 ? props.data.description.slice(0, 100) + '...' : props.data.description}
          {props.data.description.length<100 && <><br/><br/></>}
          
        </Typography> */}
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
        </CardActions>
      </Card>
    </div>
  );
}
