import { IInstructions } from "Interfaces/GlobalInterfaces";

//function that convert from P3Y6M4DT12H30M5S to 3 years, 6 months, 4 days, 12 hours, 30 minutes, 5 seconds
export const convertFromISO = (time: string): string => {
  const [, years, months, days, hours, minutes, seconds] = time.match(
    /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  )!;
  const yearsString = years && years !== "0" ? `${years} years` : "";
  const monthsString = months && months !== "0" ? `${months} months` : "";
  const daysString = days && days !== "0" ? `${days} days` : "";
  const hoursString = hours && hours !== "0" ? `${hours}h` : "";
  const minutesString = minutes && minutes !== "0" ? `${minutes} min` : "";
  const secondsString = seconds && seconds !== "0" ? `${seconds} sec` : "";
  const timeStringArray = [
    yearsString,
    monthsString,
    daysString,
    hoursString,
    minutesString,
    secondsString,
  ];
  const timeStringArrayFiltered = timeStringArray.filter(
    (timeString) => timeString !== ""
  );
  const result = timeStringArrayFiltered.join(":");
  return result;
};

//convert from minutes to P3Y6M4DT12H30M5S
export const convertToISO = (time: number): string => {
  const years = Math.floor(time / 525600);
  const months = Math.floor((time % 525600) / 43200);
  const days = Math.floor((time % 43200) / 1440);
  const hours = Math.floor((time % 1440) / 60);
  const minutes = Math.floor(time % 60);
  const seconds = 0;
  const result = `P${years}Y${months}M${days}DT${hours}H${minutes}M${seconds}S`;
  return result;
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
