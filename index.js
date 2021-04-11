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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})