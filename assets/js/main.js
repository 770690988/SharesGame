var shareNum = 9;
var allData = [
    [50],
    [50],
    [50],
    [50],
    [50],
    [50],
    [50],
    [50],
    [50],
    [50]
];
var dayCount = [1];
//进入下一天的数据处理
function nextDay(m) { //m表示股票的个数
    var dayStr = document.getElementById('dayNum').innerText;
    var dayNum = parseInt(dayStr) + 1;
    dayCount[dayNum - 1] = dayNum;
    if (dayNum == 200) {
        window.location.href = "gameOver.html";
    } else if (dayNum % 10 == 0) {
        var str = "判断题：市盈率是衡量证券投资价值和风险的指标";
        if (confirm(str) == true) {
            alert("恭喜您回答正确，银行账户将增加5000元");
            var money = parseFloat(document.getElementById('moneySum').innerText);
            document.getElementById('moneySum').innerText = money + 5000;
            zichanreload(shareNum);
            window.showModa
        } else {
            alert("对不起，您回答错误，无法获得奖励");
        }

    }
    document.getElementById('dayNum').innerText = dayNum;
    for (i = 0; i <= m; i++) {
        var nowPrice = parseFloat(document.getElementsByClassName('nowPrice')[i].innerText);
        var nextDayPrice = Math.random() * nowPrice * 0.05 - 0.025 * nowPrice + nowPrice;
        if (nextDayPrice < 0) {
            nextDayPrice = nowPrice + Math.random() * nowPrice;
        }
        document.getElementsByClassName('nowPrice')[i].innerText = nextDayPrice.toFixed(2);
        dataChange(i, nextDayPrice.toFixed(2), parseInt(dayNum));
    }
    zichanreload(shareNum);
    $('#myChart').remove();
}

//购买股票的数据处理
function buyShare(i) {
    var reg = /^\d+$/;
    var regString = /^[abc]$/;
    var getInNum = parseInt(document.getElementsByClassName('youHave')[i].innerText);
    var price = parseFloat(document.getElementsByClassName('nowPrice')[i].innerText);
    let zichan = parseFloat(document.getElementById('moneySum').innerText);
    let youWantBuy = parseInt(document.getElementsByClassName('buyInput')[i].value);
    if (reg.test(youWantBuy)) {
        getInNum = getInNum + youWantBuy;
        zichan = zichan - parseInt(document.getElementsByClassName('buyInput')[i].value) * price;
        if (zichan < 0) {
            alert("对不起，您的银行账户余额不足！");
        } else {
            document.getElementById('moneySum').innerText = zichan.toFixed(2);
            document.getElementsByClassName('youHave')[i].innerText = getInNum;
        }
        zichanreload(shareNum);
    } else {
        alert("请输入整数");
    }
}

//卖出股票的数据处理
function cellShare(i) {
    var reg = /^\d+$/;
    var getInNum = parseInt(document.getElementsByClassName('youHave')[i].innerText);
    var price = parseFloat(document.getElementsByClassName('nowPrice')[i].innerText);
    var zichan = parseFloat(document.getElementById('moneySum').innerText);
    let youWantSell = parseInt(document.getElementsByClassName('cellInput')[i].value);
    if (reg.test(youWantSell)) {
        zichan = zichan + price * youWantSell;
        getInNum = getInNum - parseInt(document.getElementsByClassName('cellInput')[i].value);
        if (getInNum >= 0) {
            document.getElementsByClassName('youHave')[i].innerText = getInNum;
            document.getElementById('moneySum').innerText = zichan.toFixed(2);
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
    var zichan = parseFloat(document.getElementById('moneySum').innerText);
    var realSum = 0.0;
    for (i = 0; i <= m; i++) {
        var getInNum = parseInt(document.getElementsByClassName('youHave')[i].innerText);
        var price = parseFloat(document.getElementsByClassName('nowPrice')[i].innerText);
        realSum = realSum + getInNum * price;
    }
    allSum = zichan + realSum;
    document.getElementById('zichanSum').innerText = allSum.toFixed(2);

}

function dataChange(m, Sprice, DayNum) {
    allData[m][DayNum - 1] = Sprice;
}

function showSharesData(k) {
    /*$('#myChart').remove;
    $('#chartDIv').append('<canvas> </canvas>');*/
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