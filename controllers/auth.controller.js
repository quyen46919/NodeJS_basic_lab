const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const getLoginPage = (req, res) => {
  res.render('./login', { errorMessage: "" });
};

const login = (req, res, next) => {
  User.findOne({ email: req.body.email }, function(err, response){
    if (response) {
        const checkPassword = bcrypt.compareSync(req.body.password, response.password);
        if (checkPassword) {
            req.session.email = response.email;
            res.redirect('/news');
        } else {
            res.render('./login', { errorMessage: "Mật khẩu không chính xác" });
        }
    } else {
        res.render('./login', { errorMessage: "Tài khoản không tồn tại" });
    }
  });
};

/* REGISTER */
const getLogupPage = (req, res) => {
  res.render('./logup', { errorMessage: "" });
};

const logup = async (req, res, next) =>{
  if (!req.body.email || !req.body.password || !req.body.fullName) {
    return res.render('./logup', { errorMessage: "Thông tin không hợp lệ" });
  }

  console.log(req.body.email, req.body.password, req.body.fullName);

  let newUser = new User();
  const saltRounds = 10;
  var salt = bcrypt.genSaltSync(saltRounds);
  newUser.email = req.body.email;
  newUser.password = bcrypt.hashSync(req.body.password, salt);
  newUser.fullName = req.body.fullName;

  newUser.save(function(err) {
    if (err) {
      res.render('./logup', { errorMessage: "Đăng ký thất bại" });
    } else {
      console.log("Đăng ký thành công");
      res.redirect('/login');
    }
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('./login');
};

module.exports = {
  getLoginPage,
  getLogupPage,
  login,
  logup,
  logout
};
