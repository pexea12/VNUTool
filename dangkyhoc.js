var casper = require('casper').create();
var fs = require('fs');
var utils = require('utils');

var username = casper.cli.args[0];
var password = casper.cli.args[1];
var rawData = fs.read('subjects.txt');
var subjects = rawData.split(/\r?\n/);


casper.start('http://dangkyhoc.daotao.vnu.edu.vn/dang-nhap', function () {
	this.echo('Visit VNU website: dangkyhoc.daotao.vnu.edu.vn');
});

casper.then(function () {

	this.fill('form[action="/dang-nhap"]', {
		'LoginName': username,
		'Password': password
	}, true);
});

casper.thenEvaluate(function () {
	document.querySelector('button.btn').submit();
});

casper.waitForSelector('title');

casper.then(function () {
	if (this.getTitle() == 'Đăng nhập hệ thống đăng ký học - Cổng thông tin Đào tạo Đại học VNU')
		this.die('Wrong password!', 1);
});

casper.thenOpen('http://dangkyhoc.daotao.vnu.edu.vn/dang-ky-mon-hoc-nganh-1');

casper.wait(5000);

casper.thenEvaluate(function () {
	var table = document.querySelector('table.table');
	
});

casper.then(function () {
	this.capture('pic1.png', {
		top: 0,
		left: 0,
		width: 500,
		height: 1000
	});
});

casper.run();