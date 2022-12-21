import type { FC } from 'react';
import styled, { css } from 'styled-components';

export enum ContentFrameSize {
  Small,
  Medium,
}

interface ContentFrameProps {
  icon: JSX.Element | React.ReactElement;
  title?: string;
  size?: ContentFrameSize;
  actions?: JSX.Element | JSX.Element[];
  gradientBorder?: boolean;
  noPadBottom?: boolean;
  children:
    | JSX.Element
    | JSX.Element[]
    | React.ReactElement
    | React.ReactElement[];
  className?: string;
}

export const ContentFrame: FC<ContentFrameProps> = props => {
  const {
    icon,
    title,
    size,
    actions,
    gradientBorder,
    noPadBottom,
    children,
    className,
  } = props;

  return (
    <Container className={className}>
      <TitleBar>
        <Titles>
          <Icon size={size}>{icon}</Icon>
          <Title size={size}>{title}</Title>
        </Titles>
        {actions ? <Actions>{actions}</Actions> : null}
      </TitleBar>
      <Content
        gradientBorder={gradientBorder}
        noPadBottom={noPadBottom}
        size={size}
      >
        {children}
      </Content>
    </Container>
  );
};

ContentFrame.defaultProps = {
  size: ContentFrameSize.Medium,
};

interface StyledProps {
  gradientBorder?: boolean;
  noPadBottom?: boolean;
  size?: ContentFrameSize;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TitleBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Titles = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Icon = styled.div<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  ${({ theme, size }) => css`
    & > svg {
      color: ${theme.text.light.primary};
      width: ${size === ContentFrameSize.Small ? '18px' : '24px'};
      height: ${size === ContentFrameSize.Small ? '18px' : '24px'};
    }
  `}
`;

const Title = styled.h6<StyledProps>`
  ${({ theme, size }) => css`
    color: ${theme.text.light.primary};
    font-size: ${size === ContentFrameSize.Small
      ? theme.typography.fontSize.heading.S
      : theme.typography.fontSize.heading.M};
    line-height: ${theme.typography.lineHeight.L};
    font-weight: ${theme.typography.fontWeight.semiBold};
  `}
`;

const Content = styled.div<StyledProps>`
  width: 100%;
  ${({ theme, gradientBorder, noPadBottom, size }) => css`
    margin: ${size === ContentFrameSize.Small
      ? '12px 0 12px 9px'
      : '12px 0 12px 12px'};
    padding: ${noPadBottom ? '32px 28px 12px 28px' : '32px 28px'};
    border-left: 1px solid ${!gradientBorder && theme.border.dark.ternary};
    border-image: ${gradientBorder &&
    'linear-gradient(to bottom, #333D55, #060B18) 1 100%'};
  `};
`;
