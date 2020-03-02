const { Router } = require("express");
const router = new Router();
const Image = require("./model");

router.get("/", (req, res, next) => {
  Image.findAll().then(images => {
    if (images) {
      return res.json(images);
    } else {
      return res.status(404).end();
    }
  });
});

router.post("/", (req, res, next) => {
  if (req.body) {
    if (req.body.url && req.body.title) {
      Image.create(req.body)
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
