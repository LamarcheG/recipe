import { IRecipe } from "Interfaces/GlobalInterfaces";
import React from "react";
import { convertFromISO } from "Utility/Utility";
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
  Subtitle,
  Instruction,
  Ingredient,
  ExtraInfoContainer,
  ExtraInfoTitle,
  ExtraInfoContentContainer,
  ExtraInfoContent,
} from "./RecipeItem.style";

interface RecipeItemProps {
  recipe: IRecipe;
}

export const RecipeItem: React.FC<RecipeItemProps> = ({
  recipe,
}: RecipeItemProps) => {
  const convertPortions = (portions: string | number): string => {
    if (typeof portions === "number") {
      if (portions === 1) {
        return `${portions} portion`;
      }
      return `${portions} portions`;
    }
    return portions;
  };
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
          <ExtraInfoContainer>
            {recipe.prepTime && (
              <ExtraInfoContentContainer>
                <ExtraInfoTitle>Prep time</ExtraInfoTitle>
                <ExtraInfoContent>
                  {convertFromISO(recipe.prepTime)}
                </ExtraInfoContent>
              </ExtraInfoContentContainer>
            )}
            {recipe.cookTime && (
              <ExtraInfoContentContainer>
                <ExtraInfoTitle>Cook time</ExtraInfoTitle>
                <ExtraInfoContent>
                  {convertFromISO(recipe.cookTime)}
                </ExtraInfoContent>
              </ExtraInfoContentContainer>
            )}
            {recipe.recipeYield && (
              <ExtraInfoContentContainer>
                <ExtraInfoTitle>Yield</ExtraInfoTitle>
                <ExtraInfoContent>
                  {convertPortions(recipe.recipeYield)}
                </ExtraInfoContent>
              </ExtraInfoContentContainer>
            )}
          </ExtraInfoContainer>
          {recipe.recipeIngredient && (
            <IngredientContainer>
              <Subtitle>Ingredients</Subtitle>
              <IngredientList>
                {recipe.recipeIngredient.map((ingredient, index) => (
                  <Ingredient key={index}>{ingredient}</Ingredient>
                ))}
              </IngredientList>
            </IngredientContainer>
          )}
          {recipe.recipeInstructions && (
            <InstructionsContainer>
              <Subtitle>Instructions</Subtitle>
              <InstructionList>
                {recipe.recipeInstructions.map((instruction, index) => (
                  <Instruction key={index}>{instruction.text}</Instruction>
                ))}
              </InstructionList>
            </InstructionsContainer>
          )}
        </ContentContainer>
      </ContainerCard>
    </>
  );
};
