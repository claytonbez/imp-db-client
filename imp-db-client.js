
var net = require('net');
var JsonSocket = require('json-socket');
var EventEmitter = require('events');
var __self;
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
                callback(null,message);
            });
        });
        socket.on('error',function(error){
            callback(error, null);
        });
    }
    clear(callback) {
        this.send({_:"clear"},function(err,obj){
            if(!obj){
                callback(err,null);
            }
            else{
                callback(null, obj.status);
            }
        });
    }
    pushArray(key, val, callback) {
          this.send({_:"pushArray",key:key,val:val},function(err,obj){
            if (!obj) {
                callback(err, null);
            } else {
                callback(null, obj.status);
            }
        });
         return;
     }
    cutFirstArray(key, callback) {
        this.send({ _: "cutFirstArray", key: key}, function (err,obj) {
            if (!obj) {
                callback(err, null);
            } else {
                callback(null, obj.status);
            }
        });
        return;
    }
    remove(key,callback) {
        this.send({ _: "remove", key: key }, function (err,obj) {
            if (!obj) {
                callback(err, null);
            } else {
                callback(null, obj.status);
            }
        });
        return;
    }
    spliceArray(key, pos, callback) {
        this.send({ _: "spliceArray", key: key ,pos:pos}, function (err,obj) {
            if (!obj) {
                callback(err, null);
            } else {
                callback(null, obj.status);
            }
        });
        return;
    }
    set(key, val,callback) {
        this.send({_:"set",key:key,val:val},function(err,obj){
            if (!obj) {
                callback(err, null);
            } else {
                callback(null, obj.status);
            }
        });
    }
    setArrayPos(key, pos, val, callback) {
        this.send({_:"setArrayPos",key:key,pos:pos,val:val},function(err,obj){
            if (!obj) {
                callback(err, null);
            } else {
                callback(null, obj.status);
            }
        });
    }
    get(key, callback) {
        this.send({_:"get",key:key},function(err,obj){
            if (!obj) {
                callback(err, null);
            } else {
                callback(null, obj);
            }
        });
    }
    getArrayPos(key, pos, callback) {
        this.send({_:"getArrayPos",key:key,pos:pos},function(err,obj){
            if (!obj) {
                callback(err, null);
            } else {
                callback(null, obj);
            }
        });
    }
    exists(key, callback) {
        this.send({_: "get", key: key}, function (err,obj) {
            if (!obj) {
                callback(err, false);
            } else {
                callback(null, true);
            }
        });
    }
      
}
module.exports = impDBClient;