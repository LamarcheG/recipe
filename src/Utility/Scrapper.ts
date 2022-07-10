import { IInstructions, IRecipe } from "Interfaces/GlobalInterfaces";

const getHtml = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const data = await response.text();
  return data;
};

const extractJson = (html: string) => {
  const startTag = "application/ld+json";
  html = html.slice(html.indexOf("{", html.indexOf(startTag)));
  const endTag = "</script>";
  const end = html.indexOf(endTag, 0);
  const json = html.substring(0, end);
  const recipe = JSON.parse(json);
  console.log(recipe);
  return recipe;
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
    json["@graph"].forEach((item: any) => {
      if (item["@type"] === "Recipe") {
        recipe = item;
      }
    });
    return recipe;
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
  const recipe = buildRecipeObject(extractRecipeJson(extractJson(html)));
  return recipe;
};
