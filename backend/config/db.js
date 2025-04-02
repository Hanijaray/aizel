const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://alphanewprojectlc:CEoMY7QsrBIJokk3@aizeldb.nuoy3.mongodb.net/aizelDB?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Connection Failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;

