const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectDB = await mongoose.connect(
      "mongodb://atlas-sql-6783f7fbded216794da4ac1f-kqwrs.a.query.mongodb.net/test?ssl=true&authSource=admin"
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
