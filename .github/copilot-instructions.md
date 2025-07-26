# GitHub Copilot Instructions - Zolda Interactive Map

## 1. Introdução ao Projeto

O **zolda-interactive-map** é um mapa interativo do "Mundo Conhecido" desenvolvido como uma aplicação web React. O projeto permite explorar um mundo fictício através de um mapa customizado com funcionalidades avançadas de navegação, marcação, cálculos de distância e sistema de dados 3D. É ideal para RPGs, worldbuilding ou qualquer cenário que necessite de um mapa interativo detalhado.

**URL de Produção:** https://luizdequeiroz.github.io/zolda-interactive-map

## 2. Estrutura Principal do Projeto

```
zolda-interactive-map/
├── .github/
│   └── copilot-instructions.md # Instruções para GitHub Copilot
├── .gitignore                  # Arquivos ignorados pelo Git
├── LICENSE                     # Licença do projeto
├── README.md                   # Documentação principal
├── package.json                # Dependências e scripts npm/yarn
├── yarn.lock                   # Lock file do Yarn
├── public/                     # Assets públicos servidos estaticamente
│   ├── index.html             # Template HTML principal
│   ├── manifest.json          # PWA manifest
│   ├── robots.txt             # Configuração para web crawlers
│   ├── img/                   # Imagens do mapa e ícones
│   │   ├── OMundoConhecido.png        # 🗺️ Mapa principal do mundo
│   │   ├── AsLegendasConhecidas.png   # Overlay de legendas
│   │   ├── OsTerritoriosConhecidos.png # Overlay territorial
│   │   ├── first-marker-icon.png      # Ícone do primeiro marcador
│   │   ├── subsequent-marker-icon.png # Ícone marcadores subsequentes
│   │   ├── pin-icon.png              # Ícone de pinos
│   │   └── dice.svg                  # Ícone de dados
│   └── assets/                # Assets para bibliotecas externas
│       └── dice-box/          # Assets do sistema de dados 3D
├── build/                     # 📦 Build de produção (gerado)
├── src/                       # 💻 Código fonte da aplicação
│   ├── index.js              # 🎯 Ponto de entrada React
│   ├── App.js                # Componente raiz (tutorial + mapa)
│   ├── App.css               # Estilos do componente App
│   ├── index.css             # Estilos globais base
│   ├── styles.css            # Estilos globais customizados
│   ├── reportWebVitals.js    # Métricas de performance
│   ├── database.js           # 📊 Base de dados estática de localizações
│   ├── components/           # 🧩 Componentes React modulares
│   │   ├── Map.js           # ⭐ Componente principal do mapa
│   │   ├── Search.js        # Sistema de busca com autocomplete
│   │   ├── AddMarker.js     # Hook para adicionar marcadores (clique)
│   │   ├── AddPin.js        # Hook para adicionar pinos (clique direito)
│   │   ├── MarkerIcon.js    # Configuração de ícones de marcadores
│   │   ├── PinIcon.js       # Configuração de ícones de pinos
│   │   ├── DistanceInfo.js  # Display de distâncias e tempo de viagem
│   │   ├── InfoPanel.js     # Painel lateral de informações
│   │   ├── LayerControl.js  # Controle de camadas do mapa
│   │   ├── MarkerPanel.js   # Painel de configuração de marcadores
│   │   ├── PersistenceControl.js # 💾 Controle de persistência do estado
│   │   ├── Tutorial.js      # Tutorial interativo para novos usuários
│   │   ├── Tutorial.css     # Estilos específicos do tutorial
│   │   ├── DiceRoller/      # 🎲 Módulo de dados 3D
│   │   │   ├── DiceBox.js   # Engine de física dos dados
│   │   │   └── DiceControls.js # UI para controle de dados
│   │   └── Map/             # 🗺️ Módulos específicos do mapa
│   │       ├── effects.js   # Hooks e efeitos do mapa
│   │       ├── handlers.js  # Event handlers (drag, click, etc.)
│   │       └── setup.js     # Configuração inicial (bounds, center)
│   ├── hooks/               # 🔗 Hooks customizados
│   │   └── useMapPersistence.js # Hook para gerenciar persistência
│   └── utils/               # 🔧 Utilitários e funções auxiliares
│       ├── calculates.js    # Funções matemáticas (distância, tempo)
│       └── persistence.js   # Utilitários para localStorage
```

## 3. Tecnologias Utilizadas

### Stack Principal:
- **React 18.2.0**: Framework de UI
- **JavaScript ES6+**: Linguagem principal
- **Leaflet 1.9.4**: Engine de mapas interativos
- **React-Leaflet 4.2.1**: Bindings React para Leaflet

### Bibliotecas Especializadas:
- **@3d-dice/dice-box**: Sistema de física para dados 3D
- **@3d-dice/dice-ui**: Interface para sistema de dados
- **uuid**: Geração de IDs únicos

### Build & Deploy:
- **React Scripts**: Build e desenvolvimento
- **gh-pages**: Deploy automático no GitHub Pages

### Coordenadas e Mapa:
- **CRS.Simple**: Sistema de coordenadas customizado (não geográfico)
- **ImageOverlay**: Mapa customizado sobreposto (OMundoConhecido.png)

