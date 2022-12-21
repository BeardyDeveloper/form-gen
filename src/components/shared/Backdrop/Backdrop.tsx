import WizardBgSvg from 'assets/images/createToken/Wizard-Bg.svg';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import React from 'react';
import styled, { css } from 'styled-components';

interface BackdropProps {
  children: JSX.Element;
  alphaBg?: boolean;
  onClick: () => void;
}

export const Backdrop: FC<BackdropProps> = props => {
  const { children, alphaBg, onClick } = props;

  return (
    <Container
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Bg src={WizardBgSvg} alphaBg={alphaBg} />
      {children}
    </Container>
  );
};

interface StyledProps {
  alphaBg?: boolean;
}

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.48);
  backdrop-filter: blur(8.5178px);
  z-index: 980;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Bg = styled.img<StyledProps>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  ${({ alphaBg }) => css`
    opacity: ${alphaBg ? 0.5 : 1};
  `}
`;
