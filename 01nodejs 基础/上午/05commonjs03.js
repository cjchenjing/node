/**
 * Created by Administrator on 2017/5/7 0007.
 */
/**
 * Created by Administrator on 2017/5/7 0007.
 */

var http=require('http');


//var foo=require('./node_modules/foo.js');//引入模块   注意：自定义模块引入的时候得加  ./     (./表示当前目录)

var foo=require('foo');   /*node_modules 里面放的模块 我们之间可以写文件名来引入*/

var app=http.createServer(function(req,res){

    //  res.write('hello nodejs');
    res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
    res.write('你好 nodejs');

    console.log(foo);
    /*调用模块里面的方法*/

    res.end();


})

app.listen(8400,'127.0.0.1');  /*配置服务器的端口 和地址*/



/*模块化


1.把公共的功能封装成一个模块,这个模块里面的方法或者属性默认外面是没法方法的。我们如果要让外部访问我们的模块，

就必须在模块里面通过  exports.str=str; 暴露模块


2.暴露以后 外部通过require的方式引入这个模块。这个时候就可以使用模块里面暴露的属性和方法。

* */