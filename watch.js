const clock = document.querySelector('.timer')

const myTime = () => {
    let time = new Date();
    let hr = time.getHours();
    let min = time.getMinutes();
    
    hr = addZero(hr)
    min = addZero(min)

    function addZero(i) {
        if (i < 10) {
            i = "0" + i
        };
        return i;
    }

    clock.textContent = hr + ":" + min
};

setInterval(myTime, 1000)

// -----------------------------------------------------------------------------

const date = document.querySelector('.date')

const months = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
}

const myDate = () => {
    var time = new Date();
    var day = time.getDate();
    var mon = time.getMonth();
    var year = time.getYear();

    var monthName = months[mon];

    var shortYear = year - 100;

    date.textContent = day + " " + monthName + " " + shortYear
};

setInterval(myDate, 1000)

// -----------------------------------------------------------------------------

const watch = document.querySelector('.second_hand');

function letsTheMagicBegin() {
    let aroundTheClock = new Date();
    let seconds = aroundTheClock.getSeconds() / 60;

    setRotation(watch, seconds);
};

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360);
};

setInterval(letsTheMagicBegin, 1000);

letsTheMagicBegin();