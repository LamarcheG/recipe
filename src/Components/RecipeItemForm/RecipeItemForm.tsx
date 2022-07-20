import { IRecipe, IInstructions } from "Interfaces/GlobalInterfaces";
import React, { useEffect, useState } from "react";
import { scrapper } from "Utility/Scrapper";
import { isImage, isValidUrl } from "Utility/Utility";
import { ImageItem } from "./ImageItem/ImageItem";
import { IngredientItem } from "./IngredientItem/IngredientItem";
import { InstructionItem } from "./InstructionItem/InstructionItem";
import {
  EmbeddedButton,
  ShortInputContainer,
  FormInputLabel,
  InputButton,
  InstructionForm,
  LongInputContainer,
  RecipeForm,
  LongInput,
  IngredientList,
  CreateRecipeButton,
  ImageList,
  InstructionList,
} from "./RecipeItemForm.style";

interface RecipeItemFormProps {
  addRecipe: (recipe: IRecipe) => void;
}

export const RecipeItemForm: React.FC<RecipeItemFormProps> = ({
  addRecipe,
}: RecipeItemFormProps) => {
  const [recipe, setRecipe] = useState<IRecipe>();

  //states for recipe
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imageList, setImageList] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("0");
  const [cookTime, setCookTime] = useState("0");
  const [recipeIngredient, setRecipeIngredient] = useState("");
  const [recipeIngredientList, setRecipeIngredientList] = useState<string[]>(
    []
  );
  const [recipeInstructions, setRecipeInstructions] = useState<IInstructions[]>(
    []
  );
  const [recipeCategory, setRecipeCategory] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [recipeYield, setRecipeYield] = useState<string | number>("");

  //states for the instructions
  const [instructionText, setInstructionText] = useState("");
  const [instructionId, setInstructionId] = useState(-1);

  //states for the scrapper
  const [recipeUrl, setRecipeUrl] = useState("");
  const [urlError, setUrlError] = useState<string>();
  const [addInstruction, setAddInstruction] = useState<boolean>(false);

  useEffect(() => {
    if (recipe) {
      addRecipe(recipe);
    }
  }, [recipe]);

  const fetchData = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!isValidUrl(recipeUrl)) {
      setUrlError("Invalid URL");
      return;
    }
    const data = await scrapper(recipeUrl);
    if (data) {
      setName(data.name);
      setImageList(data.image);
      setDescription(data.description ? data.description : "");
      setPrepTime(data.prepTime ? data.prepTime : "");
      setCookTime(data.cookTime ? data.cookTime : "");
      if (data.recipeIngredient) {
        setRecipeIngredientList(data.recipeIngredient);
      }
      if (data.recipeInstructions) {
        setRecipeInstructions(data.recipeInstructions);
      }
      setRecipeCategory(data.recipeCategory ? data.recipeCategory : "");
      setDatePublished(data.datePublished ? data.datePublished : "");
      setRecipeYield(data.recipeYield ? data.recipeYield : "");
    }
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
      if (isNaN(Number(e.target.value))) {
        return;
      }
      setPrepTime(e.target.value);
    }
    if (e.target.name === "cookTime") {
      if (isNaN(Number(e.target.value))) {
        return;
      }
      setCookTime(e.target.value);
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
    if (e.target.name === "instructionId") {
      setInstructionId(Number(e.target.value));
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
      text: instructionText,
    };
    setInstructionText("");
    //add the instruction to the list at the correct index
    setRecipeInstructions((prev) => {
      const newInstructions = [...prev];
      newInstructions.splice(instructionId - 1, 0, newInstruction);
      return newInstructions;
    });
    setInstructionId(-1);
  };

  const onRecipeFormSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newRecipe: IRecipe = {
      name,
      image: imageList ? imageList : [],
      description,
      prepTime: prepTime,
      cookTime: cookTime,
      recipeIngredient: recipeIngredientList,
      recipeInstructions,
      recipeCategory,
      datePublished,
      recipeYield,
    };
    setRecipe(newRecipe);
  };

  const onDeleteImage = (index: number) => {
    setImageList((prev) => {
      const newImageList = [...prev];
      newImageList.splice(index, 1);
      return newImageList;
    });
  };

  const onDeleteRecipeIngredient = (index: number) => {
    setRecipeIngredientList((prev) => {
      const newRecipeIngredientList = [...prev];
      newRecipeIngredientList.splice(index, 1);
      return newRecipeIngredientList;
    });
  };

  const onDeleteRecipeInstruction = (index: number) => {
    setRecipeInstructions((prev) => {
      const newRecipeInstructions = [...prev];
      newRecipeInstructions.splice(index, 1);
      return newRecipeInstructions;
    });
  };

  return (
    <>
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
      <RecipeForm>
        <ShortInputContainer>
          <FormInputLabel htmlFor="name">Name</FormInputLabel>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => onRecipeFormChange(e)}
            value={name}
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
            />
            <EmbeddedButton onClick={(e) => onImageFormSubmit(e)}>
              Add
            </EmbeddedButton>
          </LongInputContainer>
        </ShortInputContainer>
        {imageList.length > 0 && (
          <ImageList>
            {imageList.map((image, index) => (
              <ImageItem
                key={index}
                index={index}
                image={image}
                onDeleteImage={onDeleteImage}
              ></ImageItem>
            ))}
          </ImageList>
        )}
        <ShortInputContainer>
          <FormInputLabel htmlFor="description">Description</FormInputLabel>
          <input
            type="text"
            name="description"
            id="description"
            onChange={(e) => onRecipeFormChange(e)}
            value={description}
          />
        </ShortInputContainer>
        <ShortInputContainer>
          <FormInputLabel htmlFor="prepTime">Prep time(minutes)</FormInputLabel>
          <input
            type="text"
            name="prepTime"
            id="prepTime"
            min="0"
            onChange={(e) => onRecipeFormChange(e)}
            value={prepTime}
          />
        </ShortInputContainer>
        <ShortInputContainer>
          <FormInputLabel htmlFor="cookTime">Cook time(minutes)</FormInputLabel>
          <input
            type="text"
            name="cookTime"
            id="cookTime"
            min="0"
            onChange={(e) => onRecipeFormChange(e)}
            value={cookTime}
          />
        </ShortInputContainer>
        <ShortInputContainer>
          <FormInputLabel htmlFor="category">Category</FormInputLabel>
          <input
            type="text"
            name="recipeCategory"
            id="recipeCategory"
            onChange={(e) => onRecipeFormChange(e)}
            value={recipeCategory}
          />
        </ShortInputContainer>
        <ShortInputContainer>
          <FormInputLabel htmlFor="portions">Portions</FormInputLabel>
          <input
            type="text"
            name="recipeYield"
            id="recipeYield"
            onChange={(e) => onRecipeFormChange(e)}
            value={recipeYield}
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
              <IngredientItem
                key={index}
                index={index}
                ingredient={ingredient}
                onDeleteRecipeIngredient={onDeleteRecipeIngredient}
              ></IngredientItem>
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
              <FormInputLabel htmlFor="instructionId">Step #</FormInputLabel>
              <input
                type="number"
                min={1}
                name="instructionId"
                id="instructionId"
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
          <InstructionList>
            {recipeInstructions.map((instruction, index) => (
              <InstructionItem
                key={index}
                index={index}
                instruction={instruction}
                onDeleteRecipeInstruction={onDeleteRecipeInstruction}
              ></InstructionItem>
            ))}
          </InstructionList>
        )}
        <CreateRecipeButton onClick={(e) => onRecipeFormSubmit(e)}>
          Create recipe
        </CreateRecipeButton>
      </RecipeForm>
    </>
  );
};
