// src/app/api/chatbot/route.tsx
import { NextResponse } from 'next/server';
import { Wit } from 'node-wit';

// Verifica que el token de acceso está definido en las variables de entorno
const accessToken = process.env.WITAI_SERVER_ACCESS_TOKEN;
console.log("Token de Wit.ai:", accessToken); // Verifica en la terminal si aparece correctamente

if (!accessToken) {
  throw new Error('WITAI_SERVER_ACCESS_TOKEN is not defined');
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
    // Parsea el cuerpo de la solicitud y tipifica la estructura esperada
    const body: ChatbotRequest = await req.json();

    // Asegúrate de que el mensaje exista
    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'El mensaje es requerido y debe ser un string' },
        { status: 400 }
      );
    }

    // Envía el mensaje a Wit.ai
    const response = await client.message(body.message, {});
    const { intents, entities, text } = response;

    // Devuelve la respuesta procesada
    return NextResponse.json({ intents, entities, text });
  } catch (error) {
    console.error('Error al procesar el mensaje:', error);
    return NextResponse.json(
      { error: 'Error al procesar el mensaje.' },
      { status: 500 }
    );
  }
}
