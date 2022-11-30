const ctrl= {}; 

const {Post, Comment} = require('../model');
const sidebar = require('../helpers/sidebar')

ctrl.index  = async (req, res, next) =>{
  try {
    const posts = await Post.find({user:req.user._id})
      .sort({timestamp: -1})
      .lean({ virtuals: true });
      const postsCound = await Post.countDocuments({user:req.user._id})
      const commentCount =await Comment.countDocuments({user:req.user._id})
      
     
        
    let viewModel = { posts: [] };
    
    const getTotalLikes = arr =>
  Object.values(
    arr.reduce((acc, {  likes }) => {
      acc[likes] =
      likes 
      return acc;
    }, {})
  );
   const getTotaViews = arr =>
    Object.values(
    arr.reduce((acc, { views }) => {
      acc[views] =
        views
      return acc;
    }, {})
   );
   const obj = getTotalLikes(posts);
   let totalikes = obj.reduce((a, b) => a + b, 0);
   const views = getTotaViews(posts);
   let totalviews = views.reduce((a, b) => a + b, 0);
    viewModel.postsCound= postsCound;
    viewModel.posts = posts; 
    viewModel.commentCount = commentCount;
    viewModel.coountLikes = totalikes;
    viewModel.coountViews = totalviews;
    console.log(viewModel.coountLikes);
    viewModel = await sidebar(viewModel);
    res.render('post', viewModel);
  } catch (error) {
    next(error);
  }
};

module.exports = ctrl;