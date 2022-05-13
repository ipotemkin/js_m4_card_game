export function timer(resultFunction: Function = showTime): void {
  resultFunction(++window.app.timerValue);
}

export function showTime(seconds: number): void {
  const clock = document.querySelector('.clock__time');
  if (clock) clock.textContent = timeToString(seconds);
}

export function timeToString(seconds: number): string {
  const sec = seconds < 3600 ? seconds % 60 : 59;
  const min = Math.min((seconds - sec) / 60, 59);
  return `${zeroPrefix(min)}.${zeroPrefix(sec)}`;
}

export function zeroPrefix(number: number): string {
  let str = String(number);
  if (str.length < 2) str = '0' + str;
  return str;
}
