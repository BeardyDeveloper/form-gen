import LightBulbSvg from 'assets/images/shared/light bulb.svg';
import type { FC } from 'react';
import styled, { css } from 'styled-components';

interface HeaderProps {
  title: string;
  titleIcon?: JSX.Element;
}

export const Header: FC<HeaderProps> = props => {
  const { title, titleIcon } = props;

  return (
    <Container>
      <LeftBulb src={LightBulbSvg} />
      <RightBulb src={LightBulbSvg} />
      <TitleBox>
        {titleIcon}
        <Ttitle>{title}</Ttitle>
      </TitleBox>
    </Container>
  );
};

const Container = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  ${({ theme }) => css`
    background-color: ${theme.RGBA.layout};
  `}
  z-index: 99;
`;

const LeftBulb = styled.img`
  position: absolute;
  left: 0;
  top: -180px;
  width: 320px;
  height: 320px;
  z-index: 0;
  filter: blur(44px);
  transform: rotate(152.03deg);
  opacity: 1;
`;

const RightBulb = styled.img`
  position: absolute;
  right: -100px;
  top: -140px;
  width: 220px;
  height: 220px;
  z-index: 0;
  filter: blur(38px);
  transform: rotate(155.02deg);
  opacity: 1;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 10;
  margin-left: 0;
`;

const Ttitle = styled.h1`
  margin-left: 18px;
  ${({ theme }) => css`
    color: ${theme.text.light.primary};
    font-size: ${theme.typography.fontSize.heading.M};
    font-weight: ${theme.typography.fontWeight.semiBold};
  `}
`;
