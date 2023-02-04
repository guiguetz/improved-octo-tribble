const utils = {
  withGrid(n: number) {
    return n * 16;
  },
  asGridCoord(x: number, y: number) {
    return `${x * 16},${y * 16}`;
  },
  nextPosition(initialX: number, initialY: number, direction: string) {
    let x = initialX;
    let y = initialY;
    const size = 16;

    if (direction === 'left') {
      x -= size;
    } else if (direction === 'right') {
      x += size;
    } else if (direction === 'up') {
      y -= size;
    } else if (direction === 'down') {
      y += size;
    }
    return { x, y };
  },
};

export default utils;
