const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000
const conn = require('./conn')
app.use(express.json())
//middleware
app.use(cors())


const tripRoutes = require('./routes/trip.routes')

app.use('/trip', tripRoutes) //http://localhost:3000/trip --> POST/GET/GET by ID

app.get('/hello',(req,res)=>{
    res.send('Hello World')

})

app.listen(3000, ()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})