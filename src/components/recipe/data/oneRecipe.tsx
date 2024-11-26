'use client';

import useFetch from "@/hooks/useFetchRecipe";
import { IRecipe } from "@/interfaces";

//conexion a la API para traer una sola rceta
export default function OneRecipe({ id } : {id : string}) {

    const { data } = useFetch(process.env.NEXT_PUBLIC_URL_RECIPE as string + '/' + id);
    
    if (!data) return <p>No data</p>;

    const recipe = data as IRecipe;

    return (
        <div className="flex flex-wrap gap-4 mt-20">
                <div key={recipe.id} className="w-[300px] h-[300px] p-4 gap-16px hover:bg-gray-300 bg-white flex flex-col justify-center items-center">
                    <h1 className="text-2xl text-slate-700">{recipe.title}</h1>
                    <p className="text-sm text-slate-500">{recipe.description}</p>
                    <p className="text-sm text-slate-500">{recipe.ingredients}</p>
                    <p className="text-sm text-slate-500">{recipe.steps}</p>
                </div>
        </div>
    )
}