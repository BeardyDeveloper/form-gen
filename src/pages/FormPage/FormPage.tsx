import { PageTemplate } from 'components/layout/Templates/PageTemplate/PageTemplate';
import { GeneratedForm } from 'components/private/FormPage/GeneratedForm/GeneratedForm';
import {
  Button,
  ButtonSize,
  ButtonVariant,
} from 'components/shared/Button/Button';
import { ContentFrame } from 'components/shared/ContentFrame/ContentFrame';
import { toaster, ToastType } from 'components/shared/Toaster/Toaster';
import { useFormGeneration } from 'hooks/useFormGeneration';
import { ClipboardText, Edit2, Trash } from 'iconsax-react';
import { useAtom } from 'jotai';
import { FormPermissionsList } from 'mocks/permissionsList';
import type { FC } from 'react';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  formFieldsDataAtom,
  formGeneralInfoAtom,
} from 'store/formGenerationStore';
import styled, { css } from 'styled-components';

const FormPage: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formGeneralInfo] = useAtom(formGeneralInfoAtom);
  const [fields] = useAtom(formFieldsDataAtom);
  const { onEditForm, onDeleteForm } = useFormGeneration();
  const formMethods = useForm();

  const {
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const onSubmit = (data: any) => {
    if (Object.keys(errors).length === 0) {
      toaster(ToastType.Success, {
        text: 'successfuly submitted!',
      });
    }
  };

  return (
    <PageTemplate>
      <Container>
        {formGeneralInfo?.formPermission.value === FormPermissionsList.User &&
        fields.length > 0 ? (
          <FormProvider {...formMethods}>
            <form ref={formRef}>
              <ContentFrame
                icon={<ClipboardText variant="Bulk" />}
                title={formGeneralInfo?.formTitle}
                actions={
                  <>
                    <EditIcon size={24} onClick={onEditForm} />
                    <DeleteIcon size={24} onClick={onDeleteForm} />
                  </>
                }
              >
                <Content>
                  <GeneratedForm formMethods={formMethods} />
                </Content>
              </ContentFrame>

              <ButtonBox>
                <StyledButton
                  label="Submit"
                  buttonSize={ButtonSize.Medium}
                  variant={ButtonVariant.Primary}
                  fullWidth
                  disabled={false}
                  onClick={handleSubmit(onSubmit)}
                />
              </ButtonBox>
            </form>
          </FormProvider>
        ) : (
          <NoAccess>
            {fields.length === 0
              ? 'you have not any created form'
              : 'you have no permission to see this form'}
          </NoAccess>
        )}
      </Container>
    </PageTemplate>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 54px 56px 24px 56px;
`;

const Content = styled.div`
  width: 540px;
`;

const ButtonBox = styled.div`
  width: 540px;
  margin-left: 40px;
  margin-top: 26px;
`;

const NoAccess = styled.span`
  text-align: center;
  width: 100%;
  padding: 16px;
  ${({ theme }) => css`
    color: ${theme.cmp.selection.disabled.text};
    font-weight: ${theme.typography.fontWeight.regular};
    font-size: ${theme.typography.fontSize.body.M};
  `}
`;

const StyledButton = styled(Button)``;

const EditIcon = styled(Edit2)`
  ${({ theme }) => css`
    color: ${theme.palette.Status.Teal[600]};
    margin-right: 12px;
    cursor: pointer;
  `}
`;

const DeleteIcon = styled(Trash)`
  ${({ theme }) => css`
    color: ${theme.palette.Status.Rose[600]};
    cursor: pointer;
  `}
`;

export default FormPage;
