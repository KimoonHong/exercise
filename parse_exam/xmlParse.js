var xml2js = require('xml2js');
var request = require('request');
        
var serviceKey = 'pJ8GHWTN%2FeC3CGvGnmPNF0sFTQNI9lDAMJVSNQfFP0TNPSPJ4N2SAt0ikJ7wrU8tvczytue30CMWF3c2D6LWZg%3D%3D';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey; /* Service Key*/
var url = 'http://openapi.q-net.or.kr/api/service/rest/InquiryTestInformationNTQSVC/getPEList' + queryParams;
var parser = new xml2js.Parser();
request(url, function(error, response, body) {
	parser.parseString(body, function(err,result){
		console.log(JSON.stringify(result));
	});
});

