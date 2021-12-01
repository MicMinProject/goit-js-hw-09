import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';
import {throttle} from 'lodash';

const picker=document.querySelector('#datetime-picker');
const daysCounter=document.querySelector('span[data-days]');
const hoursCounter=document.querySelector('span[data-hours]');
const minutesCounter=document.querySelector('span[data-minutes]');
const secondsCounter=document.querySelector('span[data-seconds]');
const button=document.querySelector('button[data-start]');
button.disabled=true
let selectedTimeMS=null;

function addLeadingZero(value){
  if(value<10){
  return value.padStart(2,'0')
  } else{return value}
}
  

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

convertMs(2000); // {days: 0, hours: 0, minutes: 0, seconds: 2}
convertMs(140000); // {days: 0, hours: 0, minutes: 2, seconds: 20}
convertMs(24140000); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  minDate: "today",
    onClose(selectedDates) {
    if(new Date().getTime()>=selectedDates[0].getTime()){
      alert('Please choose a date in the future')
    }else{button.disabled=false};
    selectedTimeMS=selectedDates[0].getTime();
    
    button.addEventListener('click',(e)=>{
      e.currentTarget.disabled=true;
     const timerId=setInterval((e)=>{
        const currentTimeMs=new Date().getTime()
      daysCounter.innerHTML=addLeadingZero(String(convertMs(selectedTimeMS-currentTimeMs).days));
      hoursCounter.innerHTML=addLeadingZero(String(convertMs(selectedTimeMS-currentTimeMs).hours));
      minutesCounter.innerHTML=addLeadingZero(String(convertMs(selectedTimeMS-currentTimeMs).minutes));
      secondsCounter.innerHTML=addLeadingZero(String(convertMs(selectedTimeMS-currentTimeMs).seconds));
      
      if(daysCounter.innerHTML==="00"&&hoursCounter.innerHTML==="00"&&minutesCounter.innerHTML==="00"&&secondsCounter.innerHTML==="00"){
        clearInterval(timerId);
          alert("Time's up!")
        
      }
      },1000)
    })
    // console.log(convertMs(selectedTimeMS))
    
  },
};
flatpickr(picker,options);

