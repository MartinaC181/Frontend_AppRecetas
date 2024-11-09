'use client';

import useFetch from "@/hooks/useFetchRecipe";
import { IRecipe } from "@/interfaces";
import { Key } from "react";


export default function DataRecipe(){

    const { data, loading, error } = useFetch("http://localhost:5000/api/recipe");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>No data</p>;


    return ( 
        <div className="relative w-full flex flex-col items-center">
            <div className="flex flex-wrap justify-center items-center mt-10 sm:gap-2 md:gap-4 lg:gap-6">
                {data.map((recipe: IRecipe, index: Key) => (
                <div key={index} className="w-80 h-80 bg-white shadow-lg rounded-lg overflow-hidden m-4">
                    <img className="w-full h-56 object-cover object-center" src={recipe.image} alt="recipe" />
                    <div className="flex items-center justify-between px-2 py-2 bg-gray-800">
                        <h1 className="text-white font-bold text-xl">{recipe.title}</h1>
                    </div>
                    <div className="flex items-center justify-between px-2 py-2 bg-gray-800">
                        <span className="text-white text-sm">{recipe.description}</span>
                    </div>
                </div>
            ))}
            </div>
      </div>
    )
}