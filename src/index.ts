import './styles/fonts/stratos/stylesheet.css';
import './styles/style.css';
import renderWelcomeScreen from './screens';
import { cards } from './cards';


type AppData = {
  root: any,
  level?: number,  // game level
  cards: typeof cards,  // to store cards set
  maxCards: number,  // card number in the current game level
  prevOpenCard?: HTMLDivElement,  // previous open card to check
  openCardsCount: number,
  timer?: any,
  timerValue: number,
  errorCount: number,
  loseIcon: string,
  winIcon: string,
  errorIcon: string,
}

declare global {
  interface Window { app: AppData; }      
};

window.app = {
  root: document.querySelector('.app'),
  level: undefined,  // game level
  cards: cards,  // to store cards set
  maxCards: 6,  // card number in the current game level
  prevOpenCard: undefined,  // previous open card to check
  openCardsCount: 0,
  timer: undefined,
  timerValue: 0,
  errorCount: 0,
  loseIcon: './static/lose.svg',
  winIcon: './static/win.svg',
  errorIcon: './static/error-icon.png',
  // errorIcon: './static/lose.svg',
};

renderWelcomeScreen();
