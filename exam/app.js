var express = require('express'),
  cons = require('consolidate'),
  app = express()

app.engine('html', cons.swig)


app.set('view engine', 'html')
app.set('views', __dirname + '/views')

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

app.get('/schedule', function(req, res){
  res.render('schedule', {
    title: '강의 일정',
  })
})

app.listen(3000)
console.log('Express server listening on port 3000')
