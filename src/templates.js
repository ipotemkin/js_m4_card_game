function cardBack() {
  return {
    tag: 'div',
    cls: 'card-back',
    content: [
      {
        tag: 'div',
        cls: 'card-back__img',
      },
    ],
  };
}

function cardFront(image) {
  const url = '../src/img/' + image;
  return {
    tag: 'div',
    cls: 'card-back',
    attrs: {
      style: `background: url('${url}') no-repeat center;`,
    },
  };
}

// module.exports = { cardBack, cardFront };
