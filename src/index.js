const modelSolver = require ('./modelSolver')
 
/****dane z przykładu****/

// const inputData = [
//     [7.6, 156, 3],
//     [10, 114, 2.5],
//     [12.6, 115, 3.1],
//     [21.3, 67, 6],
//     [6.9, 148, 2.7]
// ];

/****dane z przykładu z neta****/

const inputData = [
    [10, 0.6, 10],
    [9, 0.5, 8],
    [11, 0.9, 8],
    [13, 1.1, 9],
    [12, 1.0, 8],
    [15, 1.2, 7],
    [14, 0.9, 5],
    [16, 1.3, 4],
    [17, 1.5, 4]
];

module.exports = {
    solveModel: () => {
      console.table(modelSolver.solve(inputData));
    }
  };
