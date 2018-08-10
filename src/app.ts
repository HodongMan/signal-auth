import * as express from "express";
import * as bodyParser from "body-parser";
import * as errorhandler from 'strong-error-handler';

import { Routes } from "./routes/routes";
import { sequelize } from './sequelize';
import { User } from './models/userModel';


// App class는 반드시 Singleton으로 해야 합니다.
class App {

    public app: express.Application;
    public routes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.initOdbc();   
        this.config();
        this.routes.routes(this.app);
        this.errorHandler();
    }

    private config(): void{

        // 외부 라이브러리 설정은 여기서 합니다.
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    
    private errorHandler(): void {
        this.app.use(errorhandler({
            debug: process.env.ENV !== 'prod',
            log: true,
        }));
    }

    private async initOdbc() {
        await sequelize.sync({force: true});
            User.create({
            name: "hodong",
            id: "hodong",
            password: "1234",
            email: "arshavin3@naver.com"
        });
    }
    
}

// App은 여기서 한번 생성합니다. 다른 곳에서 절대 생성하지 마세요 방어코드 필요함
export default new App().app;