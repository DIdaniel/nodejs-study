const express = require('express')
const app = express()
const port = 5000
// const bodyParser = require('body-parser');
// const { User } = require('./models/User');

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://faunus:<password>@boilerplate.0bnfz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log('MongoDB Connected...'))
  .catch(() => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// // application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));
// //application/json
// app.use(bodyParser.json());

// //req (request), res (response)
// app.post('/register', (req, res) => {
//   // 회원가입 할 때 필요한 정보들을 client에서 가져오면
//   // 그것들을 database에 넣어준다
//   const user = new User(req.body)
//   user.save((err, userInfo) => {
//     if(err) return res.json({success: false, err})
//     return res.status(200).json({
//       success: true
//     })
//   })
// })