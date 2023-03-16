import { RecipeItem } from "Components/RecipeItem/RecipeItem";
import { IRecipe } from "Interfaces/GlobalInterfaces";
import React from "react";

interface RecipeListProps {
  recipes: IRecipe[];
}

export const RecipeList = ({ recipes }: RecipeListProps) => {
  return (
    <>
      {recipes.length > 0 && (
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>
              <RecipeItem recipe={recipe}></RecipeItem>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
