// src/utils/componentPositions.js

/**
 * Utilitários para persistir posições dos componentes arrastáveis
 */

const STORAGE_KEY = 'zolda-component-positions';

/**
 * Salva a posição de um componente
 * @param {string} componentId - ID do componente
 * @param {Object} position - Posição {x, y}
 */
export const saveComponentPosition = (componentId, position) => {
  try {
    const positions = getComponentPositions();
    positions[componentId] = position;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
    return true;
  } catch (error) {
    console.error('Erro ao salvar posição do componente:', error);
    return false;
  }
};

/**
 * Recupera a posição salva de um componente
 * @param {string} componentId - ID do componente
 * @returns {Object|null} - Posição {x, y} ou null se não encontrada
 */
export const getComponentPosition = (componentId) => {
  try {
    const positions = getComponentPositions();
    return positions[componentId] || null;
  } catch (error) {
    console.error('Erro ao recuperar posição do componente:', error);
    return null;
  }
};

/**
 * Recupera todas as posições salvas
 * @returns {Object} - Objeto com todas as posições
 */
export const getComponentPositions = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Erro ao recuperar posições dos componentes:', error);
    return {};
  }
};

/**
 * Remove a posição salva de um componente
 * @param {string} componentId - ID do componente
 */
export const removeComponentPosition = (componentId) => {
  try {
    const positions = getComponentPositions();
    delete positions[componentId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
    return true;
  } catch (error) {
    console.error('Erro ao remover posição do componente:', error);
    return false;
  }
};

/**
 * Limpa todas as posições salvas
 */
export const clearComponentPositions = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Erro ao limpar posições dos componentes:', error);
    return false;
  }
};

/**
 * Calcula posição padrão baseada no tamanho da tela
 * @param {string} componentType - Tipo do componente ('persistence' ou 'pwa')
 * @returns {Object} - Posição padrão {x, y}
 */
export const getDefaultPosition = (componentType) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  switch (componentType) {
    case 'persistence':
      return {
        x: windowWidth - 270,
        y: windowHeight - 100
      };
    case 'pwa':
      return {
        x: windowWidth - 480,
        y: windowHeight - 100
      };
    default:
      return { x: 10, y: 10 };
  }
};
