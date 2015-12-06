var casper = require('casper').create({
	viewportSize: {width: 2000, height: 2000}
});
var utils = require('utils');

var username = casper.cli.args[0];
var password = casper.cli.args[1];

var subjects = [
	'PES1030 04',
	'PES1020 39',
	'PES1020 36',
	'PES1025 5',
	'PES1035 5',
	'PES1035 8',
	'PES1050 17'
];
var cur = 0;

function register() {
	casper.thenOpen('http://dangkyhoc.daotao.vnu.edu.vn/dang-nhap');

	casper.then(function () {
		this.echo(username + ' ' + cur++);
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


	casper.then(function () {
		var data = this.getElementsInfo('div.green-border table tbody tr td:nth-child(5)').map(function (value, index, array) {
			var subject = array[index].text.substr(17);
			return subject.substring(0, subject.indexOf('\n'));
		});
		var code = this.getElementsInfo('div.green-border table tbody tr td:nth-child(1)').map(function (value, index, array) {
			var subject = array[index].html;
			subject = subject.substring(subject.indexOf('data-crdid'));
			return subject.substring(12, 19);
		});
			
		for (var i = 0; i < code.length; ++i) {
			if (code[i].charAt(0) == '0')
				for (var j = 0; j < subjects.length; ++j)
					if (subjects[j] == data[i]) {
						this.echo('Found ' + data[i]);
						this.thenEvaluate(function (codename) {
							document.querySelector('input[data-crdid="' + codename + '"]').click();						
						}, code[i]);
						this.wait(5000);
						this.thenEvaluate(function() {
							document.querySelector('button.confirm-registration').click();
						});
					}
		}
	});
	casper.wait(2000);
}

casper.start();

casper.then(function () {
	this.repeat(10000, register);
});

casper.run();