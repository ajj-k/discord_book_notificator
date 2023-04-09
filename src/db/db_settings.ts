const mongoose = require("mongoose");

export const databaseInitialSettings = () => {
  mongoose.connect(
    process.env.DATABASE_SETTINGS, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("connect database");
    })
    .catch((error: any) => {
      console.log(error);
    })
}