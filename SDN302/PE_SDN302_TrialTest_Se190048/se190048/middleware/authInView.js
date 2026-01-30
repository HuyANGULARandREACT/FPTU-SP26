module.exports = (req, res, next) => {
  if (!req.session.username) {
    req.session.message = "Please log in to continue.";
    return res.redirect("/auth/signin");
  }
  next();
};
