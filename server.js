const express = require('express')
const app = express()
const coronaRouter = require('./routes/routes')
const port = process.env.PORT || 3000
app.use('/',coronaRouter)


app.listen(port,function(){
    console.log('Server is listening to port 3000')
})