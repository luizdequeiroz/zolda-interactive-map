// src/utils/environment.js

/**
 * Utilitários para detectar ambiente de execução
 */

/**
 * Verifica se a aplicação está rodando em modo de desenvolvimento
 * @returns {boolean} - true se estiver em desenvolvimento
 */
export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

/**
 * Verifica se a aplicação está rodando em modo de produção
 * @returns {boolean} - true se estiver em produção
 */
export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

/**
 * Verifica se deve mostrar componentes de debug/desenvolvimento
 * @returns {boolean} - true se deve mostrar componentes de debug
 */
export const shouldShowDebugComponents = () => {
  // Em desenvolvimento, sempre mostra
  if (isDevelopment()) {
    return true;
  }
  
  // Em produção, verifica se há parâmetro especial na URL para debug
  if (isProduction()) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('debug') || urlParams.has('dev-mode');
  }
  
  return false;
};

/**
 * Obtém informações do ambiente atual
 * @returns {Object} - Objeto com informações do ambiente
 */
export const getEnvironmentInfo = () => {
  return {
    nodeEnv: process.env.NODE_ENV,
    isDev: isDevelopment(),
    isProd: isProduction(),
    showDebug: shouldShowDebugComponents(),
    buildTime: process.env.REACT_APP_BUILD_TIME || 'unknown',
    version: process.env.REACT_APP_VERSION || '0.1.0'
  };
};

/**
 * Log condicional que só aparece em desenvolvimento
 * @param {...any} args - Argumentos para console.log
 */
export const devLog = (...args) => {
  if (isDevelopment()) {
    console.log('[DEV]', ...args);
  }
};

/**
 * Log específico para PWA que aparece com prefixo
 * @param {...any} args - Argumentos para console.log  
 */
export const pwaLog = (...args) => {
  if (isDevelopment() || shouldShowDebugComponents()) {
    console.log('[PWA]', ...args);
  }
};

/**
 * Log específico para persistência
 * @param {...any} args - Argumentos para console.log
 */
export const persistenceLog = (...args) => {
  if (isDevelopment()) {
    console.log('[PERSISTENCE]', ...args);
  }
};

/**
 * Wrapper para componentes que só devem aparecer em desenvolvimento
 * @param {React.Component} component - Componente a ser renderizado
 * @returns {React.Component|null} - Componente ou null
 */
export const DevOnly = ({ children }) => {
  return shouldShowDebugComponents() ? children : null;
};
