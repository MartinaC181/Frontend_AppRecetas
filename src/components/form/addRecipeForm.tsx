'use client';
import * as React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export function CardWithForm() {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      title: formData.get('title'),
      category: formData.get('category'),
      description: formData.get('description'),
      image: formData.get('url'),
      ingredients: formData.get('ingredients')?.toString().split(',') || [],
      steps: formData.get('steps')?.toString().split(',') || [],
    };

    try {
      const response = await fetch('http://localhost:5000/api/recipe/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  };

  return (
    <Card className="w-[350px] bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
      <CardHeader>
        <CardTitle>New Recipe</CardTitle>
        <CardDescription>Add a new recipe for others to use</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Name of the recipe" className="bg-gray-100 dark:bg-gray-700" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Description of the recipe" className="bg-gray-100 dark:bg-gray-700" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" placeholder="URL of the image" className="bg-gray-100 dark:bg-gray-700" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Input id="ingredients" placeholder="List of ingredients" className="bg-gray-100 dark:bg-gray-700" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="steps">Steps</Label>
              <Input id="steps" placeholder="Steps to prepare the recipe" className="bg-gray-100 dark:bg-gray-700" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </CardFooter>
    </Card>
  )
}
