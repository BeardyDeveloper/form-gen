import { FormatSquare } from 'iconsax-react';
import { Header } from 'components/layout/Header/Header';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout: FC = props => {
  return (
    <>
      <Header title="Form Gen" titleIcon={<FormatSquare />} />
      <Outlet />
    </>
  );
};
