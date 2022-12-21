import type { FormFieldValidationsProps } from 'store/IFormGenerationStore';

export const fieldValidationsRules = (rules: FormFieldValidationsProps) => {
  if (rules) {
    return {
      required: rules.required ? 'this is required' : false,
      minLength: rules.min
        ? {
            value: Number(rules.min),
            message: `Min length is ${rules.min}`,
          }
        : undefined,
      maxLength: rules.max
        ? {
            value: Number(rules.max),
            message: `Max length is ${rules.max}`,
          }
        : undefined,
      pattern: rules.pattern ? new RegExp(rules.pattern!, 'i') : undefined,
    };
  } else {
    return undefined;
  }
};
