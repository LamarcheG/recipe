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
  //function that convert from P3Y6M4DT12H30M5S to 3 years, 6 months, 4 days, 12 hours, 30 minutes, 5 seconds
  const convertFromISO = (time: string): string => {
    const [, years, months, days, hours, minutes, seconds] = time.match(
      /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
    )!;
    const yearsString = years && years !== "0" ? `${years} years` : "";
    const monthsString = months && months !== "0" ? `${months} months` : "";
    const daysString = days && days !== "0" ? `${days} days` : "";
    const hoursString = hours && hours !== "0" ? `${hours}h` : "";
    const minutesString = minutes && minutes !== "0" ? `${minutes} min` : "";
    const secondsString = seconds && seconds !== "0" ? `${seconds} sec` : "";
    const timeStringArray = [
      yearsString,
      monthsString,
      daysString,
      hoursString,
      minutesString,
      secondsString,
    ];
    const timeStringArrayFiltered = timeStringArray.filter(
      (timeString) => timeString !== ""
    );
    const result = timeStringArrayFiltered.join(":");
    return result;
  };
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
                  {convertFromISO(recipe.prepTime.toString())}
                </ExtraInfoContent>
              </ExtraInfoContentContainer>
            )}
            {recipe.cookTime && (
              <ExtraInfoContentContainer>
                <ExtraInfoTitle>Cook time</ExtraInfoTitle>
                <ExtraInfoContent>
                  {convertFromISO(recipe.cookTime.toString())}
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
