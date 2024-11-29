'use client';
import DataRecipe from "@/components/recipe/data/recipes";
import React from "react";
import CardWithForm from "@/components/form/addRecipeForm";


export default function RecipePage(): JSX.Element {

    return (
      <div className="bg-gray-100 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-gray-700 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center">Recetas Deliciosas</h1>
            <p className="mt-2 text-lg text-center">Comparte tus recetas favoritas con la comunidad</p>
          </div>
        </header>
  
        {/* Main content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col gap-8 justify-center items-center">
              {/* Formulario de subir receta */}
              <div className="flex justify-center items-center w-full">
                <section className="bg-gray-200 p-8 rounded-lg shadow-md w-full lg:w-1/2 mx-auto">
                  <h2 className="text-3xl font-bold text-gray-900 text-center">Sube tu Receta</h2>
                  <div className="mt-6 flex justify-center">
                    <CardWithForm />
                  </div>
                </section>
              </div>
  
              <div className="flex justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                  <DataRecipe key="data-recipe"/>
              </div>
              
            </div>
          </div>
        </main>
        </div>
      );
  }