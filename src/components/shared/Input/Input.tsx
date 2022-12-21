/* eslint-disable complexity */
import { ReactComponent as CloseSvg } from 'assets/icons/Close.svg';
import { useOnClickOutside } from 'hooks/common/useOnClickOutside';
import { Eye, EyeSlash } from 'iconsax-react';
import type { MouseEvent, ReactElement } from 'react';
import React, { forwardRef, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import styled, { css } from 'styled-components';

export enum InputType {
  Text = 'text',
  Password = 'password',
  Number = 'number',
}

export interface InputProps {
  name?: string;
  label?: string;
  type?: InputType;
  textType?: InputType;
  inputId?: string;
  placeholder?: string;
  icon?: ReactElement;
  endIcon?: ReactElement;
  value?: string;
  prefix?: JSX.Element | string;
  disabled?: boolean;
  hideCloseIcon?: boolean;
  validationText?: string;
  maxValue?: number;
  tooltip?: JSX.Element | string;
  className?: string;
  onChange?: (value: any) => void;
  onBlur?: (args?: any) => void;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, forwardedRef) => {
    const {
      name,
      label,
      inputId,
      type,
      textType,
      placeholder,
      icon,
      endIcon,
      value,
      prefix,
      disabled,
      hideCloseIcon,
      validationText,
      tooltip,
      className,
      onChange,
      onClear,
    } = props;

    const containerRef = useRef<any>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const hasValueCondition = value != null && value.length > 0;

    const onInputFocus = (e: MouseEvent) => {
      e.stopPropagation();

      if (forwardedRef != null && typeof forwardedRef !== 'function') {
        forwardedRef.current!.focus();
        setIsFocused(true);
      } else if (containerRef.current) {
        const input = containerRef.current.querySelector('input');
        input.focus();
        setIsFocused(true);
      }
    };

    const onInputBlur = () => {
      if (forwardedRef != null && typeof forwardedRef !== 'function') {
        forwardedRef.current!.blur();
        setIsFocused(false);
      } else if (containerRef.current) {
        const input = containerRef.current.querySelector('input');
        input.blur();
        setIsFocused(false);
      }
    };

    useOnClickOutside(containerRef, onInputBlur);

    const onClearHanlder = (e: MouseEvent) => {
      e.stopPropagation();
      if (onClear) {
        onClear();
      }
    };

    const onChangeTextType = (e: MouseEvent) => {
      e.stopPropagation();
      if (hasValueCondition) {
        setShowPassword(!showPassword);
      }
    };

    return (
      <Container className={className}>
        <Label htmlFor={inputId} disabled={disabled}>
          {label}
        </Label>
        <FieldBox
          ref={containerRef}
          error={validationText != null}
          isFocused={isFocused}
          disabled={disabled}
          data-html
          data-tip={
            typeof tooltip === 'object'
              ? ReactDOMServer.renderToString(tooltip)
              : tooltip
          }
          onClick={!disabled ? onInputFocus : undefined}
        >
          {icon ? (
            <Icon
              error={validationText != null}
              disabled={disabled}
              isFocused={isFocused}
              hasValue={hasValueCondition}
            >
              {icon}
            </Icon>
          ) : null}
          <Field
            disabled={disabled}
            name={name}
            ref={forwardedRef}
            type={showPassword ? 'text' : type}
            textType={textType}
            placeholder={placeholder}
            error={validationText != null}
            value={value}
            onChange={!disabled ? onChange : undefined}
          />
          {textType === InputType.Password && !disabled ? (
            <EndIcon
              hasValue={hasValueCondition}
              isFocused={isFocused}
              disabled={disabled}
              onClick={onChangeTextType}
            >
              {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
            </EndIcon>
          ) : null}
          {hasValueCondition && !hideCloseIcon && !disabled && isFocused ? (
            <EndIcon trailing onClick={onClearHanlder}>
              <CloseSvg />
            </EndIcon>
          ) : null}
          {prefix && textType !== InputType.Password ? (
            <Prefix trailing>{prefix}</Prefix>
          ) : null}
          {endIcon ? <EndIcon trailing>{endIcon}</EndIcon> : null}
        </FieldBox>
        {validationText && !disabled ? (
          <ValidationText error={validationText != null}>
            {validationText}
          </ValidationText>
        ) : null}
      </Container>
    );
  },
);

Input.defaultProps = {
  type: InputType.Text,
  textType: InputType.Text,
};

interface StyledProps {
  textType?: InputType;
  hasValue?: boolean;
  isFocused?: boolean;
  trailing?: boolean;
  error?: boolean;
  disabled?: boolean;
}

const Container = styled.div<StyledProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label = styled.label<StyledProps>`
  ${({ theme, disabled }) => css`
    color: ${disabled ? theme.cmp.input.disabled.label : theme.cmp.input.label};
    line-height: ${theme.typography.lineHeight.XS};
    font-size: ${theme.typography.fontSize.body.S};
    font-weight: ${theme.typography.fontWeight.semiBold};
    margin-bottom: 5px;
  `}
`;

const Icon = styled.div<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme, disabled }) => {
    return css`
      color: ${theme.cmp.input.placeholder};
      cursor: ${disabled ? 'no-drop' : 'normal'};
      & > svg {
        width: 20px;
        height: 20px;
      }
    `;
  }}
