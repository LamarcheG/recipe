import { IInstructions, IRecipe } from "Interfaces/GlobalInterfaces";
import {
  convertFromISO,
  removeSpecialCharacters,
  removeSpecialCharactersFromIngredients,
  removeSpecialCharactersFromInstructions,
} from "./Utility";

//gets the html from the url
const getHtml = async (url: string): Promise<string> => {
  url = url.replace(/\s/g, "");
  const response = await fetch(url)
    .then((res) => res.text())
    .catch((err) => {
      console.log(err);
      return "";
    });
  return response;
};

//scraps the html form every json obejct
const extractJsonList = (html: string) => {
  const stringList = html.match(
    /<script.*?type="application\/ld\+json"(.*?)>([\s\S]*?)<\/script>/g
  );
  const result = stringList?.map((json: string) => {
    const temp = json.replace(
      /<script.*?type="application\/ld\+json"(.*?)>([\s\S]*?)<\/script>/g,
      "$2"
    );
    return temp;
  });
  const json = result?.map((json: string) => {
    return JSON.parse(json);
  });
  return json;
};

//loops every json object and finds the one with the type recipe
const chooseCorrectMetaData = (json: any) => {
  let result = "";
  json.forEach((item: any) => {
    result = extractRecipeJson(item);
  });
  return result;
};

//extracts the recipe json from the json object
const extractRecipeJson = (json: any) => {
  //if json is a recipe
  if (json["@type"] === "Recipe") {
    return json;
  }
  //if json is a recipe list
  if (json["@type"] === "RecipeCollection") {
    return json.itemListElement[0].item;
  }
  //if json doesnt have a type
  if (!json["@type"]) {
    let recipe = "";
    if (json["@graph"]) {
      json["@graph"].forEach((item: any) => {
        if (item["@type"] === "Recipe") {
          recipe = item;
        }
      });
    }
    if (recipe) {
      return recipe;
    } else {
      return;
    }
  }
};

//flattens the instructions array ex: [[{},{}],[{}]] to [{},{},{}]
const flattenInstructions = (instructionsBySection: any): IInstructions[] => {
  if (!instructionsBySection || instructionsBySection.length === 0) {
    return [];
  }
  let instructions: IInstructions[] = [];
  instructionsBySection.forEach((section: any) => {
    if (Array.isArray(section)) {
      instructions = [...instructions, ...section];
    } else {
      instructions.push(section);
    }
  });
  return instructions;
};

//builds the recipe object from the json object
const buildRecipeObject = (recipeJson: any): IRecipe => {
  const instructionsBySection = recipeJson?.recipeInstructions.map(
    (section: any) => {
      if (section["@type"] === "HowToSection") {
        const sectionSteps = section.itemListElement?.map((step: any) => {
          return {
            type: "HowToStep",
            text: step.text,
            name: step.name,
            url: step.url,
            image: step.image,
          };
        });
        return sectionSteps;
      } else if (section["@type"] === "HowToStep") {
        return {
          type: "HowToStep",
          text: section.text,
          name: section.name,
          url: section.url,
          image: section.image,
        };
      } else {
        return {
          type: "HowToSection",
          text: section,
          name: "",
          url: "",
          image: "",
        };
      }
    }
  );

  const instructions = flattenInstructions(instructionsBySection);

  const recipe: IRecipe = {
    name: recipeJson.name,
    image: recipeJson.image,
    description: removeSpecialCharacters(recipeJson.description),
    prepTime: convertFromISO(recipeJson.prepTime),
    cookTime: convertFromISO(recipeJson.cookTime),
    recipeIngredient: removeSpecialCharactersFromIngredients(
      recipeJson.recipeIngredient
    ),
    recipeInstructions: removeSpecialCharactersFromInstructions(instructions),
    recipeCategory: recipeJson.recipeCategory,
    datePublished: recipeJson.datePublished,
    recipeYield: recipeJson.recipeYield,
  };
  return recipe;
};

export const scrapper = async (url: string) => {
  const html = await getHtml(url);
  if (!html || html === "") {
    console.error("No html found");
    return;
  }
  const jsonList = extractJsonList(html);
  if (!jsonList || jsonList.length === 0) {
    console.error("No MetaData found");
    return;
  }
  const recipeJson = chooseCorrectMetaData(jsonList);
  if (!recipeJson) {
    console.error("No recipe found");
    return;
  }
  return buildRecipeObject(recipeJson);
};
