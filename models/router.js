const { Router } = require("express");
const router = new Router();
const Image = require("./model");
const User = require("./user/model");
const auth = require("../auth/middleware");

router.get("/", (req, res, next) => {
  Image.findAll().then(images => {
    if (images) {
      return res.json(images);
    } else {
      return res.status(404).end();
    }
  });
});

router.post("/", auth, (req, res, next) => {
  console.log(req.body);
  if (req.body) {
    if (req.body.url && req.body.title) {
      // console.log(req.user);
      const userId = req.user.id;
      Image.create({ ...req.body, userId })
        .then(newImage => res.send(newImage))
        .catch(next);
    } else {
      return res.status(400).end();
    }
  } else {
    return res.status(400).end();
  }
});

module.exports = router;
