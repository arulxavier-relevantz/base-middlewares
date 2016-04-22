"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../typings/main.d.ts" />
/// <reference path="../node_modules/inversify/type_definitions/inversify/inversify.d.ts" />
var Express = require("express");
var BodyParser = require("body-parser");
var CookieParser = require("cookie-parser");
var errorhandler = require("errorhandler");
var inversify_1 = require("inversify");
//import winston from "../../config/Logger";
var Middlewares = (function () {
    function Middlewares() {
    }
    Middlewares.prototype.config = function (router) {
        var app = Express();
        app.use(BodyParser.urlencoded({ extended: false }));
        app.use(BodyParser.json());
        app.use(CookieParser());
        app.use(router);
        //app.use(morgan("combined", { "stream": { write: (message) => { winston.info(message) }}}));
        if (process.env.NODE_ENV === 'dev') {
            app.use(errorhandler());
        }
        app.use(function (req, res, next) {
            console.log("middleware function called");
            next();
        });
        return app;
    };
    Middlewares = __decorate([
        inversify_1.injectable(), 
        __metadata('design:paramtypes', [])
    ], Middlewares);
    return Middlewares;
}());
exports.Middlewares = Middlewares;
Object.seal(Middlewares);
