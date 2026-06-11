require("dotenv").config();
const app = require("./src/app");
const connectToDatabase = require("./src/config/databaseConnect");
const port = process.env.PORT || 3000;
connectToDatabase();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
