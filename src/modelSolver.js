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
        b: b.toString(),
        da: da.toString(),
        su: su,
        fi2: fi2,
        r2: r2,
        v: v
    }
}