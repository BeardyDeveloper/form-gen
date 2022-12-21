import { ReactComponent as CloseSvg } from 'assets/icons/Close.svg';
import type { FC } from 'react';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

interface ToasterContainerProps {
  direction?: string;
}

export const ToasterContainer: FC<ToasterContainerProps> = props => {
  const { direction } = props;

  return (
    <StyledToastContainer
      position="bottom-center"
      hideProgressBar
      autoClose={false}
      newestOnTop={false}
      rtl={direction === 'rtl'}
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      draggable={false}
      closeOnClick={false}
      icon={null}
      closeButton={(args: any) => (
        <CloseSvg onClick={args.closeToast} {...args} />
      )}
    />
  );
};

const StyledToastContainer = styled(ToastContainer)`
  width: 600px;
  .Toastify__toast {
    flex-direction: row;
    align-items: center;
    padding: 0 18px;
    border-radius: 12px;
  }
  .Toastify__toast-body {
    width: calc(100% - 16px);
    padding: 0;
  }
  .Toastify__toast--success {
    background: rgba(20, 27, 45, 0.7);
    backdrop-filter: blur(25px);
    box-shadow: inset 72px 0px 37px -24px #2dd4bf30;
  }
  .Toastify__toast--info {
    background: rgba(20, 27, 45, 0.7);
    backdrop-filter: blur(25px);
    box-shadow: inset 72px 0px 37px -24px #6366f130;
  }
  .Toastify__toast--warning {
    background: rgba(20, 27, 45, 0.7);
    backdrop-filter: blur(25px);
    box-shadow: inset 72px 0px 37px -24px #ffffff30;
  }
  .Toastify__toast--error {
    background: rgba(20, 27, 45, 0.7);
    backdrop-filter: blur(25px);
    box-shadow: inset 72px 0px 37px -24px #fb718530;
  }
`;
