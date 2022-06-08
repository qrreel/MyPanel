const makeNewEvent = (dayId) => {
    secondCalendarHeader("Create new event");
    const backToCalendarBtn = document.createElement('button')
    backToCalendarBtn.setAttribute('class', "back-to-calendar");
    backToCalendarBtn.innerHTML = "cancel";
    calendarHeader.appendChild(backToCalendarBtn);

    const inputEvent = document.createElement('input');
    inputEvent.classList.add('input-event');
    inputEvent.setAttribute('placeholder', "Enter new event name")

    const inputDate = document.createElement('input');
    inputDate.classList.add('input-date');
    inputDate.value = dayId;

    const clearBtn = document.createElement('button');
    clearBtn.classList.add('clear-button');
    clearBtn.innerHTML = "Clear"

    calendarContainer.innerHTML = "----------------------- in progress -----------------------"
    calendarContainer.appendChild(inputEvent)
    calendarContainer.appendChild(inputDate)
    calendarContainer.appendChild(clearBtn)

    clearBtn.onclick = () => {
        clearEvent();
    };

    backToCalendarBtn.onclick = () => {
        new Date().setMonth();
        mainCalendar();
        renderCalendar();
    };

    const clearEvent = () => {
        inputEvent.value = "";
        inputDate.value = dayId;
    };
}

