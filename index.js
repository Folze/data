import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { se } from "date-fns/locale";

const getElement = (element) => document.querySelector(element);
const UI_ELEMENTS = {
  countdownDate: getElement(".countdown-date"),
  countdownDateInput: getElement(".countdown-date__input"),
  countdownDateButton: getElement(".countdown-date__button"),
  timeRemaining: getElement(".time-remaining"),
};

function calculateDifference(startDate, endDate) {
  const yearsDifference = differenceInYears(startDate, endDate);
  const monthsDifference = differenceInMonths(startDate, endDate) % 12;
  const daysDifference = differenceInDays(startDate, endDate) % 30;
  const hoursDifference = differenceInHours(startDate, endDate) % 24;
  const minutesDifference = differenceInMinutes(startDate, endDate) % 60;
  const secondsDifference = differenceInSeconds(startDate, endDate) % 60;
  return {
    yearsDifference,
    monthsDifference,
    daysDifference,
    hoursDifference,
    minutesDifference,
    secondsDifference,
  };
}

let interval;

const updateDisplay = (timeDiff) => {
  const {
    yearsDifference,
    monthsDifference,
    daysDifference,
    hoursDifference,
    minutesDifference,
    secondsDifference,
  } = timeDiff;
  if (timeDiff.yearsDifference == 0) {
    UI_ELEMENTS.timeRemaining.textContent = `
  ${monthsDifference} месяцев
  ${daysDifference} дней ${hoursDifference} часов
  ${minutesDifference} минут ${secondsDifference} секунд`;
  } else {
    UI_ELEMENTS.timeRemaining.textContent = `
    ${yearsDifference} лет ${monthsDifference} месяцев
    ${daysDifference} дней ${hoursDifference} часов
    ${minutesDifference} минут ${secondsDifference} секунд`;
  }
};

UI_ELEMENTS.countdownDate.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedDate = new Date(UI_ELEMENTS.countdownDateInput.value);
  clearInterval(interval);

  interval = setInterval(() => {
    const now = new Date();
    const timeDiff = calculateDifference(selectedDate, now);
    updateDisplay(timeDiff);
  }, 1000);
});