## 4. Convenções e Padrões de Código

### Estrutura de Componentes:
```javascript
// Padrão de componente funcional
import React, { useState } from 'react';

function ComponentName({ props }) {
  const [state, setState] = useState(initialValue);
  
  // Event handlers
  const handleEvent = () => {
    // lógica
  };

  return (
    // JSX
  );
}

export default ComponentName;
```

### Gerenciamento de Estado:
- **Estado local**: `useState` para componentes isolados
- **Props drilling**: Estado passado de Map.js para subcomponentes
- **Persistência**: `localStorage` para manter dados entre sessões
- **Hook customizado**: `useMapPersistence` para gerenciar salvamento automático

### Naming Conventions:
- **Componentes**: PascalCase (`Map.js`, `AddMarker.js`)
- **Funções**: camelCase (`handleDragEnd`, `calculateDistance`)
- **Arquivos**: PascalCase para componentes, camelCase para utils
- **CSS Classes**: kebab-case

### Event Handling:
- **Marcadores**: clique simples no mapa
- **Pinos**: clique direito no mapa
- **Remoção**: clique direito no elemento
- **Movimentação**: drag and drop

## 5. TODOs Funcionais (Features Pendentes)

### Alta Prioridade:
- [x] **Persistência de Dados**: ✅ Implementado localStorage para salvar estado entre sessões
- [ ] **Múltiplas Rotas**: Suporte a várias rotas simultâneas com cores diferentes
- [ ] **Sistema de Camadas**: Adicionar mais overlays (territorial, político, etc.)
- [ ] **Mobile Responsivo**: Otimizar interface para dispositivos móveis

### Média Prioridade:
- [ ] **Rich Text Editor**: Descrições com formatação para marcadores/pinos
- [ ] **Importação Avançada**: Suporte a GeoJSON, KML, CSV
- [ ] **Sistema de Rotas Inteligentes**: Pathfinding com obstáculos
- [ ] **Multiplayer**: Colaboração em tempo real
- [ ] **Filtros de Marcadores**: Categorização e filtros por tipo

### Baixa Prioridade:
- [ ] **Modo Escuro**: Theme switcher
- [ ] **Internacionalização**: i18n para múltiplos idiomas
- [ ] **API Backend**: Persistência em servidor
- [ ] **Progressive Web App**: Funcionalidade offline
- [ ] **Integração com APIs**: Weather, population data, etc.

## 6. TODOs Não-Funcionais

### Qualidade de Código:
- [ ] **Testes Automatizados**: Jest + React Testing Library
- [ ] **TypeScript**: Migração para type safety
- [ ] **ESLint + Prettier**: Padronização de código
- [ ] **Husky**: Git hooks para qualidade

### Performance:
- [ ] **Code Splitting**: Lazy loading de componentes
- [ ] **Image Optimization**: WebP, responsive images
- [ ] **Bundle Analysis**: Webpack bundle analyzer
- [ ] **Memoization**: React.memo para componentes pesados

### Documentação:
- [ ] **Storybook**: Documentação de componentes
- [ ] **JSDoc**: Documentação inline de funções
- [ ] **README Técnico**: Guia detalhado para desenvolvedores
- [ ] **CONTRIBUTING.md**: Guia para contribuições

### Segurança & Acessibilidade:
- [ ] **Audit de Dependências**: npm audit fix regular
- [ ] **ARIA Labels**: Melhor acessibilidade
- [ ] **Keyboard Navigation**: Navegação por teclado
- [ ] **Screen Reader**: Suporte para leitores de tela

### DevOps:
- [ ] **CI/CD Pipeline**: GitHub Actions para testes e deploy
- [ ] **Environment Variables**: Configuração por ambiente
- [ ] **Error Monitoring**: Sentry ou similar
- [ ] **Performance Monitoring**: Web Vitals tracking

## 7. Como Fornecer Overview Detalhado

### Ao ser questionado sobre o projeto, sempre incluir:

1. **Contexto de Estado**: 
   - ✅ Estados persistentes (localStorage implementado)
   - ✅ Salvamento automático após mudanças
   - ✅ Controle manual de persistência disponível

2. **Funcionalidades Principais**:
   - Mapa interativo com zoom/pan
   - Marcadores (clique) e pinos (clique direito)
   - Cálculo de distâncias e tempo de viagem
   - Sistema de busca de localizações
   - Dados 3D integrados
   - Tutorial interativo

3. **Limitações Atuais**:
   - Sem responsividade mobile
   - Sem testes automatizados
   - Sem backend/API

4. **Arquitetura**:
   - React SPA com componentes funcionais
   - Estado gerenciado via useState (props drilling)
   - Leaflet para engine de mapas
   - Sistema de coordenadas customizado (não geográfico)

### Scripts Principais:
```bash
yarn start    # Desenvolvimento local
yarn build    # Build de produção
yarn deploy   # Deploy no GitHub Pages
yarn test     # Testes (quando implementados)
```

### URLs Importantes:
- **Produção**: https://luizdequeiroz.github.io/zolda-interactive-map
- **Repositório**: https://github.com/luizdequeiroz/zolda-interactive-map

---

**Última atualização**: Julho 2025
**Versão do projeto**: 0.1.0
**Mantenedor**: luizdequeiroz
