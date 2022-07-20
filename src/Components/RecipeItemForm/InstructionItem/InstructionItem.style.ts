import styled from "styled-components";
export const InstructionItemTag = styled.li`
  padding: 0 0 0.5rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  counter-increment: item;
  margin-bottom: 5px;
  &:before {
    content: counter(item) ".";
    margin-right: 5px;
    color: black;
    font-weight: bold;
  }
`;
export const InstructionItemText = styled.p`
  font-size: var(--step--2);
  width: 90%;
`;
export const InstructionDelete = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
