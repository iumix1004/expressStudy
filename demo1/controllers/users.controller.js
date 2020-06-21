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
  db.get("users").push(req.body).write();
  res.redirect("/users");
};
