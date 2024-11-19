const isValidDate = (date: Date | string) =>
  date && !isNaN(new Date(date).getTime());
export default isValidDate;
