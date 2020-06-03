const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to the server");

  Dishes.create({
    name: "Uthappizza",
    description: "test",
  }) // Returns a promise with the created dish
    .then((dish) => {
      console.log(dish);

      return Dishes.findByIdAndUpdate(
        dish._id,
        {
          $set: { description: "Updated test" },
        },
        {
          // Once the updates of the dish is complete then this will return the updated dish back to us.
          new: true,
        }
      ).exec();
    })
    .then((dish) => {
      console.log(dish);

      dish.comments.push({
        rating: 5,
        comment: "Please give me more",
        author: "Leonardo Dicaprio",
      });

      return dish.save();
    })
    .then((dish) => {
      console.log(dish);

      return Dishes.deleteOne({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
