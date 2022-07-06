import GlobalStyle from "global.style";
import React from "react";
import "./App.css";

function App() {
  return (
    <>
      {/*Global style is applied here*/}
      <GlobalStyle />
      <div className="App">
        <h1>Si ça marche ce texte sera rouge</h1>
      </div>
    </>
  );
}

export default App;
