/**
 * Created by Danny on 2015/9/20 9:34.
 */
var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

var server = http.createServer(function(req,res){
    //�����������req.url��if�жϣ���ô�û���������ʲô��ַ��
    //�������鶼һ����
    //�õ���ַ
    var pathname = url.parse(req.url).pathname;

    //�жϴ�ʱ�û�����ĵ�ַ���ļ��е�ַ�����ļ���ַ
    //������ļ��е�ַ����ô�Զ���������ļ����е�index.html
    if(pathname.indexOf(".") == -1){
        pathname += "/index.html";
    }
    //�������ַ��127.0.0.1/images/logo.png
    //ʵ���������./static/images/logo.png
    var fileURL = "./" + path.normalize("./static/" + pathname);
    //�õ���չ��
    var extname = path.extname(pathname);

    //���ļ�������
    fs.readFile(fileURL,function(err,data){
        //����֮����������
        if(err){
            //�ļ�������
            res.writeHead(404,{"Content-Type":"text/html;charset=UTF8"})
            res.end("404,ҳ��û���ҵ�");
        }
        //����֮����������
        getMime(extname,function(mime){
            res.writeHead(200,{"Content-Type":mime})
            res.end(data);
        });
    });
});

server.listen(8000,"127.0.0.1");
function getMime(extname,callback){
    //��ȡmime.json�ļ����õ�JSON������extname key �����ض�Ӧ��value
    //��ȡ�ļ�
    fs.readFile("./mime.json",function(err,data){
        if(err){
            throw Error("�Ҳ���mime.json�ļ���");
            return;
        }
        //ת��JSON
        var mimeJSON = JSON.parse(data);
        var mime =  mimeJSON[extname]  || "text/plain";
        //ִ�лص�������mime�����ַ������������Ĳ���
        callback(mime);
    });
}