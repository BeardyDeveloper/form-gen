import { PageTemplate } from 'components/layout/Templates/PageTemplate/PageTemplate';
import { FieldGenerator } from 'components/private/FormGeneratorPage/FieldGenerator/FieldGenerator';
import { FieldsPreList } from 'components/private/FormGeneratorPage/FieldPreList/FieldPreList';
import { FormGeneralInfo } from 'components/private/FormGeneratorPage/FormGeneralInfo/FormGeneralInfo';
import {
  Button,
  ButtonSize,
  ButtonVariant,
} from 'components/shared/Button/Button';
import { ContentFrame } from 'components/shared/ContentFrame/ContentFrame';
import { toaster, ToastType } from 'components/shared/Toaster/Toaster';
import { useFormGeneration } from 'hooks/useFormGeneration';
import { CardAdd, ClipboardText, I3Square } from 'iconsax-react';
import { useAtom } from 'jotai';
import type { FC } from 'react';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useResizeDetector } from 'react-resize-detector';
import TooltipContainer from 'react-tooltip';
import {
  formFieldsDataAtom,
  formGeneralInfoAtom,
} from 'store/formGenerationStore';
import type { FormGeneralInfoFieldsProps } from 'store/IFormGenerationStore';
import styled, { css, useTheme } from 'styled-components';

const FormGeneratorPage: FC = () => {
  const theme = useTheme();

  const { ref: containerRef } = useResizeDetector();
  const { onGenerateForm } = useFormGeneration();

  const [formGeneralInfo] = useAtom(formGeneralInfoAtom);
  const [fields] = useAtom(formFieldsDataAtom);

  const generalFormMethods = useForm({
    defaultValues: useMemo(() => {
      return formGeneralInfo;
    }, [formGeneralInfo]),
  });
  const { handleSubmit, reset } = generalFormMethods;

  useEffect(() => {
    reset(formGeneralInfo);
  }, [formGeneralInfo]);

  const onSubmit = (data: FormGeneralInfoFieldsProps) => {
    if (fields.length > 2) {
      onGenerateForm(data);
    } else {
      toaster(ToastType.Error, {
        text: 'please create three field at least',
      });
    }
  };

  return (
    <>
      <PageTemplate>
        <Container ref={containerRef}>
          <Generators>
            <InfosWrapper>
              <ContentFrame
                icon={<ClipboardText variant="Bulk" />}
                title="General info"
              >
                <Content>
                  <FormGeneralInfo formMethods={generalFormMethods} />
                </Content>
              </ContentFrame>
              <ContentFrame
                icon={<CardAdd variant="Bulk" />}
                title="Add new Field"
              >
                <Content>
                  <FieldGenerator />
                </Content>
              </ContentFrame>
            </InfosWrapper>
            <FieldsListWrapper>
              <ContentFrame
                icon={<I3Square variant="Bulk" />}
                title="Fields List"
              >
                <Content>
                  <FieldsPreList />
                </Content>
              </ContentFrame>
            </FieldsListWrapper>
          </Generators>
          <ButtonBox>
            <Button
              label="Generate"
              buttonSize={ButtonSize.Large}
              variant={ButtonVariant.Primary}
              fullWidth
              disabled={false}
              onClick={handleSubmit(onSubmit)}
            />
          </ButtonBox>
        </Container>
      </PageTemplate>

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

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 90vh;
  padding: 54px 52px 0 54px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Generators = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const InfosWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const FieldsListWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Content = styled.div`
  width: 100%;
`;

const ButtonBox = styled.div`
  width: 100%;
  margin-top: 60px;
  margin-bottom: 24px;
`;

export default FormGeneratorPage;
