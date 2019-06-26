import React from 'react';
import './App.css';
import styled from 'styled-components';
import AllNots from './AllNots';
import { reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
`

const Main = styled.div`
  display: flex;
  justify-content: center;
  background-color: #A2D7DD;
  width: 100%;
  height: auto;
  overflow: auto;
  min-height: 100%;
`

function App() {
  return (
    <Main className="App">
      <AllNots></AllNots>
    </Main>
  );
}

export default App;
