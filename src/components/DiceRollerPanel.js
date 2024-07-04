// src/components/DiceRollerPanel.js
import React, { useRef } from 'react';

function DiceRollerPanel({ onClose }) {
  const panelRef = useRef(null);

  const handleMouseDown = (e) => {
    const panel = panelRef.current;
    const shiftX = e.clientX - panel.getBoundingClientRect().left;
    const shiftY = e.clientY - panel.getBoundingClientRect().top;

    const moveAt = (pageX, pageY) => {
      panel.style.left = pageX - shiftX + 'px';
      panel.style.top = pageY - shiftY + 'px';
    };

    const onMouseMove = (e) => {
      moveAt(e.pageX, e.pageY);
    };

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.onmouseup = null;
    };
  };

  const rollDice = (diceType) => {
    const diceBox = window.Dice; // Ensure DiceBox is globally accessible
    diceBox.show().roll(diceType);
  };

  return (
    <div className="dice-roller-panel" ref={panelRef}>
      <div className="dice-roller-panel-header" onMouseDown={handleMouseDown}>
        <h3>Rolador de Dados</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="dice-roller-panel-content">
        <button onClick={() => rollDice("1d4")}>Roll d4</button>
        <button onClick={() => rollDice("1d6")}>Roll d6</button>
        <button onClick={() => rollDice("1d8")}>Roll d8</button>
        <button onClick={() => rollDice("1d10")}>Roll d10</button>
        <button onClick={() => rollDice("1d12")}>Roll d12</button>
        <button onClick={() => rollDice("1d20")}>Roll d20</button>
      </div>
    </div>
  );
}

export default DiceRollerPanel;
