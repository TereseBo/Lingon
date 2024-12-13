import mongoose, { Connection } from "mongoose";
/* declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
} */


let cachedConnection: Connection | null = null;


async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI!;



  if (!MONGODB_URI) {
    console.log("No DB URI")
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local",
    );
  }
  // If a cached connection exists, return it
  if (cachedConnection) {
    console.log("Using cached db connection");
    return cachedConnection;
  }
  const options = {
    bufferCommands: false,
    dbName: "lingon"
  };
  try {
    // If no cached connection exists, establish a new connection to MongoDB
    const cnx = await mongoose.connect(MONGODB_URI, options);
    // Cache the connection for future use
    cachedConnection = cnx.connection;
    // Log message indicating a new MongoDB connection is established
    console.log("New mongodb connection established");
    // Return the newly established connection
    return cachedConnection;
  } catch (error) {
    // If an error occurs during connection, log the error and throw it
    console.log("Error when connecting to DB")
    console.log(error);
    throw error;
  }

}

export default dbConnect;