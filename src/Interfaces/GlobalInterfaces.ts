export interface IRecipe {
  id: number;
  name: string;
  description: string;
  image: string;
  ingredients: IIngredient[];
  instructions: string[];
  category: string;
  date: string;
  user: IUser;
}

export interface IIngredient {
  id: number;
  name: string;
  image: string;
  description: string;
  quantity: number;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  image: string;
}

export interface IInstructions {
  id: number;
  name: string;
  description: string;
  step: number;
}
