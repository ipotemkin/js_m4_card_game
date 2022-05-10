import './styles/fonts/stratos/stylesheet.css';
import './styles/style.css';
import renderWelcomeScreen, { renderMsgBox } from './screens';
import { cards } from './cards';

window.app.cards = cards;
renderWelcomeScreen();
// renderMsgBox();
