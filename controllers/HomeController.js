import dotenv from 'dotenv'
dotenv.config({path: './config/config.env'})

const home = (req, res) => {
    res.render("home", {user: req.session.user, message: null});
  }
;

export default home;
