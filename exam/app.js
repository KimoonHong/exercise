var xml2js = require('xml2js');
var request = require('request');
var express = require('express'),
  cons = require('consolidate'),
  app = express()

app.engine('html', cons.swig)

app.set('view engine', 'html')
app.set('views', __dirname + '/views')

var serviceKey = 'pJ8GHWTN%2FeC3CGvGnmPNF0sFTQNI9lDAMJVSNQfFP0TNPSPJ4N2SAt0ikJ7wrU8tvczytue30CMWF3c2D6LWZg%3D%3D';
var queryParams = encodeURIComponent('ServiceKey') + '=' + serviceKey; /* Service Key*/


var jmListUrl = 'http://openapi.q-net.or.kr/api/service/rest/InquiryTestInformationNTQSVC/getJMList?jmCd=0752&' + queryParams; //기술사 종목별 시험 일정
var feeUrl = 'http://openapi.q-net.or.kr/api/service/rest/InquiryTestInformationNTQSVC/getFeeList?jmCd=0752&' + queryParams; //기술사 종목별 응시료
var listUrl = 'http://openapi.q-net.or.kr/api/service/rest/InquiryListNationalQualifcationSVC/getList?' + queryParams; //국가자격 종목 목록 정보

var parser = new xml2js.Parser();

request(listUrl, function(error, response, body) {
        parser.parseString(body, function(err,result){
		var items = result.response.body[0].items[0].item;
		
		console.log(items.length);
/*        	for(var i=0 ; i < items.length ; i++){
			console.log(items[i].jmFldNm[0]);
		}
*/		
		app.get('/examList', function(req, res){
			res.render('examList', {
    				title: '시험 목록',
				items: items,
				total: items.length
  			})
		})
	});
});

request(jmListUrl, function(error, response, body) {
        parser.parseString(body, function(err,result){
		var items = result.response.body[0].items[0].item;
		
		console.log(items.length);
/*        	for(var i=0 ; i < items.length ; i++){
			console.log(items[i].jmFldNm[0]);
		}
*/		
		app.get('/schedule', function(req, res){
			res.render('schedule', {
    				title: '시험 정보',
				items: items,
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
