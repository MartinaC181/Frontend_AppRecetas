/* eslint-disable @next/next/no-img-element */
'use client';

import useFetch from "@/hooks/useFetchRecipe";
import { IRecipe } from "@/interfaces";
import { useRouter } from "next/navigation";

export default function DataRecipe(){
    const router = useRouter();
    const { data, loading, error } = useFetch(process.env.NEXT_PUBLIC_API_RECIPE as string);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>No data</p>;

    const handleClick = (id: string) => {
        router.push(`/recipe/${id}`);
    }

    return ( 
        <div className="relative w-full flex flex-col items-center">
            <div className="flex flex-wrap justify-center items-center mt-10 sm:gap-2 md:gap-4 lg:gap-6">
                {data.map((recipe: IRecipe, index: number) => (
                <div key={`${recipe._id}-${index}`} className="w-80 h-80 bg-white shadow-lg rounded-lg overflow-hidden m-4"
                onClick={() => recipe._id && handleClick(recipe._id)}
                >
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
    );
}