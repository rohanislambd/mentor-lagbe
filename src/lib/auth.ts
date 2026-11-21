import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

const uri = process.env.MONGODB_URI as string;

// Reuse MongoClient across serverless invocations to prevent topology closed errors
const client =
  globalThis._mongoClient ??
  new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });

if (!globalThis._mongoClient) {
  globalThis._mongoClient = client;
}

const db = client.db("mentor-lagbe");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
    transaction: false,
  }),
  emailAndPassword: {
    enabled: true,
  },
   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
  user: {
    additionalFields: {
      role: {
        type: ["student", "tutor", "admin"],
        required: false,
        defaultValue: "student",
        input: true, // Allows 'student' or 'tutor' selection during sign up
      },
      plan: {
        type: ["free", "pro"],
        required: false,
        defaultValue: "free",
        input: false, // Default to 'free', upgraded via Stripe payment
      },
      phone: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      bio: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
    },
  },
  plugins: [
        jwt(), 
    ],
    session:{
      cookieCache:{
        enabled: true,
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60
      }
    }
});