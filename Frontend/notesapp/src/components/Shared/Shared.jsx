import axios from "axios";
import React, { useEffect, useState } from "react";
import MediaCard from "../Card/Card";

const Shared = () => {
  const [sharedData, setSharedData] = React.useState([]);
  const [sharedContacts, setSharedContacts] = useState([]);
  const getNoteData = async (id) => {
    const url = `https://notesapp-2ev2.onrender.com/api/${id}`;
    const data = await axios.get(url);
    return data.data;
  };
  const cards = sharedData.map((note,index) => (
    <>
      <div className="width" key={index}>
      <p>Shared by:- {sharedContacts[index].sharedBy}</p>
        <MediaCard
          color="neutral"
          orientation="horizontal"
          size="lg"
          variant="soft"
          className="element"
          data={note}
        />
      </div>
    </>
  ));

  useEffect(() => {
    const fetchSharedData = async () => {
      try {
        const url = `https://notesapp-2ev2.onrender.com/share/getAll/${localStorage.getItem(
          "jwt-email"
        )}`;
        const response = await axios.get(url);
        setSharedContacts(response.data);
        const promises = response.data.map((element) =>
          getNoteData(element.id)
        );
        const resultant = await Promise.all(promises);
        console.log(resultant);
        setSharedData(resultant);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSharedData();
  }, []);

  return (
    <div>
      <div>{cards}</div>
    </div>
  );
};

export default Shared;
