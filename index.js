const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserDocument = require("./src/Models/Userdocument");

const port = process.env.PORT || 5000;

app.use(cors());
const router = express.Router();

app.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);


//============================[Post user Document ]====================/

app.post('/Postusers', async (req, res) => {
  try {
    const { name, age } = req.body;

    const newUser = new UserDocument({
      name,
      age,
    });
    const savedUser = await newUser.save();

    res.status(200).send({
      status: true,
      message: "Post the user Document Successfully!",
      data: savedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, error: error.message });
  }
});


//============================[Get user Document ]====================/

app.get('/Getusers', async (req, res) => {
  try {
    let query = {};

    if (req.query.name) {
      query.name = { $regex: new RegExp(req.query.name, 'i') };
    }

    let sortOptions = {};
    if (req.query.age) {
      sortOptions[req.query.age] = req.query.sortOrder === 'desc' ? -1 : 1;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;


    const users = await UserDocument.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    if (users.length === 0) {
      return res.status(404).send({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "Get the filtered users successfully!",
      data: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, error: error.message });
  }
});




module.exports = router;

//===================== [ Database Connection ] ==================/

mongoose
  .connect(
    "mongodb+srv://pradumgurjar2:8DyprEswPNofmDDg@cluster0.sqvjdxj.mongodb.net/"
  )
  .then(() => console.log("Database is connected successfully.."))
  .catch((Err) => console.log(Err));

app.use("/", router);

app.listen(port, function () {
  console.log(`Server is connected on Port ${port} ✅✅✅`);
});


// mongodb+srv://pradumgurjar2:8DyprEswPNofmDDg@cluster0.sqvjdxj.mongodb.net/
// 8DyprEswPNofmDDg