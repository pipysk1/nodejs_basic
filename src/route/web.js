import express from 'express';
import homeController from '../controller/homeController'

let route = express.Router();

const initWebRoute = (app) => {

    route.get('/', homeController.getHomePage);

    route.get('/detail/user/:userId', homeController.getDetailPage)
    route.get('/about', (req, res) => {
        res.send('index.ejs')
    })
    return app.use('/', route)
}
export default initWebRoute