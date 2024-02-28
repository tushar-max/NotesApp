import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Card.css'

export default function MediaCard(props) {
  const handleClick = ()=>{
    // console.log("Clicked");
    alert("Clicked");
  }
  return (
    <div onClick={handleClick} className={props.className}>
    <Card sx={{}}>
      <CardContent className='text'>
        <Typography gutterBottom variant="a" color={'black'} component="div">
          {props.data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* {props.data.description} */}
          {props.data.description.length > 100 ? props.data.description.slice(0, 100) + '...' : props.data.description}
          {props.data.description.length<100 && <><br/><br/></>}
          
        </Typography>
      </CardContent>
      {/* <CardActions>
        <OpenWithIcon color='primary' className='position' onClick={handleClick}/>
        
      </CardActions> */}
    </Card>
    </div>
  );
}