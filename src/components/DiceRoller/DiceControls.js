import React, { useState } from 'react';

function DiceControls({ rollDice, resetDice }) {
  const [rolledDices, setRolledDices] = useState(false)

  const roll = (notation) => {
    rollDice(notation);
    setRolledDices(true);
  }

  const clear = () => {
    resetDice();
    setRolledDices(false);
  }

  return (
    <div className="dice-controls">
      {rolledDices && <button onClick={clear}>Limpar</button>}
      <button className="dice-button d4" onClick={() => roll("1d4")}></button>
      <button className="dice-button d6" onClick={() => roll("1d6")}></button>
      <button className="dice-button d8" onClick={() => roll("1d8")}></button>
      <button className="dice-button d10" onClick={() => roll("1d10")}></button>
      <button className="dice-button d12" onClick={() => roll("1d12")}></button>
      <button className="dice-button d20" onClick={() => roll("1d20")}></button>
    </div>
  );
}

export default DiceControls;
