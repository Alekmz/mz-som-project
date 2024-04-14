import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes';
import { Fragment } from 'react';

const Router = () => {
  return (
    <Routes>
      {Object.values(ROUTES).map((route) => (
        <Fragment key={route.path}>
          <Route key={route.path} path={route.path} element={route.element} />
          {route?.childrens?.map((children) => (
            <Route key={children.path} path={children.path} element={children.element} />
          ))}
        </Fragment>
      ))}
      <Route path="*" element={<Navigate to={ROUTES['budget-request'].path} />} />
    </Routes>

  );
};

export default Router;
