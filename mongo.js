const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const dbUrl = `mongodb+srv://amirakhoundi:${password}@cluster0.0svgzfn.mongodb.net/personDB?retryWrites=true&w=majority`;
mongoose
  .connect(dbUrl)
  .then(() => {
    // console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const name  = process.argv[3]
const number  = process.argv[4]

const Person = mongoose.model("Person", personSchema);
const person = new Person({
    name,
    number,
})
person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close()
})


