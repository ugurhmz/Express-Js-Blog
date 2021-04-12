const express= require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')





//____________________________________ DATABASE_________________________________________
const dbURL ='mongodb+srv://craxx3131:1994ugur@nodeblog.in0gt.mongodb.net/node-blog?retryWrites=true&w=majority'

mongoose.connect(dbURL, { useNewUrlParser:true, useUnifiedTopology:true })
      .then((result)=> app.listen(3000))
      .catch((err)=> console.log(err))

app.set('view engine','ejs')



//________________ static dosyalar için & middleware_____________________________________
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))

//____________________________________________________ / _____________________________
app.get('/',(req,res)=> {
      res.redirect('/blog')
})



//_____________________________ RoutesMiddleware__________________
app.use('/admin',adminRoutes)
app.use('/blog',blogRoutes)




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