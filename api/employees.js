import express from "express";
const router = express.Router();
export default router;

import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

router
  .route("/")
  .get(async (req, res) => {
    const employees = await getEmployees();
    res.send(employees);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("request must hav a body");

    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary) {
      return res
        .status(400)
        .send("name, birthday, and salary are all required");
    }
    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).send(employee);
  });

router.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id))
    return res.status(400).send("ID must be a positive integer");

  const employee = await getEmployee(id);
  if (!employee) return res.status(404).send("Employee not found");

  req.employee = employee;
  next();
});

router
  .route("/:id")
  .get((req, res) => {
    res.send(req.employee);
  })
  .put(async (req, res) => {
    if (!req.body) return res.status(400).json("Request must have a body");
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary)
      return res
        .status(400)
        .send("req body must have name, birthdate, and salary");
    const employee = await updateEmployee({
      id: req.employee.id,
      name,
      birthday,
      salary,
    });
    res.send(employee);
  })
  .delete(async (req, res) => {
    await deleteEmployee(req.employee.id);
    res.sendStatus(204);
  });
// TODO: this file!
