import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CardWithForm() {
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
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" className="bg-gray-100 dark:bg-gray-700" />
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
        <Button>Add</Button>
      </CardFooter>
    </Card>
  )
}
