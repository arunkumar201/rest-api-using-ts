import apiController from '../controllers/api.controller'
import express from 'express'

const apiRouter = express.Router()

apiRouter.route('/testing').get(apiController.test)
apiRouter.route('/health').get(apiController.health)

export default apiRouter
