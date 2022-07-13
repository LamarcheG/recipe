import userEvent from "@testing-library/user-event";
import { AppContainer, InputButton, InputContainer, InputUrl } from "App.style";
import { RecipeItem } from "Components/RecipeItem/RecipeItem";
import { Title } from "Components/RecipeItem/RecipeItem.style";
import GlobalStyle from "global.style";
import { IRecipe } from "Interfaces/GlobalInterfaces";
import React, { useState } from "react";
import { isValidUrl } from "Utility/Utility";
import { scrapper } from "./Utility/Scrapper";

function App() {
  const [recipe, setRecipe] = useState<IRecipe>();
  const [recipeUrl, setRecipeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const fetchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidUrl(recipeUrl)) {
      setError("Invalid URL");
      return;
    }
    const data = await scrapper(recipeUrl);
    setRecipe(data);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
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
        <p>{error}</p>
        <InputContainer onSubmit={(e) => fetchData(e)}>
          <InputUrl
            type="text"
            name="url"
            id="url"
            placeholder="Url"
            onChange={onChange}
            required
          />
          <InputButton type="submit">fetch</InputButton>
        </InputContainer>
        {recipe && <RecipeItem recipe={recipe}></RecipeItem>}
      </AppContainer>
    </>
  );
}

export default App;
