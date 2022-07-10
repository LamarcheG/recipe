import styled from "styled-components";

export const ContainerCard = styled.div`
  width: 80%;
  height: 100%;
  margin: 50px auto;
  background-color: #fafafa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  text-align: center;
  padding: 1rem 0;
`;

export const MainImage = styled.img``;

export const Description = styled.p`
  text-align: center;
  padding: 1rem 0;
  font-size: 1.5rem;
  line-height: 1.5;
  color: rgb(51, 51, 51);
  font-weight: 300;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  width: 80%;
  margin: auto;
`;

export const InstructionsContainer = styled.div`
  padding: 1rem 0;
`;
export const IngredientContainer = styled.div`
  padding: 1rem 0;
`;

export const IngredientList = styled.ul`
  list-style-position: inside;
`;
export const InstructionList = styled.ol`
  list-style-position: inside;
`;
