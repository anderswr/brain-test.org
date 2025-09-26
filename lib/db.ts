
import { MongoClient, Db, Collection, Document } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "iq_test";
  if (!uri) throw new Error("Missing MONGODB_URI env var");
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
}

export async function getCollection<T extends Document>(name: string) {
  const d = await getDb();
  return d.collection<T>(name) as Collection<T>;
}
