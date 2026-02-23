const express = require("express");
const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Alice", age: 21, course: "Math" },
  { id: 2, name: "Bob", age: 22, course: "Physics" }
];

app.post("/students", (req, res) => {
  const { name, age, course } = req.body;
  const newStudent = {
    id: students.length + 1,
    name,
    age,
    course
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });

  const { name, age, course } = req.body;
  student.name = name;
  student.age = age;
  student.course = course;

  res.json(student);
});

// DELETE Student
app.delete("/students/:id", (req, res) => {
  students = students.filter(s => s.id != req.params.id);
  res.json({ message: "Student deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));