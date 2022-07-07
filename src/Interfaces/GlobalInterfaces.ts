export interface IRecipe {
  name: string;
  image: string[];
  description?: string; //A short summary describing the dish.
  prepTime?: number;
  cookTime?: number;
  recipeIngredient?: string[];
  recipeInstructions?: IInstructions[];
  recipeCategory?: string; //The type of meal or course your recipe is about. For example: "dinner", "main course", or "dessert, snack".
  datePublished?: string;
  recipeYield?: string | number; // The quantity produced by the recipe. Specify the number of servings produced from this recipe with just a number.
}

export interface IInstructions {
  type: "HowToStep" | "HowToSection";
  text: string; //The full instruction text of this step
  name?: string; //The word or short phrase summarizing the step
  url?: string; //A URL that directly links to the step (if one is available). For example, an anchor link fragment.
  image?: string; //An image for the step.
}
