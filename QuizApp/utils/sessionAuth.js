const isAuthenticated = (req, res, next) => {
  req.session.userid
    ? next()
    : res.json({ message: "you are not authenticated" });
};

module.exports = isAuthenticated;
