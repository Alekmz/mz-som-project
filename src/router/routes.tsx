import BudgetRequest from "../pages/budget request";


export type Module =
  | 'budget-request'

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
} as Routes;
