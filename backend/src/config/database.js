const mongoose = require("mongoose");

const connectdb = async () => {
  await mongoose.connect(
    "mongodb+srv://ujjwalhero03:12345@car.9nrvf.mongodb.net/"
  );
};

module.exports = {
  connectdb,
};
