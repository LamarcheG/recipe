import userEvent from "@testing-library/user-event";
import { AppContainer, InputButton, InputContainer, InputUrl } from "App.style";
import { RecipeItem } from "Components/RecipeItem/RecipeItem";
import { Title } from "Components/RecipeItem/RecipeItem.style";
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
      <AppContainer>
        <Title>Recipe</Title>
        <p>
          https://cuisinez.telequebec.tv/recettes/2580/pain-maison-a-la-poele
        </p>
        <p>https://lacuisineensemble.fr/que-faire-avec-de-la-viande-hachee/</p>
        <p>https://www.boblechef.com/recettes/lasagne-classique</p>
        <p>
          https://ici.radio-canada.ca/mordu/recettes/2278/lasagne-sauce-bolognaise
        </p>
        <InputContainer>
          <InputUrl
            type="text"
            name="url"
            id="url"
            placeholder="Url"
            onChange={onChange}
          />
          <InputButton onClick={fetchData}>fetch</InputButton>
        </InputContainer>
        {recipe && <RecipeItem recipe={recipe}></RecipeItem>}
      </AppContainer>
    </>
  );
}

export default App;
