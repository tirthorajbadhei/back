const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { TokenModel, connect } = require("./db");
// const { auth } = require("./auth.middleware");
const cors = require("cors");
const server = express();
server.use(cors({ origin: "*" }));
server.use(express.json());
server.get("/", (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, "suvo", (err, decoded) => {
    if (err) {
      console.log(err);
      res.send("something wrong");
    } else {
      res.send("home page");
    }
    // bar
  });
});
server.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        console.log(err);
      } else {
        const newData = new TokenModel({ name, email, pass: hash });
        await newData.save();
        res.send("registered");
      }
    });
  } catch (error) {
    res.send(error);
    console.log("err");
  }
});
server.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await TokenModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ name: "suvo" }, "suvo");
          res.send({ msg: "logged in", token });
        } else {
          res.send("please enter correct password or email");
        }
      });
    } else {
      res.send("wrong credntials");
    }
  } catch (error) {
    res.send(error);
  }
});
// server.use(auth);
server.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await TokenModel.findByIdAndDelete({ _id: id });
    res.send(`user is deleted whos id is ${id}`);
  } catch (error) {
    res.send("something went wrong");
  }
});
server.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    await TokenModel.findByIdAndUpdate({ _id: id }, data);
    res.send(`user is updated whos id is ${id}`);
  } catch (error) {
    res.send("something went wrong");
  }
});

server.listen(3500, async () => {
  try {
    await connect;
    console.log("data base connected");
  } catch (error) {
    console.log("error");
  }
  console.log("running port 3500");
});
