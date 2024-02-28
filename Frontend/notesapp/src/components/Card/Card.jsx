import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Card.css'
import Editor from '../Editor/Editor';
import { useState } from 'react';

export default function MediaCard(props) {
  const handleClick = (id)=>{
    console.log(id);
  }
  return (
    <div onClick={()=>handleClick(props.data._id)} className={props.className}>
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
    {/* <Editor description={props.data.description}/> */}
    </div>
  );
}