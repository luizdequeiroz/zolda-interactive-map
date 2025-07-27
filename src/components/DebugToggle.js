// src/components/DebugToggle.js

import React, { useState } from 'react';
import { getEnvironmentInfo, isProduction } from '../utils/environment';

/**
 * Componente discreto para habilitar modo debug em produção
 * Só aparece em produção e quando ativado via combinação de teclas
 */
function DebugToggle() {
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [keySequence, setKeySequence] = useState([]);
  const envInfo = getEnvironmentInfo();

  // Só renderiza em produção
  if (!isProduction()) {
    return null;
  }

  // Sequência de teclas para ativar debug: Ctrl+Shift+D+E+V
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      
      if (e.ctrlKey && e.shiftKey) {
        if (key === 'd') {
          setKeySequence(['d']);
        } else if (keySequence.length === 1 && keySequence[0] === 'd' && key === 'e') {
          setKeySequence(['d', 'e']);
        } else if (keySequence.length === 2 && keySequence[1] === 'e' && key === 'v') {
          // Ativou o modo debug
          const url = new URL(window.location);
          url.searchParams.set('debug', 'true');
          window.location.href = url.toString();
        } else {
          setKeySequence([]);
        }
      } else {
        setKeySequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence]);

  // Triple-click no canto para mostrar info
  const handleTripleClick = () => {
    setShowDebugInfo(!showDebugInfo);
  };

  return (
    <div
      onClick={handleTripleClick}
      style={{
        position: 'fixed',
        top: '5px',
        right: '5px',
        width: '10px',
        height: '10px',
        backgroundColor: 'transparent',
        zIndex: 999,
        cursor: 'pointer',
        opacity: showDebugInfo ? 0.7 : 0.1
      }}
      title="Triple-click para info de debug"
    >
      {showDebugInfo && (
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '0',
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '10px',
          minWidth: '200px',
          whiteSpace: 'nowrap'
        }}>
          <div><strong>Environment Info:</strong></div>
          <div>Mode: {envInfo.nodeEnv}</div>
          <div>Version: {envInfo.version}</div>
          <div>Debug: {envInfo.showDebug ? 'ON' : 'OFF'}</div>
          <div style={{ marginTop: '4px', color: '#ccc' }}>
            Enable debug: Ctrl+Shift+D+E+V
          </div>
          {!envInfo.showDebug && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const url = new URL(window.location);
                url.searchParams.set('debug', 'true');
                window.location.href = url.toString();
              }}
              style={{
                marginTop: '4px',
                padding: '2px 6px',
                fontSize: '9px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer'
              }}
            >
              Enable Debug
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default DebugToggle;
