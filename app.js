const express= require('express')
const app = express()

app.set('view engine','ejs')

app.listen(3000)


app.get('/',(req,res)=> {

      res.render('index', {title:'Anasayfa'})
})

app.get('/about',(req,res)=> {

      res.render('about',{title:'Hakkımda Sayfası'})
})

//__________________about-us olunca yönlendir->
app.get('/about-us',(req,res) => {

      res.redirect('/about')
})

//_________________middleware (404) git_______________
app.use((req,res)=> {
      res.status(404).render('404',{title:'404 Sayfa Bulunamadı'})
})