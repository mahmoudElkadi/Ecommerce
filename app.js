const express = require('express')
const app = express()
require("dotenv").config()
const port = process.env.PORT
const initConnection=require("./DB/connection")
const {userRouter}=require("./routes")
app.use(express.json())
app.use(userRouter)
initConnection()

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))