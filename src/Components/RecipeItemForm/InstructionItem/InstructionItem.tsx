import { IInstructions } from "Interfaces/GlobalInterfaces";
import React from "react";
import {
  InstructionDelete,
  InstructionItemTag,
  InstructionItemText,
} from "./InstructionItem.style";

interface InstructionItemProps {
  index: number;
  instruction: IInstructions;
  onDeleteRecipeInstruction: (index: number) => void;
}

export const InstructionItem = ({
  index,
  instruction,
  onDeleteRecipeInstruction,
}: InstructionItemProps) => {
  return (
    <>
      <InstructionItemTag key={index}>
        <InstructionItemText>{instruction.text}</InstructionItemText>
        <InstructionDelete onClick={() => onDeleteRecipeInstruction(index)}>
          X
        </InstructionDelete>
      </InstructionItemTag>
    </>
  );
};
