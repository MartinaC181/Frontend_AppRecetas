

export interface IRecipe {
    _id: string | undefined;
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
    Image: string;
    createdAt: string;
}

export interface RecipeProps {
    _id: string;
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
    Image: string;
}

export interface RecipeListProps {
    url: string;
  }