import { useState } from "react";
import { dataAttributes } from "./dataAttributes";
import { Dice } from "./DiceBox";
import "./index.css";

// initialize the Dice Box outside of the component
Dice.init().then(() => {
  // clear dice on click anywhere on the screen
  document.addEventListener("mousedown", () => {
    const diceBoxCanvas = document.getElementById("dice-canvas");
    if (window.getComputedStyle(diceBoxCanvas).display !== "none") {
      Dice.hide().clear();
    }
  });
});

export default function DiceRoller() {
  const [attr, setAttr] = useState(dataAttributes);
  const [pendingRoll] = useState();

  // This method is triggered whenever dice are finished rolling
  Dice.onRollComplete = (results) => {
    console.log(results);

    const newState = { ...attr };

    if (pendingRoll === "all") {
      Object.keys(newState).forEach((attr, i) => {
        newState[attr].total = results[i].value;
      });
    } else {
      newState[pendingRoll].total = results[0].value;
    }
    setAttr(newState);
  };

  // trigger dice roll
  const rollDice = (notation) => {
    // trigger the dice roll
    Dice.show().roll(notation);
  };

  return (
    <div className="dice-roller">
      <button className="dice-button" onClick={() => rollDice("1d4")}>Roll d4</button>
      <button className="dice-button" onClick={() => rollDice("1d6")}>Roll d6</button>
      <button className="dice-button" onClick={() => rollDice("1d8")}>Roll d8</button>
      <button className="dice-button" onClick={() => rollDice("1d10")}>Roll d10</button>
      <button className="dice-button" onClick={() => rollDice("1d12")}>Roll d12</button>
      <button className="dice-button" onClick={() => rollDice("1d20")}>Roll d20</button>
    </div>
  );
}
