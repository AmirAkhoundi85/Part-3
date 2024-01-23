const mongoose = require("mongoose");

let password = "";
let name = "";
let number = "";
if (process.argv.length < 3) {
  console.log("I coulden't take password as argument");
  process.exit(1);
}
if (process.argv.length == 3) {
  password = process.argv[2];
} else if (process.argv.length == 5) {
    password = process.argv[2];
  name = process.argv[3];
  number = process.argv[4];
}

const dbUrl = `mongodb+srv://amirakhoundi:${password}@cluster0.0svgzfn.mongodb.net/personDB?retryWrites=true&w=majority`;
mongoose
  .connect(dbUrl)
  .then(() =>{
    //  console.log("database connected");
    })
  .catch((err) => {
    console.log(err);
  });
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

if (name && number) {
    const person = new Person({
      name,
      number,
    });
    person.save().then((result) => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    });

}else{ 
     Person.find({})
    .then((result)=>{
        console.log("phonebook:");
        result.map((i)=>{
            console.log(i.name, i.number);
        })
        mongoose.connection.close();
    })
}


