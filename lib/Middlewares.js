"use strict";
/// <reference path="../typings/main.d.ts" />
var Express = require("express");
var BodyParser = require("body-parser");
var CookieParser = require("cookie-parser");
var errorhandler = require("errorhandler");
//import { inject, injectable } from "inversify";
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
    return Middlewares;
}());
exports.Middlewares = Middlewares;
Object.seal(Middlewares);
