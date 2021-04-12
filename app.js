const express= require('express')

const morgan = require('morgan')
const mongoose = require('mongoose')
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

const {requireAuth} = require('./middlewares/authMiddleware.js')
const {checkUser} = require('./middlewares/authMiddleware.js')
const app = express()

//____________________________________ DATABASE_________________________________________
const dbURL ='mongodb+srv://<dbname>:<dbpassword>@nodeblog.in0gt.mongodb.net/node-blog?retryWrites=true&w=majority'

mongoose.connect(dbURL, { useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
      .then((result)=> app.listen(3000))
      .catch((err)=> console.log(err))

app.set('view engine','ejs')



//________________ static dosyalar için & middleware_____________________________________
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.get('*',checkUser)
app.get('/',(req,res)=> {
      res.redirect('/blog')
})

app.use('/',authRoutes)
app.use('/blog',blogRoutes)
app.use('/admin',requireAuth,adminRoutes)


app.get('/about',(req,res)=> {

      res.render('about',{title:'Hakkımda Sayfası'})
})

app.get('/about-us',(req,res) => { 

      res.redirect('/about')
})



app.use((req,res)=> {
      res.status(404).render('404',{title:'404 Sayfa Bulunamadı'})
})