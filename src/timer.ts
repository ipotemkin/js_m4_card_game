export default function timer(): void {
  showTime(++window.app.timerValue);
}

function showTime(seconds: number): void {
  const clock = document.querySelector('.clock__time');
  //   console.log(clock);
  if (clock) 
  clock.textContent = timeToString(seconds);
}

function timeToString(seconds: number): string {
  const sec = seconds % 60;
  const min = Math.min((seconds - sec) / 60, 60);
  return `${zeroPrefix(min)}.${zeroPrefix(sec)}`;
}

function zeroPrefix(str): string {
  str = str.toString();
  if (str.length < 2) str = '0' + str;
  return str;
}
