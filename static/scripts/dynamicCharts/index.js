const chartContainer = document.getElementById('chartContainer');
let width = chartContainer.width;
let height = chartContainer.height;

const chartProperties = {
    width: width,
    height: height,
    layout: {
        backgroundColor: 'rgba(255,255,255, 1)',
        textColor: '#4C5C97',
        fontFamily: 'Open Sans',
        border: '1px solid red',
    },
    crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
    },
    grid: {
        vertLines: {
            color: 'rgba(0, 0, 0, 0.05)',
        },
        horzLines: {
            color: 'rgba(0, 0, 0, 0.05)',
        },
    },
    rightPriceScale: {
        borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    timeScale: {
        borderColor: 'rgba(0, 0, 0, 0.05)',
    },
}

const chart = LightweightCharts.createChart(chartContainer,chartProperties);
const candleSeries = chart.addCandlestickSeries({
    // upColor: '#A9D8B8',
    // downColor: '#FE938C',
    // borderDownColor: '#FE938C',
    // borderUpColor: '#A9D8B8',
    // wickDownColor: '#FE938C',
    // wickUpColor: '#A9D8B8',

    upColor: '#9FAF90',
    downColor: '#FB8387',
    borderDownColor: '#FB8387',
    borderUpColor: '#9FAF90',
    wickDownColor: '#FB8387',
    wickUpColor: '#9FAF90',

    // upColor: '#8299FE',
    // downColor: 'transparent',
    // borderDownColor: '#8299FE',
    // borderUpColor: '#8299FE',
    // wickDownColor: '#8299FE',
    // wickUpColor: '#8299FE',
});

const toolTipWidth = 60; //100
const toolTipHeight = 80; //80
const toolTipMargin = 15; //15
const maxWidth = 600;
const maxHeight = 300;

const toolTip = document.getElementById('tool-tip');

chart.subscribeCrosshairMove(param => {
    if (!param.time || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > height) {
        toolTip.style.display = 'none';
        return;
    }

    toolTip.style.display = 'block';
    let prices = param.seriesPrices.get(candleSeries);
    toolTip.innerHTML = '<div style="color: #4C5C97"><div class="tool-tip-content">' + 'O: ' + prices.open +
        '</div><div class="tool-tip-content">' + 'H: ' + prices.high + '</div><div class="tool-tip-content">' +
        'L: ' + prices.low + '</div><div class="tool-tip-content">' + 'C: ' + prices.close + '</div>' + '</div>';

    let left = param.point.x + toolTipMargin;

    if (left > maxWidth - toolTipWidth) {
        left = param.point.x - toolTipMargin - toolTipWidth;
    }

    let top = param.point.y + toolTipMargin;

    if (top > maxHeight - toolTipHeight) {
        top = param.point.y - toolTipHeight - toolTipMargin;
    }

    toolTip.style.left = left + 'px';
    toolTip.style.top = top + 'px';
});
