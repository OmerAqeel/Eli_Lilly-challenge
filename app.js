const express = require('express')
const path = require('path')
const stocks = require('./stocks')
const cors = require('cors');

const app = express()
app.use(express.static(path.join(__dirname, 'static')))
app.use(cors({ origin: '*' })); // to fix the CORS error
/* Get the list of stocks and catch the error */
app.get('/stocks', async(req, res) => {
    try {
        const stockSymbols = await stocks.getStocks()
        res.json({ stockSymbols })
            //console.log(stockSymbols)
    } catch (err) {
        console.error("Stocks could not be loaded.")
    }
})

/*if the socket hangs up, the server should return a 500 error  else  return the data */

app.get('/stocks/:symbol', async(req, res) => {
    try {
        const { params: { symbol } } = req
        const data = await stocks.getStockPoints(symbol, new Date())
        res.send(data)
            //console.log(data)
    } catch (err) {
        console.error("Stock could not be loaded.")
        res.status(500).send(err.message)
    }
})

app.listen(3000, () => console.log('Server is running!'))
