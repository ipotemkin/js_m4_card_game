import './styles/fonts/stratos/stylesheet.css';
import './styles/style.css';
import renderWelcomeScreen from './screens';
import { cards } from './cards';
import getCardsToPlay from './game';

window.app.cards = cards;
renderWelcomeScreen();

// console.log(getCardsToPlay(12));
