var casper = require("casper").create();
var url = 'http://news.naver.com/';
var filename = './capture.jpg';
casper.start(url, function() {
  this.captureSelector(filename, "#main_content");
  this.echo("Saved screenshot of " + (this.getCurrentUrl()) + " to " + filename);
});
casper.run();