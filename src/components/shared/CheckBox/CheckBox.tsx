import { ReactComponent as CheckTickSvg } from 'assets/icons/CheckTick.svg';
import type { FC, ReactElement } from 'react';
import styled, { css } from 'styled-components';

interface CheckboxProps {
  isSelected?: boolean;
  label?: string;
  subLabel?: string;
  subLabelIcon?: ReactElement;
  logo?: any;
  disabled?: boolean;
  className?: string;
  onSelect: () => void;
}

export const Checkbox: FC<CheckboxProps> = props => {
  const {
    isSelected,
    label,
    subLabel,
    subLabelIcon,
    logo,
    disabled,
    className,
    onSelect,
  } = props;

  return (
    <Container disabled={disabled} className={className}>
      <Main disabled={disabled} onClick={!disabled ? onSelect : undefined}>
        <CheckSection>
          <TickBox isSelected={isSelected} disabled={disabled}>
            <StyledCheckTickSvg isSelected={isSelected} disabled={disabled} />
          </TickBox>
        </CheckSection>
        {!logo ? (
          <Content>
            <Label disabled={disabled}>{label}</Label>
            {subLabel ? (
              <SubLabel disabled={disabled}>
                {subLabelIcon ? (
                  <SubLabelIcon disabled={disabled}>
                    {subLabelIcon}
                  </SubLabelIcon>
                ) : null}
                {subLabel}
              </SubLabel>
            ) : null}
          </Content>
        ) : (
          <Logo disabled={disabled}>
            <img src={logo} alt="" />
          </Logo>
        )}
      </Main>
    </Container>
  );
};

interface StyledProps {
  isSelected?: boolean;
  disabled?: boolean;
}

const Container = styled.div<StyledProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  ${({ disabled }) => css`
    cursor: ${!disabled ? 'pointer' : 'no-drop'};
  `}
`;

const Main = styled.div<StyledProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  ${({ disabled }) => css`
    cursor: ${!disabled ? 'pointer' : 'no-drop'};
  `}
`;

const CheckSection = styled.div<StyledProps>`
  width: 28px;
  height: 22px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledCheckTickSvg = styled(CheckTickSvg)<StyledProps>`
  ${({ theme, disabled, isSelected }) => {
    let display: string;
    let fillColor: string;

    if (isSelected) {
      display = 'block';
      if (disabled) {
        fillColor = theme.cmp.selection.disabled.tick;
      } else {
        fillColor = theme.cmp.selection.color;
      }
    } else {
      display = 'none';
      fillColor = theme.cmp.selection.alpha;
    }

    return css`
      display: ${display};
      & > path {
        fill: ${fillColor};
      }
      z-index: 2;
    `;
  }}
`;

const TickBox = styled.div<StyledProps>`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 75ms ease-in;
  ${({ theme, disabled, isSelected }) => {
    let bgColor: string;

    if (isSelected) {
      if (disabled) {
        bgColor = theme.cmp.selection.disabled.bg;
      } else {
        bgColor = theme.cmp.selection.active;
      }
    } else {
      bgColor = theme.cmp.selection.alpha;
    }

    return css`
      border: ${`2px solid ${
        !disabled ? theme.cmp.selection.active : theme.cmp.selection.disabled.bg
      }`};
      background-color: ${bgColor};
    `;
  }}
`;

const Content = styled.div`
  width: calc(100% - 28px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Label = styled.span<StyledProps>`
  text-align: left;
  ${({ theme, disabled }) => css`
    color: ${!disabled
      ? theme.cmp.selection.color
      : theme.cmp.selection.disabled.text};
    font-weight: ${theme.typography.fontWeight.regular};
    font-size: ${theme.typography.fontSize.body.M};
  `}
`;

const SubLabelIcon = styled.div<StyledProps>`
  & > svg {
    width: 18px;
    height: 18px;
    color: ${({ theme, disabled }) =>
      !disabled ? theme.cmp.selection.color : theme.cmp.selection.disabled.bg};
    margin-right: 6px;
  }
`;

const SubLabel = styled.span<StyledProps>`
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${({ theme, disabled }) => css`
    color: ${!disabled
      ? theme.cmp.selection.color
      : theme.cmp.selection.disabled.text};
    font-size: ${theme.typography.fontSize.body.XS};
    margin-top: 8px;
  `}
`;

const Logo = styled.div<StyledProps>`
  filter: ${({ disabled }) => (disabled ? 'grayscale(100%)' : 'unset')};
  height: 24px;
  img {
    height: 24px;
  }
`;
