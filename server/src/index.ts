import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from "cors";
const engine = require('express-engine-jsx');
import { Request, Response } from "express"
import { AppDataSource } from "./config/data-source"
import { Routes } from "./config/routes"
import * as path from "path";
import { migrate } from "./migration/xlsx_import";

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(cors());

    // Express view engine
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jsx');
    app.engine('jsx', engine);

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    await migrate();

    app.listen(3000)

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
