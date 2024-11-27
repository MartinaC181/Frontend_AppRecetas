import { MongoClient } from "mongodb";

const uri = process.env.DB_URI || ""; // Obtén la URI de tu base de datos desde .env.local
const options = {
  tlsAllowInvalidCertificates: true, // Solo para desarrollo local
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Por favor, agrega tu DB_URI en .env.local");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // En desarrollo, usa un cliente global para evitar crear múltiples conexiones
  if (!global._mongoClientPromise) {
    console.log("Conectando a MongoDB en desarrollo...");
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción, crea un nuevo cliente para cada conexión
  console.log("Conectando a MongoDB en producción...");
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

clientPromise
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

export default clientPromise;
