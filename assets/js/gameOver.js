//获取数据
var MoneySum = sessionStorage.getItem("MoneySum");
var labelStr = '<div id="myChart">' + MoneySum + '</div>'
$('.ziChanNum').append(labelStr);
sessionStorage.clear();

//数据分析
var youGain = MoneySum - 200000;
var shouyiRate = (youGain / 200000 * 100) + "%";
var shouyiDaily = youGain / 200;
/*
alert("您的收益为：" + youGain);
alert("您的收益率为：" + shouyiRate);
alert("在这次股市风云中，您的日薪为：" + shouyiDaily);
*/
var youGainDiv = '<div id = "youGain">您的收益为：' + youGain + '</div>';
$('.dataAnalyse').append(youGainDiv)
var shouyiRateDiv = '<div id = "shouyiRate">您的收益率为：' + shouyiRate + '</div>';
$('.dataAnalyse').append(shouyiRateDiv)
var shouyiDailyDiv = '<div id = "shouyiDaily">您的日薪为：' + shouyiDaily + '</div>';
$('.dataAnalyse').append(shouyiDailyDiv)

if (youGain < -5000) {
    $('.dataSuggestion').append('<div class = "suggest">对不起，为了您家庭和财产安全，请您远离股票~~~</div>');
} else if (youGain < 0) {
    $('.dataSuggestion').append('<div class = "suggest">股市风险比较高，对于您的情况，不太建议您使用股票作为理财的一种方案</div>');
} else if (youGain < 20000) {
    $('.dataSuggestion').append('<div class = "suggest">您的股票投资能力一般，建议您仅用作娱乐（股市风云当做游戏即可~）</div>');
} else if (youGain < 200000) {
    $('.dataSuggestion').append('<div class = "suggest">您的股票投资能力还不错哦，可以理财可以适当分配一定比例进入股市~（股市风云当做游戏即可~）</div>');
} else {
    $('.dataSuggestion').append('<div class = "suggest">兄弟~也许您就是下一个巴菲特！交个朋友吧，股市是您梦想起航的地方！</div>');
}

function ToIndex() {
    location.href = "../index.html";
}

function zhanshiphb(){
    var data1;
    $.ajax({
        url: "../assets/jason/phb.json",//json文件位置
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function(data) {//请求成功完成后要执行的方法 s
            //each循环 使用$.each方法遍历返回的数据date
            console.log(data);
            
        }
     })
     
     
}