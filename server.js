const express = require("express");
const app = express();
const moment = require("moment");
const morgan = require("morgan");
const cors = require("cors")

app.use(cors())
app.use(express.json());
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
)


let persons = [
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
  const date =
    moment().format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ") +
    " (Eastern European Standard Time)";
  const message =
    "<p> Phonebook has info for " + requestCount + " people</p> " + date;
  res.send(message);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  console.log(id);
  const person = persons.find((item) => item.id == id);

  if (person) {
    return res.status(200).send(person);
  }
  return res.status(404).send({ messeage: "Not Found!" });
});
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  const p = persons.find((item) => item.id == id);
  if (!p) {
    return res.status(404).send({ messeage: "id " + id + " Not Found!" });
  }

  persons = persons.filter((item) => item.id != id);
  return res
    .status(204)
    .send({ message: "id " + id + " Deleted successfuly." });
});

app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random() * 1000) + 1;

  const { name, number } = req.body;

  if (!name) {
    return res.status(400).send({ error: "The name is required" });
  }
  if (!number) {
    return res.status(400).send({ error: "The number is required" });
  }

  const x = persons.find((item) => item.name == name);

  if (x) {
    return res.status(400).send({ error: "name must be unique" });
  }

  const newItem = {
    id,
    name,
    number,
  };

  persons.push(newItem);
  return res
    .status(201)
    .send({ message: "id " + id + " created successfuly.", persons });
});

//deploy url:   https://render-first-cql4.onrender.com/api/persons
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
