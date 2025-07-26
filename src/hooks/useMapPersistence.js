// src/hooks/useMapPersistence.js

import { useEffect, useCallback } from 'react';
import { saveMapState, loadMapState, clearMapState, getMapStateInfo } from '../utils/persistence';

/**
 * Hook customizado para gerenciar a persistência do estado do mapa
 * Automatiza o salvamento e carregamento do estado
 */
export const useMapPersistence = (
  markers,
  pins,
  markerData,
  pinData,
  setMarkers,
  setPins,
  setMarkerData,
  setPinData
) => {
  
  /**
   * Carrega o estado inicial do mapa quando o componente é montado
   */
  const loadInitialState = useCallback(() => {
    const savedState = loadMapState();
    
    if (savedState.markers.length > 0 || savedState.pins.length > 0) {
      console.log('Carregando estado salvo do mapa...');
      
      setMarkers(savedState.markers);
      setPins(savedState.pins);
      setMarkerData(savedState.markerData);
      setPinData(savedState.pinData);
      
      return true; // Indica que dados foram carregados
    }
    
    return false; // Indica que não havia dados salvos
  }, [setMarkers, setPins, setMarkerData, setPinData]);

  /**
   * Salva o estado atual do mapa
   */
  const saveCurrentState = useCallback(() => {
    const currentMapData = {
      markers,
      pins,
      markerData,
      pinData,
      mapState: {
        center: null, // Pode ser expandido para incluir posição do mapa
        zoom: null    // Pode ser expandido para incluir zoom do mapa
      }
    };
    
    return saveMapState(currentMapData);
  }, [markers, pins, markerData, pinData]);

  /**
   * Limpa todos os dados salvos
   */
  const clearSavedState = useCallback(() => {
    const success = clearMapState();
    if (success) {
      setMarkers([]);
      setPins([]);
      setMarkerData({});
      setPinData({});
    }
    return success;
  }, [setMarkers, setPins, setMarkerData, setPinData]);

  /**
   * Obtém informações sobre o estado salvo
   */
  const getSavedStateInfo = useCallback(() => {
    return getMapStateInfo();
  }, []);

  /**
   * Efeito para carregar estado inicial apenas uma vez
   */
  useEffect(() => {
    loadInitialState();
  }, []); // Executa apenas na montagem do componente

  /**
   * Efeito para salvar automaticamente quando o estado muda
   * Debounce de 1 segundo para evitar salvamentos excessivos
   */
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (markers.length > 0 || pins.length > 0 || 
          Object.keys(markerData).length > 0 || Object.keys(pinData).length > 0) {
        saveCurrentState();
      }
    }, 1000); // Aguarda 1 segundo após a última mudança

    return () => clearTimeout(saveTimeout);
  }, [markers, pins, markerData, pinData, saveCurrentState]);

  return {
    loadInitialState,
    saveCurrentState,
    clearSavedState,
    getSavedStateInfo
  };
};
