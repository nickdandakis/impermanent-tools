const debounce = (fn, delay) => {
  let timeoutID = null;

  return (...args) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn.call(undefined, ...args);
    }, delay);
  };
};

export default debounce;
