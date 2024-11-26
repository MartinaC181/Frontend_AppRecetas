import OneRecipe from "@/components/recipe/data/oneRecipe";


export default function OneRecipePage( {params} : {params: { id: string }} ) {
  const { id } = params;

    return (
        <div className="relative py-4">
            <OneRecipe id={id} />
        </div>
    );
}