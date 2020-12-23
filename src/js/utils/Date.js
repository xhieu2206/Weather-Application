export const dateConvert = (dateStr) => {
  const dateArr = dateStr.split('-');
  return new Date(dateArr[0], parseInt(dateArr[1], 10) - 1, parseInt(dateArr[2], 10) + 1);
}
