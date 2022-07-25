import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web'
// import connect from './configs/connectDB'
require('dotenv').config();
const app = express();

const port = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
//setup view engine
configViewEngine(app)

//setup route web
initWebRoute(app)

app.listen(port, () => {
    console.log(`Run server Nodejs localhost:${port}`);
})