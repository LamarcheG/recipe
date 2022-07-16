import { RecipeItem } from "Components/RecipeItem/RecipeItem";
import { IRecipe, IInstructions } from "Interfaces/GlobalInterfaces";
import React, { useState } from "react";
import { scrapper } from "Utility/Scrapper";
import { convertToISO, isImage, isValidUrl } from "Utility/Utility";
import {
  EmbeddedButton,
  ShortInputContainer,
  FormInputLabel,
  InputButton,
  InputUrl,
  InstructionForm,
  LongInputContainer,
  RecipeForm,
  LongInput,
  IngredientList,
  CreateRecipeButton,
} from "./RecipeItemForm.style";

interface RecipeItemFormProps {}

export const RecipeItemForm: React.FC<
  RecipeItemFormProps
> = ({}: RecipeItemFormProps) => {
  const [recipe, setRecipe] = useState<IRecipe>();

  //states for recipe
  const [name, setName] = useState("");
  const [image, setImage] = useState<string>("");
  const [imageList, setImageList] = useState<string[]>([]);
  const [description, setDescription] = useState<string | undefined>();
  const [prepTime, setPrepTime] = useState<number | undefined>();
  const [cookTime, setCookTime] = useState<number | undefined>();
  const [recipeIngredient, setRecipeIngredient] = useState<string>("");
  const [recipeIngredientList, setRecipeIngredientList] = useState<string[]>(
    []
  );
  const [recipeInstructions, setRecipeInstructions] = useState<IInstructions[]>(
    []
  );
  const [recipeCategory, setRecipeCategory] = useState<string | undefined>();
  const [datePublished, setDatePublished] = useState<string | undefined>();
  const [recipeYield, setRecipeYield] = useState<string | number | undefined>();

  //states for the instructions
  const [instructionText, setInstructionText] = useState<string>("");
  const [instructionName, setInstructionName] = useState<string>("");

  //states for the scrapper
  const [recipeUrl, setRecipeUrl] = useState("");
  const [urlError, setUrlError] = useState<string>();
  const [addInstruction, setAddInstruction] = useState<boolean>(false);

  const fetchData = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!isValidUrl(recipeUrl)) {
      setUrlError("Invalid URL");
      return;
    }
    const data = await scrapper(recipeUrl);
    setRecipe(data);
  };
  const onRecipeFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setUrlError("");
    }
    if (e.target.name === "url") {
      setRecipeUrl(e.target.value);
    }
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "image") {
      setImage(e.target.value);
    }
    if (e.target.name === "description") {
      setDescription(e.target.value);
    }
    if (e.target.name === "prepTime") {
      setPrepTime(Number(e.target.value));
    }
    if (e.target.name === "cookTime") {
      setCookTime(Number(e.target.value));
    }
    if (e.target.name === "recipeIngredient") {
      setRecipeIngredient(e.target.value);
    }
    if (e.target.name === "recipeCategory") {
      setRecipeCategory(e.target.value);
    }
    if (e.target.name === "datePublished") {
      setDatePublished(e.target.value);
    }
    if (e.target.name === "recipeYield") {
      //if the string is a number
      if (Number(e.target.value)) {
        setRecipeYield(Number(e.target.value));
      } else {
        setRecipeYield(e.target.value);
      }
    }
  };

  const onInstructionFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "instructionText") {
      setInstructionText(e.target.value);
    }
    if (e.target.name === "instructionName") {
      setInstructionName(e.target.value);
    }
  };

  const onImageFormSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!isValidUrl(image)) {
      return;
    }
    if (!isImage(image)) {
      return;
    }
    setImageList((prev) => [...prev, image]);
  };

  const onRecipeIngredientFormSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      recipeIngredient.length === 0 ||
      recipeIngredient.replace(/\s/g, "") === ""
    ) {
      return;
    }
    e.preventDefault();
    setRecipeIngredientList((prev) => [...prev, recipeIngredient]);
  };

  const onInstructionFormSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      instructionText.length === 0 ||
      instructionText.replace(/\s/g, "") === ""
    ) {
      return;
    }
    const newInstruction: IInstructions = {
      type: "HowToStep",
      name: instructionName?.length > 0 ? instructionName : undefined,
      text: instructionText,
    };
    setInstructionName("");
    setInstructionText("");
    setRecipeInstructions((prev) => [...prev, newInstruction]);
  };

  const onRecipeFormSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newRecipe: IRecipe = {
      name,
      image: imageList ? imageList : [],
      description,
      prepTime: prepTime ? convertToISO(prepTime) : undefined,
      cookTime: cookTime ? convertToISO(cookTime) : undefined,
      recipeIngredient: recipeIngredientList,
      recipeInstructions,
      recipeCategory,
      datePublished,
      recipeYield,
    };
    setRecipe(newRecipe);
  };

  return (
    <>
      <RecipeForm>
        <ShortInputContainer>
          <FormInputLabel htmlFor="name">Name</FormInputLabel>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => onRecipeFormChange(e)}
            required
          />
        </ShortInputContainer>
        <ShortInputContainer>
          <FormInputLabel htmlFor="image">Image url</FormInputLabel>
          <LongInputContainer>
            <LongInput
              type="text"
              name="image"
              id="image"
              onChange={(e) => onRecipeFormChange(e)}
              required
            />
            <EmbeddedButton onClick={(e) => onImageFormSubmit(e)}>
              Add
            </EmbeddedButton>
          </LongInputContainer>
        </ShortInputContainer>
        {imageList.length > 0 && (
          <ul>
            {imageList.map((image, index) => (
              <li key={index}>{image}</li>
            ))}
          </ul>
        )}
        <ShortInputContainer>
          <FormInputLabel htmlFor="description">Description</FormInputLabel>
          <input
            type="text"
            name="description"
            id="description"
            onChange={(e) => onRecipeFormChange(e)}
          />
        </ShortInputContainer>
        <ShortInputContainer>
          <FormInputLabel htmlFor="prepTime">Prep time(minutes)</FormInputLabel>
          <input
            type="number"
            name="prepTime"
            id="prepTime"
            onChange={(e) => onRecipeFormChange(e)}
            min="0"
          />
        </ShortInputContainer>
        <ShortInputContainer>
          <FormInputLabel htmlFor="cookTime">Cook time(minutes)</FormInputLabel>
          <input
            type="number"
            name="cookTime"
            id="cookTime"
            min="0"
            onChange={(e) => onRecipeFormChange(e)}
          />
        </ShortInputContainer>
        <ShortInputContainer>
          <FormInputLabel htmlFor="category">Category</FormInputLabel>
          <input
            type="text"
            name="recipeCategory"
            id="recipeCategory"
            onChange={(e) => onRecipeFormChange(e)}
          />
        </ShortInputContainer>
        <ShortInputContainer>
          <FormInputLabel htmlFor="portions">Portions</FormInputLabel>
          <input
            type="text"
            name="recipeYield"
            id="recipeYield"
            onChange={(e) => onRecipeFormChange(e)}
          />
        </ShortInputContainer>
        <ShortInputContainer>
          <FormInputLabel htmlFor="ingredients">Ingredients</FormInputLabel>
          <LongInputContainer>
            <LongInput
              type="text"
              name="recipeIngredient"
              id="recipeIngredient"
              onChange={(e) => onRecipeFormChange(e)}
            />
            <EmbeddedButton onClick={(e) => onRecipeIngredientFormSubmit(e)}>
              Add
            </EmbeddedButton>
          </LongInputContainer>
        </ShortInputContainer>
        {recipeIngredientList.length > 0 && (
          <IngredientList>
            {recipeIngredientList.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </IngredientList>
        )}
        <ShortInputContainer>
          <FormInputLabel htmlFor="instructions">Instructions</FormInputLabel>
          <InputButton onClick={() => setAddInstruction((prev) => !prev)}>
            {addInstruction ? "Hide" : "Add instructions"}
          </InputButton>
        </ShortInputContainer>
        {addInstruction && (
          <InstructionForm>
            <ShortInputContainer>
              <FormInputLabel htmlFor="instructionName">Name</FormInputLabel>
              <input
                type="text"
                name="instructionName"
                id="instructionName"
                onChange={(e) => onInstructionFormChange(e)}
              />
            </ShortInputContainer>
            <ShortInputContainer>
              <FormInputLabel htmlFor="instruction">Text</FormInputLabel>
              <input
                type="text"
                name="instructionText"
                id="instructionText"
                onChange={(e) => onInstructionFormChange(e)}
              />
            </ShortInputContainer>
            <button onClick={(e) => onInstructionFormSubmit(e)}>Add</button>
          </InstructionForm>
        )}
        {recipeInstructions.length > 0 && (
          <ul>
            {recipeInstructions.map((instruction, index) => (
              <li key={index}>{instruction.text}</li>
            ))}
          </ul>
        )}
        <CreateRecipeButton onClick={(e) => onRecipeFormSubmit(e)}>
          Create recipe
        </CreateRecipeButton>
      </RecipeForm>
      <p>{urlError}</p>
      <LongInputContainer>
        <LongInput
          type="text"
          name="url"
          id="url"
          placeholder="Url"
          onChange={(e) => onRecipeFormChange(e)}
        />
        <EmbeddedButton onClick={(e) => fetchData(e)}>fetch</EmbeddedButton>
      </LongInputContainer>
      {recipe && <RecipeItem recipe={recipe}></RecipeItem>}
    </>
  );
};
