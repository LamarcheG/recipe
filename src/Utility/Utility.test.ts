import { IInstructions } from "Interfaces/GlobalInterfaces";
import {
  convertFromISO,
  removeSpecialCharacters,
  removeSpecialCharactersFromIngredients,
  removeSpecialCharactersFromInstructions,
  isValidUrl,
  isImage,
} from "./Utility";

describe("Utility", () => {
  it("should convert from ISO", () => {
    const time = "P3Y6M4DT12H30M5S";
    const total = convertFromISO(time);
    expect(total).toBe("1842510");
    const time2 = "P0Y0M0DT0H0M0S";
    const total2 = convertFromISO(time2);
    expect(total2).toBe("0");
    const time3 = "P0Y0M0DT2H60M0S";
    const total3 = convertFromISO(time3);
    expect(total3).toBe("180");
  });
  it("should remove special characters", () => {
    const string = "&quot;&amp;&#39;";
    const result = removeSpecialCharacters(string);
    expect(result).toBe("");
    const string2 = "Test&quot;&amp;&#39;1";
    const result2 = removeSpecialCharacters(string2);
    expect(result2).toBe("Test1");
  });
  it("should remove special characters from ingredients", () => {
    const ingredients = ["&quot;&amp;&#39;", "Test&quot;&amp;&#39;1"];
    const result = removeSpecialCharactersFromIngredients(ingredients);
    expect(result).toEqual(["", "Test1"]);
  });
  it("should remove special characters from instructions", () => {
    const instructions: IInstructions[] = [
      {
        type: "HowToStep",
        text: "&quot;&amp;&#39;",
      },
      {
        type: "HowToStep",
        text: "Test&quot;&amp;&#39;1",
      },
    ];
    const result = removeSpecialCharactersFromInstructions(instructions);
    expect(result).toEqual([
      { type: "HowToStep", text: "" },
      { type: "HowToStep", text: "Test1" },
    ]);
  });
  it("should verify if url is valid", () => {
    const url = "http://www.test.com";
    const result = isValidUrl(url);
    expect(result).toBe(true);
    const url2 = "https://www.test.com";
    const result2 = isValidUrl(url2);
    expect(result2).toBe(true);
    const url3 = "www.test.com";
    const result3 = isValidUrl(url3);
    expect(result3).toBe(false);
  });
  it("should verify if url is an image", () => {
    const url = "http://www.test.com/image.jpg";
    const result = isImage(url);
    expect(result).toBe(true);
    const url2 = "http://www.test.com/image.png";
    const result2 = isImage(url2);
    expect(result2).toBe(true);
    const url3 = "http://www.test.com/image.gif";
    const result3 = isImage(url3);
    expect(result3).toBe(true);
    const url4 = "http://www.test.com/image.jpeg";
    const result4 = isImage(url4);
    expect(result4).toBe(true);
    const url5 = "www.test.com/image.com";
    const result5 = isImage(url5);
    expect(result5).toBe(false);
  });
});
