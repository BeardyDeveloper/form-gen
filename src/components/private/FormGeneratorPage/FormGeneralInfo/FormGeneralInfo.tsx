import { FormInput } from 'components/shared/FormInput/FormInput';
import { SelectInput } from 'components/shared/SelectInput/SelectInput';
import { formPermissionsList } from 'mocks/permissionsList';
import type { FC } from 'react';
import { useRef } from 'react';
import type {
  Control,
  FieldErrors,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';
import { Controller, FormProvider } from 'react-hook-form';
import type { FormGeneralInfoFieldsProps } from 'store/IFormGenerationStore';
import styled, { css } from 'styled-components';

interface FormGeneralInfoProps {
  formMethods: UseFormReturn<FormGeneralInfoFieldsProps, any>;
}

export const FormGeneralInfo: FC<FormGeneralInfoProps> = props => {
  const { formMethods } = props;

  const formRef = useRef<HTMLFormElement>(null);

  const {
    watch,
    setValue,
    control,
    formState: { errors },
  } = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form ref={formRef}>
        <Field>
          <FormInput
            value={watch('formTitle')}
            name="formTitle"
            label="Form Title"
            tooltip="Your special Form title"
            validationText={errors?.formTitle?.message as unknown as string}
            required="this is required"
            onClear={() => setValue('formTitle', '')}
          />
        </Field>
        <Field>
          <Controller
            control={control}
            name="formPermission"
            rules={{
              required: 'this is required',
            }}
            render={({ field: { onBlur, onChange, value, ref } }) => {
              return (
                <SelectInput
                  ref={ref}
                  options={formPermissionsList}
                  value={value || ''}
                  label="Form Permission"
                  tooltip="pick the form visibility permission"
                  validationText={
                    errors?.formPermission?.message as unknown as string
                  }
                  onChange={selectedValue => onChange(selectedValue)}
                  onBlur={onBlur}
                />
              );
            }}
          />
        </Field>
      </form>
    </FormProvider>
  );
};

const Field = styled.div`
  width: 100%;
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
`;
