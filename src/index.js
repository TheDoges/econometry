const modelSolver = require ('./modelSolver');
const fileReader = require('./fileReader');

/* Example inputData in file */
// [7.6, 156, 3],
// [10, 114, 2.5],
// [12.6, 115, 3.1],
// [21.3, 67, 6],
// [6.9, 148, 2.7]

module.exports = {
    calculate: () => {
        console.table(modelSolver.solve(fileReader.getInputData()));
    }
  };
