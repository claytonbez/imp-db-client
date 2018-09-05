
var net = require('net');
var JsonSocket = require('json-socket');

class impDBClient{
    constructor (host,port){
        this.host = host;
        this.port = port;
    }
    send(obj,callback){
        var socket = new JsonSocket(new net.Socket());
        socket.connect(this.port, this.host);
        socket.on('connect', function () {
            socket.sendMessage(obj);
            socket.on('message', function (message) {
                callback(message);
            });
        });
    }
    clear(callback) {
        this.send({_:"clear"},function(obj){
            callback(obj.status);
        });
    }
    pushArray(key, val, callback) {
          this.send({_:"pushArray",key:key,val:val},function(obj){
            callback(obj.status);
        });
         return;
     }
    cutFirstArray(key, callback) {
        this.send({ _: "cutFirstArray", key: key}, function (obj) {
            callback(obj.status);
        });
        return;
    }
    remove(key,callback) {
        this.send({ _: "remove", key: key }, function (obj) {
            callback(obj.status);
        });
        return;
    }
    spliceArray(key, pos, callback) {
        this.send({ _: "spliceArray", key: key ,pos:pos}, function (obj) {
            callback(obj.status);
        });
        return;
    }
    set(key, val,callback) {
        this.send({_:"set",key:key,val:val},function(obj){
            callback(obj.status);
        });
    }
    setArrayPos(key, pos, val, callback) {
        this.send({_:"setArrayPos",key:key,pos:pos,val:val},function(obj){
            callback(obj.status);
        });
    }
    get(key, callback) {
        this.send({_:"get",key:key},function(obj){
            callback(obj);
        });
    }
    getArrayPos(key, pos, callback) {
        this.send({_:"getArrayPos",key:key,pos:pos},function(obj){
            callback(obj);
        });
    }
    exists(key, callback) {
        this.send({_: "get", key: key}, function (obj) {
            callback(obj.status);
        });
    }
      
}
module.exports = impDBClient;