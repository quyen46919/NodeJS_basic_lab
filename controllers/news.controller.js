const News = require('../models/news.model');
const Users = require('../models/user.model');
const timeSince = require('../utils/timeSince');

const getHomePage = async (req, res ) => {
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

const redirectHomePage = (req, res) => {
  res.redirect('/news')
}

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
      redirectHomePage(req, res);
    }
  });
};

const getEditPage = async (req, res) => {
  if (!req.query.id) {
    redirectHomePage(req, res);
  } else {
    const news = await News.findById(req.query.id);
    res.render('edit', { errorMessage: null, news });
  }
};

const updateNews = async (req, res) => {
  const updateValues = {
    ...(req?.file?.filename && { image: req.file.filename }),
    category: req.body.category,
    title: req.body.title,
    content: req.body.content,
    updatedAt: Date.now(),
  };
  const updatedNews = await News.findByIdAndUpdate(req.query.id, updateValues);
  const news = await News.findById(req.query.id);
  if (updatedNews) {
    res.render('edit', { errorMessage: null, news });
  } else {
    const news = await News.findById(req.query.id);
    res.render('edit', { errorMessage: 'Cập nhật thất bại', news });
  }
};

const getDeletePage = async (req, res) => {
  const news = await News.findById(req.query.id);
  res.render('delete', { errorMessage: null, news });
}

const deleteNews = async (req, res) => {
  const result = await News.findByIdAndDelete(req.query.id);
  if (result) {
    redirectHomePage(req, res);
  } else {
    const news = await News.findById(req.query.id);
    res.render('delete', { errorMessage: "Có lỗi xảy ra, vui lòng thử lại!", news });
  }
}

module.exports = {
  getHomePage,
  getPostPage,
  createNews,
  getEditPage,
  updateNews,
  getDeletePage,
  deleteNews,
};
