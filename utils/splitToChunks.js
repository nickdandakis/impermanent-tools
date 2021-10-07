const splitToChunks = (array, parts) => {
  const arrayToSplit = [...array];

  let result = [];
  for (let i = parts; i > 0; i--) {
    result.push(arrayToSplit.splice(0, Math.ceil(arrayToSplit.length / i)));
  }

  return result;
};

export default splitToChunks;
