import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/auth_db")
  .then(() => console.log("Database connected successfully..."))
  .catch((error) => console.log(`Errors occured: ${error.message}`));

export default mongoose;
