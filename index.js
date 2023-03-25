const express = require('express')
const app = express()
const mongoose = require('mongoose')
const homePageRoute = require('./routes/homePageRoute')
const genreRoute = require('./routes/genreRoute')
const movieRoute = require('./routes/movieRoute') 
const customerRoute = require('./routes/customerRoute')
const rentalRoute = require('./routes/rentalRoute')

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/MovieShop')
.then(() => {
    console.log('DB Connected')
});

app.use(express.json());

app.use('/' , homePageRoute)
app.use('/api/genres', genreRoute)
app.use('/api/movies', movieRoute)
app.use('/api/customers', customerRoute)
app.use('/api/rentals', rentalRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App is listening in : ${PORT}`)
})