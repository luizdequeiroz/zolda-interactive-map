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

## Requisitos

- Node.js
- npm (Node Package Manager)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

2. Instale as dependências:

```
npm install
```

3. Execute o projeto:

```
npm start
```

## Estrutura do Projeto

```
src/
├── components/
│   ├── AddMarker.js
│   ├── DistanceInfo.js
│   ├── InfoPanel.js
│   ├── LayerControl.js
│   ├── Map.js
│   ├── MarkerIcon.js
│   └── Search.js
├── database.js
├── index.js
├── styles.css
public/
├── index.html
├── img/
│   ├── first-marker-icon.png
│   └── subsequent-marker-icon.png
README.md
package.json
```

## Componentes Principais

- AddMarker.js: Gerencia a adição de marcadores no mapa.
- DistanceInfo.js: Exibe informações sobre a distância e o tempo de viagem.
- InfoPanel.js: Exibe informações detalhadas sobre locais específicos.
- LayerControl.js: Permite alternar entre diferentes camadas de informação no mapa.
- Map.js: Componente principal do mapa que integra todos os outros componentes.
- MarkerIcon.js: Define os ícones dos marcadores.
- Search.js: Gerencia a pesquisa de locais e exibe sugestões.

## Estilos

Os estilos estão definidos no arquivo styles.css para garantir um layout responsivo e uma melhor organização do código.

## Contribuição

1. Fork o projeto.
2. Crie uma nova branch com suas alterações:

```
git checkout -b minha-nova-feature
```

3. Commit suas alterações:

```
git commit -m 'Adiciona minha nova feature'
```

4. Faça o push para a branch:

```
git push origin minha-nova-feature
```

5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue ou entrar em contato.
