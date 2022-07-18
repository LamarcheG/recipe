import { AppContainer } from "App.style";
import { Title } from "Components/RecipeItem/RecipeItem.style";
import { RecipeItemForm } from "Components/RecipeItemForm/RecipeItemForm";
import { RecipeList } from "Components/RecipeList/RecipeList";
import GlobalStyle from "global.style";
import { IRecipe } from "Interfaces/GlobalInterfaces";
import React, { useState } from "react";

function App() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  const addRecipe = (recipe: IRecipe) => {
    const newArray = [recipe, ...recipes];
    setRecipes(newArray);
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
        <RecipeItemForm addRecipe={addRecipe}></RecipeItemForm>
        <RecipeList recipes={recipes}></RecipeList>
      </AppContainer>
    </>
  );
}

export default App;
