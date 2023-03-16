import React from "react";
import {
  IngredientDelete,
  IngredientItemTag,
  IngredientItemText,
} from "./IngredientItem.style";

interface IngredientItemProps {
  index: number;
  ingredient: string;
  onDeleteRecipeIngredient: (index: number) => void;
}

export const IngredientItem = ({
  index,
  ingredient,
  onDeleteRecipeIngredient,
}: IngredientItemProps) => {
  return (
    <>
      <IngredientItemTag key={index}>
        <IngredientItemText>{ingredient}</IngredientItemText>
        <IngredientDelete onClick={() => onDeleteRecipeIngredient(index)}>
          X
        </IngredientDelete>
      </IngredientItemTag>
    </>
  );
};
