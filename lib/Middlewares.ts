///// <reference path="../typings/main.d.ts" />
///// <reference path="../node_modules/inversify/type_definitions/inversify/inversify.d.ts" />

import * as Express from "express";
import * as BodyParser from "body-parser";
import * as CookieParser from "cookie-parser";
import * as morgan  from "morgan";
import * as errorhandler from "errorhandler";
import { IMiddlewares } from "./IMiddlewares";
import { injectable, inject } from "inversify";
import { Logger } from "asd-microservice-logger";


@injectable()
class Middlewares implements IMiddlewares {

    config(router: Express.Router) {
        var app = Express();

        app.use((req, res, next) => {
            console.log("middleware function called");
            next();
        })

        app.use(BodyParser.urlencoded({ extended: false }));
        app.use(BodyParser.json());
        app.use(CookieParser());
        app.use(router);

        app.use(morgan("combined", { "stream": { write: (message) => { Logger.info(message) } } }));

        if (process.env.NODE_ENV === 'dev') {
            app.use(errorhandler());
        }

        return app;
    }
}
Object.seal(Middlewares);
export { Middlewares };
