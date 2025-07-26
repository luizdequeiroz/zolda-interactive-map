// src/components/PersistenceControl.js

import React, { useState, useEffect } from 'react';

/**
 * Componente para controlar a persistência do estado do mapa
 * Permite salvar, carregar e limpar dados manualmente
 */
function PersistenceControl({ 
  saveCurrentState, 
  clearSavedState, 
  getSavedStateInfo,
  loadInitialState 
}) {
  const [stateInfo, setStateInfo] = useState({
    hasData: false,
    lastSaved: null,
    markersCount: 0,
    pinsCount: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  // Atualiza informações do estado salvo
  const updateStateInfo = () => {
    const info = getSavedStateInfo();
    setStateInfo(info);
  };

  useEffect(() => {
    updateStateInfo();
    // Atualiza as informações a cada 2 segundos
    const interval = setInterval(updateStateInfo, 2000);
    return () => clearInterval(interval);
  }, [getSavedStateInfo]);

  const handleSave = () => {
    const success = saveCurrentState();
    if (success) {
      alert('Estado do mapa salvo com sucesso!');
      updateStateInfo();
    } else {
      alert('Erro ao salvar o estado do mapa.');
    }
  };

  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os dados salvos? Esta ação não pode ser desfeita.')) {
      const success = clearSavedState();
      if (success) {
        alert('Dados salvos limpos com sucesso!');
        updateStateInfo();
      } else {
        alert('Erro ao limpar os dados salvos.');
      }
    }
  };

  const handleLoad = () => {
    if (window.confirm('Carregar dados salvos? Isso substituirá o estado atual do mapa.')) {
      const success = loadInitialState();
      if (success) {
        alert('Dados carregados com sucesso!');
      } else {
        alert('Nenhum dado salvo encontrado.');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      zIndex: 1001,
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      border: '1px solid #ccc'
    }}>
      {/* Botão para mostrar/ocultar painel */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          width: '100%',
          padding: '8px 12px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: isVisible ? '8px 8px 0 0' : '8px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
        title={`${stateInfo.markersCount} marcadores, ${stateInfo.pinsCount} pinos salvos`}
      >
        💾 Cache {stateInfo.hasData && `(${stateInfo.markersCount + stateInfo.pinsCount})`}
      </button>

      {/* Painel de controles */}
      {isVisible && (
        <div style={{
          padding: '12px',
          minWidth: '250px',
          borderTop: '1px solid #eee'
        }}>
          {/* Informações do estado */}
          <div style={{ marginBottom: '12px', fontSize: '11px', color: '#666' }}>
            <div><strong>Estado Atual:</strong></div>
            <div>• Marcadores: {stateInfo.markersCount}</div>
            <div>• Pinos: {stateInfo.pinsCount}</div>
            <div>• Último salvamento: {formatDate(stateInfo.lastSaved)}</div>
          </div>

          {/* Botões de controle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button
              onClick={handleSave}
              style={{
                padding: '6px 12px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px'
              }}
              title="Salva o estado atual do mapa"
            >
              💾 Salvar Estado
            </button>

            <button
              onClick={handleLoad}
              disabled={!stateInfo.hasData}
              style={{
                padding: '6px 12px',
                backgroundColor: stateInfo.hasData ? '#FF9800' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: stateInfo.hasData ? 'pointer' : 'not-allowed',
                fontSize: '11px'
              }}
              title="Carrega o estado salvo (substitui o atual)"
            >
              📂 Carregar Estado
            </button>

            <button
              onClick={handleClear}
              disabled={!stateInfo.hasData}
              style={{
                padding: '6px 12px',
                backgroundColor: stateInfo.hasData ? '#f44336' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: stateInfo.hasData ? 'pointer' : 'not-allowed',
                fontSize: '11px'
              }}
              title="Remove todos os dados salvos"
            >
              🗑️ Limpar Cache
            </button>
          </div>

          {/* Aviso sobre salvamento automático */}
          <div style={{
            marginTop: '8px',
            padding: '6px',
            backgroundColor: '#e3f2fd',
            borderRadius: '4px',
            fontSize: '10px',
            color: '#1565c0'
          }}>
            ℹ️ O estado é salvo automaticamente após mudanças
          </div>
        </div>
      )}
    </div>
  );
}

export default PersistenceControl;
