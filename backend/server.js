import app from "./src/app.js";
import { configDotenv } from "dotenv";
import connectDB from './src/config/db.js'

configDotenv();

const startserver= async () => {
   try {
     await connectDB();
      const PORT = process.env.PORT;

      app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
    });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      
    }
    
}

startserver();
