var shareNum = 9;
var allData = [
    [50.00],
    [50.00],
    [50.00],
    [50.00],
    [50.00],
    [50.00],
    [50.00],
    [50.00],
    [50.00],
    [50.00]
]; //定义每支股票的详细信息
var haveShareNum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //定义每一支股票的拥有量 默认为0
var isShareGet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //该股票是否为已选
var dayCount = [1]; //用以显示图片的横坐标
var dayNum = 1; //定义当前的天数
var zichanQuantity = 200000.00; //定义财产总值
var depositSum = 200000.00;
var mode = 1; //表示当前页面的位置为所有股票
allShareShow();

//进入下一天的数据处理
function nextDay(m) { //m表示股票的个数
    m = shareNum;
    dayNum = dayNum + 1;
    dayCount[dayNum - 1] = dayNum;
    for (i = 0; i <= m; i++) {
        var nowPrice = allData[i][dayNum - 2];
        var nextDayPrice = Math.random() * nowPrice * 0.05 - 0.025 * nowPrice + nowPrice;
        if (nextDayPrice < 0) {
            nextDayPrice = nowPrice + Math.random() * nowPrice;
        }
        dataChange(i, parseFloat(nextDayPrice.toFixed(2)));

    }
    document.getElementById('dayNum').innerText = dayNum;
    if (dayNum == 200) {
        jump(zichanreload(shareNum));
    } else if (dayNum % 10 == 0) {
        var str = "判断题：市盈率是衡量证券投资价值和风险的指标";
        if (confirm(str) == true) {
            alert("恭喜您回答正确，银行账户将增加5000元");
            depositSum = depositSum + 5000;
            document.getElementById('moneySum').innerText = depositSum;
            zichanreload(shareNum);
        } else {
            alert("对不起，您回答错误，无法获得奖励");
        }

    }
    showSharesPrice();
    zichanreload(shareNum);
    $('#myChart').remove();
}

//购买股票的数据处理
function buyShare(i) {
    var flag = 0;
    if (mode == 2) {
        for (var j = 0; j < i; j++) {
            if (haveShareNum[j] > 0) {
                flag++;
            }
        }
    } else {
        flag = i;
    }
    var reg = /^\d+$/;
    let zichan = depositSum;
    let youWantBuy = parseInt(document.getElementsByClassName('buyInput')[flag].value);
    if (reg.test(youWantBuy)) {
        zichan = zichan - allData[i][dayNum - 1] * youWantBuy;
        if (zichan < 0) {
            alert("对不起，您的银行账户余额不足！");
        } else {
            depositSum = zichan;
            document.getElementById('moneySum').innerText = depositSum.toFixed(1);
            haveShareNum[i] = haveShareNum[i] + youWantBuy;
            document.getElementsByClassName('youHave')[flag].innerText = haveShareNum[i];
        }
        zichanreload(shareNum);
    } else {
        alert("请输入整数");
    }
}

//卖出股票的数据处理
function cellShare(i) {
    var flag = 0;
    if (mode == 2) {
        for (var j = 0; j < i; j++) {
            if (haveShareNum[j] > 0) {
                flag++;
            }
        }
    } else {
        flag = i;
    }
    var reg = /^\d+$/;
    var getInNum = haveShareNum[i];
    //let name = 'buyInput' + i;
    let youWantSell = parseInt(document.getElementsByClassName('cellInput')[flag].value);
    if (reg.test(youWantSell)) {
        getInNum = getInNum - youWantSell;
        if (getInNum >= 0) {
            depositSum = depositSum + allData[i][dayNum - 1] * youWantSell;
            haveShareNum[i] = haveShareNum[i] - youWantSell;
            document.getElementsByClassName('youHave')[flag].innerText = haveShareNum[i];
            document.getElementById('moneySum').innerText = depositSum.toFixed(1);
        } else {
            alert("您拥有的数量不足以卖出的数量");
        }
        zichanreload(shareNum);
    } else {
        alert("请输入整数");
    }
}

//重新计算资产的数量
function zichanreload(m) {
    var realSum = 0.0;
    for (i = 0; i <= m; i++) {
        var getInNum = haveShareNum[i];
        var price = allData[i][dayNum - 1];
        realSum = realSum + getInNum * price;
    }
    zichanQuantity = depositSum + realSum;
    document.getElementById('zichanSum').innerText = zichanQuantity.toFixed(1);
    document.getElementById('moneySum').innerText = depositSum.toFixed(1);
    return zichanQuantity.toFixed(2);
}

function dataChange(m, Sprice) {
    allData[m][dayNum - 1] = Sprice;
}

//股票折线图的绘画
/*
function showSharesData(k) {
    $('#myChart').remove();
    $('#chartDIv').append('<canvas id="myChart" style="background-color: aliceblue;max-height: 80%;"></canvas>');
    let ctx = document.getElementById("myChart").getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dayCount,
            datasets: [{
                label: '股票' + (k + 1),
                data: allData[k],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
*/

