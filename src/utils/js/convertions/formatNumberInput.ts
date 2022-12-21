export const formatNumber = (input: string | undefined) => {
  if (input != null && input.length > 0) {
    const dummyEntry = input.replace(/,/g, '');
    const numEntry = Number(dummyEntry);
    const formated = new Intl.NumberFormat('en-US').format(numEntry);

    return formated;
  } else {
    return input;
  }
};
