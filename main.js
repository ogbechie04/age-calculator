import DaysInMonth from "./numOfDays";

/**
 * TODO: Clean bg on input focus
 */

const dayLabel = document.querySelector("#day-label");
const monthLabel = document.querySelector("#month-label");
const yearLabel = document.querySelector("#year-label");

const dayError = document.querySelector("#day-error");
const monthError = document.querySelector("#month-error");
const yearError = document.querySelector("#year-error");

const dayInput = document.querySelector("#day-input");
const monthInput = document.querySelector("#month-input");
const yearInput = document.querySelector("#year-input");

// ------- DATE VALIDATION -------
const isValidDate = (day, month, year) => {
  const daysInMonth = DaysInMonth(year, month);
  if (day > daysInMonth) {
    return false;
  }
  const inputDate = new Date(year, month - 1, day);
  const todayDate = new Date();

  if (inputDate > todayDate) {
    return false;
  }

  return true;
};

// ------- DIFFERENCE BETWEEN DAYS, MONTHS AND YEARS -------
const calculateAge = (day, month, year) => {
  const todayDate = new Date();
  let years = todayDate.getFullYear() - year;
  let months = todayDate.getMonth() + 1 - month;
  let days = todayDate.getDate() - day;

  if (days < 0) {
    months -= 1;
    days += DaysInMonth(todayDate.getFullYear(), todayDate.getMonth());
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
};

const showError = (inputField, errorLabel, errorMessage, labelField) => {
  errorLabel.textContent = errorMessage;
  labelField.style.color = "#f87171";
  inputField.style.borderColor = "#f87171";
  setTimeout(() => {
    errorLabel.textContent = "";
    labelField.style.color = "#716F6F";
    inputField.style.borderColor = "#DCDCDC";
  }, 3000);
};

const validateForm = (dayValue, monthValue, yearValue) => {
  let isValid = true;

  if (
    !isValidDate(dayValue, monthValue, yearValue) &&
    dayValue &&
    monthValue &&
    yearValue
  ) {
    showError(dayInput, dayError, "Must be a valid date", dayLabel);
    showError(monthInput, monthError, "Must be a valid month", monthLabel);
    showError(yearInput, yearError, "Must be in the past", yearLabel);
    dayError.textContent = "Must be a valid date";
    monthError.textContent = "Must be a valid month";
    yearError.textContent = "Must be in the past";

    isValid = false;
    return isValid;
  }

  if (!dayValue) {
    showError(dayInput, dayError, "This field is required", dayLabel);
    isValid = false;
  }

  if (!monthValue) {
    showError(monthInput, monthError, "This field is required", monthLabel);
    isValid = false;
  }

  if (!yearValue) {
    showError(yearInput, yearError, "This field is required", yearLabel);
    isValid = false;
  }

  return isValid;
};

// ------- FORM SUBMISSION -------
const handleAgeCalculation = (event) => {
  event.preventDefault();

  let dayValue = parseInt(document.querySelector("#day-input").value);
  let monthValue = parseInt(document.querySelector("#month-input").value);
  let yearValue = parseInt(document.querySelector("#year-input").value);

  if (!validateForm(dayValue, monthValue, yearValue)) {
    console.error("Invalid date");
    return;
  }

  const { years, months, days } = calculateAge(dayValue, monthValue, yearValue);

  document.querySelector("#yearNumber").textContent = years;
  document.querySelector("#monthNumber").textContent = months;
  document.querySelector("#dayNumber").textContent = days;
};

document
  .querySelector("#age-form")
  .addEventListener("submit", handleAgeCalculation);
