import { ReactComponent as ClseSvg } from 'assets/icons/Close.svg';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled, { css } from 'styled-components';

import { Backdrop } from '../Backdrop/Backdrop';

const dropIn = {
  hidden: {
    y: '-30vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    y: '30vh',
    opacity: 0,
  },
};

interface ModalProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  lighBulb?: JSX.Element;
  alphaBg?: boolean;
  scrollableTitle?: boolean;
  maxWidth?: string;
  handleClose: () => void;
}

export const Modal: FC<ModalProps> = props => {
  const {
    title,
    children,
    lighBulb,
    alphaBg,
    scrollableTitle,
    maxWidth,
    handleClose,
  } = props;

  return (
    <Backdrop onClick={handleClose} alphaBg={alphaBg}>
      <Wrapper
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        maxWidth={maxWidth}
        scrollableTitle={scrollableTitle}
        onClick={e => e.stopPropagation()}
      >
        {lighBulb}
        {!scrollableTitle ? (
          <TitleBar>
            <Title>{title}</Title>
            <ClseSvg onClick={handleClose} />
          </TitleBar>
        ) : null}

        <Content scrollableTitle={scrollableTitle}>
          <PerfectScrollbar>
            <Children scrollableTitle={scrollableTitle}>
              {scrollableTitle ? (
                <TitleBar scrollableTitle>
                  <Title>{title}</Title>
                  <ClseSvg onClick={handleClose} />
                </TitleBar>
              ) : null}
              {children}
            </Children>
          </PerfectScrollbar>
        </Content>
      </Wrapper>
    </Backdrop>
  );
};

interface StyledProps {
  scrollableTitle?: boolean;
  maxWidth?: string;
}

const Wrapper = styled(motion.div)<StyledProps>`
  position: relative;
  width: 90%;
  margin: 0 auto;
  height: auto;
  border-radius: 20px;
  overflow: hidden;
  z-index: 990;
  padding: 32px 0;
  ${({ theme, scrollableTitle, maxWidth }) => css`
    max-width: ${maxWidth ?? '500px'};
    padding: ${scrollableTitle ? 0 : '32px 0'};
    background-color: ${theme.background.dark.primary};
  `};
`;

const TitleBar = styled.div<StyledProps>`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  ${({ theme, scrollableTitle }) => css`
    padding: ${scrollableTitle ? '28px 30px' : '0 30px 28px 30px'};
    background-color: ${theme.background.dark.primary};
    & > svg {
      cursor: pointer;
    }
    & > svg > path {
      fill: ${theme.text.light.primary};
    }
  `};
`;

const Title = styled.h6`
  ${({ theme }) => css`
    color: ${theme.text.light.primary};
    font-size: ${theme.typography.fontSize.body.M};
    font-weight: ${theme.typography.fontWeight.semiBold};
  `}
`;

const Content = styled.div<StyledProps>`
  width: 100%;
  ${({ scrollableTitle }) => css`
    height: ${scrollableTitle ? 'calc(100vh - 100px)' : 'auto'};
  `}
  border-radius: 12px;
`;

const Children = styled.div<StyledProps>`
  width: 100%;
  height: 100%;
  ${({ scrollableTitle }) => css`
    max-height: ${scrollableTitle ? '100%' : 'calc(100vh - 160px)'};
  `}
`;
