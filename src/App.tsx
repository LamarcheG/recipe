import GlobalStyle from "global.style";
import React, { useEffect, useState } from "react";
import { scrapper } from "./Utility/Scrapper";

function App() {
  const [recipe, setRecipe] = useState();
  const fetchData = async () => {
    const recipe = await scrapper(
      "https://cuisinez.telequebec.tv/recettes/2580/pain-maison-a-la-poele"
    );
  };

  return (
    <>
      {/*Global style is applied here*/}
      <GlobalStyle />
      <div className="App">
        <h1>Le texte ne sera plus rouge la on se calme</h1>
      </div>
      <button onClick={fetchData}>fetch</button>
      <p>{recipe}</p>
    </>
  );
}

export default App;
