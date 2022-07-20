import styled from "styled-components";

export const InputUrl = styled.input`
  height: 100%;
  width: 50%;
  padding: 4px 10px;
  border: 2px solid #292929;
  border-radius: 5px;
  font-size: var(--step-0);
  ::placeholder {
    font-size: var(--step-0);
  }
`;
export const InputButton = styled.button`
  padding: 2px 20px;
`;

export const RecipeForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 40%;
  padding: 2rem 0; ;
`;

export const InstructionForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 0 0 1rem 0;
`;

export const ShortInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 0 1rem 0;
`;

export const FormInputLabel = styled.label`
  font-size: var(--step-0);
  ::after {
    content: ":";
  }
`;

export const EmbeddedButton = styled.button`
  border: none;
  background-color: transparent;
  background-color: #a5a5a5;
  height: 100%;
  padding: 2px 8px;
`;

export const LongInput = styled.input`
  border: none;
  outline: none;
  padding-left: 5px;
`;

export const LongInputContainer = styled.div`
  outline: 1px solid #767676;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CreateRecipeButton = styled.button`
  width: 100%;
  height: 30px;
`;

export const ImageList = styled.ol`
  width: 30%;
`;

export const IngredientList = styled.ul`
  margin: auto;
  padding: 0 0 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem 1rem;
  align-items: center;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const InstructionList = styled.ol``;
export const InstructionItem = styled.li`
  padding: 0 0 0.5rem 0;
`;
