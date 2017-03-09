var links = [];
var casper = require('casper').create({
	viewportSize: {
		width: 1024,
		height: 768
	}
});

var url='http://sugang.korea.ac.kr';

function getLinks() {
	var links = document.querySelectorAll('h3.r a');
	return Array.prototype.map.call(links, function(e) {
		return e.getAttribute('href');
	});
}


casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
})


casper.start(url, function() {
	casper.page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js');

	var fileLocate = 'test/1.jpg';
	this.captureSelector(fileLocate, "html");
	this.echo("Title : "+this.getTitle());
	//this.echo("HTML Code : "+this.getHTML());
	this.echo("frame의 갯수 : "+this.getElementsInfo('frame').length);
	this.echo("frame의 이름 : "+this.getElementsInfo('frame')[0].attr);

	
	//this.fill('form[action="/search"]', { q: 'seotory' }, true);
});



casper.run(function() {
	this.echo(links.length + ' links found:');
	this.echo(' - ' + links.join('\n - ')).exit();
});