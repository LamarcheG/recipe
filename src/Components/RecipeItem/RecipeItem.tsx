import { IRecipe } from "Interfaces/GlobalInterfaces";
import React from "react";
import {
  ContainerCard,
  ContentContainer,
  Title,
  MainImage,
  IngredientContainer,
  IngredientList,
  InstructionList,
  InstructionsContainer,
  ImageContainer,
  Description,
} from "./RecipeItem.style";

interface RecipeItemProps {
  recipe: IRecipe;
}

export const RecipeItem: React.FC<RecipeItemProps> = ({
  recipe,
}: RecipeItemProps) => {
  return (
    <>
      <ContainerCard>
        <ContentContainer>
          <Title>{recipe.name}</Title>
          <ImageContainer>
            <MainImage src={recipe.image[0]} alt="Recipe image" />
          </ImageContainer>
          {recipe.description && (
            <Description>{recipe.description}</Description>
          )}
          {recipe.recipeIngredient && (
            <IngredientContainer>
              <h2>Ingredients</h2>
              <IngredientList>
                {recipe.recipeIngredient.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </IngredientList>
            </IngredientContainer>
          )}
          {recipe.recipeInstructions && (
            <InstructionsContainer>
              <h2>Instructions</h2>
              <InstructionList>
                {recipe.recipeInstructions.map((instruction, index) => (
                  <li key={index}>{instruction.text}</li>
                ))}
              </InstructionList>
            </InstructionsContainer>
          )}
        </ContentContainer>
      </ContainerCard>
    </>
  );
};
