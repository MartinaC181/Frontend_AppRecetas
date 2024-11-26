import DataRecipe from "@/components/recipe/data/recipes";
import React from "react";
import Link from "next/link";
import { CardWithForm } from "@/components/form/addRecipeForm";

export default function RecipePage(): JSX.Element {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-indigo-600 text-white py-6">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <h1 className="text-3xl font-bold text-center">Recetas Deliciosas</h1>
            <p className="mt-2 text-lg text-center">Comparte tus recetas favoritas con la comunidad</p>
          </div>
        </header>
  
        {/* Main content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Formulario de subir receta */}
              <section className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900">Sube tu Receta</h2>
                {/* Aquí va el componente de tu formulario de subida de receta */}
                {/* Ejemplo de uso */}
                <div className="mt-6">
                  {/* Aquí incluirías tu formulario de subida de recetas */}
                  {/* <RecipeUploadForm /> */}
                  {/* Tu formulario actual aquí */}
                  <CardWithForm />
                </div>
              </section>
  
              {/* Recetas guardadas */}
              <section className="bg-white p-8 rounded-lg shadow-lg">
                  {/* Aquí agregarías un mapeo de las recetas guardadas, por ejemplo */}
                  {/* {recipes.map(recipe => ( <RecipeCard key={recipe.id} recipe={recipe} /> ))} */}
                <DataRecipe />
              </section>
            </div>
          </div>
        </main>   
      </div>
    )
  }