const { connectdb } = require("./src/config/database");
const cors = require("cors");
const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const authrouter = require("./src/route/auth");
const saverouter = require("./src/route/save");
const path = require("path");
const dotenv = require("dotenv");
app.use(cookieparser());
app.use(express.json());
dotenv.config();

const _dirname = path.resolve();
const PORT = process.env.PORT || 7777;
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with the correct frontend URL for production
    credentials: true,
  })
);

app.use("/", authrouter);
app.use("/", saverouter);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});
// Deployment
// if (process.env.NODE_ENV === "production") {
//   const dirPath = path.resolve();
//   app.use(express.static("./frontend/dist")); // Fix extra space
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(dirPath, "./frontend/dist", "index.html"));
//   });
// }

connectdb()
  .then(() => {
    console.log("Connected successfully");
    app.listen(PORT, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("Disconnected", err);
  });
