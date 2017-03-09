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

	var fileLocate = 'screenShotTest/1.jpg';
	this.captureSelector(fileLocate, "html");
	this.echo("Title : "+this.getTitle());
	//this.echo("HTML Code : "+this.getHTML());
	this.echo("frame의 갯수 : "+this.getElementsInfo('frame').length);
	this.echo("frame의 이름 : "+this.getElementsInfo('frame')[0].attr);

	
	//this.fill('form[action="/search"]', { q: 'seotory' }, true);
});


casper.then(function(){
	this.page.switchToFrame('secondF');

	this.echo("frame이동");
	this.echo("a 갯수 : "+this.getElementsInfo('a').length);

	var fileLocate = 'screenShotTest/2.jpg';
	this.captureSelector(fileLocate, "html");
	
	casper.clickLabel('과목조회','a');
	casper.clickLabel('학부교양/교직/기타과목','a');
	
	this.wait(1000);
	


});



casper.then(function(){
	//top frame으로 이동
	this.page.switchToParentFrame();
	this.echo("frame이동");
	
	var fileLocate = 'screenShotTest/3.jpg';
	this.captureSelector(fileLocate, "html");
});



casper.then(function(){
	this.page.switchToFrame('firstF');
	this.page.switchToFrame('ILec');
	this.echo("Ilec frame이동");
	
	this.evaluate(function(){
		console.log("let's start");
		
		function selectCol(countCol, callback){
			$('.single select[name="tm"]').val('1R').change();
			
			var colPath = $('.single select[name="col"] option:nth-child('+countCol+')');
			$('.single select[name="col"]').val(colPath.val()).change();
			callback($('.single select[name="col"]').val());

		};
		function selectDept(callback){
			$countDept = $('.single select[name="dept"] option').length;
			console.log($('.single select[name="dept"]'));
			f_submit();
		}

		function print(){
			console.log($('form[name="frm_ets"] table'));
		}
		
		
		
		selectCol(3,function(data){
			console.log("callback value col val : "+data);
			$('.single select[name="col"]').change();
			$('.single select[name="dept"]').val("").change();
			javascript:f_submit();
		});
		

	});
});

casper.then(function(){
	this.wait(1000);
	this.evaluate(){
		console.log($('form[name="frm_ets"] table').html());
	});
	/*
	var fileLocate = 'screenShotTest/4.jpg';
	this.captureSelector(fileLocate, "html");
	*/
//	this.echo("HTML Code : "+this.getHTML());
	
});

casper.run(function() {
	this.echo(links.length + ' links found:');
	this.echo(' - ' + links.join('\n - ')).exit();
});