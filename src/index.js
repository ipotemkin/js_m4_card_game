import './styles/fonts/stratos/stylesheet.css';
import './styles/style.css';

function main() {
  const form = document.querySelector('.form');
  const error = document.querySelector('.form__error');
  const submitBtn = document.querySelector('.form__submit-btn');

  const hideError = () => error.classList.add('hidden');

  form.addEventListener('click', hideError);
  submitBtn.addEventListener('blur', hideError);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const level = (window.app = +form.level.value);

    if (!level) {
      error.classList.remove('hidden');
      return;
    }

    const canvas = document.querySelector('.canvas');
    canvas.innerHTML = `<h2 style="color: white;">Выбран уровень: ${level}</h2>`;
  });
}

main();
