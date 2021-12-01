function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn=document.querySelector('button[data-start]');
const stopBtn=document.querySelector('button[data-stop]');
const body=document.querySelector('body');
let timerId=null;

const switchColorOn=e=>{
  startBtn.disabled=true;
  stopBtn.disabled=false;
  timerId=setInterval(e=>{
  body.style.backgroundColor=getRandomHexColor()
  },1000)
}

const switchColorOff=e=>{
  startBtn.disabled=false;
  stopBtn.disabled=true;
  clearInterval(timerId); 
}

startBtn.addEventListener('click',switchColorOn);
stopBtn.addEventListener('click',switchColorOff);