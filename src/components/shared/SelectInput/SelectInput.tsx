import { selectStyles } from 'lib/selectStyles';
import type { ReactElement } from 'react';
import React, { forwardRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import Select from 'react-select';
import styled, { css, useTheme } from 'styled-components';

import {
  ClearIndicator,
  customControl,
  customOption,
  DropdownIndicator,
  Group,
  MenuList,
} from './CustomComponents';

export interface SelectDefaultOptionProps {
  label: string;
  value: string;
  helper?: string;
  icon?: React.ReactElement;
}

export enum SelectMenuPlacement {
  Top = 'top',
  Bottom = 'bottom',
}

export interface SelectInputProps {
  loading?: boolean;
  icon?: ReactElement;
  value?: SelectDefaultOptionProps;
  options: SelectDefaultOptionProps[];
  defaultValue?: SelectDefaultOptionProps;
  menuPlacement?: SelectMenuPlacement;
  label?: string;
  placeholder?: string;
  menuWidth?: string;
  menuLeft?: string;
  disabled?: boolean;
  validationText?: string;
  tooltip?: JSX.Element | string;
  className?: string;
  onChange: (args?: any) => void;
  onBlur?: (args?: any) => void;
}

export const SelectInput = forwardRef<any, SelectInputProps>(
  (props, forwardedRef) => {
    const {
      loading,
      value,
      options,
      icon,
      defaultValue,
      menuPlacement,
      label,
      placeholder,
      menuWidth,
      menuLeft,
      disabled,
      validationText,
      tooltip,
      className,
      onChange,
      onBlur,
    } = props;

    const theme = useTheme();

    const Control = customControl(value?.icon ?? icon);

    let menuHeight: number;

    if (options.length < 2) {
      menuHeight = options.length * 72;
    } else if (options.length < 3) {
      menuHeight = options.length * 62;
    } else if (options.length <= 4) {
      menuHeight = options.length * 57;
    } else if (options.length < 6) {
      menuHeight = options.length * 56;
    } else {
      menuHeight = 325;
    }

    return (
      <Container className={className}>
        <Label disabled={disabled}>{label}</Label>
        <FieldBox
          data-html
          data-tip={
            typeof tooltip === 'object'
              ? ReactDOMServer.renderToString(tooltip)
              : tooltip
          }
          disabled={disabled}
        >
          <StyledSelect
            components={{
              Control,
              Option: customOption(),
              Group,
              MenuList,
              DropdownIndicator,
              ClearIndicator,
            }}
            ref={forwardedRef}
            menuPortalTarget={document.body}
            isMulti={false}
            isClearable
            isDisabled={disabled}
            closeMenuOnSelect
            placeholder={placeholder ?? ''}
            isLoading={loading ? loading : !options}
            loadingMessage={() => 'Loading...'}
            styles={selectStyles({
              menuWidth,
              menuLeft,
              menuHeight,
              theme,
              error: validationText != null,
            })}
            value={value}
            menuPlacement={menuPlacement ?? SelectMenuPlacement.Bottom}
            options={options}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
          />
        </FieldBox>
        {validationText && !disabled ? (
          <ValidationText>{validationText}</ValidationText>
        ) : null}
      </Container>
    );
  },
);

interface StyledProps {
  disabled?: boolean;
  error?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  background-color: none;
  border-radius: 0;
  border: none;
`;

const Label = styled.span<StyledProps>`
  ${({ theme, disabled }) => css`
    color: ${disabled ? theme.cmp.input.disabled.label : theme.cmp.input.label};
    line-height: ${theme.typography.lineHeight.XS};
    font-size: ${theme.typography.fontSize.body.S};
    font-weight: ${theme.typography.fontWeight.semiBold};
    margin-bottom: 5px;
  `}
`;

const FieldBox = styled.div<StyledProps>`
  width: 100%;
  cursor: ${({ disabled }) => (disabled ? 'no-drop' : 'pointer')};
`;

const StyledSelect = styled(Select)`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  outline: none;
  z-index: 10;
`;

const ValidationText = styled.span<StyledProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => css`
    margin-top: 2px;
    color: ${theme.cmp.input.error};
    font-size: ${theme.typography.fontSize.body.XS};
    line-height: ${theme.typography.lineHeight.XXS};
  `}
`;
