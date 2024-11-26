// src/app/api/chatbot/route.tsx
import { NextResponse } from 'next/server';
import { Wit } from 'node-wit';

// Verifica que el token de acceso está definido en las variables de entorno
const accessToken = process.env.WITAI_SERVER_ACCESS_TOKEN;
if (!accessToken) {
  throw new Error('WITAI_SERVER_ACCESS_TOKEN no está definido');
}

// Configura el cliente de Wit.ai
const client = new Wit({
  accessToken,
});

// Define el tipo de la solicitud que se espera
interface ChatbotRequest {
  message: string;
}

// Define el manejador para solicitudes POST
export async function POST(req: Request) {
  try {
    // Parsea el cuerpo de la solicitud
    const body: ChatbotRequest = await req.json();

    // Asegúrate de que el mensaje sea válido
    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'El mensaje es requerido y debe ser un string' },
        { status: 400 }
      );
    }

    // Envía el mensaje a Wit.ai
    const response = await client.message(body.message, {});

    // LOG: Mostrar la respuesta completa de Wit.ai en la consola
    console.log("Respuesta de Wit.ai:", JSON.stringify(response, null, 2));

    // Extraer datos relevantes de la respuesta
    const { intents, entities, text } = response;

    // Procesar la intención principal y generar una respuesta
    const intent = intents[0]?.name || "unknown";
    let reply;

    switch (intent) {
      case "greet":
        reply = "¡Hola! ¿En qué puedo ayudarte?";
        break;
      case "find_recipe":
        reply = "¿Qué ingredientes tienes o qué tipo de receta buscas?";
        break;
      case "get_recipe_by_ingredient":
        reply = "Por favor, dime los ingredientes para buscar recetas.";
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

    // Devuelve la respuesta procesada
    return NextResponse.json({ reply, intent, entities, text });
  } catch (error) {
    console.error('Error al procesar el mensaje:', error);
    return NextResponse.json(
      { error: 'Error interno al procesar el mensaje. Por favor, intenta de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
