import { toaster, ToastType } from 'components/shared/Toaster/Toaster';
import { useAtom } from 'jotai';
import type { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import {
  formFieldsDataAtom,
  formGeneralInfoAtom,
  selectedFieldDataAtom,
} from 'store/formGenerationStore';
import type {
  FormFieldDataProps,
  FormGeneralInfoFieldsProps,
} from 'store/IFormGenerationStore';

export const useFormGeneration = () => {
  const navigate = useNavigate();

  const [_, setFormGeneralInfo] = useAtom(formGeneralInfoAtom);
  const [fields, setFields] = useAtom(formFieldsDataAtom);
  const [selectedFieldData, setSelectedFieldData] = useAtom(
    selectedFieldDataAtom,
  );

  const onAddPreField = (fieldData: FieldValues) => {
    const fieldsCopy = [...fields];
    const currentItemIndex = fieldsCopy.findIndex(
      item => item.fieldName === fieldData.fieldName,
    );

    if (currentItemIndex < 0) {
      setFields(prev => [
        ...prev,
        {
          id: uuid(),
          fieldName: fieldData.fieldName,
          fieldLabel: fieldData.fieldLabel,
          fieldPlaceholder: fieldData.fieldPlaceholder,
          fieldDescription: fieldData.fieldDescription,
          fieldPermission: fieldData.fieldPermission,
          fieldType: fieldData.fieldType,
          enableFieldValidations: fieldData.enableFieldValidations,
          fieldRules: fieldData.enableFieldValidations
            ? fieldData.fieldRules
            : null,
        },
      ]);
    } else {
      toaster(ToastType.Error, {
        text: 'you can not create fields with same name',
      });
    }
  };

  const onSelectPreField = (id: string) => {
    const fieldsCopy = [...fields];
    const SelectedField = fieldsCopy.find(field => field.id === id)!;

    setSelectedFieldData(SelectedField);
  };

  const onEditPreField = (fieldData: FormFieldDataProps) => {
    const fieldsCopy = [...fields];
    const currentItemIndex = fieldsCopy.findIndex(
      item => item.id === fieldData.id,
    );
    fieldsCopy[currentItemIndex] = fieldData;
    setFields(fieldsCopy);
  };

  const onDeletePreField = (id: string) => {
    const fieldsCopy = [...fields];
    const currentItemIndex = fieldsCopy.findIndex(item => item.id === id);
    const currentItem = fieldsCopy[currentItemIndex];
    fieldsCopy.splice(currentItemIndex, 1);
    setFields(fieldsCopy);

    if (currentItem?.id === selectedFieldData?.id) {
      setSelectedFieldData(undefined);
    }
  };

  const onGenerateForm = (generals: FormGeneralInfoFieldsProps) => {
    const generalsCopy = { ...generals };
    setFormGeneralInfo(generalsCopy);
    navigate('/Form');
  };

  const onEditForm = () => {
    navigate('/');
  };

  const onDeleteForm = () => {
    setFormGeneralInfo(undefined);
    setFields([]);
    setSelectedFieldData(undefined);
    navigate('/');
  };

  const result = {
    onAddPreField,
    onSelectPreField,
    onEditPreField,
    onDeletePreField,
    onGenerateForm,
    onEditForm,
    onDeleteForm,
  } as const;

  return result;
};
