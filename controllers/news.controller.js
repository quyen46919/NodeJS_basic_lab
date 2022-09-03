const News = require('../models/news.model');
const Users = require('../models/user.model');

const getHomePage = (req, res) => {
  res.render('index');
};

const getPostPage = (req, res) => {
  res.render('./post', { errorMessage: null });
};

const createNews = async (req, res) => {
  const user = await Users.findOne({ email: req.session.email });
  console.log('user', user);
  console.log(req.file);

  const newNews = new News();
  newNews.title = req.body.title;
  newNews.content = req.body.content;
  newNews.category = req.body.category;
  newNews.userId = user._id;
  newNews.image = req.file.filename;

  newNews.save(function (err, data) {
    if (err) {
      res.render('post', { errorMessage: 'Tạo mới thất bại' });
    } else {
      res.render('index');
    }
  });
};

module.exports = {
  getHomePage,
  getPostPage,
  createNews,
};
