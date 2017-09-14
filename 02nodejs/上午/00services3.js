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
        fs.readFile('./static/'+pathName,function(err,data){

            //console.log(data); Buffer
            //console.log('3');
            if(err){  /*�Ҳ����ļ�����404*/
                console.log(err);
                fs.readFile('./static/404.html',function(error,relData){

                    res.writeHead(404,{"Content-Type":"text/html;charset='utf-8'"});
                    res.write(relData);

                    res.end();  /*ע���첽   �����õ������Ժ���ܽ�����Ӧ*/
                })
            }else{
               getMime(extname, function (mimedata) {
                   var mime=mimedata;
                   res.writeHead(200,{"Content-Type":mime+";charset='utf-8'"});
                   res.write(data);
                 //  console.log(data.toString());

                   res.end();  /*ע���첽   �����õ������Ժ���ܽ�����Ӧ*/
               });

            }

        })

    }
    //console.log('2');



})

//���ݺ�׺����ȡ ��������

function getMime(str,callback){   /* .html    .css   .js  */

    //str���ֵ֪���Ļ� ��switch

    //1.��ȡ�ļ�
    fs.readFile('./mime.json',function(err,data){   /*�첽*/
        // console.log(data.toString());

        var mimeJson=JSON.parse(data.toString());  /*json ����*/
     //   console.log(mimeJson['.json']);

       // return mimeJson[str] || 'text/html';
        var mime=mimeJson[str] || 'text/plain';

        callback(mime);
    })

    //readFileSync  ͬ�����漰���ص�

    

}

app.listen(3000,"10.36.141.149");


//json�ַ���ת����json����  ��{name:"zhangsan"}��

//JSON.parse();

//JSON.stringify();



