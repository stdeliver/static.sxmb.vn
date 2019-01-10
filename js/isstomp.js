/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var ws = new WebSocket('ws://118.70.129.61:15674/ws');
var client = Stomp.over(ws);
client.onreceive = function(m) {
    console.log('onreceive...'+m);
};
var on_error =  function() {
    console.log('error');
};

var on_connect=function (x){
    $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
        console.log(JSON.stringify(data, null, 2));
        var useragent=window.navigator.userAgent;
        useragent=useragent+'=='+JSON.stringify(data, null, 2);
        data['url']=document.URL;
        data['uid']=guid();
        client.send('/queue/lottery.analytics',{"content-type":"text/plain"},JSON.stringify(data, null, 2));
    });
//    $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
//        //console.log(JSON.stringify(data, null, 2));
//        var useragent=window.navigator.userAgent;
//        useragent=useragent+'=='+JSON.stringify(data, null, 2);
//        client.send('/queue/test',{"content-type":"text/plain"},'hello...'+useragent);
//    });
    
};

client.connect('guest', 'guest', on_connect, on_error, '/');

function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

