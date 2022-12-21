/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable max-lines-per-function */
import {
  Button,
  ButtonSize,
  ButtonVariant,
} from 'components/shared/Button/Button';
import { Checkbox } from 'components/shared/CheckBox/CheckBox';
import {
  ContentFrame,
  ContentFrameSize,
} from 'components/shared/ContentFrame/ContentFrame';
import { FormInput } from 'components/shared/FormInput/FormInput';
import {
  SelectInput,
  SelectMenuPlacement,
} from 'components/shared/SelectInput/SelectInput';
import { motion } from 'framer-motion';
import { useFormGeneration } from 'hooks/useFormGeneration';
import { ChartFail } from 'iconsax-react';
import { useAtom } from 'jotai';
import { formFieldTypes } from 'mocks/formFieldTypes';
import { fieldPermissionsList } from 'mocks/permissionsList';
import type { FC } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import type { FieldValues } from 'react-hook-form';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { selectedFieldDataAtom } from 'store/formGenerationStore';
import type { FormFieldDataProps } from 'store/IFormGenerationStore';
import styled from 'styled-components';

import { toggleVariants } from './animationVariants';
import { FieldValidations } from './Validations/FieldValidations';

export const FieldGenerator: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { onAddPreField, onEditPreField } = useFormGeneration();

  const [selectedFieldData] = useAtom(selectedFieldDataAtom);

  const formMethods = useForm({
    defaultValues: useMemo(() => {
      return selectedFieldData;
    }, [selectedFieldData]),
  });

  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = formMethods;

  useEffect(() => {
    reset(selectedFieldData);
  }, [selectedFieldData]);

  useEffect(() => {
    setValue('enableFieldValidations', false);
  }, []);

  const onSubmit = (data: FormFieldDataProps) => {
    if (selectedFieldData == null) {
      onAddPreField(data);
    } else {
      onEditPreField(data);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form ref={formRef}>
        <Field>
          <FormInput
            value={watch('fieldName')}
            name="fieldName"
            label="Field Name"
            tooltip="Your special Field Name"
            validationText={errors?.fieldName?.message as unknown as string}
            required="this is required"
            pattern={{
              value: /^\S*$/,
              message: 'Name should consisting only of non-whitespaces',
            }}
            onClear={() => setValue('fieldName', '')}
          />
        </Field>
        <Field>
          <FormInput
            value={watch('fieldLabel')}
            name="fieldLabel"
            label="Field Label"
            tooltip="Your special Field Label"
            validationText={errors?.fieldLabel?.message as unknown as string}
            required="this is required"
            onClear={() => setValue('fieldLabel', '')}
          />
        </Field>
        <Field>
          <FormInput
            value={watch('fieldPlaceholder')}
            name="fieldPlaceholder"
            label="Field Placeholder"
            tooltip="Your special Field Placeholder"
            validationText={
              errors?.fieldPlaceholder?.message as unknown as string
            }
            onClear={() => setValue('fieldPlaceholder', '')}
          />
        </Field>
        <Field>
          <FormInput
            value={watch('fieldDescription')}
            name="fieldDescription"
            label="Field Description"
            tooltip="Your special Field Description"
            onClear={() => setValue('fieldDescription', '')}
          />
        </Field>
        <Field>
          <Controller
            control={control}
            name="fieldPermission"
            rules={{
              required: 'this is required',
            }}
            render={({ field: { onBlur, onChange, value, ref } }) => {
              return (
                <SelectInput
                  ref={ref}
                  options={fieldPermissionsList}
                  value={value || ''}
                  label="Field Permission"
                  tooltip="pick the Field visibility permission"
                  validationText={
                    errors?.fieldPermission?.message as unknown as string
                  }
                  onChange={selectedValue => onChange(selectedValue)}
                  onBlur={onBlur}
                />
              );
            }}
          />
        </Field>
        <Field>
          <Controller
            control={control}
            name="fieldType"
            rules={{
              required: 'this is required',
            }}
            render={({ field: { onBlur, onChange, value, ref } }) => {
              return (
                <SelectInput
                  ref={ref}
                  options={formFieldTypes}
                  value={value || ''}
                  label="Field Type"
                  tooltip="pick the Field visibility Type"
                  menuPlacement={SelectMenuPlacement.Top}
                  validationText={
                    errors?.fieldType?.message as unknown as string
                  }
                  onChange={selectedValue => onChange(selectedValue)}
                  onBlur={onBlur}
                />
              );
            }}
          />
        </Field>
        <Field>
          <Controller
            control={control}
            name="enableFieldValidations"
            render={({ field: { onChange, value } }) => {
              return (
                <Checkbox
                  label="Enable Validations"
                  isSelected={value}
                  onSelect={() => onChange(!value)}
                />
              );
            }}
          />
        </Field>
        <Validations
          variants={toggleVariants}
          initial="hidden"
          animate={watch('enableFieldValidations') ? 'visible' : 'hidden'}
        >
          <ContentFrame
            icon={<ChartFail variant="Bulk" />}
            title="Field Validations"
            size={ContentFrameSize.Small}
          >
            <Content>
              <FieldValidations control={control} />
            </Content>
          </ContentFrame>
        </Validations>
        <ButtonBox>
          <Button
            label={selectedFieldData == null ? 'Add Field' : 'Edit Field'}
            buttonSize={ButtonSize.Medium}
            variant={ButtonVariant.Secondary}
            fullWidth
            disabled={false}
            onClick={handleSubmit(onSubmit)}
          />
        </ButtonBox>
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

const Content = styled.div`
  width: 100%;
`;

const Validations = styled(motion.div)`
  width: 100%;
`;

const ButtonBox = styled.div`
  width: 100%;
  margin-top: 24px;
`;
