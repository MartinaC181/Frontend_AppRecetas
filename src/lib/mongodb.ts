import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://MartinaC:CKZw4BpIptcTWkfG@app.ennqa.mongodb.net/?retryWrites=true&w=majority&appName=App";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const clientPromise = client.connect();

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await clientPromise;
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

export default clientPromise;
