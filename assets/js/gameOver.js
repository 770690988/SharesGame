var MoneySum = sessionStorage.getItem("MoneySum");
var labelStr = '<div id="myChart">' + MoneySum + '</div>'
$('.ziChanNum').append(labelStr);
sessionStorage.clear();