import DaysInMonth from "./numOfDays";

let dayValue = document.querySelector("#day-input").value;
let monthValue = document.querySelector("#month-input").value;
let yearValue = document.querySelector("#year-input").value;

let dayError = document.querySelector("#day-error");
let monthError = document.querySelector("#month-error");
let yearError = document.querySelector("#year-error");

const yearAge = document.querySelector("#yearNumber");
const monthAge = document.querySelector("#monthNumber");
const dayAge = document.querySelector("#dayNumber");

const ageForm = document.querySelector("#age-form");

dayValue = 29;
monthValue = 2;
yearValue = 2023;

const todayDate = new Date();
const todayMonth = todayDate.getMonth();
const todayDay = todayDate.getDate();
console.log(`TODAYS DATE IS ${todayDate}`);
console.log(`TODAYS MONTH IS ${todayDate.getMonth()}`);

const dateOfBirth = new Date(yearValue, monthValue, dayValue);
console.log(`DATE OF BIRTH IS ${dateOfBirth}`);

const isValidDate = (day, month, year) => {
  const daysInMonth = DaysInMonth(year, month);
  if (day <= daysInMonth) {
    console.log('valid date')
  } else {
    console.log('invalid date')
  }
};

isValidDate(dayValue, monthValue, yearValue)

console.log(`IS DOB MONTH GREATER THAN TODAY MONTH ${monthValue > todayMonth}`);

