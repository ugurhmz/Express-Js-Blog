const express= require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blogs')

//____________________________________ DATABASE_________________________________________
const dbURL ='mongodb+srv://craxx3131:1994ugur@nodeblog.in0gt.mongodb.net/node-blog?retryWrites=true&w=majority'

mongoose.connect(dbURL, { useNewUrlParser:true, useUnifiedTopology:true })
      .then((result)=> app.listen(3000))
      .catch((err)=> console.log(err))

app.set('view engine','ejs')



//________________ static dosyalar için & middleware_____________________________________
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(express.urlencoded( {extend:true} ))


//____________________________________________________ / _____________________________
app.get('/',(req,res)=> {

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
})
//_______________________________________________ /blog/:id ___________________
app.get('/blog/:id',(req,res) => {
      const id = req.params.id
      
      Blog.findById(id)
            .then((result) => {
                  res.render('detail',{blog:result,title:'Detay'})
            })
            .catch((err) => {
                  res.status(404).render('404',{title:'Sayfa bulunamadı..'})
            })
})


//___________________________________ /admin__________________
app.get('/admin',(req,res)=> {
      Blog.find().sort({createdAt:-1})
            .then((result)=> {
                  res.render('admin',{
                        blogs:result,
                        title:'Admin Sayfası'
                  })
            })
            .catch((err)=> {
                  res.status(404).render('404',{title:'Sayfa bulunamadı'})
            })

})

//___________________________________ /admin/add_____________________
app.get('/admin/add',(req,res)=> {
      res.render('add',{title:'Yazı Ekle'})
})


app.post('/admin/add',(req,res)=> {
      const blog = new Blog(req.body)
      blog.save()
            .then((result)=>{
                  res.redirect('/admin')
            })

            .catch((err)=>{
                  console.log(err)
            })

})

//___________________________________ /admin/delete/:id _____________________
app.delete('/admin/delete/:id',(req,res)=>{

      const id=req.params.id
      Blog.findByIdAndDelete(id)
            .then((result)=>{
                  res.json({link:'/admin'})
            })
            .catch((err)=>{
                  console.log(err)
            })

})




//___________________________________ /about_____________________________
app.get('/about',(req,res)=> {

      res.render('about',{title:'Hakkımda Sayfası'})
})


app.get('/about-us',(req,res) => { //__________________about-us olunca yönlendir_______

      res.redirect('/about')
})

//___________________________________ /login_____________________________
app.get('/login',(req,res)=> {
      res.render('login',{title:'Login Form'})
})



//_________________middleware (404) git__________________________________
app.use((req,res)=> {
      res.status(404).render('404',{title:'404 Sayfa Bulunamadı'})
})