export enum FormPermissionsList {
  Guest = 'guest',
  User = 'user',
}

export enum FieldPermissionsList {
  Pro = 'pro',
  Normal = 'normal',
}

export const formPermissionsList = [
  { value: FormPermissionsList.Guest, label: FormPermissionsList.Guest },
  { value: FormPermissionsList.User, label: FormPermissionsList.User },
];

export const fieldPermissionsList = [
  { value: FieldPermissionsList.Pro, label: FieldPermissionsList.Pro },
  { value: FieldPermissionsList.Normal, label: FieldPermissionsList.Normal },
];
