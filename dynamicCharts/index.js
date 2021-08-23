const chartProperties = {
    width: 500,
    height: 500,
    layout: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        textColor: 'rgba(255, 255, 255, 0.9)',
    },
    grid: {
        vertLines: {
            color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
            color: 'rgba(197, 203, 206, 0.5)',
        },
    },
    crosshair: {
        // mode: LightweightCharts.CrosshairMode.Normal,
        horzLine: {
            visible: false,
            labelVisible: false
        },
        vertLine: {
            visible: true,
            style: 0,
            width: 2,
            color: 'rgba(32, 38, 46, 0.1)',
            labelVisible: false,
        }
    },
    rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
    },
    timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
    },
}

const domElement = document.getElementById('tvchart');
const chart = LightweightCharts.createChart(domElement,chartProperties);
const candleSeries = chart.addCandlestickSeries({
    upColor: 'rgba(255, 144, 0, 1)',
    downColor: 'transparent',
    borderDownColor: 'rgba(255, 144, 0, 1)',
    borderUpColor: 'rgba(255, 144, 0, 1)',
    wickDownColor: 'rgba(255, 144, 0, 1)',
    wickUpColor: 'rgba(255, 144, 0, 1)',
});

// fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000`)
//     .then(res => res.json())
//     .then(data => {
//         const cdata = data.map(d => {
//             return {
//                 time:d[0]/1000,
//                 open:parseFloat(d[1]),
//                 high:parseFloat(d[2]),
//                 low:parseFloat(d[3]),
//                 close:parseFloat(d[4])}
//         })
//         candleSeries.setData(cdata);
//     })
//     .catch( err => log(err))

// Dynamic Chart
// const socket = io.connect('http://127.0.0.1:4000/');
//
// socket.on('connect', () => {
//     console.log(socket.connected);
// });
//
//
// socket.on('KLINE', (pl) => {
//     console.log(pl);
//     })

//Dynamic Chart WebSocket
let data = [
    { time: '2018-10-19', open: 180.34, high: 180.99, low: 178.57, close: 179.85 },
    { time: '2018-10-22', open: 180.82, high: 181.40, low: 177.56, close: 178.75 },
    { time: '2018-10-23', open: 175.77, high: 179.49, low: 175.44, close: 178.53 },
    { time: '2018-10-24', open: 178.58, high: 182.37, low: 176.31, close: 176.97 },
    { time: '2018-10-25', open: 177.52, high: 180.50, low: 176.83, close: 179.07 },
    { time: '2018-10-26', open: 176.88, high: 177.34, low: 170.91, close: 172.23 },
    { time: '2018-10-29', open: 173.74, high: 175.99, low: 170.95, close: 173.20 },
    { time: '2018-10-30', open: 173.16, high: 176.43, low: 172.64, close: 176.24 },
    { time: '2018-10-31', open: 177.98, high: 178.85, low: 175.59, close: 175.88 },
    { time: '2018-11-01', open: 176.84, high: 180.86, low: 175.90, close: 180.46 },
    { time: '2018-11-02', open: 182.47, high: 183.01, low: 177.39, close: 179.93 },
    { time: '2018-11-05', open: 181.02, high: 182.41, low: 179.30, close: 182.19 }];


let currentBar = {
    time: null,
    open: null,
    high: null,
    low: null,
    close: null,
};

candleSeries.setData(data);
const binanceWebSocket = new WebSocket('wss://dex.binance.org/api/ws/BNB_BTCB-1DE@kline_1h');

binanceWebSocket.onmessage = (event) => {
    // candleSeries.update(event.data);
    let messageObject = JSON.parse(event.data);
    console.log(messageObject);
    currentBar.time = messageObject.E;
    currentBar.open = messageObject.o;
    currentBar.high = messageObject.h;
    currentBar.low = messageObject .l;
    currentBar.close = messageObject.c;
    console.log(currentBar)

    // candleSeries.update(messageObject);
}
