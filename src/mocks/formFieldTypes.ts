export enum FormFieldTypes {
  String = 'string',
  Number = 'number',
  Date = 'date',
  DateRange = 'date-range',
  Selector = 'selector',
  Radio = 'radio',
  Check = 'check',
}

export const formFieldTypes = [
  { value: FormFieldTypes.String, label: FormFieldTypes.String },
  { value: FormFieldTypes.Number, label: FormFieldTypes.Number },
  { value: FormFieldTypes.Date, label: FormFieldTypes.Date },
  { value: FormFieldTypes.DateRange, label: FormFieldTypes.DateRange },
  { value: FormFieldTypes.Selector, label: FormFieldTypes.Selector },
  { value: FormFieldTypes.Radio, label: FormFieldTypes.Radio },
  { value: FormFieldTypes.Check, label: FormFieldTypes.Check },
];
