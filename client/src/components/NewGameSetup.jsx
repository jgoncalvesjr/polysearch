import React from "react";
//import DifficultyButton from "./DifficultyButton";
//import "./DifficultyButton.scss";
import NewGameBackBoard from "./NewGameBackBoard";
export default function NewGameSetup() {
    /*const dificultyButtonsArray = [{caption: "Easy", selected: true}, {caption: "Medium", selected: false},
    {caption: "Hard", selected: false}, {caption: "Expert", selected: false}, 
    {caption: "Custom", selected: false}].map(el => {
    return <DifficultyButton key={el.caption} caption={el.caption} selected={el.selected} />
    });      
    console.log(dificultyButtonsArray);  
    */
    return (
      <NewGameBackBoard />
    );
}