import { atom } from 'jotai';
import { FormFieldTypes } from 'mocks/formFieldTypes';
import { FieldPermissionsList } from 'mocks/permissionsList';

import type {
  FormFieldDataProps,
  FormGeneralInfoFieldsProps,
} from './IFormGenerationStore';

export const formGeneralInfoAtom = atom<FormGeneralInfoFieldsProps | undefined>(
  undefined,
);

export const formFieldsDataAtom = atom<FormFieldDataProps[]>([]);

export const selectedFieldDataAtom = atom<FormFieldDataProps | undefined>(
  undefined,
);
