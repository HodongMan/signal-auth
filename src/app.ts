import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";

// App class는 반드시 Singleton으로 해야 합니다.
class App {

    public app: express.Application;
    public routes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routes.routes(this.app);         
    }

    private config(): void{

        // 외부 라이브러리 설정은 여기서 합니다.
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

// App은 여기서 한번 생성합니다. 다른 곳에서 절대 생성하지 마세요 방어코드 필요함
export default new App().app;