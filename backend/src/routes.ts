/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import { budgetController } from './app/controllers/BudgetController'
import { uploadFile } from './app/controllers/FileController'
import multer from 'multer';
import { departmentController } from './app/controllers/DepartmentController';
import { equipmentController } from './app/controllers/EquipmentController';
import {createBudgetController } from './app/controllers/CreateBudgetController';
import { soundPlanController } from './app/controllers/SoundPlanController';

const routes = Router()
const upload = multer({ dest: 'uploads/' });

// budget
routes.post('/budget-request', budgetController.store)
routes.get('/budget-request', budgetController.index)
routes.get('/budget-request/:id', budgetController.show)

// file
routes.post('/upload', upload.single('file'), uploadFile);

// department
routes.post('/department', departmentController.store)
routes.get('/department', departmentController.index)
routes.get('/department/:id', departmentController.show)

// equipment
routes.post('/equipment', equipmentController.store);
routes.get('/equipment', equipmentController.index);
routes.get('/equipment/:id', equipmentController.show);
routes.get('/equipments/department/:departmentId', equipmentController.getEquipmentsByDepartment);

// create budget
routes.post('/create-budget', createBudgetController.store);
routes.get('/budgets', createBudgetController.index);
// routes.get('/create-budget/;id', createBudgetController.show);

// sound plans
routes.get('/sound-plans', soundPlanController.index);




export default routes
