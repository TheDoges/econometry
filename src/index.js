const modelSolver = require ('./modelSolver');
const fileReader = require('./fileReader');
const chart = require('./chart');

/* Example inputData in file */
// [7.6, 156, 3],
// [10, 114, 2.5],
// [12.6, 115, 3.1],
// [21.3, 67, 6],
// [6.9, 148, 2.7]

module.exports = {
    calculate: () => {
        var inputData = fileReader.getInputData();
        var modelData = modelSolver.solve(inputData);
        var chartData = modelSolver.getDataForChart(modelData, inputData);
        console.log(chartData);
        chart.generatePointChart('#chart', chartData.labels, chartData.series, false);
        var modelDataForView = modelSolver.getDataForView(modelData);
        assignModelDataToView(modelDataForView);
    }
  };

var assignModelDataToView = (modelDataForView) => {
    document.getElementById("yEquation").innerText = modelDataForView.y;
        document.getElementById("da").innerText = modelDataForView.da;
        document.getElementById("su").innerText = modelDataForView.su;
        document.getElementById("fi2").innerText = modelDataForView.fi2;
        document.getElementById("r2").innerText = modelDataForView.r2;
        document.getElementById("v").innerText = modelDataForView.v;
}


