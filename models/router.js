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

module.exports = router;
