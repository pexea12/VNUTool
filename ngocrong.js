var casper = require('casper').create();

var n = casper.cli.args[0];

casper.start("http://forum.ngocrongonline.com/app/login.php", function () {
	this.echo(this.getTitle());
	this.echo('Start to login ...');
});

casper.then(function () {
	this.echo("Filling username and password ...");

	this.fillSelectors('form[name="login"]', { 
		'input[name="user"]': 'dungtoanhoc@yahoo.com.vn',
		'input[name="pass"]': '123456789',
		'input[name="server"]': '2'
	}, true);

	this.echo('Finish filling username and password!');
});

casper.thenEvaluate(function () {
    document.querySelector('button[type="submit"]').submit();
});

casper.wait(1000);

function postArticle() {
	casper.thenOpen('http://forum.ngocrongonline.com/app/index.php?for=forum&do=request&uid=3', function () {
		 this.echo('Preparing for editting ...');

		 this.capture('pic1.png', {
		top: 0,
		left: 0,
		width: 500,
		height: 1000
	});
	console.log('Finish capturing picture');

		 this.fill('form[name="UpdateCM"]', {
		 	'txttitle': 'Em la Hong dep zai',
		 	'txtndung': 'Gia Cat Luong (Zhuge Liange)'
		 }, false);

		 this.echo('Finish filling form!');
	});

	casper.thenEvaluate(function () {
		document.querySelector('button[type="submit"]').click();
	});

	casper.wait(30000);
}

casper.then(function () {
	casper.repeat(n, postArticle);
});

casper.run();