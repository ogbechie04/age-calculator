const DaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export default DaysInMonth;
