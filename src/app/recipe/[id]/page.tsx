import OneRecipe from "@/components/recipe/data/oneRecipe";


export default async function OneRecipePage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
  return (
    <div className="relative py-4">
      <OneRecipe id={id} />
    </div>
  );
}