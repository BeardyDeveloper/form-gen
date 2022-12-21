import FormGeneratorPage from 'pages/FormGeneratorPage/FormGeneratorPage';
import FormPage from 'pages/FormPage/FormPage';

export const routes = [
  {
    id: '1',
    path: '/',
    element: <FormGeneratorPage />,
  },
  {
    id: '2',
    path: '/Form',
    element: <FormPage />,
  },
];
