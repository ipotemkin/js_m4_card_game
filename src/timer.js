export default function timer() {
  showTime(++window.app.timerValue);
}

function showTime(seconds) {
  const clock = document.querySelector('.clock__time');
  //   console.log(clock);
  clock.textContent = timeToString(seconds);
}

function timeToString(seconds) {
  const sec = seconds % 60;
  const min = Math.min((seconds - sec) / 60, 60);
  return `${zeroPrefix(min)}.${zeroPrefix(sec)}`;
}

function zeroPrefix(str) {
  str = str.toString();
  if (str.length < 2) str = '0' + str;
  return str;
}
