const express=require('express')
const app=express()
const connection=require('./config/connect-and-createDb')
//const createDb=connection.connectDB
//createDb()
const db = require('./models/index')
const userRoute=require('./routes/userRoute')
const movieRoute=require('./routes/movieRoute')
const cors = require('cors')

require('dotenv').config()
app.use(express.json())
app.use(cors({
  origin:'*'
}))

app.use('/api/users', userRoute)
app.use('/api/movies',movieRoute)

const port=5000;
db.sequelize.sync({force : true})
  .then((result) => {
    app.listen(port, () => {
      console.log(`node server listening at port no ${port}`);
    })
  })
  .catch((err) => {
    console.log(err);
  })