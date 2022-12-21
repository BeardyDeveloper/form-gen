import { InfoCircle, TickCircle } from 'iconsax-react';
import type { FC } from 'react';
import React from 'react';
import styled, { css } from 'styled-components';

import { ToastType } from '../Toaster';

interface ToastIconProps {
  type: ToastType;
}

export const ToastIcon: FC<ToastIconProps> = props => {
  const { type } = props;

  return (
    <Container>
      <IconBox type={type}>
        {type !== ToastType.Error ? (
          <TickCircle size={32} variant="Bold" />
        ) : (
          <InfoCircle size={32} variant="Bold" />
        )}
      </IconBox>
    </Container>
  );
};

interface StyledProps {
  type: ToastType;
}

const Container = styled.div`
  margin: auto 0 auto 0;
`;

const IconBox = styled.div<StyledProps>`
  width: 32px;
  height: 32px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme, type }) => {
    let color: string;

    switch (type) {
      case ToastType.Error:
        color = theme.palette.Status.Rose[400];
        break;
      case ToastType.Warning:
        color = theme.palette.Basic.White;
        break;
      case ToastType.Success:
        color = theme.palette.Status.Teal[400];
        break;
      case ToastType.Info:
        color = theme.palette.Brand[500];
        break;

      default:
        color = theme.palette.Status.Rose[400];
        break;
    }

    return css`
      & > svg {
        color: ${color};
      }
    `;
  }}
`;
