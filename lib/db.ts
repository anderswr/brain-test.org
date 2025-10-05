// /lib/db.ts
import { MongoClient, Db, Collection, Document } from "mongodb";

// Cache klient mellom hot reloads (Next.js Dev)
declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | null;
  // eslint-disable-next-line no-var
  var _mongoDb: Db | null;
}

let client: MongoClient | null = global._mongoClient || null;
let db: Db | null = global._mongoDb || null;

export async function getDb(): Promise<Db> {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "iq_test";
  if (!uri) throw new Error("Missing MONGODB_URI environment variable.");

  // Opprett én global klient for hele livssyklusen
  if (!client) {
    client = new MongoClient(uri, {
      maxPoolSize: 10,
      connectTimeoutMS: 10_000
    });
    await client.connect();
    db = client.db(dbName);

    // cache for dev hot-reload
    global._mongoClient = client;
    global._mongoDb = db;
  } else if (!db) {
    db = client.db(dbName);
  }

  return db;
}

export async function getCollection<T extends Document>(name: string): Promise<Collection<T>> {
  const database = await getDb();
  return database.collection<T>(name);
}
