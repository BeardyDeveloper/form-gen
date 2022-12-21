export const startEndDateValidate = (date: Date[]) => {
  if (date.length === 1) {
    return 'select the End date';
  } else {
    return true;
  }
};
