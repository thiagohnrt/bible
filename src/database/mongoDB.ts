import mongoose, { ConnectionStates } from "mongoose";

export default async function dbConnection() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  const status: ConnectionStates = mongoose.connection.readyState;

  if (status != ConnectionStates.connected) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
}
