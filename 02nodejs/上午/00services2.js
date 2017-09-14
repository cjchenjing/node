var http=require('http');

var fs=require('fs');

var path=require('path');

var url=require('url');

var app=http.createServer((req,res)=>{

    var pathName=url.parse(req.url).pathname;  //��ȡurl��·��

    //console.log(pathName);

    if(pathName=='/' ){
        pathName='/index.html'
    }
   //��ȡ��׺��
    //css/dmb.header.css
    var extname=path.extname(pathName);


    if(pathName!='/favicon.ico'){
        //����url��ȡ��pathName
        fs.readFile('./static'+pathName,function(err,data){

            //console.log(data); Buffer
            //console.log('3');
            if(err){  /*�Ҳ����ļ�����404*/
                console.log(err);
                fs.readFile('./static/404.html',function(error,relData){

                    res.writeHead(404,{"Content-Type":"text/html;charset='utf-8'"});
                    res.write(relData.toString());

                    res.end();  /*ע���첽   �����õ������Ժ���ܽ�����Ӧ*/
                })
            }else{
               var mime=getMime(extname);

                res.writeHead(200,{"Content-Type":mime+";charset='utf-8'"});
                res.write(data.toString());

                res.end();  /*ע���첽   �����õ������Ժ���ܽ�����Ӧ*/

            }

        })

    }
    //console.log('2');



})

//���ݺ�׺����ȡ ��������

function getMime(str){   /* .html    .css   .js  */

    //str���ֵ֪���Ļ� ��switch
    switch(str){
        case '.html':
            return 'text/html';
            break;
        case '.css':
            return 'text/css';
            break;
        case '.js':
            return 'text/javascript';
            break;
    }

}

app.listen(3000,"127.0.0.1");


//json�ַ���ת����json����  ��{name:"zhangsan"}��

//JSON.parse();

//JSON.stringify();



