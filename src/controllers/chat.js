const ctrl= {}; 

const {Chat} = require('../model');

ctrl.index  = async (req, res, next) =>{
   
  
    res.render('chat', { layout: "nostats"} );
    
};



module.exports = ctrl;

