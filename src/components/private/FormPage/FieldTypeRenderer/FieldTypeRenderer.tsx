/* eslint-disable max-lines-per-function */
import { Checkbox } from 'components/shared/CheckBox/CheckBox';
import { DatePicker } from 'components/shared/DatePicker/DatePicker';
import { FormInput } from 'components/shared/FormInput/FormInput';
import { NumericInput } from 'components/shared/Input/NumericInput';
import { Radio } from 'components/shared/Radio/Radio';
import { SelectInput } from 'components/shared/SelectInput/SelectInput';
import { FormFieldTypes } from 'mocks/formFieldTypes';
import { FieldPermissionsList } from 'mocks/permissionsList';
import { selectionFieldsFakeOptions } from 'mocks/selectionFieldsFakeOptions';
import type { FC } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { FormFieldValidationsProps } from 'store/IFormGenerationStore';
import { fieldValidationsRules } from 'utils/js/validations/fieldValidationsRules';

interface FieldTypeRendererProps {
  fieldType: FormFieldTypes;
  fieldName: string;
  fieldPlaceholder: string;
  fieldDescription?: string;
  fieldPermission: FieldPermissionsList;
  fieldRules?: FormFieldValidationsProps;
  formMethods: UseFormReturn<FieldValues, any>;
}

export const FieldTypeRenderer: FC<FieldTypeRendererProps> = props => {
  const {
    fieldType,
    fieldName,
    fieldPlaceholder,
    fieldDescription,
    fieldPermission,
    fieldRules,
    formMethods,
  } = props;

  const {
    watch,
    setValue,
    control,
    formState: { errors },
  } = formMethods;

  const fieldValidations = fieldValidationsRules(fieldRules!);

  const controllersInitialProps = {
    control,
    name: fieldName,
    rules: { ...fieldValidations },
  };

  const fieldsInitialProps = {
    label: fieldName,
    placeholder: fieldPlaceholder,
    tooltip: fieldDescription,
    validationText: errors[fieldName]?.message as unknown as string,
    disabled: fieldPermission === FieldPermissionsList.Normal,
  };

  switch (fieldType) {
    case FormFieldTypes.String:
      return (
        <FormInput
          value={watch(fieldName)}
          {...fieldsInitialProps}
          {...fieldValidations}
          tooltip="asdsad"
          name={fieldName}
          onClear={() => setValue(fieldName, '')}
        />
      );

    case FormFieldTypes.Number:
      return (
        <Controller
          {...controllersInitialProps}
          render={({ field: { onChange, value, ref } }) => (
            <NumericInput
              ref={ref}
              {...fieldsInitialProps}
              value={value ? value.formattedValue : ''}
              onChange={e => onChange(e)}
              onClear={() => setValue(fieldName, '')}
            />
          )}
        />
      );

    case FormFieldTypes.Selector:
      return (
        <Controller
          {...controllersInitialProps}
          render={({ field: { onBlur, onChange, value, ref } }) => {
            return (
              <SelectInput
                ref={ref}
                {...fieldsInitialProps}
                loading={!selectionFieldsFakeOptions}
                options={selectionFieldsFakeOptions}
                value={value || ''}
                onChange={selectedValue => onChange(selectedValue)}
                onBlur={onBlur}
              />
            );
          }}
        />
      );

    case FormFieldTypes.Date:
      return (
        <Controller
          {...controllersInitialProps}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <DatePicker
                ref={ref}
                value={value || ''}
                {...fieldsInitialProps}
                onChange={date => onChange(date?.toDate())}
              />
            );
          }}
        />
      );

    case FormFieldTypes.DateRange:
      return (
        <Controller
          {...controllersInitialProps}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <DatePicker
                ref={ref}
                rangeSelector
                value={value || ''}
                {...fieldsInitialProps}
                onChange={date => {
                  if (date?.length > 0) {
                    const datesArray = date.map((d: any) => d.toDate());
                    onChange(datesArray);
                  } else {
                    onChange(date?.toDate());
                  }
                }}
              />
            );
          }}
        />
      );

    case FormFieldTypes.Radio:
      return (
        <Controller
          control={control}
          name={fieldName}
          render={({ field: { onChange, value } }) => {
            return (
              <Radio
                label={fieldName}
                isSelected={value}
                onSelect={() => onChange(!value)}
              />
            );
          }}
        />
      );

    case FormFieldTypes.Check:
      return (
        <Controller
          control={control}
          name={fieldName}
          render={({ field: { onChange, value } }) => {
            return (
              <Checkbox
                label={fieldName}
                isSelected={value}
                onSelect={() => onChange(!value)}
              />
            );
          }}
        />
      );

    default:
      return null;
  }
};
