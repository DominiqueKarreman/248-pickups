import React from "react";
import { useRef, useEffect, useState } from "react";
import reactDOM from "react-dom";
import "../index.css";
import "../returning.css";

export default function Returning() {
  const [players, setPlayers] = useState([]);
  const [sPlayer, setPlayer] = useState("");
  const [classB, setClassB] = useState("meldAan");
  const [message, setMessage] = useState("Meld je aan");

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  // fetch players from database
  useEffect(() => {
    fetch("http://127.0.0.1:5000/players")
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        setPlayers(data);
      });
  }, []);

  async function handleClick() {
    //get value from select
    let playerName = document.getElementById("dropdown");
    playerName = playerName.options[playerName.selectedIndex].value;
    console.log(playerName, "dasd");
    // check if player is already registered
    let data = {
      player_id: playerName,
      first_time: 0,
    };

    fetch("http://localhost:5000/presence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player_id: playerName,
        first_time: 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        setMessage(data.message);
        if (data.message === "Already added") {
          setClassB("alAangemeld");
        } else {
          setClassB("aangemeld");
        }
      });
    await timeout(1500);

    window.location.reload();
  }
  return (
    <div id={"returningDiv"}className="Returning">
      <h1>Returning</h1>
      <select
        onChange={(event) => setPlayer(event.target.value)}
        name="Players"
        id="dropdown"
      >
        <option value="0" disabled selected>
          Zoek je naam
        </option>

        {players.map((player) => {
          return (
            <option key={player.first_name} value={player.id}>
              {player.first_name}
            </option>
          );
        })}
      </select>

      <button className={classB} onClick={handleClick} id="meldAan">
        {message}
      </button>
    </div>
  );
}
