import type { InputType } from 'components/shared/Input/Input';
import { Input } from 'components/shared/Input/Input';
import type { FC, ReactElement } from 'react';
import React from 'react';
import type { ValidationRule } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import { NumericInput } from '../Input/NumericInput';

interface LengthValidate {
  value: number;
  message: string;
}

export interface FormNumericInputProps {
  name: string;
  label?: string;
  required?: boolean | string;
  min?: number;
  max?: number;
  minLength?: LengthValidate;
  maxLength?: LengthValidate;
  pattern?: ValidationRule<RegExp>;
  placeholder?: string;
  tooltip?: string;
  icon?: ReactElement;
  endIcon?: ReactElement;
  inputId?: string;
  value?: string;
  prefix?: JSX.Element | string;
  disabled?: boolean;
  hideCloseIcon?: boolean;
  validationText?: string;
  maxValue?: number;
  className?: string;
  onClear?: () => void;
}

export const FormNumericInput: FC<FormNumericInputProps> = props => {
  const {
    name,
    placeholder,
    tooltip,
    required,
    min,
    max,
    minLength,
    maxLength,
    pattern,
    icon,
    endIcon,
    label,
    inputId,
    value,
    prefix,
    disabled,
    hideCloseIcon,
    validationText,
    maxValue,
    className,
    onClear,
  } = props;

  const { register } = useFormContext();

  const {
    name: registerName,
    ref,
    onChange,
    onBlur,
  } = register(name as `${string}`, {
    required,
    min,
    max,
    minLength,
    maxLength,
    pattern,
    disabled,
  });

  return (
    <NumericInput
      ref={ref}
      name={registerName}
      label={label}
      inputId={inputId}
      placeholder={placeholder}
      icon={icon}
      endIcon={endIcon}
      value={value}
      prefix={prefix}
      disabled={disabled}
      tooltip={tooltip}
      validationText={validationText}
      hideCloseIcon={hideCloseIcon}
      maxValue={maxValue}
      className={className}
      onChange={onChange}
      onClear={onClear}
      onBlur={onBlur}
    />
  );
};
