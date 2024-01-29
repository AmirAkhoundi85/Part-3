const mongoose = require("mongoose");


mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (value) {
        // Custom validation logic for phone numbers
        const phoneRegex = /^(?:\d{2,3}-\d+)$/;
        return phoneRegex.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Please use the format XX-XXXXXXX or XXX-XXXXXXX.`,
    },
  },
});


personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});


module.exports = mongoose.model("Person", personSchema);
