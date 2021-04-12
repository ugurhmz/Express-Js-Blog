const Blog = require('../models/blogs')


const blog_index = (req,res)=> {
      
      Blog.find().sort({createdAt:-1})
            .then((result)=> {
                  res.render('index',{
                        title:'Anasayfa',
                        blogs:result,
                  
                  });
            })
            .catch((err)=> {
                  console.log(err);
            })
}


const blog_detail = (req,res) => {
      const id = req.params.id
      
      Blog.findById(id)
            .then((result) => {
                  res.render('detail',{blog:result,title:'Detay'})
            })
            .catch((err) => {
                  res.status(404).render('404',{title:'Sayfa bulunamadı..'})
            })
}




module.exports = {
      blog_index,
      blog_detail
}