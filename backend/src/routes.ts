/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import { budgetController } from './app/controllers/BudgetController'
import { uploadFile } from './app/controllers/FileController'
import multer from 'multer';
import { departmentController } from './app/controllers/DepartmentController';
import { equipmentController } from './app/controllers/EquipmentController';

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

export default routes
