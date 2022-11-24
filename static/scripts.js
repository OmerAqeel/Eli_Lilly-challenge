const url = 'http://localhost:3000/stocks';

async function getStockPoints(url, symbol) {
    try {
        const response = await fetch(`${url}/${symbol}`); // fetch the stock data
        const data = await response.json(); // parse the data
        return data;
    } catch (err) {
        console.error(err);
        return null; // if the stock data is not loaded, it will return null
    }
}
async function getStocks(url) {
    const response = await fetch(url) // fetch the stock data
    const { stockSymbols } = await response.json(); // parse the data
    return stockSymbols; // return the stock symbols
}



/*getting the stock points for each symbol from the getStocks function 
and printing them out in the console and if the stock data is not loaded, 
it will print out 'Stock could not be loaded' and move on to the next symbol*/

async function main() {
    try {
        const symbols = await getStocks(url);
        for (const symbol of symbols) {
            console.group(symbol + ':'); // group the stock symbols in the console
            const stockPoints = await getStockPoints(url, symbol);
            if (stockPoints == null) { // if the stock data is not loaded, it will print out 'Stock could not be loaded' and move on to the next symbol
                console.log('Stock could not be loaded');
                continue; // skip to the next symbol
            }
            for (const stockPoint of stockPoints) {
                const { value, timestamp } = stockPoint;
                console.log(new Date(timestamp).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }), "-", value);
            }
            console.groupEnd(); // end the group
        }
    } catch (SyntaxError) {
        console.log("Further stock could not be loaded."); // Sometimes the stock data is not loaded
    }
    document.getElementById("spinner-div").remove(); // remove the spinner
}


// setting a timer to run the main function every 5 seconds
setTimeout(() => {
    main();
}, 3000);

// Chart code
const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d');


function drawLine(start, end, style) {
    ctx.beginPath()
    ctx.strokeStyle = style || 'black'
    ctx.moveTo(...start)
    ctx.lineTo(...end)
    ctx.stroke()
}

function drawTriangle(apex1, apex2, apex3) {
    ctx.beginPath()
    ctx.moveTo(...apex1)
    ctx.lineTo(...apex2)
    ctx.lineTo(...apex3)
    ctx.fill()
}

drawLine([50, 50], [50, 550])
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550])
drawTriangle([950, 535], [950, 565], [965, 550])

// Tried to draw the chart but it didn't work

// var chart = document.getElementById("chart").getContext("2d");

// var cw = chart.canvas.width;
// var ch = chart.canvas.height;

// var w = [0, cw / 5, 2 * (cw / 5), 3 * (cw / 5), 4 * (cw / 5), 5 * (cw / 5)];

// var h = [ch, ch - ch / 5, ch - 2 * (ch / 5), ch - 3 * (ch / 5), ch - 4 * (ch / 5), ch - 5 * (ch / 5)];

// var stocks = getStocks(url);
// var values = [];
// for (let i = 0; i < stocks.length; i++) {
//     const points = getStockPoints(url, stocks[i]);
//     for (let j = 0; j < points.length; j++) {
//         values.push(points[j].value);
//     }
// }
// var val = [];


// for (var i = 0; i < stocks.length; i++) {
//     var stock = document.createElement('span');
//     var text = document.createTextNode(stocks[i])
//     stock.appendChild(text);
//     document.getElementById('stocks').appendChild(stock);
// }

// for (var i = values.length - 1; i >= 0; i--) {
//     var value = document.createElement('span');
//     var text_value = document.createTextNode(values[i])
//     value.appendChild(text_value);
//     document.getElementById('values').appendChild(value);
// }

// var ch = document.getElementById("chart");

// chart.beginPath();
