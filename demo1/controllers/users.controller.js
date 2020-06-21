const shortid = require("shortid");
const db = require("../db");

module.exports.index = (req, res) =>
  res.render("index", {
    users: db.get("users").value(),
  });
module.exports.search = (req, res) => {
  let query = req.query.q;
  let matchedUsers = db
    .get("users")
    .value()
    .filter((user) => user.name.indexOf(query) !== -1);
  res.render("index", {
    users: matchedUsers,
  });
};
module.exports.add = (req, res) => res.render("add");
module.exports.get = (req, res) => {
  let id = req.params.id;
  let user = db.get("users").find({ id: id }).value();
  res.render("view", {
    user,
  });
};
module.exports.postAdd = (req, res) => {
  req.body.id = shortid.generate();
  let errors = [];
  if (!req.body.name) {
    errors.push('Name is required');
  }
  if (!req.body.phone) {
    errors.push('Phone is required');
  }
  if (errors.length) {
    res.render("add", {
      errors,
      values: req.body
    });
    return;
  }

  db.get("users").push(req.body).write();
  res.redirect("/users");
};
