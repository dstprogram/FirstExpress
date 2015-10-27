var express=require('express');
var app=express();

//这个是要用来添加视图引擎Express比较偏向于Jade，但这里我们使用另外一种抽象程度较低的Handlebars
//为了支持这个Handlebars,需要引入express3-handlebars包

var handlebars=require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

//这个是用来设置端口
app.set('port',process.env.PORT || 3000);
//在所有路由之前需要添加static中间键,相当于给你想要发送的静态文件创建了一个路由；
app.use(express.static(__dirname+'/public'));


//视图中的动态内容,在about中我们动态显示
var fortunes=['Conquer your fears or they will conquer you',
'Rivers need springs','Do not fear what you do not know','you will have a pleasant surprise'];


//我们需要将路由添加到处理404之前，否则永远显示的是404

//因为我们添加了视图的文件，所以我们把原来的res.type  res.send替换成了res.render();
app.get('/',function(req,res){
	
	//res.type('text/plain');
	//res.send('MeadowLark Travel');
	res.render('home');
});

app.get('/about',function(req,res){
	var randomFortune=fortunes[Math.floor(Math.random()*fortunes.length)];
	//res.type('text/plain');
	//res.send('About MeadowLark Travel');
	res.render('about',{fortune:randomFortune});
});


//定制404页面
app.use(function(req,res){
	//res.type('text/plain');
	res.status('404');
	//res.send('404_NOT FOUND');
	res.render('404');
});


//定制500页面
app.use(function(err,req,res,next){
	console.log(err.stack);
	//res.type('text/plain');
	res.status('500');
	//res.send('500_SERVER Error');
	res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:'+app.get('port')+';Press Ctrl+C to terminate');
})