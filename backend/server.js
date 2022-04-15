//组织socket连接

//web界面通过socket连接后端

//在console中查看日志


//测试环境，部署环境


var isProd = false;

var host = isProd ? "": "";

var id2socketIdMuple = {
    10: {
        logFrom: undefined,
        logTo: undefined,
    }
};


var ForwardLogContent = function (id, logContent, client) {
    var hub = id2socketIdMuple[id];
    if(hub && hub["logFrom"] === client) {
        var toSocket = hub["logTo"];
    }
}


//接收客户端连接

//接收开发端连接

//接收客户端日志

//转发日志




