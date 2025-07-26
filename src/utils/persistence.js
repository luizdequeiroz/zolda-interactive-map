// src/utils/persistence.js

/**
 * Utilitário para persistência do estado do mapa no localStorage
 * Gerencia salvamento e recuperação de marcadores, pinos e suas descrições
 */

// Chaves utilizadas no localStorage
const STORAGE_KEYS = {
  MARKERS: 'zolda_map_markers',
  PINS: 'zolda_map_pins',
  MARKER_DATA: 'zolda_map_marker_data',
  PIN_DATA: 'zolda_map_pin_data',
  MAP_STATE: 'zolda_map_state'
};

/**
 * Estrutura padrão dos dados do mapa
 */
const DEFAULT_MAP_DATA = {
  markers: [],
  pins: [],
  markerData: {},
  pinData: {},
  mapState: {
    center: null,
    zoom: null,
    lastSaved: null
  }
};

/**
 * Salva o estado completo do mapa no localStorage
 * @param {Object} mapData - Objeto contendo todos os dados do mapa
 * @param {Array} mapData.markers - Array de marcadores
 * @param {Array} mapData.pins - Array de pinos
 * @param {Object} mapData.markerData - Dados/descrições dos marcadores
 * @param {Object} mapData.pinData - Dados/descrições dos pinos
 * @param {Object} mapData.mapState - Estado do mapa (centro, zoom, etc.)
 */
export const saveMapState = (mapData) => {
  try {
    const dataToSave = {
      ...mapData,
      mapState: {
        ...mapData.mapState,
        lastSaved: new Date().toISOString()
      }
    };

    // Salva cada parte dos dados separadamente para facilitar debugging
    localStorage.setItem(STORAGE_KEYS.MARKERS, JSON.stringify(dataToSave.markers));
    localStorage.setItem(STORAGE_KEYS.PINS, JSON.stringify(dataToSave.pins));
    localStorage.setItem(STORAGE_KEYS.MARKER_DATA, JSON.stringify(dataToSave.markerData));
    localStorage.setItem(STORAGE_KEYS.PIN_DATA, JSON.stringify(dataToSave.pinData));
    localStorage.setItem(STORAGE_KEYS.MAP_STATE, JSON.stringify(dataToSave.mapState));

    console.log('Estado do mapa salvo com sucesso:', dataToSave.mapState.lastSaved);
    return true;
  } catch (error) {
    console.error('Erro ao salvar estado do mapa:', error);
    return false;
  }
};

/**
 * Recupera o estado completo do mapa do localStorage
 * @returns {Object} Dados do mapa ou estrutura padrão se não houver dados salvos
 */
export const loadMapState = () => {
  try {
    const markers = JSON.parse(localStorage.getItem(STORAGE_KEYS.MARKERS)) || [];
    const pins = JSON.parse(localStorage.getItem(STORAGE_KEYS.PINS)) || [];
    const markerData = JSON.parse(localStorage.getItem(STORAGE_KEYS.MARKER_DATA)) || {};
    const pinData = JSON.parse(localStorage.getItem(STORAGE_KEYS.PIN_DATA)) || {};
    const mapState = JSON.parse(localStorage.getItem(STORAGE_KEYS.MAP_STATE)) || {};

    const loadedData = {
      markers,
      pins,
      markerData,
      pinData,
      mapState
    };

    console.log('Estado do mapa carregado:', {
      markersCount: markers.length,
      pinsCount: pins.length,
      lastSaved: mapState.lastSaved
    });

    return loadedData;
  } catch (error) {
    console.error('Erro ao carregar estado do mapa:', error);
    return DEFAULT_MAP_DATA;
  }
};

/**
 * Limpa todos os dados salvos do mapa
 */
export const clearMapState = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    console.log('Estado do mapa limpo com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao limpar estado do mapa:', error);
    return false;
  }
};

/**
 * Verifica se existem dados salvos do mapa
 * @returns {boolean} True se existem dados salvos
 */
export const hasMapState = () => {
  return localStorage.getItem(STORAGE_KEYS.MARKERS) !== null ||
         localStorage.getItem(STORAGE_KEYS.PINS) !== null;
};

/**
 * Obtém informações sobre os dados salvos
 * @returns {Object} Informações sobre o estado salvo
 */
export const getMapStateInfo = () => {
  try {
    const mapState = JSON.parse(localStorage.getItem(STORAGE_KEYS.MAP_STATE)) || {};
    const markersCount = JSON.parse(localStorage.getItem(STORAGE_KEYS.MARKERS) || '[]').length;
    const pinsCount = JSON.parse(localStorage.getItem(STORAGE_KEYS.PINS) || '[]').length;

    return {
      hasData: hasMapState(),
      lastSaved: mapState.lastSaved,
      markersCount,
      pinsCount
    };
  } catch (error) {
    console.error('Erro ao obter informações do estado:', error);
    return {
      hasData: false,
      lastSaved: null,
      markersCount: 0,
      pinsCount: 0
    };
  }
};
