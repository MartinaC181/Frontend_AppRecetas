

export interface IRecipe {
    id: string | undefined;
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
    image: string;
    createdAt: string;
}

export interface RecipeListProps {
    url: string;
  }