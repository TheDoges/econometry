const modelSolver = require ('./modelSolver');
const fileReader = require('./fileReader');

module.exports = {
    calculate: () => {
        console.table(modelSolver.solve(fileReader.getInputData()));
    }
  };
