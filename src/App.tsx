import GlobalStyle from "global.style";
import React from "react";

function App() {
  return (
    <>
      {/*Global style is applied here*/}
      <GlobalStyle />
      <div className="App">
        <h1>Le texte ne sera plus rouge la on se calme</h1>
      </div>
    </>
  );
}

export default App;
