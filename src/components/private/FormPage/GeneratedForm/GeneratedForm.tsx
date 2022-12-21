import { useAtom } from 'jotai';
import { FieldPermissionsList } from 'mocks/permissionsList';
import type { FC } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import TooltipContainer from 'react-tooltip';
import { formFieldsDataAtom } from 'store/formGenerationStore';
import styled, { css, useTheme } from 'styled-components';

import { FieldTypeRenderer } from '../FieldTypeRenderer/FieldTypeRenderer';

interface GeneratedFormProps {
  formMethods: UseFormReturn<FieldValues, any>;
}

export const GeneratedForm: FC<GeneratedFormProps> = props => {
  const { formMethods } = props;

  const theme = useTheme();
  const [fields] = useAtom(formFieldsDataAtom);

  return (
    <>
      <Container>
        {fields?.map(field => (
          <Field
            key={field.id}
            disabled={
              field.fieldPermission.value === FieldPermissionsList.Normal
            }
          >
            {field.fieldPermission.value === FieldPermissionsList.Pro ? (
              <FieldTypeRenderer
                key={field.id}
                fieldType={field.fieldType.value}
                fieldName={field.fieldName}
                fieldPlaceholder={field.fieldPlaceholder}
                fieldDescription={field.fieldDescription}
                fieldPermission={field.fieldPermission.value}
                fieldRules={field.fieldRules!}
                formMethods={formMethods}
              />
            ) : (
              <NoAccess>you have no access to this field</NoAccess>
            )}
          </Field>
        ))}
      </Container>

      <TooltipContainer
        place="right"
        effect="solid"
        arrowColor="#1A1F2C"
        borderColor="#1A1F2C"
        backgroundColor={theme.gradients.glass.toRight}
        className="react-tooltip-container"
      />
    </>
  );
};

interface StyledProps {
  disabled?: boolean;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Field = styled.div<StyledProps>`
  width: 100%;
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
  ${({ disabled }) => css`
    opacity: ${disabled ? 0.75 : 1};
  `}
`;

const NoAccess = styled.div`
  text-align: center;
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  ${({ theme }) => css`
    background-color: ${theme.background.dark.secondary};
    color: ${theme.cmp.selection.disabled.text};
    font-weight: ${theme.typography.fontWeight.regular};
    font-size: ${theme.typography.fontSize.body.M};
  `}
`;
