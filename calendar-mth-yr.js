const monthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const showMonths = () => {
    calendarContainer.innerHTML = "";
    backBtn.setAttribute('class', "back-today fade-out");

    for(let x = 0; x < 12; x++) {

        const mth = document.createElement('div');
        mth.setAttribute('class', "month-in-block scale0")
        mth.setAttribute('id', x);
        mth.innerText = monthsShort[x];
        calendarContainer.appendChild(mth);

        setTimeout(() => {
            if(x === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
                mth.setAttribute('class', 'month-in-block current-mth-yr');
            } else {
                mth.setAttribute('class', 'month-in-block');
            };
        }, 50 * x);

        mth.onclick = () => {
            mainCalendar();
            newDate = new Date(date.setMonth(x));
            renderCalendar();
        };
    };
    secondCalendarHeader("Months" + " '" + (date.getFullYear() % 100));
};

// --------------------------------------------------

const showYears = () => {
    calendarContainer.innerHTML = "";
    backBtn.setAttribute('class', "back-today fade-out");

    const prevDecadeBtn = document.createElement('button');
    prevDecadeBtn.setAttribute('class', 'prev-decade');
    prevDecadeBtn.innerHTML  = "&#8249";
    calendarContainer.appendChild(prevDecadeBtn);

    let startYear = date.getFullYear()
    if(date.getFullYear() % 10 !== 0){
        x = date.getFullYear() % 10
        startYear = date.getFullYear() - x
    };

    for(let x = startYear; x < startYear + 10; x++) {

        const yr = document.createElement('div');
        yr.setAttribute('class', 'year-in-block');
        yr.setAttribute('id', x);
        yr.innerText = x;
        calendarContainer.appendChild(yr);

        if(x === new Date().getFullYear()) {
            yr.setAttribute('class', 'year-in-block current-mth-yr');
        };

        yr.onclick = () => {
            newDate = new Date(date.setFullYear(x));
            showMonths();
        };
    };

    const nextDecadeBtn = document.createElement('button');
    nextDecadeBtn.setAttribute('class', 'next-decade');
    nextDecadeBtn.innerHTML  = "&#8250";
    calendarContainer.appendChild(nextDecadeBtn)

    nextDecadeBtn.addEventListener('click', nextDecade);
    prevDecadeBtn.addEventListener('click', prevDecade);

    secondCalendarHeader("Years " + startYear + " - " + (startYear + 9));
};

const nextDecade = () => {
    date.setFullYear(date.getFullYear() + 10);
    showYears();
};

const prevDecade = () => {
    date.setFullYear(date.getFullYear() - 10);
    showYears();
};

// --------------------------------------------------

const mainCalendar = () => {
    calendarContainer.innerHTML = "";
    calendarHeader.innerHTML = ""

    calendarHeader.appendChild(monthBlock)
    calendarHeader.appendChild(backBtn)
    calendarHeader.appendChild(yearBlock)

    backBtn.innerHTML = ""

    calendarContainer.appendChild(weekDays);
    calendarContainer.appendChild(daysContainer);
;}

const secondCalendarHeader = (value) => {
    calendarHeader.innerHTML = "";
    const newHeader = document.createElement('div');
    newHeader.classList.add('new-header');
    newHeader.innerHTML = value;
    calendarHeader.appendChild(newHeader);
}

month.onclick = () => {
    date.setFullYear(new Date().getFullYear());
    showMonths();
};

year.onclick = () => {
    date.setFullYear(new Date().getFullYear());
    showYears();
};