var shareNum = 9;
var allData = [
    [50.0],
    [50.0],
    [50.0],
    [50.0],
    [50.0],
    [50.0],
    [50.0],
    [50.0],
    [50.0],
    [50.0]
]; //定义每支股票的详细信息
var haveShareNum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //定义每一支股票的拥有量 默认为0
var isShareGet = [1, 1, 1, 1, 1, 1, 1, 0, 1, 1]; //该股票是否为已选
var dayCount = [1];
var dayNum = 1; //定义当前的天数
var zichanQuantity = 200000.00; //定义财产总值
var depositSum = 200000.00;

//进入下一天的数据处理
function nextDay(m) { //m表示股票的个数
    dayNum = dayNum + 1;
    for (i = 0; i <= m; i++) {
        let nowPrice = allData[i][dayNum - 2];
        let nextDayPrice = Math.random() * nowPrice * 0.05 - 0.025 * nowPrice + nowPrice;
        if (nextDayPrice < 0) {
            nextDayPrice = nowPrice + Math.random() * nowPrice;
        }
        dataChange(i, parseFloat(nextDayPrice.toFixed(2)));
        document.getElementsByClassName('nowPrice')[i].innerText = allData[i][dayNum - 1];

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
    zichanreload(shareNum);
    $('#myChart').remove();
}

//购买股票的数据处理
function buyShare(i) {
    var reg = /^\d+$/;
    let zichan = depositSum;
    let youWantBuy = parseInt(document.getElementsByClassName('buyInput')[i].value);
    if (reg.test(youWantBuy)) {
        zichan = zichan - allData[i][dayNum - 1] * youWantBuy;
        if (zichan < 0) {
            alert("对不起，您的银行账户余额不足！");
        } else {
            depositSum = zichan;
            document.getElementById('moneySum').innerText = depositSum.toFixed(1);
            haveShareNum[i] = haveShareNum[i] + youWantBuy;
            document.getElementsByClassName('youHave')[i].innerText = haveShareNum[i];
        }
        zichanreload(shareNum);
    } else {
        alert("请输入整数");
    }
}

//卖出股票的数据处理
function cellShare(i) {
    var reg = /^\d+$/;
    var getInNum = haveShareNum[i];
    //let name = 'buyInput' + i;
    let youWantSell = parseInt(document.getElementsByClassName('cellInput')[i].value);
    if (reg.test(youWantSell)) {
        getInNum = getInNum - youWantSell;
        if (getInNum >= 0) {
            depositSum = depositSum + allData[i][dayNum - 1] * youWantSell;
            haveShareNum[i] = haveShareNum[i] - youWantSell;
            document.getElementsByClassName('youHave')[i].innerText = haveShareNum[i];
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

function showSharesData(k) {
    /*$('#myChart').remove;
    $('#chartDIv').append('<canvas> </canvas>');*/
    alert(allData[k]);
    $('#myChart').remove();
    $('#chartDIv').append('<canvas id="myChart" style="background-color: aliceblue;max-height: 80%;"></canvas>');
    let ctx = document.getElementById("myChart").getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dayCount,
            datasets: [{
                label: '股票' + (k + 1),
                data: allData[k],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
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

function jump(label) {
    var storage = window.sessionStorage;
    //storage.clear();
    storage.setItem('MoneySum', label);
    window.location.href = "gameOver.html";

}

function gotoKnowledge() {
    location.href = "knowledge.html";
}

function yixuanShareShow() {
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

function allShareShow() {
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