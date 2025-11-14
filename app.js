const express = require("express");
const path = require("path");

const app = express();

// Configure ejs for express
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Parses form data sent from the client into req.body
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Home");
});

// Route to catch all paths that don't exist
app.use("/{*splat}", (req, res) => {
  res.status(404).send("Error 404");
});

// Error handler middleware to catch errors throughout the app or previous middleware function if using next(err)
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(`Error ${statusCode}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server running on port: ${PORT}`);
});
