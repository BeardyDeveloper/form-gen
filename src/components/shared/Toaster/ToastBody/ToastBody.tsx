import type { FC } from 'react';
import React from 'react';
import styled, { css } from 'styled-components';

export interface ToastBodyProps {
  title?: string;
  text?: string;
}

export const ToastBody: FC<ToastBodyProps> = props => {
  const { title, text } = props;

  return (
    <Container>
      {title ? <Title>{title}</Title> : null}
      {text ? <Text>{text}</Text> : null}
    </Container>
  );
};

const Container = styled.div`
  width: calc(100% - 16px);
  height: 100%;
  text-align: left;
  padding: 16px;
`;

const Title = styled.h6`
  margin: 0 0 2px 0;
  ${({ theme }) => css`
    color: ${theme.text.light.primary};
    font-size: ${theme.typography.fontSize.body.M};
    line-height: ${theme.typography.lineHeight.S};
    font-weight: ${theme.typography.fontWeight.semiBold};
  `}
`;

const Text = styled.p`
  margin: 0;
  ${({ theme }) => css`
    color: ${theme.text.light.primary};
    font-size: ${theme.typography.fontSize.body.S};
    line-height: ${theme.typography.lineHeight.XS};
    font-weight: ${theme.typography.fontWeight.regular};
  `}
`;
