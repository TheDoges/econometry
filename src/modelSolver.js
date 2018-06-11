const math = require('mathjs');

module.exports.solve = (inputData) => {
    const x = math.matrix(inputData.map(row => [1, ...row.slice(1)]));
    const y = math.matrix(inputData.map(row => [row[0]]));

    const xTx = math.multiply(math.transpose(x),x);
    const xTy = math.multiply(math.transpose(x),y);

    //parametry modelu
    const b = math.multiply(math.inv(xTx), xTy);

    const n = inputData.length;
    const k = inputData[0].length;
    const s2 = math.subset(math.eval(`(1/(${n}-${k}))*(${math.transpose(y)}*${y}-${math.transpose(y)}*${x}*${b})`), math.index(0,0));

    const d2a = math.diag(math.eval(`${s2}*inv(transpose(${x})*${x})`));
    //błędy szacunku parametrów
    const da = math.map(d2a, value => math.sqrt(value));

    //odchylenie standardowe składnika resztowego
    const su = math.sqrt(s2);

    //współczynnik zbieżności
    const fi2 = math.subset(math.eval(`(transpose(${y})*${y}-transpose(${y})*${x}*${b})/((transpose(${y}-mean(${y})))*(${y}-mean(${y})))`), math.index(0,0));

    //współczynnik determinacji
    const r2 = 1 - fi2;

    //współczynnik zmienności losowej
    const v = 100*su / math.mean(y);

    return {
        b: b,
        da: da,
        su: su,
        fi2: fi2,
        r2: r2,
        v: v
    }
}

module.exports.getDataForChart = (modelData, inputData) => {
    labels = [];
    inputSeries = [];
    calculatedSeries = [];

    var calculateY = (x1t, x2t) => {
        var a = Number(modelData.b._data[0]);
        var b = Number(modelData.b._data[1]*x1t);
        var c = Number(modelData.b._data[2]*x2t);

        return a + b + c;
    }
    for(var i = 0; i < inputData.length; ++i) {
        labels.push(i+1);
        inputSeries.push(inputData[i][0]);
        calculatedSeries.push(calculateY(inputData[i][1], inputData[i][2]));
    }

    return {
        series: [inputSeries, calculatedSeries],
        labels: labels
    }
}

module.exports.getDataForView = (modelData) => {
    var y = "y = " + modelData.b._data[0] + " + " + modelData.b._data[1] + "*x1t + " + modelData.b._data[2] + "*x2t";
    var da = "da = " + modelData.da._data;
    var su = "su = " + modelData.su;
    var fi2 = "fi2 = " + modelData.fi2;
    var r2 = "r2 = " + modelData.r2;
    var v = "v = " + modelData.v;

    return {
        y,
        da,
        su,
        fi2,
        r2,
        v
    }
}