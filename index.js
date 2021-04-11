const express = require('express')
const app = express()
const port = 5000
const config = require('./config/key');
const bodyParser = require('body-parser');
const { User } = require('./models/User');

// application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있도록해준다
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log('MongoDB Connected...'))
  .catch(() => console.log(err));

app.get('/', (req, res) => {res.send('Hello World! nodemon downloaded this is Fuxxin awsome')})

//req (request), res (response)
app.post('/register', (req, res) => {
  // 회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 database에 넣어준다
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/login', (req, res) => {
  // 1. 요청된 E-mail을 데이터베이스에 있는지 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false, 
        message: "이메일에 해당하는 유저가 없습니다"
      })
    }
    // 2. 요청된 E-mail이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인하기
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
      return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다" })

      // 비밀번호까지 맞다면 TOKEN을 생성하기
      user.generateToken((err, user) => {
        
      })
    })
    

  })

  

  // 3. 비밀번호가 맞다면 Token 생성하기

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})