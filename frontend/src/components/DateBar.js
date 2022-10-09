import React,{useState} from "react"
import ReactDOM from "react-dom";
import "../playerbar.css";
import PlayerDetails from "../routes/PlayerDetails";


export default function DateBar({date, count}) {
    function handleClick() {
        window.location.replace(`http://localhost:3000/Overzicht/${date}`);
      }
return(
<div className="playerBar" onClick={handleClick}>
    <h1 className={"name"}>{date} | {count}</h1>
</div>
)
}