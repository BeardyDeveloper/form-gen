import { Checkbox } from 'components/shared/CheckBox/CheckBox';
import { FormInput } from 'components/shared/FormInput/FormInput';
import type { FC } from 'react';
import { useEffect } from 'react';
import type { Control } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

interface FieldValidationsProps {
  control: Control<any>;
}

export const FieldValidations: FC<FieldValidationsProps> = props => {
  const { control } = props;

  const { watch, setValue } = useFormContext();

  useEffect(() => {
    setValue('fieldRules.required', true);
  }, []);

  return (
    <Container>
      <Field>
        <Controller
          control={control}
          name="fieldRules.required"
          render={({ field: { onChange, value } }) => {
            return (
              <Checkbox
                label="Required"
                isSelected={value}
                onSelect={() => onChange(!value)}
              />
            );
          }}
        />
      </Field>
      <Field>
        <FormInput
          value={watch('fieldRules.min')}
          name="fieldRules.min"
          label="Min"
          tooltip="filed length shoud be less than this value"
          onClear={() => setValue('fieldRules.min', '')}
        />
      </Field>
      <Field>
        <FormInput
          value={watch('fieldRules.max')}
          name="fieldRules.max"
          label="Max"
          tooltip="filed length shoud be more than this value"
          onClear={() => setValue('fieldRules.max', '')}
        />
      </Field>
      <Field>
        <FormInput
          value={watch('fieldRules.pattern')}
          name="fieldRules.pattern"
          label="Pattern"
          tooltip="filed special validation pattern"
          onClear={() => setValue('fieldRules.pattern', '')}
        />
      </Field>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Field = styled.div`
  width: 100%;
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
`;
