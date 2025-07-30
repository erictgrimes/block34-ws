import express from "express";
const app = express();
export default app;
import employeesRouter from "#api/employees";

// TODO: this file!

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app.use(express.json());

app.use("/employees", employeesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!)");
});
