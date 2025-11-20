const express = require("express");
const path = require("path");

const indexRouter = require("./routes/indexRouter");
const itemsRouter = require("./routes/itemsRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const raritiesRouter = require("./routes/raritiesRouter");

const app = express();

// Configure ejs for express
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Parses form data sent from the client into req.body
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/", indexRouter);
app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);
app.use("/rarities", raritiesRouter);

// Route to catch all paths that don't exist
app.use("/{*splat}", (req, res) => {
  res
    .status(404)
    .render("error", { title: "Inventory | Error", statusCode: 404 });
});

// Error handler middleware to catch errors throughout the app or previous middleware function if using next(err)
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .render("error", { title: "Inventory | Error", statusCode: statusCode });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server running on port: ${PORT}`);
});
