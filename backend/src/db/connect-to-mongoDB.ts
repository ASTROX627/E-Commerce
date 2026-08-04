import mongoose from "mongoose";
import { MONGODB_URI } from "../config/global.ts";

async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("connected to DB")
  } catch (error) {
    console.log("error in connecting to mongodb", error);
    process.exit(1);
  }
}

export default connectToMongoDB;
