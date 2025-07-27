// src/components/PWAStatus.js

import React, { useState, useEffect } from 'react';
import { registerSW, addConnectionListeners, isOffline, updateSW } from '../utils/serviceWorker';

/**
 * Componente para mostrar o status PWA e controles offline
 * Indica quando a aplicação está offline e permite forçar atualizações
 */
function PWAStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [swRegistered, setSwRegistered] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    // Registra o Service Worker
    registerSW(
      (registration) => {
        console.log('[PWA] Service Worker registrado com sucesso');
        setSwRegistered(true);
      },
      (registration) => {
        console.log('[PWA] Atualização disponível');
        setUpdateAvailable(true);
      }
    );

    // Adiciona listeners para mudanças de conexão
    addConnectionListeners(
      () => setIsOnline(true),
      () => setIsOnline(false)
    );

    // Mostra status inicial se estiver offline
    if (isOffline()) {
      setShowStatus(true);
    }
  }, []);

  const handleUpdate = () => {
    updateSW();
    window.location.reload();
  };

  const getStatusColor = () => {
    if (!isOnline) return '#f44336'; // Vermelho para offline
    if (updateAvailable) return '#FF9800'; // Laranja para atualização
    if (swRegistered) return '#4CAF50'; // Verde para online com PWA
    return '#2196F3'; // Azul padrão
  };

  const getStatusText = () => {
    if (!isOnline) return '📵 Offline';
    if (updateAvailable) return '🔄 Atualização';
    if (swRegistered) return '⚡ PWA Ativo';
    return '🌐 Online';
  };

  const getStatusMessage = () => {
    if (!isOnline) return 'Aplicação funcionando offline. Suas alterações serão salvas localmente.';
    if (updateAvailable) return 'Nova versão disponível. Clique para atualizar.';
    if (swRegistered) return 'Progressive Web App ativo. Funciona offline!';
    return 'Conectado à internet.';
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      zIndex: 1001,
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      border: '1px solid #ccc'
    }}>
      {/* Indicador de status */}
      <button
        onClick={() => setShowStatus(!showStatus)}
        style={{
          width: '100%',
          padding: '6px 10px',
          backgroundColor: getStatusColor(),
          color: 'white',
          border: 'none',
          borderRadius: showStatus ? '8px 8px 0 0' : '8px',
          cursor: 'pointer',
          fontSize: '11px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
        title={getStatusMessage()}
      >
        {getStatusText()}
        {updateAvailable && (
          <span style={{
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '50%',
            width: '6px',
            height: '6px',
            animation: 'pulse 2s infinite'
          }} />
        )}
      </button>

      {/* Painel de detalhes */}
      {showStatus && (
        <div style={{
          padding: '10px',
          minWidth: '200px',
          borderTop: '1px solid #eee'
        }}>
          <div style={{ marginBottom: '8px', fontSize: '10px', color: '#666' }}>
            <div><strong>Status da Aplicação:</strong></div>
            <div>• Conexão: {isOnline ? '🟢 Online' : '🔴 Offline'}</div>
            <div>• PWA: {swRegistered ? '🟢 Ativo' : '🟡 Carregando...'}</div>
            {updateAvailable && <div>• Atualização: 🟠 Disponível</div>}
          </div>

          {updateAvailable && (
            <button
              onClick={handleUpdate}
              style={{
                width: '100%',
                padding: '6px 8px',
                backgroundColor: '#FF9800',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '10px',
                marginBottom: '6px'
              }}
            >
              🔄 Atualizar Aplicação
            </button>
          )}

          <div style={{
            padding: '6px',
            backgroundColor: isOnline ? '#e8f5e8' : '#ffebee',
            borderRadius: '4px',
            fontSize: '9px',
            color: isOnline ? '#2e7d32' : '#c62828'
          }}>
            {getStatusMessage()}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default PWAStatus;
