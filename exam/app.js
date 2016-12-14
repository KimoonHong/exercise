var xml2js = require('xml2js');
var request = require('request');
var express = require('express'),
  cons = require('consolidate'),
  app = express()

app.engine('html', cons.swig)

app.set('view engine', 'html')
app.set('views', __dirname + '/views')

var serviceKey = 'pJ8GHWTN%2FeC3CGvGnmPNF0sFTQNI9lDAMJVSNQfFP0TNPSPJ4N2SAt0ikJ7wrU8tvczytue30CMWF3c2D6LWZg%3D%3D';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey; /* Service Key*/
var url = 'http://openapi.q-net.or.kr/api/service/rest/InquiryTestInformationNTQSVC/getPEList' + queryParams;
var parser = new xml2js.Parser();
request(url, function(error, response, body) {
        parser.parseString(body, function(err,result){
        	console.log(JSON.stringify(result));
		app.get('/schedule', function(req, res){
			res.render('schedule', {
    				title: '강의 일정',
    				result: JSON.stringify(result)
  			})
		})
	});
});

app.get('/', function(req, res){
  res.render('index', {
    title: '인강모아'
  })
})

app.get('/info', function(req, res){
  res.render('info', {
    title: '강의 정보',
  })
})
/*
app.get('/schedule', function(req, res){
  res.render('schedule', {
    title: '강의 일정',
    result: result
  })
})
*/
app.listen(3000)
console.log('Express server listening on port 3000')
