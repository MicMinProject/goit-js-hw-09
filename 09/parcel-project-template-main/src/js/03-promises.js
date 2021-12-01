import Notiflix from 'notiflix';


const inputDelay=document.querySelector('input[name="delay"]');
const inputStep=document.querySelector('input[name="step"]');
const inputAmount=document.querySelector('input[name="amount"]');
const submitBtn=document.querySelector('button[type="submit"]');
let delay;
let stepDelay;
const makePromise=(e)=>{
  e.preventDefault();
  setTimeout(()=>{for(let position=1;position<=inputAmount.value;position++){
    stepDelay=(position-1)*inputStep.value;
    delay=stepDelay+Number(inputDelay.value);
    createPromise(position, delay)
}},inputDelay.value)}
  
  function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    new Promise((resolve)=>{
      setTimeout(()=>{if(shouldResolve){
        resolve(delay)
      }},stepDelay)
    }).then((delay) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })}else {
          new Promise((resolve, reject)=>{
      setTimeout(()=>{if(shouldResolve){
        resolve(delay)
      }else{
        reject(delay)
      }},stepDelay)
    }).catch((delay) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  })}};

submitBtn.addEventListener('click',makePromise);