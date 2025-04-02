const mongoose = require("mongoose");
const Task = require("./models/Task"); // Adjust the path if necessary
require("dotenv").config(); // To load .env variables

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("✅ Connected to MongoDB Atlas");
    await updateDateFields();
    mongoose.connection.close(); // Close connection when done
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const updateDateFields = async () => {
  try {
    const tasks = await Task.find();
    for (const task of tasks) {
      if (typeof task.definedDate === 'string' || typeof task.deadlineDate === 'string') {
        await Task.findByIdAndUpdate(task._id, {
          definedDate: new Date(task.definedDate),
          deadlineDate: new Date(task.deadlineDate),
          currentDate: new Date(task.currentDate),
        });
      }
    }
    console.log("✅ All date fields updated to Date type");
  } catch (error) {
    console.error("❌ Error updating date fields:", error);
  }
};
