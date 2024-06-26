import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import MediaCard from "../Card/Card";
import Popup from "../Popup/Popup";
import { jwtDecode } from "jwt-decode";

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

  const isLoggedIn = ()=>{
    return localStorage.getItem("jwt-token")!==null;
  }

  const getEmail = ()=>{
    if (isLoggedIn()) {
      const token = localStorage.getItem("jwt-token");
      const decoded = jwtDecode(token);
      localStorage.setItem("jwt-email",decoded.email);
      localStorage.setItem("jwt-name",decoded.name);
      let date = new Date();
      if (decoded.exp*1000<date.getTime()) {
        alert("Login session expired.\n Please Login again");
        localStorage.clear();
      }      
      return decoded.email;
    }
    else{
      return null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://notesapp-2ev2.onrender.com/api/getAll/${getEmail()}`);
        // console.log(getEmail());
        // console.log(response.data);
        setNotes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {notes.length>0 &&<div className="row container">{cards}</div>}
      {isLoggedIn() && notes.length===0 && <h1 className="container">No Notes Present.</h1>}
      {!isLoggedIn() && notes.length===0 && <h1 className="container">Please Login First.</h1>}
      {isLoggedIn() && <div className="bottom-right">
        <Popup data = {{_id:'',description:''}} new={true}/>
      </div>}
    </>
  );
};

export default Home;
