# Interactive Map of the Known World

This project is an interactive map of the Known World, developed with ReactJS and Leaflet. The map allows users to view the map, add markers, calculate distances, display detailed information about specific locations, and toggle information layers.

## Features

- View the Known World map with zoom and navigation capabilities.
- Apply additional layers, such as territorial divisions and points of interest.
- Add markers to trace lines and calculate distances.
- Calculate the time required to travel the marked distances with different travel modes.
- Search locations with autocomplete and display detailed information in a side panel.
- Export and import markers.
- Save the map state locally to maintain position and zoom between sessions.
- Dice rolling functionality integrated with 3D dice animation.

## Requirements

- Node.js
- npm (Node Package Manager)
- yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/repository-name.git
cd repository-name
```

2. Install dependencies:

```bash
yarn
```

3. Run the project:

```bash
yarn start
```

## Project Structure

```plaintext
build
asset-manifest.json
index.html
manifest.json
robots.txt
public/
├── index.html
├── img/
│   ├── first-marker-icon.png
│   └── subsequent-marker-icon.png
src/
├── components/
│   ├── AddMarker.js
│   ├── DistanceInfo.js
│   ├── InfoPanel.js
│   ├── LayerControl.js
│   ├── Map.js
│   ├── MarkerIcon.js
│   ├── Search.js
│   ├── PinIcon.js
│   ├── AddPin.js
│   ├── DiceRoller/
│   │   ├── DiceBox.js
│   │   ├── DiceControls.js
│   ├── Map/
│   │   ├── effects.js
│   │   ├── handlers.js
│   │   ├── setup.js
├── utils/
│   ├── calculates.js
├── database.js
├── index.js
├── styles.css
.gitignore
LICENSE
README.md
package.json
yarn.lock
```

## Main Components

- `AddMarker.js`: Manages adding markers on the map.
- `DistanceInfo.js`: Displays information about distance and travel time.
- `InfoPanel.js`: Shows detailed information about specific locations.
- `LayerControl.js`: Allows toggling between different information layers on the map.
- `Map.js`: The main map component that integrates all other components.
- `MarkerIcon.js`: Defines marker icons.
- `Search.js`: Manages location search and displays suggestions.
- `PinIcon.js`: Defines pin icons.
- `AddPin.js`: Manages adding pins on the map.
- `DiceBox.js`: Handles 3D dice rolling functionality.
- `DiceControls.js`: Provides controls for rolling and resetting dice.
- `effects.js`: Manages map-related effects.
- `handlers.js`: Handles various map events.
- `setup.js`: Configures map initial setup.

## Styles

The styles are defined in the `styles.css` file to ensure a responsive layout and better code organization.

## Contribution

1. Fork the project.
2. Create a new branch with your changes:

```bash
git checkout -b my-new-feature
```

3. Commit your changes:

```bash
git commit -m 'Add my new feature'
```

4. Push to the branch:

```bash
git push origin my-new-feature
```

5. Open a Pull Request.

## Configuring the gh-pages Branch for Publication

To configure the `gh-pages` branch for publishing your project on GitHub Pages, follow these steps:

1. **Create the `gh-pages` branch (if it doesn't exist):**

```bash
git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Initial gh-pages commit"
git push origin gh-pages
git checkout main
```

2. **Update `package.json` to include the `homepage` property:**

Add or update the `homepage` property in the `package.json` file with the GitHub Pages URL for your repository:

```json
"homepage": "https://your-username.github.io/repository-name"
```

3. **Add the GitHub Actions workflow for deployment:**

Ensure that the `.github/workflows/deploy.yml` file is configured to deploy to the `gh-pages` branch. This file should contain the correct setup for GitHub Actions:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'

    - name: Install dependencies
      run: yarn install

    - name: Build the project
      run: yarn build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

4. **Commit and push the changes:**

After updating the `package.json` and GitHub Actions workflow, add, commit, and push the changes to the repository:

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

5. **Enable GitHub Pages in the repository:**

- Go to your repository page on GitHub.
- Click on "Settings".
- Scroll down to the "GitHub Pages" section.
- In "Source", select `gh-pages branch` and save.

After following these steps, your project will be automatically published on GitHub Pages whenever there is a push to the `main` branch.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

If you have any questions or suggestions, feel free to open an issue or get in touch.

---

# Mapa Interativo do Mundo Conhecido

Este projeto é um mapa interativo do Mundo Conhecido, desenvolvido com ReactJS e Leaflet. O mapa permite que os usuários visualizem o mapa, adicionem marcadores, calculem distâncias, exibam informações detalhadas sobre locais específicos e alternem camadas de informações.

## Funcionalidades

- Visualizar o mapa do Mundo Conhecido com capacidade de zoom e navegação.
- Aplicar camadas adicionais, como divisões territoriais e pontos de interesse.
- Adicionar marcadores para traçar linhas e calcular distâncias.
- Calcular o tempo necessário para percorrer as distâncias demarcadas com diferentes modos de viagem.
- Pesquisar locais com autocomplete e exibir informações detalhadas em um painel lateral.
- Exportar e importar marcadores.
- Salvar o estado do mapa localmente para manter a posição e o zoom entre sessões.
- Funcionalidade de rolagem de dados integrada com animação 3D de dados.

## Requisitos

- Node.js
- npm (Node Package Manager)
- yarn

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

2. Instale as dependências:

```bash
yarn
```

3. Execute o projeto:

```bash
yarn start
```

## Estrutura do Projeto

```plaintext
build
asset-manifest.json
index.html
manifest.json
robots.txt
public/
├── index.html
├── img/
│   ├── first-marker-icon.png
│   └── subsequent-marker-icon.png
src/
├── components/
│   ├── AddMarker.js
│   ├── DistanceInfo.js
│   ├── InfoPanel.js
│   ├── LayerControl.js
│   ├── Map.js
│   ├── MarkerIcon.js
│   ├── Search.js
│   ├── PinIcon.js
│   ├── AddPin.js
│   ├── DiceRoller/
│   │   ├── DiceBox.js
│   │   ├── DiceControls.js
│   ├── Map/
│   │   ├── effects.js
│   │   ├── handlers.js
│   │   ├── setup.js
├── utils/
│   ├── calculates.js
├── database.js
├── index.js
├── styles.css
.gitignore
LICENSE
README.md
package.json
yarn.lock
```

## Componentes Principais

- `AddMarker.js`: Gerencia a adição de marcadores no mapa.
- `DistanceInfo.js`: Exibe informações sobre a distância e o tempo de viagem.
- `InfoPanel.js`: Exibe informações detalhadas sobre locais específicos.
- `LayerControl.js`: Permite alternar entre diferentes camadas de informação no mapa.
- `Map.js`: Componente principal do mapa que integra todos os outros componentes.
- `MarkerIcon.js`: Define os ícones dos marcadores.
- `Search.js`: Gerencia a pesquisa de locais e exibe sugestões.
- `PinIcon.js`: Define os ícones dos pins.
- `AddPin.js`: Gerencia a adição de pins no mapa.
- `DiceBox.js`: Gerencia a funcionalidade de rolagem de dados 3D.
- `DiceControls.js`: Fornece controles para rolar e redefinir dados.
- `effects.js`: Gerencia efeitos relacionados ao mapa.
- `handlers.js`: Lida com vários eventos do mapa.
- `setup.js`: Configura a configuração inicial do mapa.

## Estilos

Os estilos estão definidos no arquivo `styles.css` para garantir um layout responsivo e uma melhor organização do código.

## Contribuição

1. Fork o projeto.
2. Crie uma nova branch com suas alterações:

```bash
git checkout -b minha-nova-feature
```

3. Commit suas alterações:

```bash
git commit -m 'Adiciona minha nova feature'
```

4. Faça o push para a branch:

```bash
git push origin minha-nova-feature
```

5. Abra um Pull Request.

## Configurando a Branch gh-pages para Publicação

Para configurar a branch `gh-pages` para publicação do seu projeto no GitHub Pages, siga os passos abaixo:

1. **Crie a branch `gh-pages` (se ela não existir):**

```bash
git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Initial gh-pages commit"
git push origin gh-pages
git checkout main
```

2. **Atualize o `package.json` para incluir a propriedade `homepage`:**

Adicione ou atualize a propriedade `homepage` no arquivo `package.json` com a URL do GitHub Pages para o seu repositório:

```json
"homepage": "https://seu-usuario.github.io/nome-do-repositorio"
```

3. **Adicione o workflow do GitHub Actions para deploy:**

Certifique-se de que o arquivo `.github/workflows/deploy.yml` esteja configurado para fazer deploy na branch `gh-pages`. Este arquivo deve conter a configuração correta para o GitHub Actions:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'

    - name: Install dependencies
      run: yarn install

    - name: Build the project
      run: yarn build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

4. **Commit e Push das mudanças:**

Depois de atualizar o `package.json` e o workflow do GitHub Actions, adicione, faça commit e push das mudanças para o repositório:

```bash
git add .
git commit -m "Configuração para deploy no GitHub Pages"
git push origin main
```

5. **Habilite o GitHub Pages no repositório:**

- Vá para a página do seu repositório no GitHub.
- Clique em "Settings".
- Role para baixo até a seção "GitHub Pages".
- Em "Source", selecione `gh-pages branch` e salve.

Após seguir esses passos, seu projeto será automaticamente publicado no GitHub Pages sempre que houver um push para a branch `main`.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue ou entrar em contato.
