import { NextResponse } from "next/server";
import { Wit } from "node-wit";
import clientPromise from "@/lib/mongodb";

// Configura Wit.ai
const accessToken = process.env.WITAI_SERVER_ACCESS_TOKEN;
if (!accessToken) {
  throw new Error("WITAI_SERVER_ACCESS_TOKEN no está definido");
}
const client = new Wit({ accessToken });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "El mensaje es requerido y debe ser un string" },
        { status: 400 }
      );
    }

    const mongoClient = await clientPromise;
    const db = mongoClient.db("test");
    const recetasCollection = db.collection("recipes");

    const witResponse = await client.message(body.message, {});
    console.log("Respuesta de Wit.ai:", JSON.stringify(witResponse, null, 2));

    const intents = witResponse.entities?.intent || [];
    const recipeEntities = witResponse.entities?.recipe || [];
    const ingredientEntities = witResponse.entities?.ingredient || [];
    const intent = intents.length > 0 ? intents[0].value : "unknown";

    let reply;

    switch (intent) {
      case "greet":
        reply = "¡Hola! ¿En qué puedo ayudarte?";
        break;

      case "thank_you":
        reply = "¡De nada! Estoy aquí para ayudarte.";
        break;

      case "goodbye":
        reply = "¡Hasta luego! Que tengas un buen día.";
        break;

      case "find_recipe":
        if (recipeEntities.length > 0) {
          const recipeName = recipeEntities[0]?.value;
          const receta = await recetasCollection.findOne({ title: new RegExp(recipeName, "i") });
          if (receta) {
            reply = `Encontré esta receta: ${receta.title}. Descripción: ${receta.description}.`;
          } else {
            reply = "Lo siento, no encontré una receta con ese nombre.";
          }
        } else {
          reply = "Por favor, dime el nombre de la receta que buscas.";
        }
        break;

      case "get_recipe_by_ingredient":
        if (ingredientEntities.length > 0) {
          const ingredient = ingredientEntities[0]?.value;
          const recetas = await recetasCollection
            .find({ ingredients: { $regex: new RegExp(ingredient, "i") } })
            .toArray();
          if (recetas.length > 0) {
            const recipeTitles = recetas.map((receta) => receta.title).join(", ");
            reply = `Recetas con ${ingredient}: ${recipeTitles}.`;
          } else {
            reply = `No encontré recetas con el ingrediente: ${ingredient}.`;
          }
        } else {
          reply = "Por favor, dime un ingrediente para buscar recetas.";
        }
        break;

      case "get_recipe_description":
        if (recipeEntities.length > 0) {
          const recipeName = recipeEntities[0]?.value;
          const receta = await recetasCollection.findOne({ title: new RegExp(recipeName, "i") });
          if (receta) {
            reply = `Descripción de ${receta.title}: ${receta.description}.`;
          } else {
            reply = "Lo siento, no encontré la descripción de esa receta.";
          }
        } else {
          reply = "Por favor, dime el nombre de la receta para obtener su descripción.";
        }
        break;

      case "get_recipe_steps":
        if (recipeEntities.length > 0) {
          const recipeName = recipeEntities[0]?.value;
          const receta = await recetasCollection.findOne({ title: new RegExp(recipeName, "i") });
          if (receta) {
            reply = `Pasos para ${receta.title}: ${receta.steps.join(", ")}.`;
          } else {
            reply = "Lo siento, no encontré los pasos para esa receta.";
          }
        } else {
          reply = "Por favor, dime el nombre de la receta para obtener sus pasos.";
        }
        break;

      default:
        reply = "Lo siento, no entendí tu mensaje. ¿Puedes intentarlo de nuevo?";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error al procesar el mensaje:", error);
    return NextResponse.json(
      { error: "Hubo un error interno. Por favor, intenta de nuevo más tarde." },
      { status: 500 }
    );
  }
}