`;

const FieldBox = styled.div<StyledProps>`
  font-size: inherit;
  width: 100%;
  height: 46px;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme, error, isFocused, disabled }) => {
    let borderColor: string;
    let outlineColor: string;

    if (isFocused && !error && !disabled) {
      borderColor = theme.cmp.input.border.active;
      outlineColor = theme.cmp.input.outline;
    } else if (error) {
      borderColor = theme.cmp.input.border.error;
      outlineColor = 'none';
    } else {
      borderColor = theme.cmp.input.border.default;
      outlineColor = 'none';
    }

    return css`
      cursor: ${disabled ? 'no-drop' : 'normal'};
      background-color: ${theme.cmp.input.bg};
      padding: 0 10px;
      border: ${`1px solid ${borderColor}`};
      outline: ${`2px solid ${outlineColor}`};
      &:hover {
        border-color: ${!error &&
        !isFocused &&
        !disabled &&
        theme.cmp.input.border.hover};
      }
    `;
  }};
`;

const EndIcon = styled.div<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme, trailing, disabled }) => {
    return css`
      cursor: ${disabled ? 'no-drop' : 'pointer'};
        margin-left: ${trailing && '8px'};
        color: ${theme.cmp.input.placeholder};
        & > svg {
          width: 20px
          height: 20px
        }
      `;
  }}
`;

const Field = styled.input<StyledProps>`
  all: unset;
  direction: ltr;
  font-size: inherit;
  text-align: left;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;

  ${({ theme, textType, error }) => {
    return css`
      color: ${theme.cmp.input.color};
      caret-color: ${error ? theme.cmp.input.error : theme.cmp.input.color};
      font-weight: ${theme.typography.fontWeight.medium};
      font-size: ${theme.typography.fontSize.body.S};
      padding: ${textType === InputType.Password ? `0 8px 0 8px` : `0 0 0 8px`};

      &::placeholder {
        color: ${theme.cmp.input.placeholder};
        font-size: ${theme.typography.fontSize.body.M};
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:active,
      &:-webkit-autofill:focus {
        width: 100%;
        height: 100%;
        -webkit-appearance: none !important;
        -webkit-text-fill-color: ${theme.cmp.input.color} !important;
        border: unset !important;
        -webkit-box-shadow: unset !important;
        box-shadow: unset !important;
        background-color: transparent !important;
        -webkit-border-before: unset !important;
        transition: background-color 90000s ease-in-out 90000s;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      &[type='number'] {
        -moz-appearance: textfield;
      }
    `;
  }}
`;

const Prefix = styled.div<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  ${({ theme }) => css`
    color: ${theme.cmp.input.color};
    font-size: ${theme.typography.fontSize.body.S};
  `}
`;

const ValidationText = styled.div<StyledProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme, error }) => css`
    margin-top: 2px;
    color: ${error ? theme.cmp.input.error : theme.cmp.input.error};
    font-size: ${theme.typography.fontSize.body.XS};
    line-height: ${theme.typography.lineHeight.XXS};
  `}
`;
