'use client';
import * as React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CardWithForm() {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      image: formData.get('url'),
      ingredients: (formData.get('ingredients') as string).split(','),
      steps: (formData.get('steps') as string).split(','),
    };

    if (!data.title || !data.description || !data.image || !data.ingredients.length || !data.steps.length) {
      toast.error('Todos los campos son obligatorios.');
      return;
    }

    fetch(process.env.NEXT_PUBLIC_API_RECIPE as string + "/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
      toast.success('¡Receta enviada con éxito!');
      console.log('Success:', result);
    })
    .catch(error => {
      toast.error('Error al enviar la receta.');
      console.error('Error:', error);
    });
  }

  return (
    <>
      <ToastContainer />
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Nueva Receta</CardTitle>
          <CardDescription>Agrega una nueva receta para que otros la usen</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Título</Label>
                <Input id="title" name="title" placeholder="Nombre" className="bg-gray-100 dark:bg-gray-700" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Descripción</Label>
                <Input id="description" name="description" placeholder="Descripción" className="bg-gray-100 dark:bg-gray-700" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="ingredients">Ingredientes</Label>
                <Input id="ingredients" name="ingredients" placeholder="ingredientes separados por comas" className="bg-gray-100 dark:bg-gray-700" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="steps">Pasos</Label>
                <Input id="steps" name="steps" placeholder="pasos separados por comas" className="bg-gray-100 dark:bg-gray-700" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">URL de la Imagen</Label>
                <Input id="image" name="url" placeholder="URL de la imagen" className="bg-gray-100 dark:bg-gray-700" />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline">Cancelar</Button>
              <Button type="submit">Agregar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
