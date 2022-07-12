import styled from "styled-components";

export const ContainerCard = styled.div`
  width: 80%;
  height: fit-content;
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

export const Subtitle = styled.h2`
  padding-bottom: 0.25rem;
`;

export const Instruction = styled.li`
  padding-bottom: 0.25rem;
`;

export const Ingredient = styled.li`
  padding-bottom: 0.25rem;
`;

export const MainImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

export const Description = styled.p`
  text-align: center;
  padding: 1rem 0;
  color: rgb(51, 51, 51);
`;

export const ExtraInfoTitle = styled.h5`
  font-size: var(--step-0);
  margin-right: 10px;
  &::after {
    content: ":";
  }
`;

export const ExtraInfoContent = styled.p``;

export const ExtraInfoContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  @media (max-width: 768px) {
    justify-content: left;
    padding: 0;
    padding-right: 15px;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 400px;
  margin: 1rem 0;
  @media (max-width: 768px) {
    height: 300px;
  }
`;

export const ContentContainer = styled.div`
  width: 80%;
  margin: auto;
`;

export const ExtraInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 1em;
  }
`;

export const InstructionsContainer = styled.div`
  padding: 0 0 1rem 0;
`;
export const IngredientContainer = styled.div`
  padding: 0 0 1rem 0;
`;

export const IngredientList = styled.ul`
  list-style-position: inside;
`;
export const InstructionList = styled.ol`
  list-style-position: inside;
`;
