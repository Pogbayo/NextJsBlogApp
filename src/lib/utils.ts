// import dotenv from 'dotenv';
// import mongoose from 'mongoose';

// dotenv.config(); // Load environment variables

// interface ConnectionType {
//     isConnected: boolean;
// }

// const connection: ConnectionType = { isConnected: false };

// const connectToDb = async (): Promise<void> => {

//   if (connection.isConnected) {
//       console.log("Using existing connection");
//       return;
//   }
//   try {
//       const db = await mongoose.connect(process.env.MONGO as string);
//       connection.isConnected = db.connections[0].readyState === 1;
//       if (connection.isConnected) {
//           console.log("Connected to MongoDB");
//       } else {
//           console.error("Failed to establish a connection to MongoDB");
//           throw new Error("Failed to connect to MongoDB");
//       }
//   } catch (error) {
//       console.error("Database connection error:", error);
//       throw new Error("Database connection error");
//   }
// };


// export default connectToDb;

import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); // Load environment variables

interface ConnectionType {
    isConnected: boolean;
}

const connection: ConnectionType = { isConnected: false };

const connectToDb = async (): Promise<void> => {
  if (connection.isConnected) {
      console.log("Using existing connection");
      return;
  }

  try {
      console.log("Connecting to MongoDB...");
      const db = await mongoose.connect(process.env.MONGO as string, {
          serverSelectionTimeoutMS: 50000,  // Increase timeout
          socketTimeoutMS: 45000           // Increase socket timeout
      });
      
      connection.isConnected = db.connections[0].readyState === 1;
      if (connection.isConnected) {
          console.log("Connected to MongoDB");
      } else {
          console.error("Failed to establish a connection to MongoDB");
          throw new Error("Failed to connect to MongoDB");
      }
  } catch (error) {
      console.error("Database connection error:", error);
      throw new Error("Database connection error");
  }
};

export default connectToDb;
