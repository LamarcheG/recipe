import styled from "styled-components";

export const IngredientItemTag = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &:before {
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #1f1f1f;
    margin: 0 10px 0 0;
  }
`;

export const IngredientItemText = styled.p`
  font-size: var(--step--2);
  width: 90%;
`;

export const IngredientDelete = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
