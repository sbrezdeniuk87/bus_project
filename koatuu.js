let tranuid = '00'+ (new Date().getTime()) + Math.floor(Math.random()*10000);
let xml =`<?xml version="1.0" encoding="utf8"?>
<ask>
  <ident>
    <from>test</from>
    <timestamp>Tue Mar  3 00:00:00 2009</timestamp>
    <to>db.bus.com.ua</to>
  </ident>
  <getListFromPointsKOATUU>
    <techInfo>
      <client>
	<!-- наименование агента, присвоенное системе при регистрации -->
        <agent>test</agent>
	<!-- рабочее место - уникальный идентификатор вычислительной установки, позволяющий однозначно определить место выдачи билета -->
        <workplace>asta.mobi-test</workplace>
	<!-- уникальный идентификатор запроса, начинающийся с комбинации символов, присвоенной при регистрации -->
        <uid>${tranuid}</uid>
      </client>
    </techInfo>
  </getListFromPointsKOATUU>
</ask>`;

var net = require('net');

var client = new net.Socket();
client.connect (5053, 'db.bus.com.ua', function() {
  console.log('Connected');
  console.log('---------client details -----------------');
  var address = client.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Client is listening at port ' + port);
  console.log('Client ip :' + ipaddr);
  console.log('Client is IP4/IP6 : ' + family);

  client.write (xml);
  client.end ();
});

client.on('data', function(data) {
  console.log('Received: ' + data);
  client.destroy(); // kill client after server's response
});
/*
client.on('drain',function(){
  console.log('write buffer is empty now .. u can resume the writable stream');
  client.resume();
});*/

client.on('close', function() {
  console.log('Connection closed');
});
