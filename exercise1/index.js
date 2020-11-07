const { sum2Numbers } = require("./src/app.ts");
const { init, onRandom } = require("./src/source.ts");

init();

const sumAndPrint = ({ num1, num2 }) =>
  sum2Numbers(num1, num2).then(console.log).catch(console.error);

onRandom(sumAndPrint);
