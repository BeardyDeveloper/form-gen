import type { FC, ReactElement } from 'react';
import styled, { css } from 'styled-components';

interface RadioProps {
  isSelected?: boolean;
  label?: string;
  subLabel?: string;
  subLabelIcon?: ReactElement;
  logo?: string;
  disabled?: boolean;
  className?: string;
  onSelect: () => void;
}

export const Radio: FC<RadioProps> = props => {
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
        <BtnWrapper isSelected={isSelected} disabled={disabled}>
          <RadioBtn isSelected={isSelected} disabled={disabled} />
        </BtnWrapper>
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

const BtnWrapper = styled.div<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border-radius: 50%;
  padding: 6px;
  margin-right: 8px;
  transition: background-color 75ms ease-in;
  ${({ theme, isSelected, disabled }) => {
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
      background-color: ${bgColor};
      border: ${`2px solid ${
        !disabled ? theme.cmp.selection.active : theme.cmp.selection.disabled.bg
      }`};
    `;
  }}
`;

const RadioBtn = styled.div<StyledProps>`
  width: 8px;
  height: 8px;
  z-index: 2;
  border-radius: 50%;
  transition: background-color 75ms ease-in;
  ${({ theme, isSelected, disabled }) => {
    let bgColor: string;

    if (isSelected) {
      if (disabled) {
        bgColor = theme.cmp.selection.disabled.tick;
      } else {
        bgColor = theme.cmp.selection.color;
      }
    } else {
      bgColor = theme.cmp.selection.alpha;
    }

    return css`
      background-color: ${bgColor};
    `;
  }}
`;

const Content = styled.div`
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
    ${({ theme, disabled }) => css`
      color: ${!disabled
        ? theme.cmp.selection.color
        : theme.cmp.selection.disabled.text};
    `}
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
