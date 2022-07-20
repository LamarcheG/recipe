import styled from "styled-components";
export const ImageItemTag = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
`;
export const ImageText = styled.p`
  font-size: var(--step--1);
`;
export const ImageTag = styled.img`
  height: 30px;
`;
export const ImageDelete = styled.button`
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
