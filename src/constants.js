// Here All contants values are there

const BOARD_SIZE = [900, 445];
const SNAKE_START_POINT = [
  [8, 7],
  [8, 8]
];
const APPLE_START_POINT = [8, 3];
const SCALE = 40;
const SNAKE_SPEED = 100;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};

export {
  BOARD_SIZE,
  SNAKE_START_POINT,
  APPLE_START_POINT,
  SCALE,
  SNAKE_SPEED,
  DIRECTIONS
};