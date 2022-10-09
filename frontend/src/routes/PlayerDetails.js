import React, { useState, useEffect } from "react";
import "../playerbar.css";

export default function PlayerDetails({ player_id }) {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch("http://127.0.0.1:5000/players/"+player_id).then((res) => res.json())
    .then((data) => {
      console.log(data, "data");
      setData(data)
    });
  }, []);
  return (
    <div>
        <div className="playerDiv">
      <h1 className={"playerId"}>Speler ID: #{player_id}</h1>
      <h1 className={"playerId"}>Voornaam: {data.first_name}</h1>
      <h1 className={"playerId"}>Achternaam: {data.last_name}</h1>
      <h1 className={"playerId"}>Telefoon nummer: {data.phone_number}</h1>
      <h1 className={"playerId"}>Adres: {data.address}</h1>
      <h1 className={"playerId"}>Speelt sinds: {data.first_presence}</h1>
      <h1 className={"playerId"}>Laatste verschijning: {data.last_presence}</h1>
      <h1 className={"playerId"}>Aantal verschijningen: {data.total_presence}</h1>

      </div>
    </div>
  );
}
