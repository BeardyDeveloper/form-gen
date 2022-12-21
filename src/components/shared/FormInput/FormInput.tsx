import type { InputType } from 'components/shared/Input/Input';
import { Input } from 'components/shared/Input/Input';
import type { FC, ReactElement } from 'react';
import React from 'react';
import type { Validate, ValidationRule } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

interface LengthValidate {
  value: number;
  message: string;
}

export interface FormInputProps {
  type?: InputType;
  textType?: InputType;
  name: string;
  label?: string;
  required?: boolean | string;
  min?: number;
  max?: number;
  minLength?: LengthValidate;
  maxLength?: LengthValidate;
  pattern?: ValidationRule<RegExp>;
  placeholder?: string;
  tooltip?: JSX.Element | string;
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
  validate?: Validate<any>;
  onClear?: () => void;
}

export const FormInput: FC<FormInputProps> = props => {
  const {
    name,
    placeholder,
    tooltip,
    required,
    min,
    max,
    minLength,
    maxLength,
    validate,
    pattern,
    type,
    icon,
    endIcon,
    label,
    inputId,
    textType,
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
    validate,
    disabled,
  });

  return (
    <Input
      type={type}
      ref={ref}
      name={registerName}
      label={label}
      inputId={inputId}
      textType={textType}
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
