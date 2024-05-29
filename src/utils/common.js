const getWordWithCapitalLetter = (word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

const updateItems = (items, newItem) => items.map((oldItem) => oldItem.id === newItem.id ? newItem : oldItem);

export {
  getWordWithCapitalLetter,
  updateItems
};
