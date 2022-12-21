import type { FC } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled, { css } from 'styled-components';

interface PageTemplateProps {
  children: any;
}

export const PageTemplate: FC<PageTemplateProps> = props => {
  const { children } = props;

  return (
    <Wrapper>
      <Main>
        <PerfectScrollbar>
          <Children>{children}</Children>
        </PerfectScrollbar>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0;
  z-index: 10;
  mix-blend-mode: normal;
  overflow: hidden;
  position: relative;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  ${({ theme }) => css`
    background-color: ${theme.background.dark.primary};
  `}
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Children = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 0;
`;
