import type { FormFieldTypes } from 'mocks/formFieldTypes';
import type {
  FieldPermissionsList,
  FormPermissionsList,
} from 'mocks/permissionsList';

export interface FormGeneralInfoFieldsProps {
  formTitle: string;
  formPermission: { value: FormPermissionsList; label: FormPermissionsList };
}

export interface FormFieldValidationsProps {
  required?: boolean;
  min?: string;
  max?: string;
  pattern?: string;
}

export interface FormFieldDataProps {
  id: string;
  fieldName: string;
  fieldLabel: string;
  fieldPlaceholder: string;
  fieldDescription?: string;
  fieldPermission: { value: FieldPermissionsList; label: FieldPermissionsList };
  fieldType: { value: FormFieldTypes; label: FormFieldTypes };
  enableFieldValidations?: boolean;
  fieldRules?: FormFieldValidationsProps | null;
}
