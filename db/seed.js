import { faker } from "@faker-js/faker";
import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 10; i++) {
    const employee = {
      name: faker.person.fullName(),
      birthday: faker.date.between({
        from: "1950-01-01",
        to: "2006-12-31",
      }),
      salary: faker.number.int({ min: 50000, max: 200000 }),
    };
    await createEmployee(employee);
    console.log(`Created employee: ${employee.name}`);
  }
}
