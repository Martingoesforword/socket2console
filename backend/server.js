//组织socket连接
const WebSocket = require('ws')
const WebSocketServer = WebSocket.Server;
//在4000端口上打开了一个WebSocket Server，该实例由变量wss引用。
const wss =new WebSocketServer({
    port:8000
})

var id2ReceiverMap = {};

var ID_POOL = {
    maxId: 1,
    randomOne: function (ws) {
        this.maxId++;
        this.pool[this.maxId] = ws ;
        return this.maxId;
    },
    releaseOne: function (ws) {
        delete this.pool[ws];
    },
    pool: {}
};

//如果有WebSocket请求接入，wss对象可以响应connection事件来处理这个WebSocket：
wss.on('connection',function(ws){  //在connection事件中，回调函数会传入一个WebSocket的实例，表示这个WebSocket连接。
    var id = ID_POOL.randomOne(ws);
    console.log(`id: `, id);

    ws.send(JSON.stringify({
        "type": "id",
        "id": id,
    }));

    //接收者请求连接id
    ws.onmessage = function (evt)
    {
        var data = JSON.parse(evt.data);
        if(data.type === "bindId") {
            //如果id被注册，则建立连接
            var bindId = data["id"];
            if(ID_POOL.pool[bindId]) {
                id2ReceiverMap[bindId] = ws;
            }
        }
        else if(data.type === "log") {
            var logContent = data["body"];
            var toWs = id2ReceiverMap[id];
            if(toWs) {
                toWs.send(JSON.stringify({
                    type:"log",
                    body: logContent,
                }))
            }
        }
    };

    ws.onclose = function (){
        ID_POOL.releaseOne(ws);
    };
})
//web界面通过socket连接后端

//在console中查看日志


//测试环境，部署环境



//接收客户端连接

//接收开发端连接

//接收客户端日志

//转发日志




