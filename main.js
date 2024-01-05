const startBtn = document.querySelector('.start');
const clearBtn = document.querySelector('.clear')
const container = document.querySelector('.container');
const inputTime = document.querySelector('.time-in');
const inputDate = document.querySelector('.date');

const timerSec = document.querySelector('.seconds');
const timerMin = document.querySelector('.minutes');
const timerHours = document.querySelector('.hours');
const timerDays = document.querySelector('.days');



startBtn.addEventListener('click', onStartBtnClick);
clearBtn.addEventListener('click', () => { onClearBtnClick(id) });

let id = null;


function onClearBtnClick(id) {
    clearInterval(id);
    inputTime.value = "00.00.00";
    inputDate.value = "01.01.2024";
    startBtn.classList.remove('disabled');
    container.classList.remove('spin');
    timerSec.textContent = "00";
    timerMin.textContent = "00";
    timerHours.textContent = "00";
    timerDays.textContent = "00";
}

function onStartBtnClick() {

    container.classList.add('spin');
    startBtn.classList.add('disabled');
    let parsedTime = inputTime.value.replaceAll(".", ":");
    let parsedDate = inputDate.value.replaceAll(".", "-").split('-').reverse().join("-");
    let string = `${parsedDate}T${parsedTime}+02:00`;
    t = Date.parse(string) - Date.now();



    if (Date.now() > Date.parse(string)) {
        alert("Date and time can't be less then current time");
        inputTime.value = "00.00.00";
        inputDate.value = "01.01.2024";
        startBtn.classList.remove('disabled');
        container.classList.remove('spin');
        return
    }

    if (isNaN(t)) {
        alert("You entered a wrong format of date. Please, try again!");
        inputTime.value = "00.00.00";
        inputDate.value = "01.01.2024";

        startBtn.classList.remove('disabled');
        container.classList.remove('spin');
        return
    }

    let dateObg = convertMs(t);
    timerSec.textContent = dateObg.seconds;
    timerMin.textContent = dateObg.minutes;
    timerHours.textContent = dateObg.hours;
    timerDays.textContent = dateObg.days;

    id = setInterval(() => {
        parsedTime = inputTime.value.replaceAll(".", ":");
        parsedDate = inputDate.value.replaceAll(".", "-").split('-').reverse().join("-");
        string = `${parsedDate}T${parsedTime}+02:00`;

        t = Date.parse(string) - Date.now();
        if (t <= 999 || Date.now() >= Date.parse(string)) {
            inputTime.value = "00.00.00";
            inputDate.value = "01.01.2024";
            clearInterval(id);
            startBtn.classList.remove('disabled');
            container.classList.remove('spin');
            setTimeout(() => {
                alert('You reached your date!')
            }, 100)

        }
        dateObg = convertMs(t);
        timerSec.textContent = dateObg.seconds;
        timerMin.textContent = dateObg.minutes;
        timerHours.textContent = dateObg.hours;
        timerDays.textContent = dateObg.days;


    }, 1000)

}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = String(Math.floor(ms / day)).padStart(2, '0');
    // Remaining hours
    const hours = String(Math.floor((ms % day) / hour)).padStart(2, '0');
    // Remaining minutes
    const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(2, '0');
    // Remaining seconds
    const seconds = String(Math.floor((((ms % day) % hour) % minute) / second)).padStart(2, '0');

    return { days, hours, minutes, seconds };
}