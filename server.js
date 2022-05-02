const express = require('express');
const db = require('./config/connection'); 

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//connect the database first 
db.once('open', () => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}!`);
      });      
} )
