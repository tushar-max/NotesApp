import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import MediaCard from "../Card/Card";
import Popup from "../Popup/Popup";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const cards = notes.map((note) => (
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
        <Popup data = {{_id:'',description:''}} new={true}/>
      </div>
    </>
  );
};

export default Home;
