import BudgetRequest from "../pages/budget request";
import MainScreen from "../pages/main-screen";
import CreateBudget from "../pages/create-budget";


export type Module =
  | 'budget-request'
  | 'main-screen'
  | 'create-budget';

type Route = {
  path: string;
  name: string;
  icon?: JSX.Element;
  element: JSX.Element;
  childrens?: Route[];
};

export type Routes = {
  [module in Module]: Route;
};

const iconProps = {
  size: 18,
};

export const ROUTES = {
  'budget-request': {
    path: '/budget-request',
    name: 'Solicitação de Orçamentos',
    element: <BudgetRequest />,
  },
  'main-screen': {
    path: '/main-screen',
    name: 'Dashboard',
    element: <MainScreen />,
  },
  'create-budget': {
    path: '/create-budget',
    name: 'Criar Orçamento',
    element: <CreateBudget />,
  }

} as Routes;
