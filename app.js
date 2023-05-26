const express = require("express");
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const apiProductRoutes = require("./routes/api/product.routes");
const webProductRoutes = require("./routes/web/product.routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "web")));
app.use(ejsLayouts);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "web", "views"));
app.set("layout", path.join(__dirname, "web", "layouts", "main"));

app.get("/", (req, res) => {
  if (req.query.message) {
    return res.render("index", {
      title: "API-Experiment | Home",
      message: req.query.message,
    });
  } else {
    return res.render("index", {
      title: "API-Experiment | Home",
    });
  }
});

app.get("/api/v1/test", (req, res) => {
  if (req.body.message) {
    res.status(200).json({ message: req.body.message });
  } else {
    res.status(200).json({ alive: "True" });
  }
});

app.use("/api/v1", apiProductRoutes);
app.use("/products", webProductRoutes);

app.use((req, res, next) => {
  const error = { status: 404, message: "NOT FOUND" };
  return res.render("error", { title: "API-Experiment | Error", error });
});

module.exports = app;
