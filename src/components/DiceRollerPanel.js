// src/components/DiceRollerPanel.js
import React, { useRef } from 'react';
import DiceRoller from './DiceRoller';

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

  return (
    <div className="dice-roller-panel" ref={panelRef}>
      <div className="dice-roller-panel-header" onMouseDown={handleMouseDown}>
        <h3>Rolador de Dados</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="dice-roller-panel-content">
        <DiceRoller />
      </div>
    </div>
  );
}

export default DiceRollerPanel;
