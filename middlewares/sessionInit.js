function sessionInit(req, res, next) {
  if (
    req.session.user != undefined &&
    req.session.user.valid == true &&
    ((req.session.user.billingScheme == "clicks" &&
      req.session.user.clicks > 0) ||
      (req.session.user.billingScheme == "subscription" &&
        new Date(req.session.user.expirationDate) > new Date()))
  ) {
    next();
  } else if (req.session.user == undefined) {
    res.redirect("/users/login");
  } else {
    res.render("home", {user: req.session.user, message: true});
  }
}

export default sessionInit;
