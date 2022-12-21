import type { FC } from 'react';
import styled, { css } from 'styled-components';

interface ButtonSpinnerProps {
  isDarken?: boolean;
}

export const ButtonSpinner: FC<ButtonSpinnerProps> = props => {
  const { isDarken } = props;

  return (
    <Spinner isDarken={isDarken}>
      <Spin isDarken={isDarken} />
      <Spin isDarken={isDarken} />
      <Spin isDarken={isDarken} />
      <Spin isDarken={isDarken} />
    </Spinner>
  );
};

interface StyledProps {
  isDarken?: boolean;
}

const Spinner = styled.div<StyledProps>`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 8px;
`;

const Spin = styled.div<StyledProps>`
  box-sizing: border-box;
  display: block;
  position: absolute;
  ${({ theme, isDarken }) => {
    return css`
      width: 16px;
      height: 16px;
      border: 2px solid;
      border-color: ${`${
        isDarken ? theme.palette.Neutral[600] : theme.palette.Basic.White
      } transparent transparent transparent`};
    `;
  }};
  margin: 0;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  &:nth-child(2) {
    animation-delay: -0.3s;
  }
  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
