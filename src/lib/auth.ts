import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("MONGODB_URI must be set to use authentication.");
}

const globalForMongo = globalThis as typeof globalThis & {
  authMongoClient?: MongoClient;
};

// Reuse the connection pool when Next.js reloads modules during development.
const client = globalForMongo.authMongoClient ?? new MongoClient(mongoUri);
if (process.env.NODE_ENV !== "production") {
  globalForMongo.authMongoClient = client;
}
const db = client.db("booknook_db");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [jwt()],
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },
});
