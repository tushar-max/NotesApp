import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MediaCard from "../Card/Card";

const Home = () => {
  const temp = [{_id: '65db3ef8f17f8a1bf2d46fc2', name: 'Tushar Awasthi', description: 'Testing 1234', __v: 0}, {_id: '65dcb93a9d86f441beb5a780', name: 'What is Lorem Ipsum?', description: 'Lorem Ipsum is simply dummy text of the printing a…ldus PageMaker including versions of Lorem Ipsum.', __v: 0}];
  const [notes, setNotes] = useState([]);
  const cards = notes.map(note => (
    <div className="width" key={note.id}>
      <MediaCard
        color="neutral"
        orientation="horizontal"
        size="lg"
        variant="soft"
        className="element"
        data={note}
      />
    </div>
  ));
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api");
        setNotes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="row container">{cards}</div>
      <div className="bottom-right">
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      </div>
    </>
  );
};

export default Home;
