import React, { useState, useEffect } from "react";
import "../playerbar.css";
import PlayerBar from "../components/PlayerBar";
export default function OverzichtDetails({ date }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);

  date = date.replaceAll("/", "-");
  console.log(date);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/overzicht/" + date)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        setData(data);
      });
  }, []);
  const players = data.map((player) => {
    if (
      player.first_name.toLowerCase().includes(search) ||
      player.last_name.toLowerCase().includes(search)
    ) {
      return (
        <PlayerBar
          first_name={player.first_name}
          last_name={player.last_name}
          player_id={player.id}
        />
      );
      
    } else {
      return null;
    }
  });
  return (
    <div id={"playersPage"}>
        <input
          onChange={(e) => {
              setSearch(e.target.value);
          }}
          placeholder={"Zoek Speler"}
          type={"search"}
          className={"search"}
        />

             
<h1 style={{"margin-top": "-5vh", "text-align": "right", "margin-right": "10vw", "font-size":"1.5rem"}}>{date}</h1>
<h1 style={{"margin-top": "-5vh", "text-align": "left", "margin-left": "10vw", "font-size":"1.5rem"}}>Begeleider: Mats Swiers</h1>
    
      <div className={"playerdiv"}>
        {players}
      </div>
    </div>
  );
}
