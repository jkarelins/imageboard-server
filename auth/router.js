const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const router = new Router();
const User = require("../models/user/model");
const bcrypt = require("bcrypt");
const auth = require("./middleware");

router.post("/login", (req, res, next) => {
  if (req.body) {
    if (req.body.email && req.body.password) {
      // const user = {
      //   email: req.body.email,
      //   password: bcrypt.hashSync(req.body.password, 10)
      // };
      // find user by email
      User.findOne({
        where: {
          email: req.body.email
        }
      })
        .then(entity => {
          if (!entity) {
            res.status(400).send({
              message: "User with that email does not exist"
            });
          }
          // 2. use bcrypt.compareSync to check the password against the stored hash
          else if (bcrypt.compareSync(req.body.password, entity.password)) {
            // 3. if the password is correct, return a JWT with the userId of the user (user.id)
            res.send({
              jwt: toJWT({ userId: entity.id })
            });
          } else {
            res.status(400).send({
              message: "Password was incorrect"
            });
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).send({
            message: "Something went wrong"
          });
        });
    } else {
      res.status(400).send({
        message: "Please supply a valid email and password"
      });
    }
  } else {
    res.status(400).send({
      message: "Please supply a valid email and password"
    });
  }
});

router.post("/user", (req, res, next) => {
  if (req.body) {
    if (req.body.email && req.body.password) {
      const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      };
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(foundUser => {
        if (!foundUser) {
          User.create(user)
            .then(newUser => res.json(newUser))
            .catch(next);
        } else {
          res.status(400).send({
            message: "User already exists"
          });
        }
      });
    } else {
      res.status(400).send({
        message: "Please supply a valid email and password"
      });
    }
  } else {
    res.status(400).send({
      message: "Please supply a valid email and password"
    });
  }
});

router.get("/secret-endpoint", auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`
  });
});

module.exports = router;
