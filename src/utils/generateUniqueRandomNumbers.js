export const generateUniqueRandomNumbers = (setRandomGenNumber) => {
  const available = [1,2,3,4,5,6,7,8,9];
  const used = [];
  let current = null;
  let intervalId = null;

  const start = () => {
    if (intervalId !== null) return;

    intervalId = setInterval(() => {
      if (used.length >= 9) {
        clearInterval(intervalId);
        intervalId = null;
        return;
      }
      const remaining = available.filter(n => !used.includes(n));
      const randIndex = Math.floor(Math.random() * remaining.length);
      current = remaining[randIndex];
      used.push(current);

      setRandomGenNumber(current); // <-- update React state here!
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalId);
    intervalId = null;
  };

  const getCurrent = () => current;

  return { start, stop, getCurrent };
};
