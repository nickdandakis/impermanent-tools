import getRandomInt from "./getRandomInt";

function getRandomColor() {
  const h = getRandomInt(0, 360);
  const s = getRandomInt(42, 98);
  const l = getRandomInt(40, 90);

  return `hsl(${h},${s}%,${l}%)`;
}

export default getRandomColor;
