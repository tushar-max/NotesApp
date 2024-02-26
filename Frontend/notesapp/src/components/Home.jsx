import React from "react";
import MediaCard from "./Card";
import "./Home.css";

const Home = () => {
    const cards = Array.from({ length: 5 }, (_, index) => (
        <MediaCard key={index} className="element" />
      ));
  return (
    // <div>
    //   <br />
    //   <div className="row">
    //     <MediaCard className="element" />
    //     <MediaCard className="element" />
    //     <MediaCard className="element" />
    //   </div>
    // </div>
    <div className="row container">{cards}</div>
  );
};

export default Home;
