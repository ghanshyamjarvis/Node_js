
const express = require("express")
const app = express()

const user =[]
app.get('./user',(req,res)=>{
  res.json(user)
})

app.listen(3000)