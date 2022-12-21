import type { FC } from 'react';
import styled, { css } from 'styled-components';

export interface SwitchProps {
  isChecked: boolean;
  label?: string;
  disabled?: boolean;
  className?: string;
  onSelect: () => void;
}

export const Switch: FC<SwitchProps> = (props: SwitchProps) => {
  const { isChecked, label, disabled, className, onSelect } = props;

  return (
    <Container disabled={disabled} onClick={!disabled ? onSelect : undefined}>
      <CircleBox
        isChecked={isChecked}
        disabled={disabled}
        className={className}
      >
        <Circle isChecked={isChecked} disabled={disabled} />
      </CircleBox>
      {label ? <Label disabled={disabled}>{label}</Label> : null}
    </Container>
  );
};

interface StyledProps {
  isChecked?: boolean;
  disabled?: boolean;
}

const Container = styled.div<StyledProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  ${({ disabled }) => css`
    cursor: ${!disabled ? 'pointer' : 'no-drop'};
  `}
`;

const CircleBox = styled.div<StyledProps>`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  transition: background-color 75ms ease-in;

  ${({ theme, isChecked, disabled }) => {
    let bgColor: string;

    if (isChecked) {
      if (disabled) {
        bgColor = theme.cmp.selection.disabled.active;
      } else {
        bgColor = theme.cmp.selection.active;
      }
    } else if (disabled) {
      bgColor = theme.cmp.selection.disabled.bg;
    } else {
      bgColor = theme.cmp.selection.deActive;
    }

    return css`
      cursor: ${disabled ? 'no-drop' : 'pointer'};
      border-radius: 40px;
      width: 48px;
      height: 28px;
      background-color: ${bgColor};
    `;
  }}
`;

const Circle = styled.div<StyledProps>`
  left: 3px;
  top: 50%;
  position: absolute;
  content: '';
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: transform 200ms;
  border-radius: 50%;

  ${({ theme, isChecked, disabled }) => {
    let bgColor: string;

    if (isChecked) {
      if (disabled) {
        bgColor = theme.cmp.selection.disabled.tick;
      } else {
        bgColor = theme.cmp.selection.color;
      }
    } else if (disabled) {
      bgColor = theme.cmp.selection.disabled.tick;
    } else {
      bgColor = theme.cmp.selection.color;
    }

    return css`
      width: 23px;
      height: 23px;
      transform: translate(${isChecked ? '20px' : 0}, -50%);
      background-color: ${bgColor};
    `;
  }}
`;

const Label = styled.span<StyledProps>`
  text-align: left;
  ${({ theme, disabled }) => css`
    color: ${!disabled
      ? theme.cmp.selection.color
      : theme.cmp.selection.disabled.text};
    font-weight: ${theme.typography.fontWeight.regular};
    font-size: ${theme.typography.fontSize.body.M};
    margin-left: 8px;
  `}
`;
