export const shuffleArray = (items: any[]) => {
  const array: any[] = [];
  while (array.length !== items.length) {
    const randomIndex = Math.floor(Math.random() * items.length);
    if (!array.includes(items[randomIndex])) array.push(items[randomIndex]);
  }
  return array;
};