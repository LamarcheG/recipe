import styled from "styled-components";

export const InputContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 80%;
  margin: 1rem 0;
`;
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
  height: 100%;
  padding: 4px 30px;
  margin-left: 20px;
`;

export const RecipeForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
`;

export const IngredientForm = styled.div``;

export const InstructionForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
`;

export const FormInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 25%;
  height: 30px;
`;

export const FormInputLabel = styled.label`
  font-size: var(--step-0);
  ::after {
    content: ":";
  }
`;
