import mongoose from "mongoose";
import colors from "colors";

const url =
  "mongodb+srv://ramakantsharma822382:ramakant@cluster0.xnunbje.mongodb.net/demo";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);

    console.log(`Conected mongo db Welcome`.bgGreen);
  } catch (error) {
    console.log(`Error in mongodb ${error}`.bgRed.white);
  }
};
export default connectDB;
