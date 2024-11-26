

export interface IRecipe {
    id: string | undefined | ObjectId;
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