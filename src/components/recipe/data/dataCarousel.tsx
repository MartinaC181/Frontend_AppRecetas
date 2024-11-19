'use client';

import useFetch from "@/hooks/useFetchRecipe";
import Autoplay from 'embla-carousel-autoplay'
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"



export default function DataCarousel(){

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    
    const { data, loading, error } = useFetch("http://localhost:5000/api/recipe");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>No data</p>;


    return ( 
        <div className="flex flex-col justify-center items-center h-screen ">
        <h1 className="text-3xl font-bold mb-4">The Best Recipes of the Week</h1>
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-xs"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {data.map((recipe: any, index: number) => (
              <CarouselItem key={index} className="pl-2 md:pl-4">
                <div className="p-1">
                  <Card className="shadow-lg rounded-lg overflow-hidden border border-gray-300 bg-gray-100">
                    <CardContent className="p-4">
                      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover mb-4" />
                      <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
                      <p className="text-gray-700">{recipe.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    )
}