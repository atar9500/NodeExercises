const { EventEmitter } = require("events");

const RANDOM_NUMS_EVENT = "random_nums_event";
const TIMEOUT_IN_MILLIS = 1000 * 2;

const emitter = new EventEmitter();

const randomNumber = () => Math.floor(Math.random() * 100);

const init = () => {
  setInterval(() => {
    const num1 = randomNumber();
    const num2 = randomNumber();
    emitter.emit(RANDOM_NUMS_EVENT, { num1, num2 });
  }, TIMEOUT_IN_MILLIS);
};
const onRandom = (callback: (nums: { num1: number; num2: number }) => void) =>
  emitter.on(RANDOM_NUMS_EVENT, callback);

module.exports = { init, onRandom };
