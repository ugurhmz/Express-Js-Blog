const express= require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blogs')

const dbURL ='mongodb+srv://craxx3131:1994ugur@nodeblog.in0gt.mongodb.net/node-blog?retryWrites=true&w=majority'

mongoose.connect(dbURL, { useNewUrlParser:true, useUnifiedTopology:true })
      .then((result)=> app.listen(3000))
      .catch((err)=> console.log(err))

app.set('view engine','ejs')



//________________ static dosyalar için_____________
app.use(express.static('public'))

//_________________________ MiddleWare_______________
app.use(morgan('dev'))

//____________________________________________________ GET______________________________
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

app.get('/about',(req,res)=> {

      res.render('about',{title:'Hakkımda Sayfası'})
})


app.get('/about-us',(req,res) => { //__________________about-us olunca yönlendir_______

      res.redirect('/about')
})


app.get('/login',(req,res)=> {
      res.render('login',{title:'Login Form'})
})



//_________________middleware (404) git______________
app.use((req,res)=> {
      res.status(404).render('404',{title:'404 Sayfa Bulunamadı'})
})