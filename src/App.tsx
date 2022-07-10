import { RecipeItem } from "Components/RecipeItem/RecipeItem";
import GlobalStyle from "global.style";
import { IRecipe } from "Interfaces/GlobalInterfaces";
import React, { useState } from "react";
import { scrapper } from "./Utility/Scrapper";

function App() {
  const [recipe, setRecipe] = useState<IRecipe>();
  const [recipeUrl, setRecipeUrl] = useState("");
  const fetchData = async () => {
    if (recipeUrl) {
      const data = await scrapper(recipeUrl);
      setRecipe(data);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeUrl(e.target.value);
  };

  return (
    <>
      {/*Global style is applied here*/}
      <GlobalStyle />
      <div className="App">
        <h1>Recipe</h1>
        <p>
          https://cuisinez.telequebec.tv/recettes/2580/pain-maison-a-la-poele
        </p>
        <p>https://lacuisineensemble.fr/que-faire-avec-de-la-viande-hachee/</p>
        <input
          type="text"
          name="url"
          id="url"
          placeholder="Url"
          onChange={onChange}
        />
        <button onClick={fetchData}>fetch</button>
        {recipe && <RecipeItem recipe={recipe}></RecipeItem>}
      </div>
    </>
  );
}

export default App;
