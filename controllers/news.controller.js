const News = require('../models/news.model');
const Users = require('../models/user.model');
const timeSince = require('../utils/timeSince');

const getHomePage = async (req, res) => {
  const news = await News.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'author',
      },
    },
  ]);
  news.map((news) => (news.createdAt = timeSince(news.createdAt) + ' trước'));
  res.render('index', { news });
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
      getHomePage(req, res);
    }
  });
};

const getEditPage = async (req, res) => {
  console.log(req.query.id);
  if (!req.query.id) {
    getHomePage(req, res);
  } else {
    const news = await News.findById(req.query.id);
    res.render('edit', { errorMessage: null, news });
  }
};

module.exports = {
  getHomePage,
  getPostPage,
  createNews,
  getEditPage,
};
