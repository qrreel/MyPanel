const calendarHeader = document.querySelector('.calendar-header');
const monthBlock = document.querySelector('.month-block');
const yearBlock = document.querySelector('.year-block');
let year = document.querySelector(".year");
let month = document.querySelector(".month");
const prevMonth = document.querySelector(".change-month-back");
const nextMonth = document.querySelector(".change-month-fwd");
const prevYear = document.querySelector(".change-year-back");
const nextYear = document.querySelector(".change-year-fwd");
const backBtn = document.querySelector('.back-today');

const calendarContainer = document.querySelector('.calendar');
const weekDays =  document.querySelector(".week-days");
const daysContainer = document.querySelector(".days");

let date = new Date();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  daysContainer.innerHTML = "";

  month.innerHTML = months[date.getMonth()];
  year.innerHTML = date.getFullYear();

  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
  const lastDayCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const prevMonthLastDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const nextMonthFirstDays = 7 - lastDayCurrentMonth;

  if(date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
    backBtn.setAttribute('class', "back-today fade-out");
  } else {
    backBtn.setAttribute('class', "back-today");
    backBtn.innerHTML = "&#8635"
  };
  
  if(lastDayPrevMonth !== 0) {
    for(let prev = lastDayPrevMonth; prev >= 1; prev--) {
      const day = document.createElement('div');
      day.setAttribute('class', "prev-month");
      day.innerHTML = prevMonthLastDays - prev + 1;

      daysContainer.appendChild(day);
    } 
  } else {
    for(let prev = lastDayPrevMonth + 7; prev >= 1; prev--) {
      const day = document.createElement('div');
      day.setAttribute('class', "prev-month");
      day.innerHTML = prevMonthLastDays - prev + 1;

      daysContainer.appendChild(day);
    } 
  };
  
  for(let i = 1; i <= daysInMonth; i++) {

    let mth = addZero(date.getMonth() + 1);
    let yr = date.getFullYear();

    let dayId = addZero(i) + "/" + mth.toString() + "/" +  yr.toString();

    const day = document.createElement('div');
    day.setAttribute('id', dayId);
    day.setAttribute('class', "day");
    day.innerHTML = i;

    daysContainer.appendChild(day);

    day.onclick = () => {
      makeNewEvent(dayId)
    }

    if(i === new Date().getDate()
    && date.getMonth() === new Date().getMonth()
    && date.getFullYear() === new Date().getFullYear()) {
      day.setAttribute('class', "day today");
    };
  };

  for(let next = 1; next <= nextMonthFirstDays; next++) {
    const day = document.createElement('div');
    day.setAttribute('class', "next-month");
    day.innerHTML = next;

    daysContainer.appendChild(day);
  };

  month.onclick = () => {
    date.setFullYear(new Date().getFullYear());
    showMonths();
  };
};

prevMonth.onclick = () => {
  month, date.setMonth(date.getMonth() - 1);
  renderCalendar();
};

nextMonth.onclick = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

prevYear.onclick = () => {
  date.setFullYear(date.getFullYear() - 1);
  renderCalendar();
};

nextYear.onclick = () => {
  date.setFullYear(date.getFullYear() + 1);
  renderCalendar();
};

backBtn.onclick = () => {
  date = new Date()
  renderCalendar();
}

renderCalendar();
