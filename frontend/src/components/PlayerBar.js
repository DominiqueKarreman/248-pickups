import React,{useState} from "react"
import ReactDOM from "react-dom";
import "../playerbar.css";
import PlayerDetails from "../routes/PlayerDetails";


export default function PlayerBar({first_name, last_name, player_id}) {
    function handleClick() {
        window.location.replace(`http://localhost:3000/Spelers/${player_id}`);
      }
return(
<div className="playerBar" onClick={handleClick}>
    <h1 className={"name"}>{first_name} {last_name}</h1>
</div>
)
}