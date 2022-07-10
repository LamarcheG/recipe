import { IInstructions, IRecipe } from "Interfaces/GlobalInterfaces";

const getHtml = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const data = await response.text();
  return data;
};

const extractJsonList = (html: string) => {
  const stringList = html.match(
    /<script.*?type="application\/ld\+json"(.*?)>([\s\S]*?)<\/script>/g
  );

  console.log(stringList);
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

const chooseCorrectMetaData = (json: any) => {
  if (!json) {
    return;
  }
  let result = "";
  json.forEach((item: any) => {
    let temp = extractRecipeJson(item);
    if (temp) {
      result = temp;
    }
  });
  return result;
};

const extractRecipeJson = (json: any) => {
  if (json["@type"] === "Recipe") {
    return json;
  }
  if (json["@type"] === "RecipeCollection") {
    return json.itemListElement[0].item;
  }
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

const buildRecipeObject = (recipeJson: any): IRecipe => {
  const instructionsBySection = recipeJson.recipeInstructions.map(
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
  let instructions: IInstructions[] = [];
  instructionsBySection.forEach((section: any) => {
    if (Array.isArray(section)) {
      instructions = [...instructions, ...section];
    } else {
      instructions.push(section);
    }
  });

  const recipe: IRecipe = {
    name: recipeJson.name,
    image: recipeJson.image,
    description: recipeJson.description,
    prepTime: recipeJson.prepTime,
    cookTime: recipeJson.cookTime,
    recipeIngredient: recipeJson.recipeIngredient,
    recipeInstructions: instructions,
    recipeCategory: recipeJson.recipeCategory,
    datePublished: recipeJson.datePublished,
    recipeYield: recipeJson.recipeYield,
  };
  return recipe;
};

export const scrapper = async (url: string): Promise<IRecipe> => {
  const html = await getHtml(url);
  const jsonList = extractJsonList(html);
  console.log("jsonList", jsonList);
  const json = chooseCorrectMetaData(jsonList);
  console.log("json", json);
  const recipe = buildRecipeObject(json);
  console.log(recipe);
  return recipe;
};
