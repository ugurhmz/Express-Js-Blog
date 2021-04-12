const User = require('../models/users')
const jwt = require('jsonwebtoken')


const maxAge = 60*60*24

const createToken = (id)=> {
      return jwt.sign({id},'gizli kelime', {expiresIn:maxAge})
}


//___________________________________ login_get & login_post ________________________
const login_get = (req,res)=>{
      res.render('login',{title:'Login Sayfası'})
}


const login_post = async (req,res)=>{
      const { username, password } = req.body
      try {
            const user = await User.login(username,password)
            const token = createToken(user._id)
            res.cookie('jwt', token, {httpOnly: true, maxAge:maxAge * 1000})
            res.redirect('/admin')
      }
      catch(e) {
            console.log(e)
      }
}

//______________________________________ signup_get &  signup_post ___________________
const signup_get = (req,res)=>{
      res.render('signup',{title:'Üye ol Sayfası'})
}

const signup_post = (req,res)=>{
      const user = new User(req.body)
      user.save()
            .then((result)=> {
                  res.redirect('/login')
            })
            .catch((err)=> {
                  console.log(err)
            })
}

//______________________________________ logout_get _________________________
const logout_get = (req,res)=>{
      res.cookie('jwt','',{maxAge:1}) //cookie kaldırma
      res.redirect('/')
}

module.exports = {
      login_get,
      login_post,
      signup_get,
      signup_post,
      logout_get
}