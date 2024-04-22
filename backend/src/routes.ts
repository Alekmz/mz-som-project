/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import { budgetController } from './app/controllers/BudgetController'

const routes = Router()

routes.post('/budget', budgetController.store)
routes.get('/budget', budgetController.index)

export default routes
