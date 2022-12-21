import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from 'components/layout/PrivateRoutes/PrivateRoute';
import { ToasterContainer } from 'components/shared/Toaster/ToasterContainer/ToasterContainer';
import NotFound from 'pages/NotFound/NotFound';
import type { FC } from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainLayout } from './Layoutes/MainLayout';
import { routes } from './routes';

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route element={<MainLayout />}>
              {routes.map(route => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<PrivateRoute>{route.element}</PrivateRoute>}
                />
              ))}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>

      <ToasterContainer />
    </>
  );
};

export default App;
