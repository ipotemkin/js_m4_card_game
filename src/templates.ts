export function cardBack() {
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

export function cardFront(image: string) {
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

export function welcomeScreenTemplate() {
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

export function gameScreenTemplate() {
  const { errorIcon } = window.app;
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
            tag: 'div',
            content: [
              {
                tag: 'img',
                cls: ['top__error', 'hidden'],
                attrs: { src: errorIcon },
              },
              {
                tag: 'img',
                cls: ['top__error', 'hidden'],
                attrs: { src: errorIcon },
              },
              {
                tag: 'img',
                cls: ['top__error', 'hidden'],
                attrs: { src: errorIcon },
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

export function msgBoxTemplate(message: string, time: string | null, icon: string | null = null) {
  return {
    tag: 'div',
    cls: 'form-msgbox-canvas',
    content: {
      tag: 'div',
      cls: 'form-msgbox',
      content: [
        {
          tag: 'img',
          cls: 'form-msgbox__icon',
          attrs: { src: `${icon}` },
          // content: `'${icon}'`,
        },
        {
          tag: 'div',
          cls: 'form-msgbox__title',
          content: message,
        },
        {
          tag: 'p',
          cls: 'form-msgbox__time-label',
          content: 'Затраченное время:',
        },
        {
          tag: 'p',
          cls: 'form-msgbox__time',
          content: time,
        },
        {
          tag: 'button',
          cls: 'form-msgbox__submit-btn',
          attrs: {
            type: 'submit',
          },
          content: 'Играть снова',
        },
      ],
    },
  };
}
