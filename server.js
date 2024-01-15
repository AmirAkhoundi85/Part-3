const express = require("express");
const app = express();
const moment = require("moment");

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("root route");
});
app.get("/api/persons", (req, res) => {
  res.send(persons);
});

let requestCount = 0;
app.get("/info", (req, res) => {
  requestCount++;
  const date = moment().format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")+" (Eastern European Standard Time)";
  const message = "<p> Phonebook has info for " + requestCount + " people</p> " + date;
  res.send(message);
});


app.get("/api/person/:id", (req, res) => {
  const id = req.params.id;

  console.log(id);
  const person = persons.find((item) => item.id == id);

  if (person) {
    return res.status(200).send(person);
  }
  return res.status(404).send({ messeage: "Not Found!" });
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
