import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/users")
  .then(() => console.log("Database connected successfully..."))
  .catch((error) => console.log(`Errors occured: ${error.message}`));

export default mongoose;
