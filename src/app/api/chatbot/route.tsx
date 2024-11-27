import { NextResponse } from "next/server";
import { Wit } from "node-wit";
import clientPromise from "@/lib/mongodb"; // Importa la conexión a MongoDB

// Configura Wit.ai
const accessToken = process.env.WITAI_SERVER_ACCESS_TOKEN;
if (!accessToken) {
  throw new Error("WITAI_SERVER_ACCESS_TOKEN no está definido");
}
const client = new Wit({ accessToken });

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Valida el mensaje del usuario
    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "El mensaje es requerido y debe ser un string" },
        { status: 400 }
      );
    }

    // Conecta a MongoDB con manejo de errores
    let mongoClient;
    try {
      console.log("Intentando conectar con MongoDB...");
      mongoClient = await clientPromise;
      console.log("Conexión exitosa a MongoDB");
    } catch (mongoError) {
      console.error("Error conectando a MongoDB:", mongoError);
      console.log("Revisando URI:", process.env.DB_URI);
      throw new Error("Error conectando a la base de datos. Verifica tu URI y red.");
    }

    const db = mongoClient.db("test"); // Base de datos
    const recetasCollection = db.collection("recipes"); // Colección

    // Procesa el mensaje con Wit.ai
    const witResponse = await client.message(body.message, {});
    console.log("Respuesta de Wit.ai:", JSON.stringify(witResponse, null, 2));

    const { intents, entities } = witResponse;

    // Identifica la intención principal
    const intent = intents[0]?.name || "unknown";
    let reply;

    switch (intent) {
      case "find_recipe":
        const receta = await recetasCollection.findOne({ title: new RegExp(body.message, "i") });
        if (receta) {
          reply = `Encontré esta receta: ${receta.title}. Descripción: ${receta.description}.`;
        } else {
          reply = "Lo siento, no encontré una receta con ese nombre.";
        }
        break;

      case "get_recipe_by_ingredient":
        const ingrediente = entities.ingredient?.[0]?.value;
        if (ingrediente) {
          const recetas = await recetasCollection
            .find({ ingredients: { $regex: new RegExp(ingrediente, "i") } })
            .toArray();
          if (recetas.length > 0) {
            const nombresRecetas = recetas.map((r) => r.title).join(", ");
            reply = `Recetas con ${ingrediente}: ${nombresRecetas}.`;
          } else {
            reply = `No encontré recetas con el ingrediente: ${ingrediente}.`;
          }
        } else {
          reply = "Por favor, dime un ingrediente para buscar recetas.";
        }
        break;

      case "greet":
        reply = "¡Hola! ¿En qué puedo ayudarte?";
        break;

      case "thank_you":
        reply = "¡De nada! Estoy aquí para ayudarte.";
        break;

      case "goodbye":
        reply = "¡Hasta luego! Que tengas un buen día.";
        break;

      default:
        reply = "Lo siento, no entendí tu mensaje. ¿Puedes intentarlo de nuevo?";
    }

    // Devuelve la respuesta generada
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error al procesar el mensaje:", error);
    return NextResponse.json(
      { error: "Hubo un error interno. Por favor, intenta de nuevo más tarde." },
      { status: 500 }
    );
  }
}
