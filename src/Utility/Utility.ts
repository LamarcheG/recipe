import { IInstructions } from "Interfaces/GlobalInterfaces";

///P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
//function that convert from P3Y6M4DT12H30M5S to minutes
export const convertFromISO = (time: string): string => {
  let total = 0;
  let regex =
    /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  let match = regex.exec(time);
  if (match) {
    total += parseInt(match[1] ? match[1] : "0") * 365 * 24 * 60;
    total += parseInt(match[2] ? match[2] : "0") * 30 * 24 * 60;
    total += parseInt(match[3] ? match[3] : "0") * 24 * 60;
    total += parseInt(match[4] ? match[4] : "0") * 60;
    total += parseInt(match[5] ? match[5] : "0");
  }
  return total.toString();
};

//function to remove &quot; and &amp; and &#39; from the string
export const removeSpecialCharacters = (string: string) => {
  return string
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#039;/g, "'");
};

//function to remove special characters form ingredients
export const removeSpecialCharactersFromIngredients = (
  ingredients: string[]
): string[] => {
  return ingredients.map((ingredient: string) => {
    return removeSpecialCharacters(ingredient);
  });
};

//function to remove special characters form instructions
export const removeSpecialCharactersFromInstructions = (
  instructions: IInstructions[]
): IInstructions[] => {
  return instructions.map((instruction: IInstructions) => {
    return {
      ...instruction,
      text: removeSpecialCharacters(instruction.text),
    };
  });
};

//verify that an input is a valid url
export const isValidUrl = (url: string): boolean => {
  return /^(http|https):\/\/[^ "]+$/.test(url);
};

//verify if url is an image
export const isImage = (url: string): boolean => {
  return /\.(jpeg|jpg|gif|png)$/.test(url);
};
