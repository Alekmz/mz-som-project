/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import { budgetController } from './app/controllers/BudgetController'

const routes = Router()

routes.post('/budget-request', budgetController.store)
routes.get('/budget-request', budgetController.index)
routes.get('/budget-request/:id', budgetController.show)

export default routes
