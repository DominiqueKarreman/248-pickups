import React from "react";
import PlayerBar from "../components/PlayerBar";
import "../playerbar.css";
import FlatList from "flatlist-react";
import { useState, useEffect } from "react";
export default function Spelers() {
    const [data, setData ] = useState([])
    
    const [search, setSearch ] = useState([])
    console.log(search)
  useEffect(() => {
    fetch("http://127.0.0.1:5000/players").then((res) => res.json())
    .then((data) => {
      console.log(data, "data");
      setData(data)
    });
  }, []);
    
  const players = data.map((player) => {
    if(player.first_name.toLowerCase().includes(search) || player.last_name.toLowerCase().includes(search)){
        return <PlayerBar first_name={player.first_name} last_name={player.last_name}  player_id={player.id} />;
    } else {
    return null
}});
    let dataSize = data.length
    let searchArray = []
    const searchPlayers = searchArray.map((player) => {
    return <PlayerBar first_name={player.first_name} last_name={player.last_name}  player_id={player.id} />;
    });

  return (
    <div id={"playersPage"}>
      <input onChange={(e) => {setSearch(e.target.value)}}placeholder={"Zoek speler"} type={"search"} className={"search"} />
        <h1 style={{"margin-top": "-5vh", "text-align": "right", "margin-right": "16vw", "font-size":"1.5rem"}}>{dataSize} spelers Totaal</h1>
      {/* <ul>
        <FlatList
          list={data}
          renderItem={({ item }) => <PlayerBar name={item.firstName} />}
          renderWhenEmpty={() => <div>List is empty!</div>}
          sortBy={["firstName", { key: "lastName", descending: true }]}
          groupBy={(person) => (person.info.age > 18 ? "Over 18" : "Under 18")}
        />
      </ul> */}
      <div className={"playerdiv"}>
        {players}
      </div>
    </div>
  );
}
