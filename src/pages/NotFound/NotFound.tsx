import { PageTemplate } from 'components/layout/Templates/PageTemplate/PageTemplate';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFound: FC = () => (
  <PageTemplate>
    <Link to="/Overview">Go Home</Link>
  </PageTemplate>
);

export default NotFound;
