const connect = require("./connect");
const Pate = require("./models/Pate");
connect.then(() => {
  console.log("db connected");
  const pateData = Pate({
    name: "thit kkkj dong hop",
    price: 500,
  });
  pateData
    .save()
    .then((pate) => {
      console.log(pate);
      pate.feedbacks.push({
        rating: 5,
        content: "ngon qua",
        author: "hacker lo",
      });
      pate.save();

      return Pate.find({});
    })
    .then((pates) => {
      console.log(pates);
    });
});
