import React from 'react';

function DiceControls({ rollDice, resetDice }) {
  return (
    <div className="dice-controls">
      <button className="dice-button d4" onClick={() => rollDice("1d4")}></button>
      <button className="dice-button d6" onClick={() => rollDice("1d6")}></button>
      <button className="dice-button d8" onClick={() => rollDice("1d8")}></button>
      <button className="dice-button d10" onClick={() => rollDice("1d10")}></button>
      <button className="dice-button d12" onClick={() => rollDice("1d12")}></button>
      <button className="dice-button d20" onClick={() => rollDice("1d20")}></button>
      <button className="dice-button clear" onClick={resetDice}>Limpar</button>
    </div>
  );
}

export default DiceControls;
