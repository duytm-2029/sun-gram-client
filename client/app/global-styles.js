import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Roboto, sans-serif;
  }

  body.fontLoaded {
    font-family: Roboto, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Roboto, serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
