const express = require("express");
const User = require("../models/user");

const router = new express.Router();

router.post("/api/v1/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/v1/users", async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/api/v1/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/api/v1/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/api/v1/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
