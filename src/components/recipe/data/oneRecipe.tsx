'use client';

import useFetchOneRecipe from "@/hooks/useFetchOneRecipe";
import { IRecipe } from "@/interfaces";



//conexion a la API para traer una sola rceta
export default function OneRecipe({ id }: { id: string }) {

    const { data } = useFetchOneRecipe(`${process.env.NEXT_PUBLIC_API_RECIPE}/${id}`);
     
    if (!data) return <p>No data</p>;

    const recipe = data as IRecipe;

    return (
        <div className="flex flex-wrap gap-4 mt-20 justify-center">
            <div key={recipe._id} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
                <img className="w-full h-64 object-cover rounded-md mb-4" src={recipe.image} alt={recipe.title} />
                <p className="text-lg text-gray-600 mb-2">{recipe.description}</p>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Ingredientes:</h2>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.trim()}</li>
                    ))}
                </ul>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Pasos:</h2>
                <ol className="list-decimal list-inside text-gray-600">
                    {recipe.steps.map((step, index) => (
                        <li key={index} className="mb-2">{step.trim()}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}