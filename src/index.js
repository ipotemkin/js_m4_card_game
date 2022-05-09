import './styles/fonts/stratos/stylesheet.css';
import './styles/style.css';
import renderWelcomeScreen from './screens';
import { cards } from './cards';

window.app.cards = cards;
renderWelcomeScreen();
