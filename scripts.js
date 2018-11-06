let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now(); //determine when the timer would start. This is a new method.
  const then = now + seconds * 1000;
  //console.log({now,then});
  displayTimeLeft(seconds); //run it inmediately once and once again when we do the interval. 
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // this would check if we should stop it.
    if(secondsLeft < 0) { //just less. 
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  //console.log(seconds);
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`; //return nothing and give the remainder seconds.
  document.title = display; //update our browser. The .title mean title tag equals display.
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  //const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour/*adjustedHour}:${minutes < 10 ? '0' : ''*/}:${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault(); //stop it from running
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60); //our timer is in seconds, therefore we need to multiply.
  this.reset(); //clear up the value
});
