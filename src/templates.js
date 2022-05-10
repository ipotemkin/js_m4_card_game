function cardBack() {
  return {
    tag: 'div',
    cls: 'card',
    content: [
      {
        tag: 'div',
        cls: ['card__face', 'hidden'],
        // attrs: { style: 'display: none' },
      },
      {
        tag: 'div',
        cls: 'card__back',
      },
    ],
  };
}

function cardFront(image) {
  // const url = '../src/img/' + image;
  const url = './static/' + image;
  return {
    tag: 'div',
    cls: 'card',
    content: [
      {
        tag: 'div',
        cls: 'card__face',
        attrs: {
          style: `background: url('${url}') no-repeat center;`,
        },
      },
      {
        tag: 'div',
        cls: ['card__back', 'hidden'],
      },
    ],
  };
}

function welcomeScreenTemplate() {
  return {
    tag: 'div',
    cls: 'canvas',
    content: [
      {
        tag: 'form',
        cls: 'form',
        attrs: { name: 'form' },
        content: [
          {
            tag: 'h1',
            cls: 'form__title',
            content: 'Выбери сложность',
          },
          {
            tag: 'div',
            cls: ['field', 'form__level-area'],
            content: [
              {
                tag: 'input',
                attrs: {
                  type: 'radio',
                  id: 'level-1',
                  name: 'level',
                  value: '1',
                },
              },
              {
                tag: 'label',
                attrs: {
                  for: 'level-1',
                },
                content: '1',
              },
              {
                tag: 'input',
                attrs: {
                  type: 'radio',
                  id: 'level-2',
                  name: 'level',
                  value: '2',
                },
              },
              {
                tag: 'label',
                attrs: {
                  for: 'level-2',
                },
                content: '2',
              },
              {
                tag: 'input',
                attrs: {
                  type: 'radio',
                  id: 'level-3',
                  name: 'level',
                  value: '3',
                },
              },
              {
                tag: 'label',
                attrs: {
                  for: 'level-3',
                },
                content: '3',
              },
            ],
          },
          {
            tag: 'button',
            cls: 'form__submit-btn',
            attrs: {
              type: 'submit',
            },
            content: 'Старт',
          },
          {
            tag: 'p',
            cls: ['form__error', 'hidden'],
            content: 'Выберите уровень',
          },
        ],
      },
    ],
  };
}

function gameScreenTemplate() {
  return {
    tag: 'div',
    cls: 'container',
    content: [
      {
        tag: 'div',
        cls: 'top',
        content: [
          {
            tag: 'div',
            cls: 'clock',
            content: [
              {
                tag: 'div',
                cls: 'clock__labels',
                content: [
                  {
                    tag: 'span',
                    content: 'min',
                  },
                  {
                    tag: 'span',
                    cls: 'clock__labels__sec',
                    content: 'sec',
                  },
                ],
              },
              {
                tag: 'p',
                cls: 'clock__time',
                content: '00.00',
              },
            ],
          },
          {
            tag: 'button',
            cls: 'restart-btn',
            content: 'Начать заново',
          },
        ],
      },
      {
        tag: 'div',
        cls: 'card-board',
      },
    ],
  };
}

module.exports = {
  cardBack,
  cardFront,
  welcomeScreenTemplate,
  gameScreenTemplate,
};
