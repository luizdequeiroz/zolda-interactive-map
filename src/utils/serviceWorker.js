// src/utils/serviceWorker.js

/**
 * Utilitário para registrar e gerenciar o Service Worker
 * Implementa Progressive Web App (PWA) com funcionalidade offline
 */

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

/**
 * Registra o Service Worker se o navegador suportar
 * @param {Function} onSuccess - Callback executado quando o SW é registrado com sucesso
 * @param {Function} onUpdate - Callback executado quando há uma atualização disponível
 */
export function registerSW(onSuccess, onUpdate) {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      console.warn('[PWA] Service Worker não funcionará com PUBLIC_URL diferente da origem');
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      if (isLocalhost) {
        // Em localhost, verifica se o SW ainda existe
        checkValidServiceWorker(swUrl, onSuccess, onUpdate);
        
        navigator.serviceWorker.ready.then(() => {
          console.log('[PWA] Aplicação sendo servida do cache pelo Service Worker em localhost');
        });
      } else {
        // Em produção, registra o SW normalmente
        registerValidSW(swUrl, onSuccess, onUpdate);
      }
    });
  } else {
    console.warn('[PWA] Service Worker não é suportado neste navegador');
  }
}

/**
 * Registra um Service Worker válido
 */
function registerValidSW(swUrl, onSuccess, onUpdate) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('[PWA] Service Worker registrado com sucesso:', registration);
      
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Nova versão disponível
              console.log('[PWA] Nova versão disponível. Será carregada quando todas as abas forem fechadas.');
              if (onUpdate) {
                onUpdate(registration);
              }
            } else {
              // Primeira instalação
              console.log('[PWA] Conteúdo cacheado para uso offline.');
              if (onSuccess) {
                onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('[PWA] Erro ao registrar Service Worker:', error);
    });
}

/**
 * Verifica se o Service Worker é válido (para localhost)
 */
function checkValidServiceWorker(swUrl, onSuccess, onUpdate) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Service Worker não encontrado, recarrega a página
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service Worker encontrado, registra normalmente
        registerValidSW(swUrl, onSuccess, onUpdate);
      }
    })
    .catch(() => {
      console.log('[PWA] Sem conexão com a internet. Aplicação rodando em modo offline.');
    });
}

/**
 * Desregistra o Service Worker
 */
export function unregisterSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
        console.log('[PWA] Service Worker desregistrado');
      })
      .catch((error) => {
        console.error('[PWA] Erro ao desregistrar Service Worker:', error);
      });
  }
}

/**
 * Verifica se a aplicação está rodando offline
 */
export function isOffline() {
  return !navigator.onLine;
}

/**
 * Adiciona listeners para eventos de conexão
 */
export function addConnectionListeners(onOnline, onOffline) {
  window.addEventListener('online', () => {
    console.log('[PWA] Aplicação voltou online');
    if (onOnline) onOnline();
  });
  
  window.addEventListener('offline', () => {
    console.log('[PWA] Aplicação ficou offline');
    if (onOffline) onOffline();
  });
}

/**
 * Força atualização do Service Worker
 */
export function updateSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.update();
      console.log('[PWA] Verificando atualizações do Service Worker...');
    });
  }
}