//基于echarts.js的图像
function showSharesData(k) {
    $('#myChart').remove();
    $('#chartDIv').append('<div id="myChart" style="background-color: aliceblue; width: 100%; height:400px;"></div>');
    let ctx = document.getElementById("myChart");
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(ctx);
    for (var i = 0; i <= k; i++) {

    }
    /*
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '股票价格'
        },
        tooltip: {},
        legend: {
            data: ['股价']
        },
        xAxis: {
            data: dayCount
        },
        yAxis: {
            name: "价格",
            min: Math.min.apply(Math, allData[k]),
            max: Math.max.apply(Math, allData[k])
        },
        series: [{
            name: '股价',
            type: 'line',
            step: 'end',
            data: allData[k]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    */
    var m = [];
    for (var a = 0; a < allData[k].length; a++) {
        m[a] = allData[k][a];
    }
    for (var a = 1; a < m.length; a++) {
        m[a] = m[a] - allData[k][a - 1];
    }
    var help = [];
    var positive = [];
    var negative = [];
    for (var i = 0, sum = 0; i < m.length; ++i) {

        if (m[i] >= 0) {
            positive.push(m[i]);
            negative.push('-');
        } else {
            positive.push('-');
            negative.push(-m[i]);
        }

        if (i === 0) {
            help.push(0);
        } else {
            sum += m[i - 1];
            if (m[i] < 0) {
                help.push(sum + m[i]);
            } else {
                help.push(sum);
            }
        }
    }

    var option = {
        title: {
            text: '股票价格' + (k + 1)
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            splitLine: {
                show: false
            },
            data: (function() {
                var list = [];
                for (var i = 1; i <= dayNum; i++) {
                    list.push('day/' + i);
                }
                return list;
            })()
        },
        yAxis: {
            type: 'value',
            min: Math.min.apply(Math, allData[k]),
            max: Math.max.apply(Math, allData[k])
        },
        series: [{
            type: 'bar',
            stack: 'all',
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: help
        }, {
            name: 'positive',
            type: 'bar',
            stack: 'all',
            data: positive,
            itemStyle: {
                color: '#ff0000'
            }
        }, {
            name: 'negative',
            type: 'bar',
            stack: 'all',
            data: negative,
            itemStyle: {
                color: '#44cf8e'
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

//天数到达200天游戏结束的效果
function jump(label) {
    var storage = window.sessionStorage;
    //storage.clear();
    storage.setItem('MoneySum', label);
    window.open("gameOver.html");

}

//股票小知识的跳转页面
function gotoKnowledge() {
    window.open("https://www.yclyclycl.cn/2021/11/23/%E8%82%A1%E7%A5%A8%E5%85%A5%E9%97%A8%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/#more");
}

//展示已选股票的数据
function yixuanShareShow() {
    $('#myChart').remove();
    mode = 2;
    var showShareDiv = document.getElementById('sharesShow');
    showShareDiv.innerHTML = '';
    var row = '<div class="row" id="rowTitle"><div class="col-sm-2"><div id="shareTableTitle">股票编号</div></div><div class="col-sm-2"><div id="shareTableTitle">往期数据</div></div><div class="col-sm-2"><div id="shareTableTitle">单价</div></div><div class="col-sm-2"><div id="shareTableTitle">拥有量</div></div><div class="col-sm-4"><div id="shareTableTitle1">买卖交易操作区域</div></div></div>';
    $("#sharesShow").append(row);
    for (temp = 0; temp <= shareNum; temp++) {
        if (haveShareNum[temp] > 0) {
            addShare(temp);
        }
    }

}

//展示所有的股票数据
function allShareShow() {
    $('#myChart').remove();
    mode = 1;
    var showShareDiv = document.getElementById('sharesShow');
    showShareDiv.innerHTML = '';
    var row = '<div class="row" id="rowTitle"><div class="col-sm-2"><div id="shareTableTitle">股票编号</div></div><div class="col-sm-2"><div id="shareTableTitle">往期数据</div></div><div class="col-sm-2"><div id="shareTableTitle">单价</div></div><div class="col-sm-2"><div id="shareTableTitle">拥有量</div></div><div class="col-sm-4"><div id="shareTableTitle1">买卖交易操作区域</div></div></div>';
    $("#sharesShow").append(row);
    for (temp = 0; temp <= shareNum; temp++) {
        addShare(temp);
    }
}

function addShare(i) {
    let row = '<div class="row"><div class="col-sm-2"><div id="shareTitle">股票' + (i + 1) + '</div></div><div class="col-sm-2"><div class="historyPriceDiv"><button class="historyPrice" onclick="showSharesData(' + i + ')">往期数据</button></div></div><div class="col-sm-2"><div id="nowPrice" class="nowPrice">' + allData[i][dayNum - 1] + '</div></div><div class="col-sm-2"><div id="youHave" class="youHave">' + haveShareNum[i] + '</div></div><div class="col-sm-1"><input id="buyInput" name = "buyInput' + i + '" class="buyInput" placeholder="0"></div><div class="col-sm-1"><button id="buyShare" onclick="buyShare(' + i + ')">买入</button></div><div class="col-sm-1"><input id="cellInput" class="cellInput" name = "cellInput' + i + '" placeholder="0"></div><div class="col-sm-1"><button id="sellShare" onclick="cellShare(' + i + ')">卖出</button></div></div>';
    $("#sharesShow").append(row);
}

function showSharesPrice() {
    if (mode == 1) {
        allShareShow();
    } else if (mode == 2) {
        yixuanShareShow();
    }
}

/*
function namedButton(text){
    let button=document.createElement();
    button.text=text;
    button.aooendChild
    return namedButton;
}

function rowOfATable(columns,items){
    for item in items{
        document.appendChild(rowOfATable(item))
    }
}
*/