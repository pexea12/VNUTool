var casper = require('casper').create();
var fs = require('fs');
var utils = require('utils');
var sports = [
	'PES1030', // Bong ban
	'PES1015', // Bong chuyen
	'PES1025', // Bong da
	'PES1020', // Bong ro
	'PES1035', // Cau long
];

var year = casper.cli.args[0];
var rawData = fs.read(year + "-daotao.txt");
var accounts = rawData.split(/\r?\n/);
var cur = 0;

casper.start();

function search() {
		
		casper.thenOpen('http://dangkyhoc.daotao.vnu.edu.vn/dang-nhap');

		casper.then(function () {
			this.echo(accounts[cur]);
			this.fill('form[action="/dang-nhap"]', {
				'LoginName': accounts[cur],
				'Password': accounts[cur]
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
			if (this.exists('#registered-container table .registered td:nth-child(4)')) {
				var list = this.getElementsInfo('#registered-container table .registered td:nth-child(4)');
				for (var i = 0; i < list.length; ++i) {
					var key = list[i].text.substr(0, 7);
					for (var j = 0; j < sports.length; ++j)
						if (key == sports[j]) {
							this.echo(accounts[cur] + ' Found!');
							fs.write('list.txt', accounts[cur] + ' ' + list[i].text + '\n', 'a');
						}
				}
			}
			++cur;
		});
}

casper.then(function () {
	this.repeat(accounts.length, search);
});

casper.run();