if (monthValue > todayMonth + 1) {
  // Move to end of year
  const endOfYear = 12 - monthValue;
  console.log(endOfYear);
  // Move to January of next year
  const toJan = 1;
  if (dayValue > 28) {
    // Move to 01 of February from January
    // Getting total number of days in a month but the month will always be January because we do this step in Janurary
    let totalDays = DaysInMonth(yearValue + 1, 1);
    console.log(totalDays);
    // Get number of days when move to 1st of February | +1 because we're moving to 1st of first month (Feb)
    let daysStored = totalDays - dayValue + 1;
    console.log(daysStored);

    // todayDate month would already return month - 1 because month in JS starts from 0 | 2 for February
    let monthToday = todayMonth + 1 - 2;
    console.log(monthToday);

    // Above step we arrived at 1st of todayDate.month. Now we weed to arrive at todayDate.day
    let dayToday = todayDate.getDate();
    console.log(dayToday);

    // console.log((DaysInMonth(yearValue + 1, todayMonth)))
    // if((DaysInMonth(yearValue + 1, todayMonth)) > dayValue) {
    //   let extraDays = (DaysInMonth(yearValue + 1, 1)) - dayValue
    //   console.log(extraDays)
    // }

    monthAge.textContent = endOfYear + toJan + monthToday;
    dayAge.textContent = daysStored + dayToday;
    yearAge.textContent = todayDate.getFullYear() - (yearValue + 1);
  } else {
    // MOVE TO SAME DAY TODAYS MONTH
    let updatedDateOfBirth = new Date(yearValue + 1, todayMonth, dayValue);
    console.log(updatedDateOfBirth);
    let todayDobYear = new Date(yearValue + 1, todayMonth, todayDate.getDate());
    console.log(todayDobYear);
    if (updatedDateOfBirth > todayDobYear) {
      // todayDate month would already return (month - 1) because month in JS starts from 0 hence +1 | -1 for January
      let monthToday = todayMonth - 1;
      console.log(monthToday);
      // Get Total Number of Days in todaysMonth (not +1 because of the 0 index)
      let totalDays = DaysInMonth(yearValue + 1, todayMonth);
      console.log(totalDays);
      // Get number from day in month before to todayDay in todayMonth
      let daysStored = totalDays - dayValue + 1 + todayDay;
      console.log(daysStored);

      monthAge.textContent = endOfYear + toJan + monthToday;
      dayAge.textContent = daysStored;
      yearAge.textContent = todayDate.getFullYear() - (yearValue + 1);
    } else if (updatedDateOfBirth <= todayDobYear) {
      let monthToday = todayMonth - 1 + 1;
      console.log(monthToday);

      let daysStored = todayDay - dayValue + 1;
      console.log(daysStored);

      monthAge.textContent = endOfYear + toJan + monthToday;
      dayAge.textContent = daysStored;
      yearAge.textContent = todayDate.getFullYear() - (yearValue + 1);
    }
  }
} else if (monthValue <= todayMonth + 1) {
  if (dayValue > 28) {
    // Move to 01 of next month after DOB month
    // Getting total number of days in a the DOB month
    let totalDays = DaysInMonth(yearValue, monthValue);
    console.log(totalDays);
    // Get number of days when move from DOB day to 1st of next month
    let daysStored = totalDays - dayValue + 1;
    console.log(daysStored);
    // MOVE TO SAME DAY TODAYS MONTH
    let updatedDateOfBirth = new Date(yearValue, todayMonth, dayValue);
    console.log(updatedDateOfBirth);
    let todayDobYear = new Date(yearValue, todayMonth, todayDate.getDate());
    console.log(todayDobYear);
    if (updatedDateOfBirth > todayDobYear) {
      // todayDate month would already return (month - 1) because month in JS starts from 0 | -1 for January
      let monthToday = todayMonth - monthValue;
      console.log(monthToday);

      if (DaysInMonth(yearValue + 1, todayMonth) > dayValue) {
        let extraDays = DaysInMonth(yearValue, todayMonth) - dayValue;
        console.log(extraDays);
        dayAge.textContent = daysStored + todayDay + extraDays;
      }

      monthAge.textContent = monthToday;

      yearAge.textContent = todayDate.getFullYear() - yearValue;
    } else if (updatedDateOfBirth <= todayDobYear) {
      let monthToday = todayMonth + 1 - monthValue;
      console.log(monthToday);

      let daysStored = todayDay - dayValue + 1;
      console.log(daysStored);

      monthAge.textContent = monthToday;
      dayAge.textContent = daysStored;
      yearAge.textContent = todayDate.getFullYear() - (yearValue);
    }
  } else {
    // MOVE TO SAME DAY TODAYS MONTH
    let updatedDateOfBirth = new Date(yearValue, todayMonth, dayValue);
    console.log(updatedDateOfBirth);
    let todayDobYear = new Date(yearValue, todayMonth, todayDate.getDate());
    console.log(todayDobYear);
    if (updatedDateOfBirth > todayDobYear) {
      // todayDate month would already return (month - 1) because month in JS starts from 0
      let monthToday = todayMonth - monthValue;
      console.log(monthToday);
      // Get Total Number of Days in todaysMonth (not +1 because of the 0 index)
      let totalDays = DaysInMonth(yearValue, todayMonth);
      console.log(totalDays);
      // Get number from day in month before to todayDay in todayMonth
      let daysStored = totalDays - dayValue + 1 + todayDay;
      console.log(daysStored);

      monthAge.textContent = monthToday;
      dayAge.textContent = daysStored;
      yearAge.textContent = todayDate.getFullYear() - (yearValue);
    } else if (updatedDateOfBirth <= todayDobYear) {
      let monthToday = todayMonth + 1 - monthValue;
      console.log(monthToday);

      let daysStored = todayDay - dayValue + 1;
      console.log(daysStored);

      monthAge.textContent = monthToday;
      dayAge.textContent = daysStored;
      yearAge.textContent = todayDate.getFullYear() - (yearValue);
    }
  }
}

// //if from.data > to.date:
//       // move to end of year 23/11/1997 -> 23/12/1997 -> 1 month
//      // move to next year 23/1/1997 -> 1 month
//     // if days is less than 28
//         // move to nearest month -> from: 23/1/1998 -> 23/5/1998  -> 4 months
//         // try to move 1 month and compare -> try logic
//             // if date(23/5/1998)+ 1 month is > expected date ( 10/6/1998)
//               // we count number of days.
//                 // Move to end of month 31/5/1998  -> 8.days
//                 // Move 1 day 1/5/1998  -> 1.day
//                 // diff from first to 10th -> 9.days
//                 // 10/6/1998 -> 10/6/2024 ->  26.years
//                 //aggregate
//             // else
//               // move 1 month -> 3/6/1998  -> 1 month
//               // diff in days 3/5/1998 to 10/6/1998 -> 7 days
//     // else:
//       // move to first of next month
//       // move to nearest month
//       // do try logic
// //else :
//      // move to closest month
//     // do try logic
